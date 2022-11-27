import asyncio
import aiomysql
import json
from fastapi import HTTPException
import configparser
import os
import ssl

from app.helper import logger

loop = asyncio.get_event_loop()

config = configparser.ConfigParser()
config.read("app/config/config.ini")


# Encrypted connection using TLS/SSL: Flexible Server supports encrypted connections using Transport Layer Security (TLS 1.2)
# all incoming connections with TLS 1.0 and TLS 1.1 will be denied by default.
ctx = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
ctx.load_verify_locations('app/config/ZerooCars-ca-certificate.crt')

async def execute(query, placeholder={}):
    """Executes a single query

    Args:
        query (str): Contains the SQL query.
        placeholder (dict, optional): Contains the vaule for parameterized query. Defaults to {}.

    Raises:
        Exception: handles error occur while trying to execute the query
        HTTPException: if Database Unreachable

    Returns:
        [dict]: returns the response of the executed query
    """
    try:
        conn = None
        conn = await aiomysql.connect(
            host=config["Database"]["Host"],
            port=int(config["Database"]["Port"]),
            user=config["Database"]["Username"],
            password=config["Database"]["Password"],
            db=config["Database"]["DB"],
            cursorclass=aiomysql.cursors.DictCursor,
            autocommit=False,
            ssl = ctx
        )

        async with conn.cursor() as cur:
            await cur.execute(query, placeholder)
            result = await cur.fetchall()
            await conn.commit()
        
        return result
    except Exception as e:
        print(e)
        if conn:
            await conn.rollback()
            raise Exception(e)
        else:
            raise HTTPException(status_code=503, detail="Database Unreachable")
    finally:
        print(cur._last_executed)  # need to log this
        if conn:
            conn.close()


async def executemany(query, placeholder={}):
    """Executes many query

    Args:
        query (str): Contains the SQL query.
        placeholder (dict, optional): Contains the vaule for parameterized query. Defaults to {}.

    Raises:
        Exception: handles error occur while trying to execute the query
        HTTPException: if Database Unreachable

    Returns:
        [dict]: returns the response of the executed query
    """
    try:
        conn = None
        conn = await aiomysql.connect(
            host=config["Database"]["Host"],
            port=int(config["Database"]["Port"]),
            user=config["Database"]["Username"],
            password=config["Database"]["Password"],
            db=config["Database"]["DB"],
            cursorclass=aiomysql.cursors.DictCursor,
            autocommit=False,
            ssl=ctx,
        )

        async with conn.cursor() as cur:
            await cur.executemany(query, placeholder)
            result = await cur.fetchall()
            await conn.commit()
        return result
    except Exception as e:
        if conn:
            await conn.rollback()
            raise Exception(e)
        else:
            raise HTTPException(status_code=503, detail="Database Unreachable")
    finally:
        # print(cur._last_executed)  # need to log this
        if conn:
            conn.close()


async def callproc(query, data):
    try:
        conn = None
        conn = await aiomysql.connect(
            host=config["Database"]["Host"],
            port=int(config["Database"]["Port"]),
            user=config["Database"]["Username"],
            password=config["Database"]["Password"],
            db=config["Database"]["DB"],
            cursorclass=aiomysql.cursors.DictCursor,
            autocommit=False,
            ssl=ctx,
        )
        
        async with conn.cursor() as cur:
            for line in query.split("\n\n"):
                await cur.execute(line, data)
            result = await cur.fetchall()
        await conn.commit()
        return result
    except Exception as e:
        if conn:
            await conn.rollback()
            raise Exception(e)
        else:
            raise HTTPException(status_code=503, detail="Database Unreachable")
    finally:
        if conn:
            conn.close()

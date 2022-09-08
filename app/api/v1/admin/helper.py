from fastapi import Form, HTTPException
import datetime
import bcrypt
import jwt
import os
import configparser

from app.constants import PHONE_VALIDATION
from . import execute_query
from app.auth import generate_access_token, generate_refresh_token


config = configparser.ConfigParser()
config.read("app/config/config.ini")


def password_hash(password: str):
    """This fnction is used to hash the password

    Args:
        password (str, optional): [contains the password]. Defaults to Form(...).

    Returns:
        [str]: bcrypt hashed value
    """
    salt = bcrypt.gensalt(14)
    password_hashed = bcrypt.hashpw(password.encode(), salt)
    return password_hashed.decode()


async def verify_admin(data):
    try:
        result = await execute_query.get_admin_login_details(data)
        if result == () or not bcrypt.checkpw(
            data["password"].encode(), (result[0]["password"] + "").encode()
        ):
            raise HTTPException(status_code=401, detail="Invalid user credentials")
        if result[0]["status"] != True:
            raise HTTPException(status_code=403, detail="User not active")
        del result[0]["password"]
        
        return {
            "access": generate_access_token(
                payload={
                    "admin_id": result[0]["id"],
                    # need to be set 15 minutes
                    "exp": datetime.datetime.utcnow()
                    + datetime.timedelta(minutes=1 * 60 * 24 * 3),
                    "iat": datetime.datetime.utcnow(),
                    "is_super_admin": bool(result[0]["is_super_admin"]),
                    "permissions": result[0]["permissions"],
                }
            ),
            "refresh": generate_refresh_token(
                payload={
                    "admin_id": result[0]["id"],
                    # need to be set 15 minutes
                    "exp": datetime.datetime.utcnow()
                    + datetime.timedelta(minutes=1 * 60 * 24 * 3),
                    "iat": datetime.datetime.utcnow(),
                },
                remember_me=data["remember_me"],
            ),
        }
    
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def verify_admin_with_id(data):
    try:
        result = await execute_query.get_admin_login_details_with_id(data)
        if result == () or not bcrypt.checkpw(
            data["password"].encode(), (result[0]["password"] + "").encode()
        ):
            raise HTTPException(status_code=401, detail="Invalid user credentials")
        if result[0]["status"] != True:
            raise HTTPException(status_code=403, detail="User not active")
        del result[0]["password"]

        return True
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def verify_admin_refresh_token(refresh):
    try:
        payload = jwt.decode(
            refresh, config["Server"]["REFRESH_SECRET"], algorithms=["HS256"]
        )
        result = await execute_query.get_admin_login_details(payload)

        if (
            result[0]["revoke_token"].timestamp() >= payload["iat"]
            or result[0]["id"] != payload["admin_id"]
        ):
            raise HTTPException(status_code=401, detail="Invalid Refresh Token")
        return {
            "access": generate_access_token(
                payload={
                    "admin_id": result[0]["id"],
                    # need to be set 15 minutes
                    "exp": datetime.datetime.utcnow()
                    + datetime.timedelta(minutes=1 * 60 * 24 * 3),
                    "iat": datetime.datetime.utcnow(),
                    "is_super_admin": bool(result[0]["is_super_admin"]),
                    "permissions": result[0]["permissions"],
                }
            )
        }
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=401, detail="Invalid Refresh Token")


async def get_details(data):
    try:
        result = await execute_query.get_details(data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def template(data, query, func="template"):
    try:
        result = await eval("execute_query.{}(data,query)".format(func))
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def update_details(data, table):
    try:
        temp = []
        for i in data:
            temp.append("{0}=%({0})s".format(i))
        update_value = ",".join(temp)
        result = await execute_query.update_details(data, table, update_value)
        return result

    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

import inspect, os
from app import database
from fastapi import HTTPException
import json

from app import helper


async def get_photo(data):
    try:
        query = helper.open_file(inspect.currentframe(), "get_photo.sql")
        query = query.format(**data)
        result = await database.execute(query, data)
        return result[0]
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

async def get_other_photo(data):
    try:
        query = helper.open_file(inspect.currentframe(), "get_other_photo.sql")
        query = query.format(**data)
        result = await database.execute(query, data)
        return result[0]
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_photos(data, query):
    try:
        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        query = query.format(**data)
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_home_photos(data, query):
    try:
        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        query = query.format(**data)
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

from datetime import datetime
import inspect
from fastapi import Form, HTTPException

from app import helper
from app import database


async def get_admin_login_details(data):
    try:
        query = helper.open_file(inspect.currentframe(), "get_admin_login_details.sql")
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_admin_login_details_with_id(data):
    try:
        query = helper.open_file(
            inspect.currentframe(), "get_admin_login_details_with_id.sql"
        )
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def template(data, query):
    try:
        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_details(data):
    try:
        query = helper.open_file(inspect.currentframe(), "get_details.sql")
        query = query.format(**data)
        result = await database.execute(query, data)
        if result == ():
            return result
        for i in result[0]:
            
            if type(result[0][i]) is datetime:
                result[0][i] = str(result[0][i])
        return result[0]
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def update_details(data, table, update_value):
    try:
        query = helper.open_file(inspect.currentframe(), "update_details.sql")
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def delete_photos(data, query):
    try:
        query = "delete from " + data["table"] + " where name = %(name)s;"

        result = await database.execute(query, data)

    except Exception as e:
        print(e, "error")
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def insert_photos(data, query):
    try:

        query = (
            "INSERT INTO "
            + data["table"]
            + " (REGESTRATION_NUMBER,photo,sort,name) VALUES (%s,%s,%s,%s);"
        )

        result = await database.execute(
            query,
            [data["regestration_number"], data["photo"], data["sort"], data["name"]],
        )
        return result
    except Exception as e:
        print(e, "error")
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def home_photos(data, query):
    try:

        query = "INSERT INTO " + data["table"] + " (photo,sort,name) VALUES (%s,%s,%s);"

        result = await database.execute(
            query,
            [data["photo"], data["sort"], data["name"]],
        )
        return result
    except Exception as e:
        print(e, "error")
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def sort_photos(data, query):
    try:
        query = "update " + data["table"] + " set sort=%(sort)s where name = %(name)s;"

        result = await database.executemany(query, data["data"])

    except Exception as e:
        print(e, "error")
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

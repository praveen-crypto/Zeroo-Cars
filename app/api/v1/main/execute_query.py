from datetime import datetime
import inspect
from fastapi import Form, HTTPException
import json

from app import helper
from app import database


async def template(data, query):
    try:
        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_car_details(data, query):
    try:
        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        result = await database.execute(query, data)        
        if not result:
            return []
        for i in result[0]:
            result[0][i] = json.loads(result[0][i])
        return result[0]
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


async def get_cars(data, query):
    try:
        fule_type = ""
        brand = ""
        transmission_type = ""
        body_type = ""

        if len(data["fule_type"]):
            fule_type = " and fule_type in ({})".format( str(data["fule_type"])[1:-1] )

        if len(data["brand"]):
            brand = " and brand in ({})".format( str(data["brand"])[1:-1] )

        if len(data["transmission_type"]):
            transmission_type = " and transmission_type in ({})".format( str(data["transmission_type"])[1:-1] )
        
        if len(data["body"]):
            body_type = " and body_type = '{}'".format(  data["body"][0]  )

        query = helper.open_file(inspect.currentframe(), "{}.sql".format(query))
        query = query.format(fule_type + brand + transmission_type + body_type)
        result = await database.execute(query, data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

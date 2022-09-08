from fastapi import Form, HTTPException
from . import execute_query


async def get_photo(data):
    try:
        result = await execute_query.get_photo(data)
        return result
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))

async def get_other_photo(data):
    try:
        result = await execute_query.get_other_photo(data)
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

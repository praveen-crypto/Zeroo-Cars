from fastapi import Depends, FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.staticfiles import StaticFiles

import sys

from . import api, ui
from app.helper import logger
from app.helper.format import response_format

print("", "Python Current Version:-", sys.version, "", sep="\n\n")

app = FastAPI(docs_url = '/docs', redoc_url = None)

app.mount("/static", StaticFiles(directory="./app/static"), name="static")

app.include_router(api.router, prefix="/api")
app.include_router(ui.router)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    """Handles StarletteHTTPException

    Args:
        request : Contains request object
        exc : Contains error details

    Returns:
        [type]: response_format object
    """
    message = exc.detail
    logger.log(message)
    return response_format(message, exc.status_code, False)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """Handles RequestValidationError

    Args:
        request : Contains request object
        exc : Contains error details

    Returns:
        [type]: response_format object
    """
    error = exc.errors()[0]
    message = error["msg"]
    body = error["loc"]
    logger.log(message + "," + str(body))
    return response_format(message, 422, False, error=body)


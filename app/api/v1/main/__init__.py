from fastapi import APIRouter, Depends, Security, Request, Cookie, File, UploadFile
from fastapi.param_functions import Body, Query, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import HTMLResponse, Response
from fastapi.responses import RedirectResponse
from typing import Optional, List

# from app.api.v1.signup import execute_query

from app.helper.format import response_format
from app.auth import auth_required
from . import helper
from app.model.admin import (
    AdminSigninValidate,
    AddCar,
    ComfortAndConvenience,
    DimensionsAndCapacity,
    EngineAndTransmission,
    EntertainmentAndCommunication,
    Exterior,
    ExteriorsReport,
    Features,
    FuelAndPerformance,
    HoodAndBonnet,
    Interior,
    InteriorsReport,
    OverAllRating,
    Safety,
    SuspensionAndBrakes,
    SuspensionSteeringAndBrakes,
    SystemAndFunctions,
    VehicleDocuments,
    Wheels,
    Photos,
)

router = APIRouter()
security = HTTPBearer()


@router.get("/cars/", tags=["Main"])
async def get_cars(
    request: Request,
    offset: int = Query(0),
    limit: int = Query(20),
    kilometer: int = Query(1000000),
    min_price: int = Query(0),
    max_price: int = Query(10000000),
    number_of_owners: int = Query(1000),
    fule_type: List[str] = Query([]),
    brand: List[str] = Query([]),
    transmission_type: List[str] = Query([]),
):

    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0]
        + "api/v1/image/thumbnail/"
    )

    result = await helper.template(
        {
            "offset": offset,
            "limit": limit,
            "kilometer": kilometer,
            "min_price": min_price,
            "max_price": max_price,
            "number_of_owners": number_of_owners,
            "fule_type": fule_type,
            "brand": brand,
            "transmission_type": transmission_type,
            "image": image,
        },
        "get_cars",
        "get_cars",
    )
    print("Type :",type(result))
    return response_format(data=result)


@router.get("/cars/{id}/", tags=["Main"])
async def get_car_details(id: str, request: Request):
    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0] + "api/v1/image/"
    )
    result = await helper.template(
        {"id": id, "image": image}, "get_car_details", "get_car_details"
    )

    return response_format(data=result)


@router.get("/cars/{id}/hidden/", tags=["Main"])
async def get_car_details(id: str, request: Request):
    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0] + "api/v1/image/"
    )
    result = await helper.template(
        {"id": id, "image": image}, "get_hidden_car_details", "get_car_details"
    )

    return response_format(data=result)


@router.get("/filters/brand/", tags=["Filters"])
async def get_brand_filter(request: Request):
    result = await helper.template({}, "get_brand_filter")
    result = [i["brand"] for i in result]
    return response_format(data=result)


@router.get("/filters/fule_type/", tags=["Filters"])
async def get_fule_type(request: Request):
    result = await helper.template({}, "get_fule_type")
    result = [i["fule_type"] for i in result]
    return response_format(data=result)


@router.get("/filters/transmission_type/", tags=["Filters"])
async def get_transmission_type(request: Request):
    result = await helper.template({}, "get_transmission_type")
    result = [i["transmission_type"] for i in result]
    return response_format(data=result)


@router.get("/search/", tags=["Filters"])
async def search(request: Request, search: str = Query("")):
    search = "|".join(search.split())
    result = await helper.template({"search": search}, "search")
    return response_format(data=result)
  
@router.get("/cars/all/brands/", tags=["Data"])
async def brands():
    return response_format(data=helper.CARS_DATA)

@router.get("/cars/all/fuel_type/", tags=["Data"])
async def fuel_type():
    return response_format(data=helper.FUEL_TYPE)


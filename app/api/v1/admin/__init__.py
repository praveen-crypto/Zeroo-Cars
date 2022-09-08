from datetime import datetime
import hashlib
import random
import time
import uuid
from fastapi import APIRouter, Depends, Security, Request, Cookie, File, UploadFile
from fastapi.param_functions import Body, Query, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import HTMLResponse, Response
from fastapi.responses import RedirectResponse
from typing import Optional, List
import json

# from app.api.v1.signup import execute_query
from app.constants import DATE_VALIDATION
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
    HomePhotos,
    HoodAndBonnet,
    Interior,
    InteriorsReport,
    Inquiry,
    OverAllRating,
    Safety,
    SuspensionAndBrakes,
    SuspensionSteeringAndBrakes,
    SystemAndFunctions,
    VehicleDocuments,
    Wheels,
    Photos,
    PhotosSort,
)

router = APIRouter()
security = HTTPBearer()


@router.post("/token/", tags=["Admin"])
async def admin_token(data: dict = Depends(AdminSigninValidate)):
    result = await helper.verify_admin(data)
    cookies = {"token": result["refresh"]}
    del result["refresh"]
    return response_format(cookies=cookies, httponly=True, secure=False, **result)


# @router.post("/token/refresh/", tags=["Admin"])
# async def admin_token_refresh(token: HTTPAuthorizationCredentials = Security(security)):
#     result = await helper.verify_admin_refresh_token(token.credentials)
#     return response_format(**result)


@router.post("/token/refresh/", tags=["Admin"])
async def admin_token_refresh(token: Optional[str] = Cookie(None)):
    result = await helper.verify_admin_refresh_token(token)
    return response_format(**result)

@router.delete("/logout/", tags=["Admin"])
async def logout():
    return response_format(cookies={"token": None}, httponly=True)

@router.post("/car/", tags=["Cars : Insert"])
async def add_car(data: dict = Depends(AddCar)):
    result = await helper.template(data, "add_car")
    return response_format(data=result)


@router.post("/comfort_and_convenience/", tags=["Cars : Insert"])
async def comfort_and_convenience(data: dict = Depends(ComfortAndConvenience)):
    result = await helper.template(data, "comfort_and_convenience")
    return response_format(data=result)


@router.post("/dimensions_and_capacity/", tags=["Cars : Insert"])
async def dimensions_and_capacity(data: dict = Depends(DimensionsAndCapacity)):
    result = await helper.template(data, "dimensions_and_capacity")
    return response_format(data=result)


@router.post("/engine_and_transmission/", tags=["Cars : Insert"])
async def engine_and_transmission(data: dict = Depends(EngineAndTransmission)):
    result = await helper.template(data, "engine_and_transmission")
    return response_format(data=result)


@router.post("/entertainment_and_communication/", tags=["Cars : Insert"])
async def entertainment_and_communication(    data: dict = Depends(EntertainmentAndCommunication),):
    result = await helper.template(data, "entertainment_and_communication")
    return response_format(data=result)


@router.post("/exterior/", tags=["Cars : Insert"])
async def exterior(
    data: dict = Depends(Exterior),
):
    result = await helper.template(data, "exterior")
    return response_format(data=result)


@router.post("/exteriors_report/", tags=["Cars : Insert"])
async def exterior_report(
    data: dict = Depends(ExteriorsReport),
):
    result = await helper.template(data, "exteriors_report")
    return response_format(data=result)


@router.post("/features/", tags=["Cars : Insert"])
async def features(
    data: dict = Depends(Features),
):
    result = await helper.template(data, "features")
    return response_format(data=result)


@router.post("/fuel_and_performance/", tags=["Cars : Insert"])
async def fuel_and_performance(
    data: dict = Depends(FuelAndPerformance),
):
    result = await helper.template(data, "fuel_and_performance")
    return response_format(data=result)


@router.post("/hood_and_bonnet/", tags=["Cars : Insert"])
async def hood_and_bonnet(
    data: dict = Depends(HoodAndBonnet),
):
    result = await helper.template(data, "hood_and_bonnet")
    return response_format(data=result)


@router.post("/interior/", tags=["Cars : Insert"])
async def interior(
    data: dict = Depends(Interior),
):
    result = await helper.template(data, "interior")
    return response_format(data=result)


@router.post("/interiors_report/", tags=["Cars : Insert"])
async def interiors_report(
    data: dict = Depends(InteriorsReport),
):
    result = await helper.template(data, "interiors_report")
    return response_format(data=result)


@router.post("/over_all_rating/", tags=["Cars : Insert"])
async def over_all_rating(
    data: dict = Depends(OverAllRating),
):
    result = await helper.template(data, "over_all_rating")
    return response_format(data=result)


@router.post("/safety/", tags=["Cars : Insert"])
async def safety(
    data: dict = Depends(Safety),
):
    result = await helper.template(data, "safety")
    return response_format(data=result)


@router.post("/suspension_and_brakes/", tags=["Cars : Insert"])
async def suspension_and_brakes(
    data: dict = Depends(SuspensionAndBrakes),
):
    result = await helper.template(data, "suspension_and_brakes")
    return response_format(data=result)


@router.post("/suspension_steering_and_brakes/", tags=["Cars : Insert"])
async def suspension_steering_and_brakes(
    data: dict = Depends(SuspensionSteeringAndBrakes),
):
    result = await helper.template(data, "suspension_steering_and_brakes")
    return response_format(data=result)


@router.post("/system_and_functions/", tags=["Cars : Insert"])
async def system_and_functions(
    data: dict = Depends(SystemAndFunctions),
):
    result = await helper.template(data, "system_and_functions")
    return response_format(data=result)


@router.post("/vehicle_documents/", tags=["Cars : Insert"])
async def vehicle_documents(
    data: dict = Depends(VehicleDocuments),
):
    result = await helper.template(data, "vehicle_documents")
    return response_format(data=result)


@router.post("/wheels/", tags=["Cars : Insert"])
async def wheels(
    data: dict = Depends(Wheels),
):
    result = await helper.template(data, "wheels")
    return response_format(data=result)


@router.get("/cars/", tags=["All Cars"])
async def get_cars(request: Request, offset: int = Query(0), limit: int = Query(20)):
    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0]
        + "api/v1/image/thumbnail/"
    )
    result = await helper.template(
        {"offset": offset, "limit": limit, "image": image}, "get_all_cars"
    )
    return response_format(data=result)


@router.get("/cars/hidden/", tags=["All Cars"])
async def get_hidden_cars(  request: Request, offset: int = Query(0), limit: int = Query(20) ):
    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0]
        + "api/v1/image/thumbnail/"
    )
    result = await helper.template({"offset": offset, "limit": limit, "image": image}, "get_all_hidden_cars" )

    return response_format(data=result)


@router.get("/basic/{id}/", tags=["Cars : GET"])
@router.get("/comfort_and_convenience/{id}/", tags=["Cars : GET"])
@router.get("/dimensions_and_capacity/{id}/", tags=["Cars : GET"])
@router.get("/engine_and_transmission/{id}/", tags=["Cars : GET"])
@router.get("/entertainment_and_communication/{id}/", tags=["Cars : GET"])
@router.get("/exterior/{id}/", tags=["Cars : GET"])
@router.get("/exteriors_report/{id}/", tags=["Cars : GET"])
@router.get("/features/{id}/", tags=["Cars : GET"])
@router.get("/fuel_and_performance/{id}/", tags=["Cars : GET"])
@router.get("/hood_and_bonnet/{id}/", tags=["Cars : GET"])
@router.get("/interior/{id}/", tags=["Cars : GET"])
@router.get("/interiors_report/{id}/", tags=["Cars : GET"])
@router.get("/over_all_rating/{id}/", tags=["Cars : GET"])
@router.get("/safety/{id}/", tags=["Cars : GET"])
@router.get("/suspension_and_brakes/{id}/", tags=["Cars : GET"])
@router.get("/suspension_steering_and_brakes/{id}/", tags=["Cars : GET"])
@router.get("/system_and_functions/{id}/", tags=["Cars : GET"])
@router.get("/vehicle_documents/{id}/", tags=["Cars : GET"])
@router.get("/wheels/{id}/", tags=["Cars : GET"])
async def get_details(req: Request, id: str):
    table = str(req.url).split("/")[-3]
    result = json.dumps(await helper.get_details({"id": id, "table": table}), default=str) 

    return response_format(data = json.loads(result))


@router.put("/car/", tags=["Cars : Update"])
async def add_car(data: dict = Depends(AddCar)):
    result = await helper.update_details(data, "add_car")
    return response_format(data=result)


@router.post("/thumbnail/photos/{regestration_number}/", tags=["Upload Photo"])
@router.post("/exterior/photos/{regestration_number}/", tags=["Upload Photo"])
@router.post("/interoir/photos/{regestration_number}/", tags=["Upload Photo"])
@router.post("/engine/photos/{regestration_number}/", tags=["Upload Photo"])
async def photo_upload(
    regestration_number: str,
    req: Request,
    photos: UploadFile = File(..., media_type="image/jpeg"),
):
    d = {}
    s = 0
    d["photo"] = await photos.read()
    name = photos.filename
    t = (
        str(regestration_number)
        + "__"
        + str(random.randint(0, 999999))
        + "__"
        + str(datetime.utcnow())
        + "__"
        + name
    )
    d["name"] = hashlib.sha256(t.encode()).hexdigest()
    s += 1
    d["sort"] = time.time()
    d["regestration_number"] = regestration_number

    table = str(req.url).split("/")[-4] + "_photo"

    result = await helper.template(
        {"table": table, "regestration_number": regestration_number, **d},
        "insert_photos",
        "insert_photos",
    )
    
    
    image = (
        str(req.base_url)
        + "api/v1/image/"
        + str(req.url).split("/")[-3]
        + "/"
        + d["name"]
        + "/"
    )
    
    return response_format(image=image)


@router.post("/home/photos/", tags=["Upload Photo"])
async def home_photo_upload(req: Request, data: dict = Depends(HomePhotos)):
    table = str(req.url).split("/")[-3] + "_photo"
    result = await helper.template(
        {"table": table, **data}, "home_photos", "home_photos"
    )
    
    image = (
        str(req.base_url)
        + "api/v1/image/"
        + str(req.url).split("/")[-3]
        + "/"
        + data["name"]
        + "/"
    )
    return response_format(image=image)


@router.delete("/thumbnail/photos/{id}/", tags=["Delete Photo"])
@router.delete("/exterior/photos/{id}/", tags=["Delete Photo"])
@router.delete("/interoir/photos/{id}/", tags=["Delete Photo"])
@router.delete("/engine/photos/{id}/", tags=["Delete Photo"])
@router.delete("/home/photos/{id}/", tags=["Delete Photo"])
async def photo_delete(req: Request, id: str):
    table = str(req.url).split("/")[-4] + "_photo"
    result = await helper.template({"table": table, "name": id}, "", "delete_photos")

    return response_format()


# @router.put("/car/{id}/viewable/", tags=["Cars : viewable"])
# async def add_car(id: str, viewable: bool = Query(0)):
#     result = await helper.template(
#         {"regestration_number": id, "viewable": viewable}, "update_viewable"
#     )
#     return response_format(data=result)


@router.put("/thumbnail/photos/sort/", tags=["Sort Photo"])
@router.put("/exterior/photos/sort/", tags=["Sort Photo"])
@router.put("/interoir/photos/sort/", tags=["Sort Photo"])
@router.put("/engine/photos/sort/", tags=["Sort Photo"])
async def photo_sort(req: Request, data: list = Depends(PhotosSort)):
    table = str(req.url).split("/")[-4] + "_photo"
    result = await helper.template({"table": table, "data": data}, "", "sort_photos")

    return response_format()


@router.put("/car/{id}/viewable/", tags=["Cars : viewable"])
async def update_viewable(id: str, viewable: bool = Query(0)):
    result = await helper.template(
        {"regestration_number": id, "viewable": viewable}, "update_viewable"
    )
    return response_format(data=result)


@router.post("/inquiry/", tags=["Cars : inquiry"])
async def inquiry(data: dict = Depends(Inquiry)):
    print(data)
    result = await helper.template(data, "inquiry")
    return response_format(data=result)


@router.put("/inquiry/notes/", tags=["Cars : inquiry"])
async def inquiry_notes(id: str = Form(...), notes: str = Form(...)):
    result = await helper.template({"id": id, "notes": notes}, "inquiry_notes")
    return response_format(data=result)


@router.put("/inquiry/pin/", tags=["Cars : inquiry"])
async def inquiry_pin(id: str = Form(...), pin: bool = Form(...)):
    result = await helper.template({"id": id, "pin": pin}, "inquiry_pin")
    return response_format(data=result)


@router.get("/inquiry/{inquiry_type}/", tags=["Cars : inquiry"])
async def get_inquiry(inquiry_type: str, offset: int = Query(0), limit: int = Query(20)):
    result = await helper.template({"inquiry_type": inquiry_type,"offset": offset, "limit": limit}, "get_inquiry")
    return response_format(data=result)


@router.post("/password/", tags=["Security"])
@auth_required([])
async def change_password(
    old_pass: str = Form(...), new_pass: str = Form(20), token=Security(security)
):
    result = await helper.verify_admin_with_id(
        {"id": token["admin_id"], "password": old_pass}
    )
    if result:
        helper.template(
            {"id": token["admin_id"], "password": helper.password_hash(new_pass)},
            "change_password",
        )
    return response_format()

@router.get("/cars/count/", tags=["Cars : CRM"])
async def get_cars_count():
    result = await helper.template({}, "get_cars_count")
    return response_format(data=result[0])

@router.post("/cars/sold/", tags=["Cars : Sold"])
async def cars_sold_insert( reg_no:str=Form(...), price:int=Form(...), date:str=Form(...), sold_notes:str=Form('')):
    result = await helper.template({"reg_no":reg_no,"price":price,"date":date,"sold_notes":sold_notes}, "cars_sold")
    
    return response_format(data=result)


@router.get("/cars/sold/", tags=["All Cars"])
async def get_sold_cars( request: Request, offset: int = Query(0), limit: int = Query(20)
):
    image = (
        str(request.url).replace(request.url.path, "/").split("?")[0]
        + "api/v1/image/thumbnail/"
    )
    
    result = await helper.template( {"offset": offset, "limit": limit, "image": image}, "get_all_sold_cars" )
    
    return response_format(data=result)


@router.post("/photos/{tag}/", tags=["Other Photos"])
async def other_photo_upload(tag:str,req: Request, photos: UploadFile = File(..., media_type="image/jpeg"),):
    d = {}
    d["photo"] = await photos.read()
    id = uuid.uuid4().hex 
    d["tag"] = tag
    d["id"] = id
    
    await helper.template(
        {**d},
        "other_photo_upload"
    )
        
    image = (
        str(req.base_url)
        + "api/v1/image/"
        + "other"
        + "/"
        + d["id"]
        + "/"
    )
    return response_format(image=image)


@router.delete("/photos/{id}/", tags=["Delete Photo"])
async def other_photo_delete(req: Request, id: str):
    await helper.template({"id": id}, "other_photo_delete")

    return response_format()
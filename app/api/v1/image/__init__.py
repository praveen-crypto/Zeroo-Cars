from fastapi import APIRouter, Response, Request, Depends
from fastapi.security import HTTPBearer


from . import helper
from app.model.admin import Photos
from app.helper.format import response_format

router = APIRouter()
security = HTTPBearer()


@router.get("/thumbnail/photos/{id}/", tags=["GET ALL Photos"])
@router.get("/exterior/photos/{id}/", tags=["GET ALL Photos"])
@router.get("/interoir/photos/{id}/", tags=["GET ALL Photos"])
@router.get("/engine/photos/{id}/", tags=["GET ALL Photos"])
async def get_individual_photos(request: Request, id: str):
    table = str(request.url).split("/")[-4] + "_photo"
    image = str(request.url).replace(request.url.path, "/").split("?")[
        0
    ] + "api/v1/image/{}/".format(str(request.url).split("/")[-4])
    result = await helper.template(
        {"table": table, "regestration_number": id, "image": image},
        "get_photos",
        "get_photos",
    )
    return response_format(data=result)


@router.get("/home/photos/", tags=["GET ALL Photos"])
async def get_all_photo(request: Request, id: str):
    table = str(request.url).split("/")[-4] + "_photo"
    image = str(request.url).replace(request.url.path, "/").split("?")[
        0
    ] + "api/v1/image/{}/".format(str(request.url).split("/")[-4])
    result = await helper.template(
        {"table": table, "image": image},
        "get_home_photos",
        "get_home_photos",
    )
    return response_format(data=result)


@router.get("/thumbnail/{id}/", tags=["GET Photo"])
@router.get("/exterior/{id}/", tags=["GET Photo"])
@router.get("/interoir/{id}/", tags=["GET Photo"])
@router.get("/engine/{id}/", tags=["GET Photo"])
@router.get("/home/{id}/", tags=["GET Photo"])
async def get_photo(req: Request, id: str):
    table = str(req.url).split("/")[-3] + "_photo"
    image = await helper.get_photo({"table": table, "name": id})
    
    return Response(image["photo"], media_type="image/jpeg")

@router.get("/other/{id}/", tags=["GET Photo"])
async def get_other_photo(req: Request, id: str):
    image = await helper.get_other_photo({"id": id})
    
    return Response(image["photo"], media_type="image/jpeg")

@router.get("/tag/{tag}/", tags=["GET Photo"])
async def get_photo_by_tag(request: Request, tag: str):
    image = str(request.url).replace(request.url.path, "/").split("?")[0] + "api/v1/image/other/"
    result = await helper.template( {"tag": tag, "image": image}, "get_other_photos", "get_photos" )
    
    return response_format(data = result)
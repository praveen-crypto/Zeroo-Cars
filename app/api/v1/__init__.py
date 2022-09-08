from fastapi import APIRouter


from . import admin, image, main

router = APIRouter()

router.include_router(admin.router, prefix="/v1/admin")
router.include_router(image.router, prefix="/v1/image")
router.include_router(main.router, prefix="/v1/main")

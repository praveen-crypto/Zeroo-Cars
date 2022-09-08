from fastapi import APIRouter, Cookie
from fastapi import requests
from typing import Optional
from fastapi.requests import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.auth import web_auth_required, web_is_logged_in

router = APIRouter()

templates = Jinja2Templates(directory="./app/ui/admin/templates")

@router.get("/admin/", response_class=HTMLResponse)
@router.get("/admin/dashboard/", response_class=HTMLResponse)
@web_auth_required([])
async def admin(request: Request, token: Optional[str] = Cookie(None)):    
    return templates.TemplateResponse("dashboard.html", {"request":request, "dashboard":"active"})

@router.get("/admin/cars/", response_class=HTMLResponse)
@web_auth_required([])
async def cars(request:Request, token: Optional[str] = Cookie(None)):
    return templates.TemplateResponse("cars.html", {"request":request, "cars":"active"})

@router.get("/admin/images/", response_class=HTMLResponse)
@web_auth_required([])
async def cars(request:Request, token: Optional[str] = Cookie(None)):
    return templates.TemplateResponse("image.html", {"request":request, "image":"active"})

@router.get("/admin/notification/", response_class=HTMLResponse)
@web_auth_required([])
async def cars(request:Request, token: Optional[str] = Cookie(None)):
    return templates.TemplateResponse("notification.html", {"request":request, "notification":"active"})

@router.get("/admin/security/", response_class=HTMLResponse)
@web_auth_required([])
async def cars(request:Request, token: Optional[str] = Cookie(None)):
    return templates.TemplateResponse("security.html", {"request":request, "security":"active"})

@router.get("/admin/signin/", response_class=HTMLResponse)
@web_is_logged_in([])
async def admin(request: Request, token: Optional[str] = Cookie(None)):    
    return templates.TemplateResponse("signin.html", {"request":request})



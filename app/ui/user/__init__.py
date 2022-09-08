from fastapi import APIRouter, Cookie
from fastapi import requests
from typing import Optional
from fastapi.requests import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.auth import web_auth_required, web_is_logged_in

router = APIRouter()

templates = Jinja2Templates(directory="./app/ui/user/templates")

@router.get("/", response_class=HTMLResponse)
async def admin(request: Request, token: Optional[str] = Cookie(None)):     

    return templates.TemplateResponse("landing_page.html", {"request":request, "home":"active"})


@router.get("/buy-used-car", response_class=HTMLResponse)
async def buy_car(request: Request, token: Optional[str] = Cookie(None) ):  
    
    return templates.TemplateResponse("buy_car.html", {"request":request, "buy_car":"active"})


@router.get("/buy-used-car/{car_name}/{id}", response_class=HTMLResponse)
async def buy_car(request: Request,token: Optional[str] = Cookie(None)):
    #print("Id:",id )
    return templates.TemplateResponse("individual_cars.html", {"request":request, "dashboard":"active"})

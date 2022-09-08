import functools
from fastapi import HTTPException
import jwt
import os
from fastapi.responses import RedirectResponse
import datetime
import configparser

config = configparser.ConfigParser()
config.read("app/config/config.ini")


def generate_access_token(data=None, payload=None):
    try:
        if payload:
            access_token_payload = payload
        else:
            access_token_payload = {
                "user_id": data["user_id"],
                "phone": data["phone"],
                "user_type": data["user_type"],
                "laour_type": data["user_type"],
                # need to be set 15 minutes
                "exp": datetime.datetime.utcnow()
                + datetime.timedelta(minutes=1 * 60 * 24 * 3),
                "iat": datetime.datetime.utcnow(),
            }

        access_token = jwt.encode(
            access_token_payload, config["Server"]["ACCESS_SECRET"], algorithm="HS256"
        )
        
        if type(access_token) == bytes:
            print("access-token",type(access_token))
            access_token = access_token.decode()
        
        print(type(access_token))
        return access_token
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


def generate_refresh_token(data=None, remember_me=False, payload=None):
    try:
        if payload:
            refresh_token_payload = payload
        else:
            refresh_token_payload = {
                "user_id": data["user_id"],
                "phone": data["phone"],
                "user_type": data["user_type"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=3),
                "iat": datetime.datetime.utcnow(),
            }

        if remember_me:
            del refresh_token_payload["exp"]

        refresh_token = jwt.encode(
            refresh_token_payload, config["Server"]["REFRESH_SECRET"], algorithm="HS256"
        )
        
        if type(refresh_token) == bytes:
            #print("access-token",type(access_token))
            refresh_token = refresh_token.decode()

        return refresh_token
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=500, detail=str(e))


def verify_access_token(access):
    """This functon is used to verify the access token

    Args:
        access (str): access token

    Raises:
        HTTPException: if the the access token is invalid

    Returns:
        [dict]: returns the payload
    """
    try:
        payload = jwt.decode(
            access, config["Server"]["ACCESS_SECRET"], algorithms=["HS256"]
        )
        return payload
    except Exception as e:
        if type(e) is HTTPException:
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=403, detail="Invalid Access Token")


def verify_refresh_token(access):
    """This functon is used to verify the access token

    Args:
        access (str): access token

    Raises:
        HTTPException: if the the access token is invalid

    Returns:
        [dict]: returns the payload
    """
    try:
        payload = jwt.decode(
            access, config["Server"]["REFRESH_SECRET"], algorithms=["HS256"]
        )
        return payload
    except Exception as e:
        if type(e) is HTTPException:            
            raise HTTPException(status_code=e.status_code, detail=str(e.detail))
        raise HTTPException(status_code=403, detail="Invalid Refresh Token")


def auth_required(allow: list = []):
    """This acts as middleware, allows only a specific type of user.

    Args:
        allow (list, optional): Defaults to [].
    """

    def auth_wrapper(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                token = verify_access_token(kwargs["token"].credentials)
                del kwargs["token"]
                if len(allow):
                    if token["user_type"] not in allow:
                        raise HTTPException(
                            status_code=403,
                            detail="Not have access rights to the content.",
                        )
                return await func(token=token, *args, **kwargs)
            except Exception as e:
                if type(e) is HTTPException:
                    raise HTTPException(status_code=e.status_code, detail=str(e.detail))
                raise HTTPException(status_code=500, detail=str(e))

        return wrapper

    return auth_wrapper


def admin_auth_required(permissions: list = []):
    """This acts as middleware, allows only a specific type of admin.

    Args:
        allow (list, optional): Defaults to [].
    """

    def auth_wrapper(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                token = verify_access_token(kwargs["token"].credentials)
                del kwargs["token"]
                if not token["is_super_admin"]:
                    if len(permissions):
                        for i in permissions:
                            if i not in token["permissions"]:
                                raise HTTPException(
                                    status_code=403,
                                    detail="Not have access rights to the content.",
                                )
                return await func(token=token, *args, **kwargs)
            except Exception as e:
                if type(e) is HTTPException:
                    raise HTTPException(status_code=e.status_code, detail=str(e.detail))
                raise HTTPException(status_code=500, detail=str(e))

        return wrapper

    return auth_wrapper


def web_auth_required(permissions: list = []):
    """This acts as middleware, allows only a specific type of admin.

    Args:
        allow (list, optional): Defaults to [].
    """

    def auth_wrapper(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                token = verify_refresh_token(kwargs["token"])
                del kwargs["token"]                
                return await func(token=token, *args, **kwargs)
            except Exception as e:
                print(e)
                return RedirectResponse(str(kwargs["request"].base_url) + "admin/signin/")
                if type(e) is HTTPException:
                    raise HTTPException(status_code=e.status_code, detail=str(e.detail))
                raise HTTPException(status_code=500, detail=str(e))

        return wrapper

    return auth_wrapper


def web_is_logged_in(permissions: list = []):
    """This acts as middleware, allows only a specific type of admin.
    Args:
        allow (list, optional): Defaults to [].
    """

    def auth_wrapper(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                if kwargs["token"] not in [None, "None"]:                    
                    token = verify_refresh_token(kwargs["token"])                    
                    return RedirectResponse(str(kwargs["request"].base_url) + "admin/")
                else:                
                    return await func(*args, **kwargs)
            except Exception as e:   
                return await func(*args, **kwargs)
                # return RedirectResponse(str(kwargs["request"].base_url) + "admin/signin/" )
                if type(e) is HTTPException:
                    raise HTTPException(status_code=e.status_code, detail=str(e.detail))
                raise HTTPException(status_code=500, detail=str(e))

        return wrapper

    return auth_wrapper

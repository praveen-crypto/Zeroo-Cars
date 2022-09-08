from fastapi import Form
from fastapi.responses import JSONResponse
import bcrypt


def response_format(
    message="ok",
    code=200,
    ok=True,
    data=None,
    cookies={},
    secure=False,
    httponly=False,
    **others
):
    """This function is used to format the response which is sent back to the client

    Args:
        message (str, optional): [Contains the error message]. Defaults to "ok".
        code (int, optional): [Status code]. Defaults to 200.
        ok (bool, optional): [Defines api success]. Defaults to True.
        data ([any], optional): [Contains the data]. Defaults to None.

    Returns:
        [JSONResponse]: [returns a JSONResponse with the following parameters: (message,code,ok,data,**others)]
    """
    response = JSONResponse(
        content = {
            "message": message,
            "code": code,
            "ok": ok,
            "data": data,
            **others,
        },
        status_code=code,
    )
    if cookies:
        for key in cookies:
            response.set_cookie(
                key=key, value=cookies[key], httponly=httponly, secure=secure
            )
    return response


def password_hash(password: str = Form(...)):
    """This fnction is used to hash the password

    Args:
        password (str, optional): [contains the password]. Defaults to Form(...).

    Returns:
        [str]: bcrypt hashed value
    """
    salt = bcrypt.gensalt(14)
    password_hashed = bcrypt.hashpw(password.encode(), salt)
    return password_hashed.decode()

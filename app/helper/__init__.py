import os
import inspect
from datetime import datetime
import pytz

from app.constants import IST


def open_file(location, file_name, folder="/query/"):
    """This fuction is used to open the file location the querry file

    Args:
        location : instance of the current file (inspect.currentframe())
        file_name (str): name of the file.
        folder (str, optional): folder location, by default it's /query/

    Returns:
        [str]: returns the value present in the file
    """
    data = open(
        str(os.path.dirname(inspect.getfile(location))).replace("\\", "/")
        + folder
        + file_name,
        "r",
    ).read()
    
    return data


def IST_date():
    ist = pytz.timezone(IST)
    date_time = datetime.now(ist)
    data = {
        "date": date_time.strftime("%d/%m/%Y"),
        "time": date_time.strftime("%H:%M:%S"),
        "original": str(date_time),
        "time_am_pm": date_time.strftime("%I:%M %p"),
    }
    return data

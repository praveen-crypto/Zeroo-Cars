#### RegEx ####

DATE_VALIDATION = """(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"""

AADHAR_VALIDATION = """^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$"""

PHONE_VALIDATION = """^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$"""  # only Indian mobile numbers

PINCODE_VALIDATION = """^[1-9][0-9]{5}$"""

GENDER_VALIDATION = """^male$|^female$|^other$"""

#### Identifier ####

USER_TYPE = "user_type"

PROFILE_IMAGE = "{0}api/v1/image/profile/{1}/"

PROFILE_IMAGE2 = "api/v1/image/profile/"

IST = "Asia/Kolkata"

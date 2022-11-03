from fastapi import Form, HTTPException
import datetime
import bcrypt
import jwt
import os
import configparser

from app.constants import PHONE_VALIDATION
from . import execute_query
from app.auth import generate_access_token, generate_refresh_token

config = configparser.ConfigParser()
config.read("app/config/config.ini")

async def template(data, query, func="template"):
  try:
      result = await eval("execute_query.{}(data,query)".format(func))
      return result
  except Exception as e:
      if type(e) is HTTPException:
          raise HTTPException(status_code=e.status_code, detail=str(e.detail))
      raise HTTPException(status_code=500, detail=str(e))

CARS_DATA = [
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/abarth.png",
    "name": "Abarth"
  },  
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/ariel.png",
    "name": "Ariel"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/arrinera-logo.png",
    "name": "Arrinera"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/aston_martin.png",
    "name": "Aston Martin"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/audi.png",
    "name": "Audi"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/bentley.png",
    "name": "Bentley"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/bmw.png",
    "name": "BMW"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/bugatti.png",
    "name": "Bugatti"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/buick.png",
    "name": "Buick"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/caterham.png",
    "name": "Caterham"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/chevrolet.png",
    "name": "Chevrolet"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/chrysler.png",
    "name": "Chrysler"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/citroen.png",
    "name": "Citroën"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/corvette.png",
    "name": "Corvette"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/dacia.png",
    "name": "Dacia"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/daf.png",
    "name": "Daf"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/daihat.png",
    "name": "Daihatsu"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/dodge.png",
    "name": "Dodge"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/drmotor.png",
    "name": "DR Motor"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/elfin.png",
    "name": "Elfin"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/ferrari.png",
    "name": "Ferrari"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/fiat.png",
    "name": "Fiat"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/ford.png",
    "name": "Ford"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/gaz.png",
    "name": "Gaz"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/geely.png",
    "name": "Geely"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/gillet.png",
    "name": "Gillet"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/ginetta.png",
    "name": "Ginetta"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/gm.png",
    "name": "General Motors"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/gmc.png",
    "name": "GMC"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2013/10/Great-Wall.png",
    "name": "Great Wall"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/gumpert.png",
    "name": "Gumpert"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/hennessey.png",
    "name": "Hennessey logo"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/holden.png",
    "name": "Holden"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/honda.png",
    "name": "Honda"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/hummer.png",
    "name": "Hummer"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/hyundai.png",
    "name": "Hyundai"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/inf.png",
    "name": "Infiniti"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/isuzu.png",
    "name": "Isuzu"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/jagu.png",
    "name": "Jaguar"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/jeep.png",
    "name": "Jeep"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/joss.png",
    "name": "Joss"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/kia.png",
    "name": "Kia"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/koenigsegg.png",
    "name": "Koenigsegg"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/lada.png",
    "name": "Lada"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/lamb.png",
    "name": "Lamborghini"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/lancia.png",
    "name": "Lancia"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/land-rover.png",
    "name": "Land Rover"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/lexus.png",
    "name": "Lexus"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/linc.png",
    "name": "Lincoln"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/lotus.png",
    "name": "Lotus"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/luxgen-logo.png",
    "name": "Luxgen"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mahindra.png",
    "name": "Mahindra"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/Maruti_Suzuki.png",
    "name": "Maruti Suzuki"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mase.png",
    "name": "Maserati"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/maybach.png",
    "name": "Maybach"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mazda.png",
    "name": "Mazda"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mclaren.png",
    "name": "Mclaren"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/marchedrs.png",
    "name": "Mercedes"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mg.png",
    "name": "MG"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mini.png",
    "name": "Mini"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mitub.png",
    "name": "Mitsubishi"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/morgan.png",
    "name": "Morgan Motor"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/mustang.png",
    "name": "Mustang logo"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/nissan.png",
    "name": "Nissan"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/noble.png",
    "name": "Noble"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/opel.png",
    "name": "Opel"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/pagani.png",
    "name": "Pagani"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/panoz.png",
    "name": "Panoz"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/perodua.png",
    "name": "Perodua"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/peug.png",
    "name": "Peugeot"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/piaggio.png",
    "name": "Piaggio"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/pininfarina.png",
    "name": "Pininfarina"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/porsche.png",
    "name": "Porsche"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/proton.png",
    "name": "Proton"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/renault.png",
    "name": "Renault"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/reva.png",
    "name": "Reva"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/skoda.png",
    "name": "Skoda"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/smart.png",
    "name": "Smart"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/subaru.png",
    "name": "Subaru"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/suzuki.png",
    "name": "Suzuki"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/tata.png",
    "name": "Tata"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/tatra.png",
    "name": "Tatra"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/tesla.png",
    "name": "Tesla"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/toyota.png",
    "name": "Toyota"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/vandenbrink_design.png",
    "name": "Vandenbrink"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/vauxhall.png",
    "name": "Vauxhall"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/vector_motors.png",
    "name": "Vector Motors"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/venturi.png",
    "name": "Venturi"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/volkswagen.png",
    "name": "Volkswagen"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/volvo.png",
    "name": "Volvo"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/wiesmann.png",
    "name": "Wiesmann"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/zagato.png",
    "name": "Zagato"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/zaz.png",
    "name": "Zaz"
  },
  {
    "logo": "https://www.car-logos.org/wp-content/uploads/2022/08/zil.png",
    "name": "Zil"
  }
]

FUEL_TYPE = [ 
  {'fuel_type':'Petrol'},
  {'fuel_type':'Diesel'},
  {'fuel_type':'CNG'}
]

import json
from urllib.request import urlretrieve

f = open("data.json")

data = json.load(f)

for i in data:
    print(i)
    urlretrieve(i["logo"], i["name"] + ".jpg")

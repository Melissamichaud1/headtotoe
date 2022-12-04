import django
import os
import sys
import time
import json
import requests

sys.path.append("/hats/api/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something
from hats_rest.models import LocationVO

def get_locations():
    url = "http://wardrobe-api:8000/api/locations/"
    response = requests.get(url)
    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            import_href=location["href"],
            defaults={"closet_name": location["closet_name"], "section_number": location["section_number"], "shelf_number": location["shelf_number"]},
        )
# It first makes a GET request to the wardrobe-api server to retrieve the list of locations.
# It then loops through the locations and creates a LocationVO object for each location.
# If the LocationVO object already exists, it updates the object with the new information.
# If the LocationVO object doesn’t exist, it creates a new object.


def poll():
    while True:
        print('Hats poller polling for data')
        try:
            # Write your polling logic, here
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()

# It starts by polling the database for the latest data.
# It then checks the data to see if it’s new.
# If the data is new, it sends it to the client.
# If the data is not new, it waits 60 seconds and polls again.

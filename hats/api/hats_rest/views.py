from django.http import JsonResponse
from django.shortcuts import render
from .models import Hat, LocationVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json

# Allows users to see the data

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name"]

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "url",
        "location",
    ]
    encoders = {
        "location": LocationVODetailEncoder()
    }



# Create your views here.
# Gets list of hats
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    """
    Lists the hat names and the link to the hat
    for the specified location id.

    Returns a dictionary with a single key "hat" which
    is a list of hat names and URLS. Each entry in the list
    is a dictionary that contains the name of the hat and
    the link to the hat's information.
    """
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        # Get the location object and put it in the content dict
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

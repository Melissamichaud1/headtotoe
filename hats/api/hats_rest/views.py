from django.http import JsonResponse
from django.shortcuts import render
from .models import Hat, LocationVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json

#

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]


#

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name", "fabric", "color", "url", "id", "location"]
    encoders = {
        "location": LocationVODetailEncoder()
    }


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
    # if request is GET -> gets all Hat objects from database
    # Returns JSON response containing list of hats
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    # Create hat
    else:
        # If request is POST -> loads the JSON data from the request body
        content = json.loads(request.body)

        # Get the location object and put it in the content dict
        try:
            # Gets location href from response content
            location_href = content["location"]
            # Location = LocationVO object that matches the location href
            # If JSON data contains location key AND finds LocationVO -> sets location key's value to LocationVO object
            location = LocationVO.objects.get(import_href=location_href)
            # Sets content location to location
            content["location"] = location
        except LocationVO.DoesNotExist:
            # If it doesn't find location key -> returns 404 Bad Request error
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        # If try was successful -> create hat
        # Import hat model
        # Create new hat object using the data
        # Return the new Hat object as a JSON response
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(['DELETE'])
def api_show_hats(reponse, pk):
    try:
        hat = Hat.objects.get(id=pk)
        hat.delete()
        return JsonResponse(
            {'message': 'Hat was deleted successfully'},
            safe = False,
        )
    except Hat.DoesNotExist:
        return JsonResponse({"message": 'The hat you are tring to delete does not exist'})

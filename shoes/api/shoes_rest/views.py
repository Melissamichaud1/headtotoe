from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoe, BinVO
# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size", "import_href"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name", "manufacturer", "color", "picture_url", "id", "bin"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            )
    else:
        content = json.loads(request.body)

        # Get the Conference object and put it in the content dict
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_show_shoes(reponse, id):
    try:
        shoe = Shoe.objects.get(id=id)
        shoe.delete()
        return JsonResponse(
            {'message': 'Shoe was deleted successfully'},
            safe = False,
        )
    except Shoe.DoesNotExist:
        return JsonResponse({"message": 'The shoe you are tring to delete does not exist'})

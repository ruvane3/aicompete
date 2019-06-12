from django.http import JsonResponse
from django.shortcuts import render_to_response


def is_my_turn(request):
    return JsonResponse({"your_turn": False})


def submit_action(request):
    return JsonResponse({"success": True})


def index(request):
    return render_to_response('index.html')

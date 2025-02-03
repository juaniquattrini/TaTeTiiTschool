from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import GameSession
import json

def tateti(request):
    return render(request, 'tateti.html')

def save_game(request):
    if request.method == 'POST':
        board = request.POST.get('board')
        winner = request.POST.get('winner')
        
        game = GameSession.objects.create(
            board=json.loads(board),
            winner=winner
        )
        return JsonResponse({'status': 'success', 'game_id': game.id})

def game_result(request, game_id):
    game = GameSession.objects.get(id=game_id)
    return render(request, 'game_result.html', {'game': game})
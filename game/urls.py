# game/urls.py
from django.urls import path
from . import views

urlpatterns = [
   path('tateti/', views.tateti, name='tateti'),
   path('save_game/', views.save_game, name='save_game'), 
   path('result/<int:game_id>/', views.game_result, name='game_result'),
]
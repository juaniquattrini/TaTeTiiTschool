from django import forms
from django.contrib.auth.models import User

class GameForm(forms.Form):
    opponent = forms.ModelChoiceField(
        queryset=User.objects.all(), 
        label="Selecciona oponente"
    )
    board = forms.JSONField(
        widget=forms.HiddenInput(),
        initial=[''] * 9
    )
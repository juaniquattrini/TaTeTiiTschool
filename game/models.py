from django.db import models

class GameSession(models.Model):
    board = models.JSONField()
    winner = models.CharField(max_length=1, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Game {self.id}: Winner {self.winner or 'None'}"
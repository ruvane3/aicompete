from django.db import models


class GameState(models.Model):
    game_id = models.CharField(max_length=50, primary_key=True)
    game_type = models.CharField(max_length=20)
    json_game_state = models.TextField()

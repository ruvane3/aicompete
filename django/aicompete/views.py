from django.http import JsonResponse
from django.shortcuts import render_to_response
from aicompete.models import GameState
import json


def encode_game_state(game_state):
    return json.dumps(game_state)


def decode_game_state(encoded):
    return json.loads(encoded)


def without_valid_moves(game_state):
    return {
        "current_player": game_state["current_player"],
        "board": game_state["board"]
    }


def create_new_match():
    game_id = "fakeid"
    game_type = "tictactoe"
    game_state = {
        "current_player": 1,
        "board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }

    x = GameState(game_id=game_id, game_type=game_type,
                  json_game_state=encode_game_state(game_state))
    x.save()


def is_my_turn(request):
    game_id = "fakeid"
    player = int("2")

    game = GameState.objects.all().filter(game_id=game_id).get()
    game_state = decode_game_state(game.json_game_state)

    if game_state["current_player"] != player:
        return JsonResponse({"your_turn": False})

    # get data
    valid_moves = get_valid_moves(game_state)
    game_state["valid_moves"] = valid_moves

    # update gamestate
    game.json_game_state = encode_game_state(game_state)
    game.save()

    return JsonResponse({"your_turn": True, "current_game_state": without_valid_moves(game_state), "valid_moves": valid_moves})


def submit_action(request):
    game_id = "fakeid"
    action = int("0")

    game = GameState.objects.all().filter(game_id=game_id).get()
    game_state = decode_game_state(game.json_game_state)

    new_game_state = make_action(game_state, game_state["valid_moves"][action])

    game.json_game_state = encode_game_state(new_game_state)
    game.save()

    return JsonResponse(new_game_state)


def index(request):
    return render_to_response('index.html')


def get_valid_moves(game_state):
    moves = []
    for r in range(3):
        for c in range(3):
            if game_state["board"][r][c] == 0:
                moves.append((r, c))
    return moves


def make_action(game_state, action):
    new_board = game_state["board"]
    new_board[action[0]][action[1]] = game_state["current_player"]
    return {
        "current_player": change_player(game_state["current_player"]),
        "board": new_board
    }


def change_player(cur):
    if cur == 1:
        return 2
    return 1

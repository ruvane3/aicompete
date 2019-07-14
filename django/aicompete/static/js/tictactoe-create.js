$(document).ready(function () {
	Object.keys(config).forEach(function(id) {
		validateFor(id);
	})
});

function validateFor(id) {
	$("#" + id).on('input', function() {
		val = $("#" + id).val();
		if(val === "") {
			config[id][0] = undefined;
			$("#" + id + "error").hide();
		}
		else if(!config[id][1](val)){
			config[id][0] = undefined;
			$("#" + id + "error").show();
		} else {
			config[id][0] = val;
			$("#" + id + "error").hide();
		}
	});
}

validateBotId = function (input) {
	var regex = /^[a-zA-Z0-9\.\-\_]*$/;
	return regex.test(input);
}

validateTimeout = function (time) {
	var onlyNums = /^[0-9]*$/
	var parsed = parseInt(time);
	return onlyNums.test(time) && !isNaN(parsed) && parsed > 0 && parsed <= 50000;
}

validateNumGames = function(time) {
	var onlyNums = /^[0-9]*$/
	var parsed = parseInt(time);
	return onlyNums.test(time) && !isNaN(parsed) && parsed > 0 && parsed <= 100;
}

var config = {
	"bot1id" : [undefined, validateBotId],
	"bot2id" : [undefined, validateBotId],
	"start-turn-max-time" : [undefined, validateTimeout],
	"turn-max-time" : [undefined, validateTimeout],
	"numgames" : [undefined, validateNumGames],
	"afk-strategy" : [undefined, (input) => true]
};


function test() {
	var bot1 = config["bot1id"][0];
	var bot2 = config["bot2id"][0];
	var startTimeout = config["start-turn-max-time"][0];
	var turnTimeout = config["turn-max-time"][0];
	var numGames = config["numgames"][0];
	var afkStrategy = config["afk-strategy"][0];
	if(bot1 !== bot2 && bot1 && bot2 && startTimeout && turnTimeout && numGames && afkStrategy){
		var request = '/api/create_game?gameType=tictactoe&bot1=' + bot1 + "&bot2=" + bot2 + "&startTimeout=" + startTimeout + "&turnTimeout=" + turnTimeout + "&numGames=" + numGames + "&afkStrategy=" + afkStrategy;
		$.ajax({
		    url: request,
		    datatype: 'json',
		    type: 'GET',
		    success: function(data) {
		    	drawBoard();
		        var board = data.board;

		        for(r = 0; r < 2; r++){
		        	for(c = 0; c < 2; c++){
		        		if(board[r][c] == 1){
		        			drawCircle(bX(r), bY(c));
		        		}
		        		if(board[r][c] == 2){
		        			drawX(bX(r), bY(c));
		        		}
		        	}
		        }
		    }
		});
	}
}
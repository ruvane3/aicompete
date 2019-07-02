var canvas;
var ctx;
var boardSize;
var margin = {
	left: undefined, // programatically set
	right: 30,
	top: 30,
	bottom: 30
};

function bX(x){
	return margin.left + x * (boardSize / 3);
}

function bY(y) {
	return margin.top + y * (boardSize / 3);
}

$(document).ready(function() {
	canvas = document.getElementById("board");
	canvas.width = $("#board-holder").width();
  	boardSize = (3/5) * canvas.width;
  	canvas.height = boardSize + margin.top + margin.bottom;
  	margin.left = canvas.width - boardSize - margin.right;
	ctx = canvas.getContext("2d");
	drawBoard();
	setInterval(refreshData, 1000);
});

function refreshData() {
	var gameId = 'fakeId';
	var request = '/api/game_info/tictactoe/' + gameId;
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

function drawBoard() {
   ctx.fillStyle = "#AEAEAE";
   ctx.fillRect(0,0,margin.left,canvas.height);

   ctx.fillStyle = "#BEBEBE";
   ctx.fillRect(bX(0),0,canvas.width - margin.left,canvas.height);

   ctx.lineWidth = 10;
   ctx.lineCap = 'round';
   ctx.strokeStyle = "#ddd";
   ctx.beginPath();

   for(var r = 1; r <= 2; r++) {
      lineYPos = bY(0) + r * (boardSize/3);
      ctx.moveTo(bX(0) + ctx.lineWidth, lineYPos);
      ctx.lineTo(canvas.width - margin.right, lineYPos);
   }

   for(var c = 1; c <= 2; c++) {
      lineXPos = bX(0) + c * (boardSize/3);
      ctx.moveTo(lineXPos + ctx.lineWidth, bY(0));
      ctx.lineTo(lineXPos + ctx.lineWidth, canvas.height - margin.bottom);
   }

   ctx.stroke();
}

function drawCircle(x, y) {
	var boxSize = boardSize / 3;
	var centerX = x + boxSize / 2;
	var centerY = y + boxSize / 2;
	var bigness = .65;

	ctx.lineWidth = 20;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.arc(centerX, centerY, (boxSize/2) * bigness, 0, 2 * Math.PI);
	ctx.stroke();
}

function drawX(x, y) {
	var boxSize = boardSize / 3;
	var bigness = .8;
	
	ctx.lineWidth = 20;
	ctx.strokeStyle = "#000";

	var offset = (boxSize - (bigness * boxSize)) / 2 + ctx.lineWidth;
	
	ctx.beginPath();
	ctx.moveTo(x + offset, y + offset);
	ctx.lineTo(x + boxSize - offset, y + boxSize - offset);
	
	ctx.moveTo(x + offset, y + boxSize - offset);
	ctx.lineTo(x + boxSize - offset, y + offset);
	
	ctx.stroke();
}

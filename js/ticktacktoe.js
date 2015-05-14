'use strict';

$(document).ready(function() {

  var winsX = 0;
  var winsO = 0;
  var winnerIs = false;
  var turnCount = 0;
  var board = [[null, null, null],
  [null, null, null],
  [null, null, null]];

  $('.box_cell').on("click", function(event){

    var rowIndexStr = this.dataset.row;
    var colIndexStr = this.dataset.col;

    var rowIndex = parseInt(rowIndexStr);
    var columnIndex = parseInt(colIndexStr);

    if(turnCount % 2 === 0 && ($(this).text() === "" && winnerIs === false)) {

      $(event.currentTarget).text("x");
      board[rowIndex][columnIndex] = 'x';
      turnCount++;
      var gameOver = checkForWinner();
      if(gameOver) {
        reSetBoard();
      }

    } else if (turnCount % 2 !== 0 && ($(this).text() === "" && winnerIs === false)) {

      $(event.currentTarget).text("o");
      board[rowIndex][columnIndex] = 'o';
      turnCount++;
      var gameOver = checkForWinner();
      if(gameOver) {
        reSetBoard();
      }
    }
  });

  var checkForWinnerX = function() {
    if (board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x' ||
      board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x' ||
      board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x' ||
      board[0][0] === 'x' && board[1][0] === 'x' && board[2][0] === 'x' ||
      board[0][1] === 'x' && board[1][1] === 'x' && board[1][2] === 'x' ||
      board[0][2] === 'x' && board[1][2] === 'x' && board[2][2] === 'x' ||
      board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x' ||
      board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x') {
      winsX++;
    $("#winsForX").text(winsX);
    console.log("winner is X!");
    return true;
  }
};

var checkForWinnerO = function() {
  if (board[0][0] === 'o' && board[0][1] === 'o' && board[0][2] === 'o' ||
    board[1][0] === 'o' && board[1][1] === 'o' && board[1][2] === 'o' ||
    board[2][0] === 'o' && board[2][1] === 'o' && board[2][2] === 'o' ||
    board[0][0] === 'o' && board[1][0] === 'o' && board[2][0] === 'o' ||
    board[0][1] === 'o' && board[1][1] === 'o' && board[1][2] === 'o' ||
    board[0][2] === 'o' && board[1][2] === 'o' && board[2][2] === 'o' ||
    board[0][0] === 'o' && board[1][1] === 'o' && board[2][2] === 'o' ||
    board[0][2] === 'o' && board[1][1] === 'o' && board[2][0] === 'o') {
    winsO++;
  $("#winsForO").text(winsO);
  console.log("winner is O!");
  return true;
}
};

function checkForWinner() {
  if (checkForWinnerX() === true) {
    $(".box_cell").empty();
    turnCount = 0;
    alert("winner is X!");
    return true;

  }
  else if (checkForWinnerO() === true) {
    $(".box_cell").empty();
    turnCount = 0;
    alert("winner is O!");
    return true;
  }
  else {
    console.log(turnCount);
    return false;
  }
};
function reSetBoard() {
  board = [[null, null, null],
  [null, null, null],
  [null, null, null]];

};
$("#wins").on("click", function(){
  winsX = 0;
  winsO = 0;
  $("#winsForX").html("");
  $("#winsForO").html("");
});

var myDataRef;

$(function(){
  myDataRef = new Firebase('https://ajhogue6-chat-example.firebaseio.com/chat');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });
  var displayChatMessage = function(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
 });
});

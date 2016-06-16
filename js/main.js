/*! Tic Tac Toe Game v1.0.0 | (c) 2016 Cirych. | ki-tec.ru
*/
'use strict';


window.onload = function() {
    init();
    game();
    
    document
        .getElementById('newGame')
        .addEventListener('click', function (event) {
            reset(boardImg);
        });
  };
/*
document
    .getElementById('boardImg')
    .addEventListener('load', function() {
        game();
    });
*/

var config = {
    playerChoice: "o",
    computerChoice: "x",
}

function init() {
    config.boardImg = document
        .getElementById('boardImg')
        .contentDocument;

    config.fields = config.boardImg
        .getElementById('fields');

    config.xselected = document
        .getElementById('xselected');

    config.oselected = document
        .getElementById('oselected');
}

function game() {
    config.state = 0;
    config.board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    function clickedSelection(event) {
        config.playerChoice = event.srcElement.id.charAt(0);
        config.computerChoice = (config.playerChoice=="o")?"x":"o";
        
        config.xselected
            .removeEventListener('click', clickedSelection);
        
        config.oselected
            .removeEventListener('click', clickedSelection);
        
        config.fields
            .addEventListener('click', clickedField);
        
        computerFirst();
    };

    function clickedField(event) {
        human(event.srcElement.id.slice(1));
    }
    
    config.xselected
        .addEventListener('click', clickedSelection);

    config.oselected
        .addEventListener('click', clickedSelection);

};

function computerFirst() {
    config.board[1][1] = 1;
    showMove(config.computerChoice, 11);
    config.state = 2;
};

function computer() {
    minimax(0, 1);
    placeMove(config.computersMove[0], config.computersMove[1], 1);
    showMove(config.computerChoice, config.computersMove[0].toString() + config.computersMove[1].toString());
    if (won(1)) {final(1); return;};
    if(!freeFields()) {final(0); return;};
};

function human(choice) {
    if(config.state!=2) return;
    var row = choice.charAt(0), col = choice.charAt(1);
    if(!config.board[row][col]) {
        placeMove(row, col, 2)
        showMove(config.playerChoice, choice);
        if (won(2)) {final(2); return;};
        if(!freeFields()) {final(0); return;};
        computer();
    }
};
// the end
function final(result) {
    config.state=0;
    console.log(result);
}

function placeMove(row, col, player) {
    config.board[row][col] = player;
}

function showMove(type, index) {
    config.boardImg
        .getElementById(type + index)
        .classList.add('showMove');
};

function minimax(depth, turn) {
    if(won(1)) return +1;
    if(won(2)) return -1;

    var freefields = freeFields();
    if(!freefields) return 0;

    var min = 100, max = -100;
    
    loop:
    for(var row = 0; row<3; row++) {
        for(var col = 0; col<3; col++) {
            if(!config.board[row][col]) {
                if(turn == 1) {
                    placeMove(row, col, 1);
                    var currentScore = minimax(depth + 1, 2);
                    max = Math.max(currentScore, max);

                    if(currentScore >= 0){ if(depth == 0) config.computersMove = [row, col];}
                    if(currentScore == 1){placeMove(row, col, 0); break loop;}
                    if(col+row == freefields-1 && max < 0){if(depth == 0)config.computersMove = [row, col];}
                } else if (turn == 2) {
                    placeMove(row, col, 2);
                    var currentScore = minimax(depth + 1, 1);
                    min = Math.min(currentScore, min);
                    if(min == -1){placeMove(row, col, 0); break loop;}
                }
                placeMove(row, col, 0);
            }
        }
    }

    return turn == 1?max:min;
}

function freeFields() {
    var counter = 0;
    for(var row = 0; row<3; row++)
        for(var col = 0; col<3; col++)
            if(!config.board[row][col])
                counter++;
    return counter;
}

function won(player) {
    if((config.board[0][0] == config.board[1][1] &&
        config.board[0][0] == config.board[2][2] &&
        config.board[0][0] == player) ||
       (config.board[0][2] == config.board[1][1] &&
        config.board[0][2] == config.board[2][0] &&
        config.board[0][2] == player)
    ) return true;

    for(var i = 0; i<3; i++)
        if((config.board[i][0] == config.board[i][1] &&
            config.board[i][0] == config.board[i][2] &&
            config.board[i][0] == player) ||
           (config.board[0][i] == config.board[1][i] &&
            config.board[0][i] == config.board[2][i] &&
            config.board[0][i] == player)
        ) return true;

    return false;
}

function reset() {
    Array.prototype.slice.call(
        config.boardImg
        .getElementById('tictacs')
        .children
    ).concat(
    Array.prototype.slice.call(
        config.boardImg
        .getElementById('wins')
        .children
    ))
        .forEach(function (item) {
            item.classList.remove('showMove');
        });
        

    game();
};
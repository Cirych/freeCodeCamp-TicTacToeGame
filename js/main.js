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
    timer: null
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
    config.state = false;
    config.board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    function clickedSelection(event) {
        config.playerChoice = event.srcElement.id.charAt(0);
        config.computerChoice = (config.playerChoice=="o")?"x":"o";

        config[config.playerChoice+'selected']
            .classList.add('userSelected');
        
        config.xselected
            .removeEventListener('click', clickedSelection);
        
        config.oselected
            .removeEventListener('click', clickedSelection);
        
        config.fields
            .addEventListener('click', clickedField);

        document
            .getElementById("newGame")
            .style
            .visibility = 'visible';
        
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
    config.state = true;
};

function computer() {
    minimax(0, 1);
    placeMove(config.computersMove[0], config.computersMove[1], 1);
    showMove(config.computerChoice, config.computersMove[0].toString() + config.computersMove[1].toString());
    var won = win(1);
    if (won) {final(1, won); return;};
    if(!freeFields()) {final(0); return;};
};

function human(choice) {
    if(!config.state) return;
    var row = choice.charAt(0), col = choice.charAt(1);
    if(!config.board[row][col]) {
        placeMove(row, col, 2)
        showMove(config.playerChoice, choice);
        var won = win(2);
        if (won) {final(2, won); return;};
        if(!freeFields()) {final(0); return;};
        computer();
    }
};
// the end
function final(result, won) {
    config.state = false;
    if(won) {
        showWon(won);
    }
    document
        .getElementById('finalWinner')
        .innerText = !result?"It's a draw": result==1?"Computer won!":"You won!";

    config.timer = setTimeout(reset, 5000);
}

function placeMove(row, col, player) {
    config.board[row][col] = player;
}

function showMove(type, index) {
    config.boardImg
        .getElementById(type + index)
        .classList.add('showMove');
};

function showWon(index) {
    config.boardImg
        .getElementById(index)
        .classList.add('showWon');
};

function minimax(depth, turn) {
    if(win(1)) return +1;
    if(win(2)) return -1;

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

function won1(player) {
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

function win(player) {
    if( config.board[0][0] == config.board[1][1] &&
        config.board[0][0] == config.board[2][2] &&
        config.board[0][0] == player) return "d0022";
    if( config.board[0][2] == config.board[1][1] &&
        config.board[0][2] == config.board[2][0] &&
        config.board[0][2] == player) return "d0220";

    for(var i = 0; i<3; i++) {
        if( config.board[i][0] == config.board[i][1] &&
            config.board[i][0] == config.board[i][2] &&
            config.board[i][0] == player) return "h"+i;
        if( config.board[0][i] == config.board[1][i] &&
            config.board[0][i] == config.board[2][i] &&
            config.board[0][i] == player) return "v"+i;
    }

    return false;
}

function reset() {
    if (config.timer) {
        clearTimeout(config.timer);
        config.timer = null;
    }
    Array.prototype.slice.call(
        config.boardImg
        .getElementById('tictacs')
        .children
    ).forEach(function (item) {
            item.classList.remove('showMove');
        });
    Array.prototype.slice.call(
        config.boardImg
        .getElementById('wins')
        .children
    ).forEach(function (item) {
            item.classList.remove('showWon');
        });

    config[config.playerChoice+'selected']
            .classList.remove('userSelected');

    document
        .getElementById('finalWinner')
        .innerText = "";

    document
            .getElementById("newGame")
            .style
            .visibility = 'hidden';
        
    game();
};
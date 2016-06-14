/*! Tic Tac Toe Game v1.0.0 | (c) 2016 Cirych. | ki-tec.ru
*/
'use strict';



function isReady(f){/in/.test(document.readyState)?setTimeout('isReady('+f+')',9):f()};

isReady(function(){
    // svg elements
    var boardImg = document
        .getElementById('boardImg')
        .contentDocument

    // hidden buttons event listener
    boardImg
        .getElementById('fields')
        .addEventListener('click', function (event) {
            console.log(event.srcElement.id.slice(1));
            showMove(boardImg, "x", event.srcElement.id.slice(1))
        });

    // new game event listener
    document
        .getElementById('newGame')
        .addEventListener('click', function (event) {
            reset(boardImg);
        });

});

function showMove(boardImg, type, index) {
    boardImg
        .getElementById(type + index)
        .classList.add('showMove');
};

function reset(boardImg) {
    Array.prototype.slice.call(
        boardImg
        .getElementById('tictacs')
        .children
    ).concat(
    Array.prototype.slice.call(
        boardImg
        .getElementById('wins')
        .children
    ))
        .forEach(function (item) {
            item.classList.remove('showMove');
        });
};
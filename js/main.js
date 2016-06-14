/*! Tic Tac Toe Game v1.0.0 | (c) 2016 Cirych. | ki-tec.ru
*/
'use strict';

function isReady(f){/in/.test(document.readyState)?setTimeout('isReady('+f+')',9):f()};

isReady(function(){
    document
        .getElementById("boardImg")
        .contentDocument
        .getElementById("fields")
        .addEventListener('click', function (event) {
            console.log(event.srcElement.id);
        });
});
const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

/* create a board */

// shuffle the board
function shuffle(arr) {
    for(var i = arr.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

let board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
shuffle(board);

/* add squares to the board */

let coords;
for(i = 0; i < 15; i++) {
    coords = String(parseInt(i/4)) + String(i%4);
    c('.board').innerHTML += `
    <div class='square-area' id='sq-area${coords}'>
        <div class='square' id='sq${coords}' draggable='true'>${board[parseInt(coords[0])*4+parseInt(coords[1])]}</div>
    </div>`;
}
c('.board').innerHTML += `<div class='square-area' id='sq-area33'> <div class='square void'></div> </div>`;

/* drag */

const square = cs('.square');
let draggable, startPosition;

for(i = 0; i < square.length; i++) {
    square[i].addEventListener('dragstart', dragstart);
}

function dragstart(e) {
    draggable = e.target;
    startPosition = draggable.parentElement.id;
    setTimeout(() => {
        draggable.classList.add('hide');
    }, 10);
}

/* drop */

// return to square of origin
function block(e) {
    c('#'+startPosition).appendChild(c('#'+e));
}

square.forEach(square => {
    square.addEventListener('dragenter', dragEnter);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

let parent, draggableCoords, targetCoords, distance;
function drop(e) {
    e.target.classList.remove('drag-over');

    draggableCoords = draggable.parentElement.id.slice(7);
    targetCoords = e.target.parentElement.id.slice(7);
    distance = Math.abs(+draggableCoords-targetCoords);
    // console.log(distance)

    if(e.target.classList.contains('void') && (distance == 1 || distance == 10)) {
        parent = c('#'+draggable.id).parentElement;
        e.target.parentElement.appendChild(c('#'+draggable.id));
        parent.appendChild(e.target);
    }

    draggable.classList.remove('hide');
}

/* block move if piece drops out of the board */

c('body').addEventListener('dragenter', bodyDragEnter);
c('body').addEventListener('dragover', bodyDragOver);
c('body').addEventListener('drop', bodyDrop);

function bodyDragEnter(e) {
    e.preventDefault();
}

function bodyDragOver(e) {
    e.preventDefault();
}

function bodyDrop(e) {
    if(e.target.classList[0] != 'square') {
        c('#'+startPosition).appendChild(draggable);
        draggable.classList.remove('hide');
    }
}
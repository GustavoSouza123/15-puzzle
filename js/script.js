const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

/* add squares ot the board */
for(var i = 0; i < 15; i++) {
    c('.board').innerHTML += `
    <div class='square-area' id='sq-area${i+1}'>
        <div class='square' id='sq${i+1}' draggable='true'>${i+1}</div>
    </div>`;
}
c('.board').innerHTML += `<div class='square-area'> <div class='square void'></div> </div>`;

/* drag and drop */
const square = cs('.square');
let startPosition;

// drag
for(i = 0; i < square.length; i++) {
    square[i].addEventListener('dragstart', dragstart);
}

function dragstart(e) {
    e.dataTransfer.setData('text', e.target.id);
    startPosition = e.target.parentElement.id;
    console.log(startPosition)
    /*setTimeout(() => {
        e.target.classList.add('hide');
    }, 10);*/
}

// drop
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
    // block()
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

let data, parent;
function drop(e) {
    e.target.classList.remove('drag-over');
    data = e.dataTransfer.getData('text');
    if(e.target.classList.contains('void')) {
        parent = c('#'+data).parentElement;
        e.target.parentElement.appendChild(c('#'+data));
        parent.appendChild(e.target);
    } else {
        // block()
    }
}
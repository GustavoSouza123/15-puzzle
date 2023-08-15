const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

for(var i = 0; i < 16; i++) {
    c('.board').innerHTML += `<div class='square'></div>`;
    if(i != 15) {
        cs('.board .square')[i].innerHTML = i+1;
    }
}
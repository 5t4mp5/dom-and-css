const colors = ['red', 'green', 'blue'];
const squareList = document.querySelectorAll('.squares');
const showAll = document.querySelector('#showAll');
const hideAll = document.querySelector('#hideAll');

function switchDisplayAll(display){
    const opposite = {none: '', '': 'none'};
    squareList.forEach(square => square.style.display = display);
    hideAll.style.display = display;
    showAll.style.display = opposite[display];
}

colors.forEach((color, idx) => {
    squareList[idx].setAttribute('style', `background-color: ${color}`);
    squareList[idx].setAttribute('id', color);
});

hideAll.addEventListener('click', function(){
    switchDisplayAll('none');
});

showAll.addEventListener('click', function(){
    switchDisplayAll('');
});
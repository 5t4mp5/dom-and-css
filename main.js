const colors = ['red', 'green', 'blue'];
const squareList = [...document.querySelectorAll('.squares')];
const showAll = document.querySelector('#showAll');
const hideAll = document.querySelector('#hideAll');
const switchRed = document.querySelector('#switchRed');
const switchGreen = document.querySelector('#switchGreen');
const switchBlue = document.querySelector('#switchBlue');

function switchDisplayAll(display){
    const opposite = {none: '', '': 'none'};
    hideAll.style.display = display;
    showAll.style.display = opposite[display];

    switchDisplayOne('red', switchRed);
    switchDisplayOne('blue', switchBlue);
    switchDisplayOne('green', switchGreen);
}

function switchDisplayOne(color, button){
    const square = squareList.find(square => square.getAttribute('id') === color);
    
    if (button.getAttribute('switch') === 'off'){
        square.style.display = 'none';
        button.setAttribute('switch', 'on');
        button.innerHTML = `SHOW ${color.toUpperCase()}`;
    }else{
        console.log('else');
        square.style.display = '';
        button.setAttribute('switch', 'off');
        button.innerHTML = `HIDE ${color.toUpperCase()}`;
    }

    if (squareList.every(square => square.style.display === 'none')){
        showAll.style.display = '';
        hideAll.style.display = 'none';
    }else if(squareList.every(square => square.style.display === '')){
        showAll.style.display = 'none';
        hideAll.style.display = '';
    }
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

switchRed.addEventListener('click', function(){
    switchDisplayOne('red', this);
});

switchGreen.addEventListener('click', function(){
    switchDisplayOne('green', this);
});

switchBlue.addEventListener('click', function(){
    switchDisplayOne('blue', this);
});
//TODO DRY OUT CLEAN UP REFACTOR

const colors = ['red', 'green', 'blue', 'pink', 'orange', 'yellow', 'purple', 'black'];
colors.forEach(color => {
    const square = document.createElement('div');
    square.setAttribute('class', 'squares');
    document.querySelector('#squares').appendChild(square);
});

const squareList = [...document.querySelectorAll('.squares')];

const showAll = document.createElement('button');
showAll.innerHTML = 'SHOW ALL';
showAll.setAttribute('class', 'buttons');
showAll.setAttribute('id', 'showAll');
showAll.style.display = 'none';
document.querySelector('#buttons').appendChild(showAll);

const hideAll = document.createElement('button');
hideAll.innerHTML = 'HIDE ALL';
hideAll.setAttribute('class', 'buttons');
hideAll.setAttribute('id', 'hideAll');
document.querySelector('#buttons').appendChild(hideAll);

colors.forEach((color, idx) => {
    squareList[idx].setAttribute('style', `background-color: ${color}`);
    squareList[idx].setAttribute('id', color);
    const newDiv = document.createElement('div');
    document.querySelector('#colorButtons').appendChild(newDiv);
    const button = document.createElement('button');
    button.id = `${color}Switch`;
    button.setAttribute('class', 'colorButtons');
    button.setAttribute('switch', 'off');
    button.innerHTML = `HIDE ${color.toUpperCase()}`;
    button.addEventListener('click', function(){
        switchDisplayOne(color, this);
    });
    newDiv.appendChild(button);
});


const colorButtons = [...document.querySelectorAll('.colorButtons')];
console.log(colorButtons);

function switchDisplayAll(display){
    const opposite = {none: '', '': 'none'};
    hideAll.style.display = display;
    showAll.style.display = opposite[display];

    colors.forEach(color =>{
        const status = display === '' ? 'on' : 'off';
        const button = colorButtons.find(button => button.id === `${color}Switch`);
        switchDisplayOne(color, button, status);
    });
}

function switchDisplayOne(color, button, forceStatus){
    const square = squareList.find(square => square.getAttribute('id') === color);
    if(forceStatus === 'on'){
        square.style.display = '';
        button.setAttribute('switch', 'off');
        button.innerHTML = `HIDE ${color.toUpperCase()}`;
    }else if(forceStatus === 'off'){
        square.style.display = 'none';
        button.setAttribute('switch', 'on');
        button.innerHTML = `SHOW ${color.toUpperCase()}`;
    }else{
        if (button.getAttribute('switch') === 'off'){
            square.style.display = 'none';
            button.setAttribute('switch', 'on');
            button.innerHTML = `SHOW ${color.toUpperCase()}`;
        }else{
            square.style.display = '';
            button.setAttribute('switch', 'off');
            button.innerHTML = `HIDE ${color.toUpperCase()}`;
        }
    }

    if (squareList.every(square => square.style.display === 'none')){
        showAll.style.display = '';
        hideAll.style.display = 'none';
    }else if(squareList.every(square => square.style.display === '')){
        showAll.style.display = 'none';
        hideAll.style.display = '';
    }else if(squareList.some(square => square.style.display === '')){
        showAll.style.display = '';
        hideAll.style.display = '';
    };
}

hideAll.addEventListener('click', function(){
    switchDisplayAll('none');
});

showAll.addEventListener('click', function(){
    switchDisplayAll('');
});
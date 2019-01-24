//add title to header
const title = 'SQUARES';
const pageTitle = document.createElement('title');
pageTitle.innerHTML = title;
document.querySelector('head').appendChild(pageTitle);


//set up containers and basic style elements
const masterContainer = document.createElement('p');
document.querySelector('body').appendChild(masterContainer);
const squareContainer = document.createElement('div');
masterContainer.appendChild(squareContainer);
const mainButtonContainer = document.createElement('div');
masterContainer.appendChild(mainButtonContainer);
const colorButtonContainer = document.createElement('div');
masterContainer.appendChild(colorButtonContainer);

squareContainer.setAttribute('id', 'squares');
squareContainer.setAttribute('style', 'text-align: center; height: 200px');
document.querySelector('body').appendChild(squareContainer);


mainButtonContainer.setAttribute('id', 'buttons');
mainButtonContainer.setAttribute('style', 'text-align: center;');
document.querySelector('body').appendChild(mainButtonContainer);


colorButtonContainer.setAttribute('id', 'colorButtons');
colorButtonContainer.setAttribute('style', 'text-align: center; width: 100%;');
document.querySelector('body').appendChild(colorButtonContainer);

//html element setup
const colors = ['red', 'green', 'blue', 'pink', 'yellow'];

colors.forEach((color) => {
    createSquare(color);
    createColorButton(color);
});

const showAll = createMainButton('SHOW ALL', 'showAll', 'none');
const hideAll = createMainButton('HIDE ALL', 'hideAll', '');

hideAll.addEventListener('click', function(){
    switchDisplayAll('none');
});

showAll.addEventListener('click', function(){
    switchDisplayAll('');
});

const squareList = [...document.querySelectorAll('.squares')];
const colorButtons = [...document.querySelectorAll('.colorButtons')];

//create functions
function createSquare(color){
    const square = document.createElement('div');
    square.setAttribute('class', 'squares');
    document.querySelector('#squares').appendChild(square);
    square.setAttribute('style', `background-color: ${color}; width: 150px; height: 150px;  border: solid 1px black; margin: 20px 20px; display: inline-block;`);
    square.setAttribute('id', color);
}

function createMainButton(text, id, display = ''){
    const button = buttonMaker('buttons', id, text);
    button.style.display = display;
    document.querySelector('#buttons').appendChild(button);
    return button;
}

function createColorButton(color){
    const newDiv = document.createElement('div');
    document.querySelector('#colorButtons').appendChild(newDiv);
    const button = buttonMaker('colorButtons', `${color}Switch`, `HIDE ${color.toUpperCase()}`);
    button.setAttribute('switch', 'off');
    button.addEventListener('click', function(){
        switchDisplayOne(color, this);
    });
    newDiv.appendChild(button);
    return button;
}

function buttonMaker(buttonClass, id, text){
    const button = document.createElement('button');
    button.setAttribute('id', id);
    button.setAttribute('class', buttonClass);
    button.setAttribute('style', 'width: 100%; height: 50px');
    button.innerHTML = text
    return button;
}

//Update Functions
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
        square.style.display = 'inline-block';
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
            square.style.display = 'inline-block';
            button.setAttribute('switch', 'off');
            button.innerHTML = `HIDE ${color.toUpperCase()}`;
        }
    }
    updateShowHideAll();
}

function updateShowHideAll(){
    if (squareList.every(square => square.style.display === 'none')){
        showAll.style.display = '';
        hideAll.style.display = 'none';
    }else if(squareList.every(square => square.style.display === 'inline-block')){
        showAll.style.display = 'none';
        hideAll.style.display = '';
    }else if(squareList.some(square => square.style.display === 'inline-block')){
        showAll.style.display = '';
        hideAll.style.display = '';
    }
}
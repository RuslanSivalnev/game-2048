let createAndAppend = function ({ className, parentElement, value }, tag = 'div') { 
    // хелпер функция для создания элементов.
    let element = document.createElement(tag);
    element.className = className;
    if (value) {
        element.innerHTML = value
    };
    if(parentElement){
    parentElement.appendChild(element);}

    return element;
}

let getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let fieldSize = parseInt(window.prompt("Size board?", 4),10); // задача размера поля

let game = new Game(document.body, fieldSize||4);
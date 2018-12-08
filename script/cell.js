let setCellSize = function(cellElement, size){ // хэлпер для динамической задачи размера cell
    cellElement.style.height = size +'vmin'
    cellElement.style.width = size +'vmin'
}

//создает поле,предоставит методы для установки значений и автоматически перересовутет их
class Cell {
    constructor(fieldElement, game) {
        this.game = game;  // для опции рейтинга
        this.fieldElement = fieldElement;
        this.element = createAndAppend({
            className: 'cell',
            parentElement: fieldElement
        });
        
        setCellSize(this.element, this.game.cellSize)

        if (Math.random() > 0.8) {
            this.spawn();
        }

        // this.element.onclick = this.merge.bind(this);  //выполняется не в контексте window  а в текущем.

    }

    get value() {
        return this._value || 0 //чтобы не было в пустых cell  NaN
    }

    set value(value) {
        this._value = value;
        this.element.innerHTML = value ? value : ''; //если ноль тогда пустая строка.
        this.element.setAttribute('data-ship', value); // для привязки css (картинки)
    }

    clear() {                    //очищает значени
        this.value = '';
    }

    merge(cell) {        // умножает  // передаем родительскому классу 'сигнал' о рейтинге
        if (this.value) {
            this.game.addRating(this.value + cell.value);
        }
        new AnimateCell(cell, this);

        this.value += cell.value; 
        this.highlight() // запускает анимацию
        cell.clear(); 
    }

    isSameTo(cell) {
        return this.value == cell.value;
    }

    spawn() {
        this.value = Math.random() > 0.5 ? 4 : 2;
    }

    get isEmpty() {
        return this.value == 0;
    }

    highlight() {
        this.element.className = 'cell highlight';
        setCellSize(this.element, this.game.cellSize + 2)
     

        let highlightTime = 200;
        let highlightStartTime = new Date();
        this.highlightStartTIme = highlightStartTime;

        setTimeout(() => {
            if (highlightStartTime == this.highlightStartTIme) {
                this.element.className = 'cell'
                setCellSize(this.element, this.game.cellSize)
            }
        }, highlightTime)
    }
}



class AnimateCell {
    constructor(fromCell, toCell) { // первая, вторая ячейка 
        this.element = createAndAppend({ className: 'cell animate' });
        setCellSize(this.element, fromCell.game.cellSize)   

        this.element.style.top = fromCell.element.offsetTop + 'px';
        this.element.style.left = fromCell.element.offsetLeft + 'px';

        fromCell.fieldElement.appendChild(this.element);

        this.element.style.top = toCell.element.offsetTop + 'px';
        this.element.style.left = toCell.element.offsetLeft + 'px';

        setTimeout(() => {
            fromCell.fieldElement.removeChild(this.element)
        }, 200)
    }
}









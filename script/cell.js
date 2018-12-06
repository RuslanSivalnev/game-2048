//создает поле,предоставит методы для установки значений и автоматически перересовутет их
class Cell {
    constructor(fieldElement, game) {
        this.game = game;  // для опции рейтинга
        this.element = createAndAppend({
            className: 'cell',
            parentElement: fieldElement
        });

        if (Math.random() > 0.8) {
            this.spawn();
        }

        // this.element.onclick = this.merge.bind(this);  //выполняется не в контексте window  а в текущем.

    }

    get value() {
        return this._value || 0 //что б небыло в пустых клетка NaN
    }

    set value(value) {
        this._value = value;
        this.element.innerHTML = value ? value : ''; //если ноль тогда пустая строка.
        this.element.setAttribute('data-ship', value);
    }

    clear() {                    //очищает значени
        this.value = '';
    }

    merge(cell) {        // умножает  // передаем родительскому классу 'сигнал' о рейтинге
        if(this.value){
            this.game.addRating(this.value + cell.value);
        } 
        this.value += cell.value;
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
}
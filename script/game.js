class Game {
    //генираци поля по разметке html

    constructor(parentElement, { size = 4 }) {
        let gameFieldElement = document.createElement('div');
        gameFieldElement.className ='game';
        parentElement.appendChild(gameFieldElement);

        let headerElement = document.createElement('div');
        headerElement.className = 'header';
        gameFieldElement.appendChild(headerElement);

        this.rating = 0;

        headerElement.innerHTML = `Rating: ${this.rating}`;

        //создание элемена с калссом field        
        let fieldElement = document.createElement('div');
        fieldElement.className = 'field';
        gameFieldElement.appendChild(fieldElement);

        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++){
                let cellElement = document.createElement('div');
                cellElement.className = 'cell';

                if(Math.random()>0.8){
                    cellElement.innerHTML = Math.random()>0.5 ? 4 : 2;

                }
                fieldElement.appendChild(cellElement);
            }
        }
    }
}

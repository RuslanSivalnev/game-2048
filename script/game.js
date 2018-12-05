
class Game {
    //генираци поля по разметке html

    constructor(parentElement, { size = 4 }) {
        this.size = size;
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });
        // let gameFieldElement = document.createElement('div');
        // gameFieldElement.className ='game';
        // parentElement.appendChild(gameFieldElement);
        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        })

        this.rating = 0;

        headerElement.innerHTML = `Rating: ${this.rating}`;

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        })

        this.field = [];

        for (let i = 0; i < size; i++) {
            this.field[i] = [];
            for (let k = 0; k < size; k++) {
                this.field[i][k] = new Cell(fieldElement);


            }
        }
        window.onkeyup = function(e){
            switch(e.keyCode){
                case 38: this.moveUp();
                    break;
                
                case 39: this.moveRight();
                    break;

                case 40: this.moveDown();
                    break;
                
                case 37: this.moveLeft();
                    break;
            }
        }.bind(this); 
        
    }

    spawnUnit() {
        let emptyCells = [];  // получаем массив пустых селов.

        for (let i = 0; i < this.field.length; i++) {
            for (let k = 0; k < this.field[i].length; k++) {
                if (!this.field[i][k].value) {
                    emptyCells.push(this.field[i][k])
                }
            }
        }
        //  по вызову метода добовлям 2 или 4 в рандомный сеел.
        if (emptyCells.length) {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
        } else alert('tou lose')
        
    }
    
    isLastKey(key) {
        return key == (this.size - 1);
    }
    isFirstKey(key) {
        return key == 0;
    }
   
    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let k = this.size - 2; k >= 0; k--) {
                let cuurentCell = this.field[i][k];
                if (cuurentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey))
                            || nextCell.isSameTo(cuurentCell)) {
                            this.field[i][nextCellKey].merge(cuurentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != k) {
                            this.field[i][nextCellKey - 1].merge(cuurentCell);
                            hasMoved = true;
                        }
                        break;
                    }

                    nextCellKey++;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
    

    moveLeft() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let k = 1; k < this.size; k++) {
                let cuurentCell = this.field[i][k];
                if (cuurentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k - 1;
                while (nextCellKey >= 0) {

                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey))
                            || nextCell.isSameTo(cuurentCell)) {
                            this.field[i][nextCellKey].merge(cuurentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != k) {
                            this.field[i][nextCellKey + 1].merge(cuurentCell);
                            hasMoved = true;
                        }
                        break;
                    }

                    nextCellKey--;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }

    moveDown() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = this.size - 2; i >= 0; i--) {
                let cuurentCell = this.field[i][k];
                if (cuurentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey))
                            || nextCell.isSameTo(cuurentCell)) {
                            this.field[nextCellKey][k].merge(cuurentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
                            this.field[nextCellKey - 1][k].merge(cuurentCell);
                            hasMoved = true;
                        }
                        break;
                    }

                    nextCellKey++;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }

    moveUp() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = 1; i < this.size; i++) {
                let cuurentCell = this.field[i][k];
                if (cuurentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i - 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey))
                            || nextCell.isSameTo(cuurentCell)) {
                            this.field[nextCellKey][k].merge(cuurentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
                            this.field[nextCellKey + 1][k].merge(cuurentCell);
                            hasMoved = true;
                        }
                        break;
                    }

                    nextCellKey--;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
}



















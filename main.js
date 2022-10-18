const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const chars = [fieldCharacter, fieldCharacter, fieldCharacter, hole];

class Field {
    constructor(field) {
        this.field = field;
        this.directionX = 0;
        this.directionY = 0;
    }

    print(field) {
        let playingField = '';

        for(const arr of field) {
            const joinedArray = arr.join('') + '\n';

            playingField += joinedArray;
        }

        console.log(playingField);
    }

    direction() {
        this.print(this.field);

        console.log(`e: to exit game.`)
        let direction = prompt('Pick a direction: ');

        direction = direction.toLowerCase();

        // To exit game
        if(direction === 'e') {
            return 'exit';
        }
        
        // If user input is invalid rerun method
        if(!('urdl'.includes(direction))) this.direction();

        if(direction === 'u') {
            this.directionY--;
        }

        if(direction === 'r') {
            this.directionX++;
        }

        if(direction === 'd') {
            this.directionY++;
        }

        if(direction === 'l') {
            this.directionX--;
        }

        if(this.directionX < 0 || this.directionY < 0) {
            return 'You lose'
        }

        const position = this.currentPosition(this.field, this.directionY, this.directionX);

        return this.winOrLose(position);
    }

    currentPosition(arr, y, x) {
        const position = arr[y][x];

        return position;
    }

    winOrLose(position) {
        if(position === hole || position === '') {
            return 'You lose';
        }

        if(position === hat) {
            return 'You win';
        }

        if(position === fieldCharacter) {
            this.field[this.directionY][this.directionX] = pathCharacter;
            // console.log(position);
        }
    }

    play() {
        while(true) {
            const outcome = this.direction();

            if(outcome === 'You win' || outcome === 'You lose') {
                return outcome;
            }

            if(outcome === 'exit') {
                return 'Goodbye'
            }
        }
    }

    static generateField(width, height) {
        let gameBoard = [];

        do {
            let arr = []

            for(let i = 0; i < width; i++){
                const num = Math.floor(Math.random() * 4);

                // Path will start at the corner left character
                if(i === 0 && gameBoard.length === 0) {
                    arr.push(pathCharacter);
                    continue;
                }

                // If the current character is equal to previous then continue
                if(chars[num] === arr[i - 1]) continue
                arr.push(chars[num])
            }

            gameBoard.push(arr);

        } while (gameBoard.length < height);

        const randomArrayInGameboard = Math.floor(Math.random() * (gameBoard.length - 2) + 2);
        const randomElementInGameboardArray = Math.floor(Math.random() * gameBoard[0].length);

        gameBoard[randomArrayInGameboard][randomElementInGameboardArray] = hat;

        return gameBoard;
    }
}

const field = Field.generateField(20, 10)
const game = new Field(field);

console.log(game.play());

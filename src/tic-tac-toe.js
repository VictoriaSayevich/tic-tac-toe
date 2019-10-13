class TicTacToe {
    constructor() {
        this.gameTable = new Array (3);
        for (let i = 0; i < this.gameTable.length; i++) {
            this.gameTable[i] = new Array(3);
        }
        for (let i = 0; i < this.gameTable.length; i++) {
            for (let j = 0; j < this.gameTable[i].length; j++) {
                this.gameTable[i][j] = null;
            }
        }
        this.players = [
            this.player1 = {symbol: 'x', state: true},
            this.player2 = {symbol: 'o', state: false}
        ];
        this.currentPlayer = this.players[0];
        this.winner = null;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer.symbol;
    }

    setState(num_player, f) {
        this.players[num_player].state = f;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.gameTable[rowIndex][columnIndex] === 'x' || this.gameTable[rowIndex][columnIndex] === 'o') return;
        this.gameTable[rowIndex][columnIndex] = this.currentPlayer.symbol;

        if (this.isRow(rowIndex)) this.winner = this.currentPlayer.symbol;
        if (this.isColumn(columnIndex)) this.winner = this.currentPlayer.symbol;
        if (rowIndex == columnIndex || (rowIndex == 0 && columnIndex == 2) || (rowIndex == 2 && columnIndex == 0)) {
            if (this.isDiagonal(rowIndex, columnIndex)) this.winner = this.currentPlayer.symbol;
        }

        if (this.players[0].state == true) {
            this.setState(0, false);
            this.setState(1, true);
            this.currentPlayer = this.players[1];
        }
        else {
            this.setState(0, true);
            this.setState(1, false);
            this.currentPlayer = this.players[0];
        }
    }

    isRow(row) {
        for (let j = 0; j < 2; j++) {
            if (this.gameTable[row][j+1] === null || this.gameTable[row][j] !== this.gameTable[row][j+1]) return false;
        }
        return true;
    }

    isColumn(col) {
        for (let i = 0; i < 2; i++) {
            if (this.gameTable[i+1][col] === null || this.gameTable[i][col] !== this.gameTable[i+1][col]) return false;
        }
        return true;
    }

    isDiagonal(row, col) {
        const center = this.gameTable[1][1];
        let f = false;
        if (center === null) return false;
        if (this.gameTable[row][col] === center) {
            if (!row && !col) return center === this.gameTable[2][2];
            if (!row && col == 2) return center === this.gameTable[2][0];
            if (row && !col) return center === this.gameTable[0][2];
            if (row && col == 2) return center === this.gameTable[0][0];
            if (row == 1 && col == 1) {
                if (this.gameTable[0][0] === this.gameTable[2][2]) {
                    if (this.gameTable[0][0] === center) f = true;
                }
                if (this.gameTable[0][2] === this.gameTable[2][0]) {
                    if (this.gameTable[0][2] === center) f = true;
                }
                return f;
            }
        }
        return false;
    }

    isFinished() {
        if (this.isDraw()) return true;
        return this.winner !== null;
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        for (let i = 0; i < this.gameTable.length; i++) {
            for (let j = 0; j < this.gameTable[i].length; j++) {
                if(this.gameTable[i][j] == null) return false;
            }
        }
        return true;
    }

    isDraw() {
        if (this.winner !== null) return false;
        for (let i = 0; i < this.gameTable.length; i++) {
            for (let j = 0; j < this.gameTable[i].length; j++) {
                if (this.gameTable[i][j] === null) return false;
            }
        }
        return true;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.gameTable[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;

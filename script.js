const annonceurBox = document.getElementById('annonceur-box');
const annonceur = document.getElementById('annonceur');
const main = document.getElementById('main');

class TicTacToe {
    constructor() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = 'X';
        this.isGameOver = false;
        annonceur.textContent = `C'est au tour de ${this.currentPlayer}`;
    }

    makeMove(row, col, cell) {
        this.board[row][col] = this.currentPlayer;
        cell.textContent = game.currentPlayer;
        console.log(this.currentPlayer);
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        console.log(this.currentPlayer);
        annonceur.classList.add('turn-around');
        setTimeout(() => {
            annonceur.textContent = `C'est au tour de ${this.currentPlayer}`;
        }, 250);
        setTimeout(() => {
            annonceur.classList.remove('turn-around');
        }, 500);
       
    }

    checkWinner() {
        // Vérifier les lignes
        for (let row = 0; row < 3; row++) {
            if (this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2] && this.board[row][0] !== '') {
                const winningCells = [
                    [row, 0],
                    [row, 1],
                    [row, 2]
                ];
                return winningCells; // Renvoie les coordonnées des cellules gagnantes
            }
        }
    
        // Vérifier les colonnes
        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col] && this.board[0][col] !== '') {
                const winningCells = [
                    [0, col],
                    [1, col],
                    [2, col]
                ];
                return winningCells; // Renvoie les coordonnées des cellules gagnantes
            }
        }
    
        // Vérifier les diagonales
        if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== '') {
            const winningCells = [
                [0, 0],
                [1, 1],
                [2, 2]
            ];
            return winningCells; // Renvoie les coordonnées des cellules gagnantes
        }
        if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== '') {
            const winningCells = [
                [0, 2],
                [1, 1],
                [2, 0]
            ];
            return winningCells; // Renvoie les coordonnées des cellules gagnantes
        }
    
        return null; // Aucun gagnant
    }
    
    
    isBoardFull() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board[row][col] === '') {
                    return false; // Il y a au moins une cellule vide, le tableau n'est pas plein
                }
            }
        }
        return true; // Toutes les cellules sont remplies, le tableau est plein
    }
    

    isCellValid(row, col) {
        if (this.board[row][col] !== '') {
            return false
        }
        return true
    }

    highlightInvalidCell(cell) {

        cell.classList.add('invalid-cell');
        setTimeout(() => {
            cell.classList.remove('invalid-cell');
        }, 1000);
        
    }

    reset() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = 'X';
        document.querySelectorAll('.cell').forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('player-won')
        })
        this.isGameOver = false;
        annonceur.textContent = `C'est au tour de ${this.currentPlayer}`;
        annonceurBox.classList.remove('green-background');

    }
}

const game = new TicTacToe();

document.querySelectorAll('.cell').forEach((cell, index) => {
    
    cell.addEventListener('click', () => {

        if (!game.isGameOver) {

        const row = Math.floor(index / 3);
        const col = index % 3;

        console.log(row);
        console.log(col);
        console.log(game.board);

        if (!game.isCellValid(row, col)) {
            game.highlightInvalidCell(cell)
        }
        else {
            game.makeMove(row, col, cell);
            
            if (game.checkWinner() !== null) {

                game.isGameOver = true;

                const winningCells = game.checkWinner();

                setTimeout(() => {
                    if (game.currentPlayer === 'X') {
                        annonceur.textContent = `O a gagné !`;
                    }
                    else {
                        annonceur.textContent = `X a gagné !`;
                    }
                    annonceurBox.classList.add('green-background');
                }, 250);
                
                
                winningCells.forEach((coords) => {
                    const row = coords[0];
                    const col = coords[1];
                    let letter;
                
                    switch (row) {
                        case 0:
                            letter = 'a';
                            break;
                        case 1:
                            letter = 'b';
                            break;
                        case 2:
                            letter = 'c';
                            break;
                    }
                
                    console.log(`${letter}-${col}`);
                    const cell = document.getElementById(`${letter}-${col}`);
                    cell.classList.add('player-won');
                })              
            }
            if (game.isBoardFull() && !game.isGameOver) {
                game.isGameOver = true;
                setTimeout(() => {
                    annonceur.textContent = `C'est une égalité !`;
                }, 250);
            }
        }   
        }
    })
});



const restart = document.getElementById('restart');
restart.addEventListener('click', () => {
    main.classList.add('change-board');
    setTimeout(() => {
        game.reset();
    }, 500);
    setTimeout(() => {
        main.classList.remove('change-board')
    }, 1000);

})

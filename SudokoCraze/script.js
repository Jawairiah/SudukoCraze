var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isSafe(row, col, val, board) {
    for (let i = 0; i < 9; i++) {
        // Check the column
        if (board[i][col] === val) return false;
        // Check the row
        if (board[row][i] === val) return false;
        // Check the subgrid
        if (
            board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
                3 * Math.floor(col / 3) + (i % 3)
            ] === val
        ) {
            return false;
        }
    }
    return true;
}

function SudokuSolver(board, i, j, n) {
    if (i === n) {
        // Solved the entire board, update the UI
        FillBoard(board);
        return true;
    }

    if (j === n) {
        // Move to the next row
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] !== 0) {
        // Skip filled cells
        return SudokuSolver(board, i, j + 1, n);
    }

    for (let num = 1; num <= 9; num++) {
        if (isSafe(i, j, num, board)) {
            board[i][j] = num; // Place the number
            if (SudokuSolver(board, i, j + 1, n)) {
                return true; // Solution found
            }
            board[i][j] = 0; // Backtrack
        }
    }

    return false; // No solution found
}

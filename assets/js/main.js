class cell {
    constructor(x, y, alive = false) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    toggle() {
        if (this.alive) {
            this.alive = false;
        } else {
            this.alive = true;
        }
    }
}

class board {
    constructor(size, randomMode = false) {
        this.size = size;
        this.grid = this.createGrid(randomMode);
    }

    createGrid(randomMode) {
        const tempBoard = [];
        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                const cellAlive = randomMode ? Math.random() > 0.5 : false;
                row.push(new cell(i, j, cellAlive));
            }
            tempBoard.push(row);
        }
        return tempBoard;
    }

    draw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const cellSize = ctx.canvas.width / this.size;
        this.grid.forEach((row) => {
            row.forEach((cell) => {
                ctx.fillStyle = cell.alive ? "black" : "white";
                ctx.fillRect(cell.y * cellSize, cell.x * cellSize, cellSize, cellSize);
                ctx.strokeRect(cell.y * cellSize, cell.x * cellSize, cellSize, cellSize);
            });
        });
    }

    toggleCell(x, y) {
        this.grid[x][y].toggle();
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("size");
const randomBtn = document.getElementById("random");
const manualBtn = document.getElementById("manual");

let gameBoard = null;

function adjustCanvas(canvas, size) {
    cellSize = Math.floor(window.innerWidth * 0.8 / size);
    canvas.width = cellSize * size;
    canvas.height = cellSize * size;
}

canvas.addEventListener("click", (event) => {
    if (!gameBoard) {
        alert("Se requiere crear un tablero primero");
        return;
    };
    const rect = canvas.getBoundingClientRect();
    const cellSize = rect.width / gameBoard.size;

    const x = Math.floor((event.clientY - rect.top) / cellSize);
    const y = Math.floor((event.clientX - rect.left) / cellSize);
    
    gameBoard.toggleCell(x, y);
    gameBoard.draw(ctx);
});

randomBtn.addEventListener("click", () => {
    const size = parseInt(sizeInput.value);
    adjustCanvas(canvas, size);
    gameBoard = new board(size, true);
    gameBoard.draw(ctx);
});

manualBtn.addEventListener("click", () => {
    const size = parseInt(sizeInput.value);
    adjustCanvas(canvas, size);
    gameBoard = new board(size, false);
    gameBoard.draw(ctx);
});

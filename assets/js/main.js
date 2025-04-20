class Cell {
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

class Board {
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
                row.push(new Cell(i, j, cellAlive));
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

    countNeighbors(x, y) {
        let count = 0;
        // esquina superior izquierda
        if (x > 0 && y > 0 && this.grid[x - 1][y - 1].alive) count++;
        // celda izquierda
        if (x > 0 && this.grid[x - 1][y].alive) count++;
        // esquina inferior izquierda
        if (x > 0 && y < this.size - 1 && this.grid[x - 1][y + 1].alive) count++;
        // celda inferior
        if (y < this.size - 1 && this.grid[x][y + 1].alive) count++;
        // esquina inferior derecha
        if (x < this.size - 1 && y < this.size - 1 && this.grid[x + 1][y + 1].alive) count++;
        // celda derecha
        if (x < this.size - 1 && this.grid[x + 1][y].alive) count++;
        // esquina superior derecha
        if (x < this.size - 1 && y > 0 && this.grid[x + 1][y - 1].alive) count++;
        // celda superior
        if (y > 0 && this.grid[x][y - 1].alive) count++;
        return count;
    }

    updateBoard() {
        const newGrid = this.grid.map((row) => {
            return row.map((cell) => {
                const neighbors = this.countNeighbors(cell.x, cell.y);
                if (cell.alive) {
                    if (neighbors < 2 || neighbors > 3) {
                        return new Cell(cell.x, cell.y, false);
                    }
                } else {
                    if (neighbors === 3) {
                        return new Cell(cell.x, cell.y, true);
                    }
                }
                return cell;
            });
        });
        this.grid = newGrid;
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("size");
const randomBtn = document.getElementById("random");
const manualBtn = document.getElementById("manual");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
let interval = null;
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
    gameBoard = new Board(size, true);
    gameBoard.draw(ctx);
});

manualBtn.addEventListener("click", () => {
    const size = parseInt(sizeInput.value);
    adjustCanvas(canvas, size);
    gameBoard = new Board(size, false);
    gameBoard.draw(ctx);
});

startBtn.addEventListener("click", () => {
    if (!gameBoard) {
        alert("Se requiere crear un tablero primero");
        return;
    }
    randomBtn.disabled = true;
    manualBtn.disabled = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    interval = setInterval(() => {
        gameBoard.updateBoard();
        gameBoard.draw(ctx);
    }, 100);
});

stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    randomBtn.disabled = false;
    manualBtn.disabled = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

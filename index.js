/**
 * Created by QY on 2017/6/10.
 */

var maxCount = 16;
var currentCount = 0;

var score = 0;

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xffffff});
document.body.appendChild(app.view);

function getColorByNumber(number) {
    var colorValue = {
        0: 0x00FF00,
        2: 0xFF0000,
        4: 0x0000FF,
        8: 0xFFFF00,
    };

    var color = colorValue[number];
    if (color === undefined) {
        color = 0xff0fff;
    }

    return color;
}

function drawCell(rowwIndex,columnIndex) {

    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowwIndex][columnIndex]), 1);
    graphics.drawRect(app.renderer.width / 6.5 + columnIndex * 65, app.renderer.height / 3 + rowwIndex * 65, 60, 60);
    app.stage.addChild(graphics);

    if(grid[rowwIndex][columnIndex] !== 0)
    {
        var RandomNumber = new PIXI.Text(grid[rowwIndex][columnIndex], {
            fontsize: 100
        });
        RandomNumber.anchor.set(0.5);
        RandomNumber.x = app.renderer.width / 6.5 + 30 + columnIndex * 65;
        RandomNumber.y = app.renderer.height / 3 + 30 + rowwIndex * 65;
        app.stage.addChild(RandomNumber);
    }

}

//var rowwIndex,columnIndex;
//if (window.innerHeight < 100) {}
var basicText = new PIXI.Text('2048',{
    fontFamily: 'Arial',
    fontsize: 80,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width/2;
basicText.y = app.renderer.height/5;
app.stage.addChild(basicText);
var grid = []
for (var i = 0; i < 4; i++) {
    grid[i] = [0,0,0,0]
}
var scoreText = new PIXI.Text('Score: ' + score, {
    fontSize: 48
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height / 10 * 9;
app.stage.addChild(scoreText);

function flushUI() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j)
        }
    }
    scoreText.text = 'Score: ' + score;
}
flushUI();

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}
var addRandomCell = function () {
    if(currentCount === maxCount) return;
    var rowIndex = generateRandomNumber();
    var columnIndex = generateRandomNumber();

    while (grid[rowIndex][columnIndex] !== 0 ) {
        rowIndex = generateRandomNumber();
        columnIndex = generateRandomNumber();
    }

    grid[rowIndex][columnIndex] = 2;
    currentCount++;
};

addRandomCell();
addRandomCell();
flushUI();

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        onToRightEventHandler();
    }

    if (event.key === 'ArrowUp') {
        onToUpEventHandler();
    }

    if (event.key === 'ArrowLeft') {
        onToLeftEventHandler();
    }

    if (event.key === 'ArrowDown') {
        onToDownEventHandler();
    }
});


var onToRightEventHandler = function () {
    var isChanged = moveCellToRight();
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};

var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});

function moveCellToRight() {
    var isChanged = false;
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged = true;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;

                score += grid[rowIndex][currentIndex + 1];
                isChanged = true;
                currentCount--;
            }

        }
    }
    return isChanged;
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}
function rotateArray(rotateCount = 1) {
    for (var i = 0 ; i < rotateCount; i ++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
            return row.map((item, columnIndex) => {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}

function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}
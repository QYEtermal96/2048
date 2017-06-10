/**
 * Created by QY on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xffffff});
document.body.appendChild(app.view);

function drawCell(rowwIndex,columnIndex) {
    var color = 0x00ff00;
    if(gird[rowwIndex][columnIndex] === 2)
    {
        color = 0xff6666;
    }
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
    graphics.drawRect(app.renderer.width / 6.5 + columnIndex * 65, app.renderer.height / 3 + rowwIndex * 65, 60, 60);
    app.stage.addChild(graphics);

    if(gird[rowwIndex][columnIndex] !== 0)
    {
        var RandomNumber = new PIXI.Text(gird[rowwIndex][columnIndex], {
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
var gird = []
for (var i = 0; i < 4; i++) {
    gird[i] = [0,0,0,0]
}


for (var i = 0; i <4 ; i++) {
    for (var j = 0; j < 4; j++) {
        drawCell(i,j)
  }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}
var rowwIndex = generateRandomNumber();

var columnIndex = generateRandomNumber();

gird[rowwIndex][columnIndex] = 2;
drawCell(rowwIndex,columnIndex);

document.addEventListener("keydown", function (event) {
    //console.log(event);
    if(event.key === "ArrowUp")
    {
        console.log("up")
    }
    if(event.key === "ArrowRight")
    {
        console.log("right");
    }
});
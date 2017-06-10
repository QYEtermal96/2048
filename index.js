/**
 * Created by QY on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xffffff});
document.body.appendChild(app.view);

//var x,y;
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
      var graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF700B, 1);
      graphics.drawRect(app.renderer.width/6.5 + j*65, app.renderer.height/3 +i*65, 60, 60);
      app.stage.addChild(graphics);
  }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}
var x = generateRandomNumber();
var y = generateRandomNumber();

var graphics = new PIXI.Graphics();
graphics.beginFill(0xff6666, 1);
graphics.drawRect(app.renderer.width/6.5 + x*65, app.renderer.height/3 + y*65, 60, 60);
app.stage.addChild(graphics);

var RandomNumber = new PIXI.Text('2',{
    fontsize: 100
});

RandomNumber.anchor.set(0.5);
RandomNumber.x = app.renderer.width/6.5 + 30 + x*65;
RandomNumber.y = app.renderer.height/3 + 30 +y*65;
app.stage.addChild(RandomNumber);


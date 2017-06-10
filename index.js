/**
 * Created by QY on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xffffff});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048',{
    align:"center",
    fontsize: 80
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





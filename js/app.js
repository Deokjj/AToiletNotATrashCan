
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var throwable = new Image();
throwable.src = './images/toothBrush.png';

var proj = new Projectile();
var totalT =proj.calculateFinalT();
var pointArr = proj.getIntervalPosition(totalT);
var intervalIndex = 0;

function drawProjectile(){
  if(intervalIndex>0){
    ctx.clearRect(pointArr[intervalIndex-1][0], pointArr[intervalIndex-1][1], 80 , 80);
  }
  ctx.drawImage(throwable,pointArr[intervalIndex][0],pointArr[intervalIndex][1],80,80 );
  intervalIndex++;
}

var projectileInterval = setInterval(function(){
  drawProjectile();
  if(intervalIndex>=pointArr.length){
    ctx.clearRect(pointArr[intervalIndex-1][0], pointArr[intervalIndex-1][1], 80, 80);
    clearInterval(projectileInterval);
  }
},15);

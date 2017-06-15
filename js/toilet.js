function Toilet(){
  this.health = 200;
  this.position = [];
  this.src = "./images/toilet.png";
  this.size = [130,202];
}

Toilet.prototype.newPosition = function(){
  var x = 200 + Math.random()*670;
  var y = 100 + Math.random()*300;
  return [x,y];
};

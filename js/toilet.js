function Toilet(){
  this.health = 200;
  this.position = [];
  this.relativePosition = [];
  this.targetPosition = [];
  this.targetSize= [90,60];
  this.src = "./images/toilet.png";
  this.size = [130,202];
}

Toilet.prototype.setNewPosition = function(){
  var x = 200 + Math.random()*680;
  var y = 60 + Math.random()*340;
  this.position = [x,y];
  this.relativePosition = [x+130,y-605];
  this.targetPosition =[x,y+80];
};

//Object must score in toilet where
//(xposition +5 ~ xposition +90)
//(yposition +85 ~ yposition + 155)

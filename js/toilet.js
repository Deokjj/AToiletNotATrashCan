function Toilet(){
  this.health = 200;
  this.position = [];
  this.relativePosition = [];
  this.targetPosition = [];
  this.targetSize= [90,60];
  this.src = "./images/toilet.png";
  this.size = [130,202];
}

//Object must score in toilet where
//(xposition ~ xposition +60)
//(yposition +80 ~ yposition + 170)
Toilet.prototype.setNewPosition = function(){
  var x = 200 + Math.random()*680;
  var y = 60 + Math.random()*340;
  this.position = [x,y];
  this.relativePosition = [x+130,y-605];
  this.targetPosition =[x,y+80];
};

Toilet.prototype.updateHp = function(){
  var lostHpPercentage = (200-this.health)/2;
  $("#hp p").html(Math.floor(this.health) + " / 200");
  $(".redIcon").css("clip-path","inset(" + lostHpPercentage+"% 0 0 0)");
};

function Toilet(){
  this.maxHealth = 25;
  this.health = 25;
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
  var lostHpPercentage = (this.maxHealth-this.health)/(this.maxHealth/100);
  $("#hp p").html(Math.round(this.health) + " / " + this.maxHealth);
  $(".redIcon").css("clip-path","inset(" + lostHpPercentage+"% 0 0 0)");
};

var healAmount =2;
//Toilet heals
$(document).ready(function(){

  var healUp = setInterval(function(){
    if(toilet.health < toilet.maxHealth){
      $('.heal').addClass('healEffect');
      setTimeout(function() {
          $('.heal').removeClass('healEffect');
      },460);
      $("#textDisplay").append('<li class="healText">Toilet healed <strong>+2</strong> points </li>');
      setTimeout(function(){
        $("#textDisplay li").first().remove();
      },2200);
      toilet.health +=healAmount;
      toilet.updateHp();
    }
  },4000);

});

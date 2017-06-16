var gravity = 10;

function Projectile(){
  this.Objects =[
    {name: "toothebrush",
      weight: 4,
      power: [15,25],
      critical: 0.3,
      src: "./images/toothBrush.png"
    },
    {name: "toiletPaper",
      weight: 8,
      power: [25,30],
      critical:0.03,
      src: "./images/toiletPaper.png"
    },
    {name:"AndrewJackson",
      weight:1,
      power: [30,35],
      critical:0.7,
      src: "./images/AndrewJackson.png"
    },
    {name:"iPhone",
      weight:15,
      power: [45,65],
      critical:0.2,
      src: "./images/iPhone.png"
    },
    {name:"cat",
      weight: 30,
      power:[70,90],
      critical:0.1,
      src: "./images/cat.png"
    }
  ];
  this.currentIndex =0;
  this.initialY = 200;
  //Math.atan2(60,30)*180/Math.PI;
  this.angle = Math.atan2(1,-1);
  //min:50 max:150
  this.power = 100;
  this.initialSpeed = [80,-80];
  //acceleration should be between: x:-10 ~ 10
  this.acceleration = [0, 20];
  this.wind = 0;
}
Projectile.prototype.setNewWind = function(){
  this.wind = -10 + Math.random()*20;
  if(this.wind <-7){
    $("#windInfo").html("<<<");
  }
  else if(this.wind >=-7 && this.wind<-4){
    $("#windInfo").html("<<");
  }
  else if(this.wind >=-4 && this.wind<-1){
    $("#windInfo").html("<");
  }
  else if(this.wind >=-1 && this.wind<1){
    $("#windInfo").html("—");
  }
  else if(this.wind >=1 && this.wind<4){
    $("#windInfo").html(">");
  }
  else if(this.wind >=4 && this.wind<7){
    $("#windInfo").html(">>");
  }
  else{
    $("#windInfo").html(">>>");
  }
};

Projectile.prototype.setNewAcceleration = function(){
  this.acceleration = [this.wind, gravity + this.Objects[this.currentIndex].weight];
};

Projectile.prototype.setAngle = function(degree){
  this.angle = degree *(Math.PI/180);
};

Projectile.prototype.setNewSpeed = function(){
  this.initialSpeed = [ Math.sin(this.angle)*this.power , Math.cos(this.angle)*this.power ];
};

Projectile.prototype.calculateFinalT = function(){
  //quadratic formulas
  var a = this.acceleration[1]/2;
  var b = this.initialSpeed[1];
  var c = this.initialY-550;//height === 600
  return Math.max( (-b+Math.sqrt(Math.pow(b,2)-4*a*c) ) / (2*a) , (-b-Math.sqrt(Math.pow(b,2)-4*a*c) ) / (2*a) );
};

Projectile.prototype.getIntervalPosition = function(totalT){
  var pointArr = [];
  //find point at every 0.05s
  for(t=0.05; t<totalT; t+=0.05){
    pointArr.push([50+this.initialSpeed[0]*t+this.acceleration[0]*Math.pow(t,2)/2 ,
    this.initialY+this.initialSpeed[1]*t+this.acceleration[1]*Math.pow(t,2)/2]);
  }
  return pointArr;
};

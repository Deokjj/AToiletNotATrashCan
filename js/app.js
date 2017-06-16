
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Initializing variables
var objectSize = 80;
var proj = new Projectile();
var intervalIndex = 0;
var throwable = new Image();
throwable.src = proj.Objects[proj.currentIndex].src;
var totalT = 0;
var pointArr = [];
proj.setNewWind();
var toilet = new Toilet();
placeToilet();
placeObject();
$("#gameOver").hide();


function placeObject(){
  ctx.drawImage(throwable,50,proj.initialY,objectSize,objectSize);
}

function placeToilet(){
  toilet.setNewPosition();
  $(".toilet").css("top", toilet.relativePosition[1]+"px");
  $(".toilet").css("left", toilet.relativePosition[0]+"px");
  $(".regularDamage").css("top",(toilet.relativePosition[1])+"px");
  $(".regularDamage").css("left",(toilet.relativePosition[0]-37)+"px");
  $(".criticalDamage").css("top",(toilet.relativePosition[1]-110)+"px");
  $(".criticalDamage").css("left",(toilet.relativePosition[0]-37)+"px");
  $(".heal").css("top",(toilet.relativePosition[1]-210)+"px");
  $(".heal").css("left",(toilet.relativePosition[0]-37)+"px");
}

//InitialY function here
$(document).ready(function(){
  var increment = 3;
  var pressCount = 0;
  $(document).keydown(function (keyEvent){
    //disable default functions when those keys are pressed.
    if (keyEvent.which === 38 ||
      keyEvent.which === 40 ) {
        keyEvent.preventDefault();
    }
    // Up arrow key
    if(proj.initialY<20){
      proj.initialY = 20;
    }
    else if(proj.initialY>480){
      proj.initialY = 480;
    }
    else{
      // up arrow key
      if (keyEvent.which === 38) {
        ctx.clearRect(0,0,130,600);
        proj.initialY -= increment;
        ctx.drawImage(throwable,50,proj.initialY,objectSize,objectSize);
      }
      // down arrow key
      else if (keyEvent.which === 40) {
        ctx.clearRect(0,0,130,600);
        proj.initialY += increment;
        ctx.drawImage(throwable,50,proj.initialY,objectSize,objectSize);
      }
      if(proj.initialY > 105){
        $("#angleSlider").css('top', proj.initialY-810 +"px");
      }
      pressCount++;
      if(pressCount === 12){
        increment = 6;
      }
      else if(pressCount === 19){
        increment = 10;
      }
      else if(pressCount ==26){
        increment = 16;
      }
    } //end of else (key function)
    $(document).keyup(function(keyEvent){
      if (keyEvent.which === 38 ||
        keyEvent.which === 40 ){
          increment = 3;
          pressCount = 0;
      }
    });

  });
});

// ObjectSelection
$(document).ready(function(){

  $(".item").click(function(){
    $(".rainbow").removeClass("rainbow");
    $(this).addClass("rainbow");
    if($(this).hasClass("item0")){
      proj.currentIndex =0;
    }
    else if($(this).hasClass("item1")){
      proj.currentIndex =1;
    }
    else if($(this).hasClass("item2")){
      proj.currentIndex =2;
    }
    else if($(this).hasClass("item3")){
      proj.currentIndex =3;
    }
    else if($(this).hasClass("item4")){
      proj.currentIndex =4;
      ion.sound.play('meow');
    }

    ctx.clearRect(0,0,130,600);
    throwable.src = proj.Objects[proj.currentIndex].src;
    ctx.drawImage(throwable,50,proj.initialY,objectSize,objectSize);
  });

});


//Launch function here
function drawProjectile(){
  if(intervalIndex>0){
    ctx.clearRect(pointArr[intervalIndex-1][0], pointArr[intervalIndex-1][1], objectSize , objectSize);
  }
  else{
    ctx.clearRect(0,0,130,600);
  }
  ctx.drawImage(throwable,pointArr[intervalIndex][0],pointArr[intervalIndex][1],objectSize,objectSize );
  intervalIndex++;
}

$(document).ready(function(){
  $(".launchBtn").click(function(){
    if(proj.Objects[proj.currentIndex].count === 0){
      $("#textDisplay").append('<li class="warningText"><strong>Warning- Item Count:0 Use a different weapon</strong></li>');
      setTimeout(function(){
        $("#textDisplay li").first().remove();
      },1800);
      return;
    }
    proj.useItem();
    $("#screenInterface").hide();
    proj.setNewSpeed();
    proj.setNewAcceleration();
    totalT =proj.calculateFinalT();
    pointArr = proj.getIntervalPosition(totalT);

   var projectileInterval = setInterval(function(){
     drawProjectile();
     if(intervalIndex>=pointArr.length){
      ctx.clearRect(pointArr[intervalIndex-1][0], pointArr[intervalIndex-1][1], objectSize, objectSize);
      intervalIndex = 0;
      clearInterval(projectileInterval);
      placeObject();
      proj.setNewWind();
      $("#screenInterface").show();
     }

     var xCenter = pointArr[intervalIndex][0]+40;
     var yCenter = pointArr[intervalIndex][1]+40;
     if((xCenter>toilet.targetPosition[0]) &&
     (xCenter<toilet.targetPosition[0] + toilet.targetSize[0]) &&
     (yCenter>toilet.targetPosition[1]) &&
     (yCenter<toilet.targetPosition[1] + toilet.targetSize[1])){
       pointArr.splice(intervalIndex+1);
       setTimeout(placeToilet,600);
       attack();
       if(toilet.health<=0){
         displayWin();
       }
     }
   },15);
 });

var levelCount =1;
function displayWin(){
  levelCount++;
  $(".win .smallerFont").html("<span>L</span><span>E</span><span>V</span><span>E</span><span>L</span><span>:</span><span> </span><span>"+levelCount+"</span>");
  $(".win").addClass("winAni");
  $(".toilet").fadeOut(2500);
  $("#angleSlider").fadeOut(1500);
  $("#sliderAndLauncher").fadeOut(1500);
  setTimeout(function(){
    toilet.maxHealth *= 2;
    toilet.health = toilet.maxHealth;
    toilet.updateHp();
    $(".win").removeClass("winAni");
    $(".toilet").fadeIn(2000);
    $("#angleSlider").fadeIn(1000);
    $("#sliderAndLauncher").fadeIn(1000);
  },3500);
}//end of launchBtn

});//end of $(document).ready
//End of Launch function

//Damage to toilet and update it's health
function attack(){
  var minDamage = proj.Objects[proj.currentIndex].power[0];
  var maxDamage = proj.Objects[proj.currentIndex].power[1];
  var criticalP = proj.Objects[proj.currentIndex].critical;
  var damage = minDamage + Math.random()*(maxDamage - minDamage);
  if( Math.random() < criticalP){
    damage = 2*damage;
    $('.criticalDamage').html("-" + Math.round(damage)+"!!");
    $('.criticalDamage').addClass('criEffect');
    setTimeout(function() {
        $('.criticalDamage').removeClass('criEffect');
    },1430);
    $("#textDisplay").append('<li class="criticalText"><strong>Critical Hit!!</strong>: Damaged <strong>'+ damage + '</strong> to the toilet </li>');
    setTimeout(function(){
      $("#textDisplay li").first().remove();
    },1800);

  }
  else{
    $('.regularDamage').html("-" + Math.round(damage));
    $('.regularDamage').addClass('regEffect');
    setTimeout(function() {
        $('.regularDamage').removeClass('regEffect');
    },930);
    $("#textDisplay").append('<li class="criticalText"><strong>Hit</strong>: Damaged <strong>'+ damage + '</strong> to the toilet </li>');
    setTimeout(function(){
      $("#textDisplay li").first().remove();
    },1800);
  }
  toilet.health -= damage;
  console.log("damage was "+ damage);
  toilet.updateHp();
}

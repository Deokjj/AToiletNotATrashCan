var angleSlider = $("#angleSlider").roundSlider({
    width: 20,
    radius: 100,
    value: 45,
    circleShape: "quarter-top-right",
    max: "90",
    mouseScrollAction: true,
    handleSize: "+3",
    sliderType: "min-range",
		keyboardAction: false,

		drag: function (args) {
			$(".rs-tooltip.rs-tooltip-text.edit").html(90 - this.getValue()+" °");
    },
		change: function(args) {
			$(".rs-tooltip.rs-tooltip-text.edit").html(90 - this.getValue()+" °");
			proj.setAngle((180-this.getValue()));
		}
});

$(".rs-tooltip.rs-tooltip-text.edit").html(45 +" °");

window.requestAnimationFrame = window.requestAnimationFrame||
															 function(f){
																 return setTimeout(f, 1000/60);
															 };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
															function(requestID){
																clearTimeout(requestID);
															}; //fall back



var requestframeref;
var power = document.getElementById('powerBar');
var powerstatus = document.getElementById('status');
var action = 'charge';
var curcharge = 50;
var greenVal = 127.5;

function updatepower(timestamp){
	if (action == 'charge'){
		curcharge += 1;
		greenVal -=2.5;
		if (curcharge > 100){
			action = 'discharge';
		}
	}
	else{
		curcharge -= 1;
		greenVal += 2.5;
		if (curcharge < 0){
			action = 'charge';
		}
	}
	powerstatus.style.width = curcharge + '%';
	proj.power = 50+ curcharge;
	$("#sliderAndLauncher span").html("<strong>P: </strong>"+curcharge + " / 100");
	$("#status").css("background-color","rgba(255," + greenVal+",0,0.8)");
	requestframeref = requestAnimationFrame(updatepower);
}

powerBar.addEventListener('mouseenter', function(){
	requestAnimationFrame(updatepower);
}, false);

power.addEventListener('mouseleave', function(){
	cancelAnimationFrame(requestframeref);
}, false);

$(document).ready(function(){
	$( ".item" ).hover(
    function() {
      if($(this).hasClass("item0")){
        $("#item0Des").css("visibility","visible");
      }
      else if($(this).hasClass("item1")){
        $("#item1Des").css("visibility","visible");
      }
      else if($(this).hasClass("item2")){
        $("#item2Des").css("visibility","visible");
      }
      else if($(this).hasClass("item3")){
        $("#item3Des").css("visibility","visible");
      }
      else if($(this).hasClass("item4")){
        $("#item4Des").css("visibility","visible");
      }
    }, function() {
      if($(this).hasClass("item0")){
        $("#item0Des").css("visibility","hidden");
      }
      else if($(this).hasClass("item1")){
        $("#item1Des").css("visibility","hidden");
      }
      else if($(this).hasClass("item2")){
        $("#item2Des").css("visibility","hidden");
      }
      else if($(this).hasClass("item3")){
        $("#item3Des").css("visibility","hidden");
      }
      else if($(this).hasClass("item4")){
        $("#item4Des").css("visibility","hidden");
      }
    }
  );
});

ion.sound({
    // List of sound files to load
    sounds: [
        {
          name: "background",
          loop: true,
          volume: 0.4
        },
        {name: "meow",
         loop: 1,
         volume: 1
        },
        {name: "catAction",
          volume:1,
          loop:1
        },
        {name: "explosion",
          loop:1,
          volume:1
        },
        {name: "attacked",
          loop:1,
          volume:1
        },
        {name:"throw",
          loop:1,
          volume:1
        },
        {name:"flush",
          loop:1,
          volume:0.9
        },
        {name:"equip",
          loop:1,
          volume:0.6
        },
        {name:"gameover",
          loop:1,
          volume:1
        }
    ],

    // Path to the folder where the sound files are
    path: "ion.sound-3.0.7/sounds/",

    // Starts loading sound files even before you use them
    preload: true,

    // Multiple sounds at once
    multiplay: true,
});



$(document).ready(function () {
    ion.sound.play('background');
});

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
			console.log(180-this.getValue());
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
	console.log(greenVal);
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

$('#power').slider({
	formatter: function(value) {
		return value + " / 100";
	}
});

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

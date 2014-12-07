/*$("#carousel-generic").swipeleft(function() {
  $(this).carousel('next');
 });
$("#carousel-generic").swiperight(function() {
  $(this).carousel('prev');
 });*/



 $(function () {
 	var  myElement  = document.getElementById("carousel-generic");
 	// var  myElement  = document.getElementById("hammerid");
 	var mc = new Hammer(myElement,{
 		recognizers: [
		        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
		        [Hammer.Rotate],
		        [Hammer.Pinch, { enable: true }, ['rotate']],
		        [Hammer.Swipe,{ 
		        	pointers:	1,
		        	threshold:    1,
		        	velocity:	0.01,
		        	direction: Hammer.DIRECTION_ALL 
		        }],
		    ]
 	});
 	mc.on('swipeleft',  function(event) {
 		//console.log("左面划了一次");
 		 $(this).carousel('prev');
 	});
 	mc.on('swiperight',  function(event) {
 		//console.log("右面划了一次");
 		$(this).carousel('next');
 	});
 	
	// listen to events...
	/*mc.on("panleft", function(ev) {
	    //myElement.textContent = ev.type +" gesture detected.";
	    $(this).carousel('prev');

	});
	mc.on("panright", function(ev) {

		$(this).carousel('next');
	    //myElement.textContent = ev.type +" gesture detected.";
	});
 	$('#carousel-generic').hammer().on('swipeleft', function(){
     $(this).carousel('next');*/
 });
/*
 $('#carousel-generic').hammer().on('swiperight', function(){
 	
  $(this).carousel('prev');
 });	
 });*/

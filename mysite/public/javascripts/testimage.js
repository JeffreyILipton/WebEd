$(document).ready(function(){
	$('.boxgrid').hover(function(){
		$(".cover",this).stop().animate({bottom:'0px'},{queue:false,duration:300})
		},
		function(){
			$(".cover",this).stop().animate({bottom:'-260px'},{queue:false,duration:300});
		});
	});

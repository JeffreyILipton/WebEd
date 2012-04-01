//localset={"programmer":"Jeffrey Lipton"};

$(document).ready(function(){
	//localset.w = $('.boxgrid').css("width");
	//localset.h = $('.boxgrid').css("height");
	
	
	$('.boxgrid').hover(function(){
		$(".cover",this).stop().animate({bottom:'0px'},{queue:false,duration:300})
		},
		function(){
			$(".cover",this).stop().animate({bottom:'-260px'},{queue:false,duration:300});
		});
	});

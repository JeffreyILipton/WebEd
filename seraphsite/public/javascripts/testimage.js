//localset={"programmer":"Jeffrey Lipton"};

$(document).ready(function(){
	var sizer = function(index){
    	var bw = parseInt($(this).css("width"));
	    var bh = parseInt($(this).css("height"));
    	var iw = parseInt($('img',this).css("width"));
	    var ih = parseInt($('img',this).css("height"));
	    
	    var w = bw/iw;
	    var h = bh/ih;
	    var m=1;
	    if((iw==0)&&(ih==0)){
			console.log('w,h '+w+','+h);
			w=bw;
			h=bh;
		}else{
     		m = Math.min(w,h);
     		w = m*iw;
			h = m*ih;
		}
		

		$('img',this).css("width",w+'px');
		$('img',this).css("height",h+'px');
		w = (bw-w)/2.0;
		h = (bh-h)/2.0;
		$('img',this).css("margin-left",w+'px');
		$('img',this).css("margin-top",h+'px');
			
		
	    
    };
    $('.boxgrid').each(sizer)
	
	$('.boxgrid').hover(function(){
		$(".cover",this).stop().animate({bottom:'0px'},{queue:false,duration:300})
		},
		function(){
			$(".cover",this).stop().animate({bottom:'-260px'},{queue:false,duration:300});
		});
	});

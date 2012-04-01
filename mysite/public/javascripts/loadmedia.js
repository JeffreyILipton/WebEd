$(document).ready(function(){	
	$('#mediaForm').submit(function(e){
		e.preventDefault();
        var imglink = $("#mediaImg").val();
        if(typeof(clicklink)=="undefined"){clicklink="#";}
        
        var clicklink = $("#mediaLink").val();
        if(typeof(clicklink)=="undefined"){clicklink="#";}
        
        var hdr = $("#mediaHdr").val();
        var txt = $("#mediaTxt").val();
       
        $(".cover a h3").text(hdr);
        $(".cover a p").text(txt);
        $(".cover a").attr('href',clicklink);
        $(".boxgrid img").attr("src",imglink);
        
        return false;       
     });
});

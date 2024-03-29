var settings = {programmer:"Jeff", previewed:0};

$(document).ready(function(){	
	$('#mediaForm').submit(function(e){
		e.preventDefault();
        
		var imglink = $("#mediaImg").val();
        if(typeof(clicklink)=="undefined"){clicklink="#";}
        
        var clicklink = $("#mediaLink").val();
        if(typeof(clicklink)=="undefined"){clicklink="#";}
        
        var hdrval = $("#mediaHdr").val();
        var txtval = $("#mediaTxt").val();

	var typeval = $("#mediaType").val();
	var tagsval = $("#mediaTags").val();

       
        if (settings.previewed==0){
			$(".cover a h3").text(hdrval);
			$(".cover a p").text(txtval);
			$(".cover a").attr('href',clicklink);
			$(".boxgrid img").attr("src",imglink);
			settings.previewed=1;
			$("#submit").val("Save");
			return false;
			
	    }else{
			$("#submit").val("preview");
		    settings.previewed=0;
		    $.post("/media/new",{hdr:hdrval,txt:txtval,img:imglink,link:clicklink,type:typeval,tags:tagsval});
		    return false;
		}
     });
});

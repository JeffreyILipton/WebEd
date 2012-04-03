$(document).ready(function(){
	Recaptcha.create("6LcPwM8SAAAAAJ2EpFdyPvctQmG9wpFd_pV3AguL",
	 "mycaptcha",{
		           theme:"red",
		           callback:Recaptcha.focus_response_field
			   }
	);
	
	
	$('#contact-form').jqTransform();

	$("button").click(function(){

		$(".formError").hide();

	});

	var use_ajax=true;
	$.validationEngine.settings={};

	$("#contact-form").validationEngine({
		inlineValidation: false,
		promptPosition: "centerRight",
		success :  function(){use_ajax=true},
		failure : function(){use_ajax=false;}
	 })

	$("#contact-form").submit(function(e){
			console.log("subject val is "+$('#subject').val());
			if(!$('#subject').val().length)
			{
				$.validationEngine.buildPrompt(".jqTransformSelectWrapper","* This field is required","error")
				return false;
			}
			
			if(use_ajax)
			{
				$('#loading').css('visibility','visible');
				console.log($(this).serializeObject());
				
				
				$.post('/recaptcha',$(this).serializeObject(),
				
					function(data){
						if(parseInt(data)==-1)
							$.validationEngine.buildPrompt("#captcha","* Wrong verification number!","error");
							
						else
						{
							$("#contact-form").hide('slow').after('<h1>Thank you!</h1>');
						}
						
						$('#loading').css('visibility','hidden');
					}
				
				);
			}
			e.preventDefault();
	})

});

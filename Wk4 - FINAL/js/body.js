// JavaScript Document

$(document).ready(function(){

	//Apply JQUERY UI to input controls
	$('input.input')
	.button()
	
	$('#pdesc')
	.button()
	
	$('#tdesc')
	.button()
	
	$('#npdesc')
	.button()
	
	//Add focus and blur to input boxes
	$('input[type!=submit]').on('focus', function() {
			// On first focus, check to see if we have the default text saved
			// If not, save current value to data()
			if (!$(this).data('defaultText')) $(this).data('defaultText', $(this).val())
			.addClass("ui-state-default")
	
			// check to see if the input currently equals the default before clearing it
			if ($(this).val()==$(this).data('defaultText')) $(this).val('');
		});
		$('input[type!=submit]').on('blur', function() {
			// on blur, if there is no value, set the defaultText
			if ($(this).val()=='') $(this).val($(this).data('defaultText')); 
		});


	//REGISTRATION FORM SUBMIT
	$('#signupForm').submit(function(e){
		
		e.preventDefault();
		
		// remove existing tool tips
		$('.errorTip').remove();

		// If a form already submitted:
		if($('#submit').hasClass('active')) return false;

		// show loading gif:
		$('#submit').addClass('active');

		// POST ajax request to register.php:
		$.post($('#signupForm').prop('action'),
			$('#signupForm').serialize()+'&fromRegister=1',function(response){
	
			if(response.status == 0)
			{
				// Some kind of input error occured
				// Looping through all the input text boxes,
				// and checking whether they produced an error
				$('input[type!=submit]').each(function(){
					
					var elem = $(this);
					var id = elem.attr('id');
										
					if(response[id])
						showTooltip(elem,response[id]);	
				});
								
			}else{
				
			if(response.status == 1);
				
				$('#registerForm').fadeOut( "slow" );
				
				//place the new username value in the login username input box
				$('input[name="rusername"]').val(response.username);
				
				//place the new pass value in the login password input box
				$('input[name="rpassword"]').val(response.pass);
				
				//fade in success boy for three seconds then fade him out.
				$('#screenshots').html("You have been successfully registered.");

				//hide quotes				
				$('#quotes').hide();
				
				//trigger the login form submit
				$('span#logtxt').click();
				
				$('#login').submit();
				

				
				
			}
				//JSON comes back for the registration
			$('#submit').removeClass('active');
		},'json');
		
		
	});
	
	//LOGIN FORM SUBMIT FUNCTION
	$('#login').submit(function(e){
	
		e.preventDefault();
		
		// remove existing tool tips
		$('span.logErr').html('');

		// If a form already submitted:
		if($('#rsubmit').hasClass('active')) return false;

		// show loading gif:
		$('#rsubmit').addClass('active');

		// POST ajax request to login.php:
		$.post($('#login').prop('action'),
			$('#login').serialize()+'&fromLogin=1',function(response){		
			
			if(response == "Username or password is incorrect.") 
			{	
					//bad login
					$("span.logErr").html(response).delay(3000).fadeOut();
					$('#rsubmit').removeClass('active');
				
					return false;
			}
					
			// NO PROJECTS to load, prepare project form for new entry
			
			if( (response).indexOf("[:") > -1) {
						
				var userid = response.split(':');
				
				response = response.replace(/\[.*\]/g,'');
				
				$("#screenshots").html( response );
				
				$('#quotes').fadeOut("slow");
				
				$('#registerForm').fadeOut( "slow", function() {
				// Animation complete.
				$('span#logtxt').click();
				
				$('#iconproject').fadeOut("slow");
				//EDIT PROJECT FORM				
				$('#newForm').fadeIn("slow");
				
				$( "#npdate" ).datepicker({
					altField: '#ndateval',
					altFormat: 'yy-mm-dd'
					});
				$('#npstatus').chosen({
					disable_search: true,
					width: "72%"
					});
					
					$('#npname').val("New Project Name");
					$('#npdesc').val('New Description');
					$('#npdate').val("Due Date");
					$('#npstatus').val('');
					$('#npstatus').trigger('chosen:updated');
					$('#neuid').val(userid[1]);		
					
				$('#logtxt').html("LOGOUT");
				$('#logtxt').attr('title', 'Click here to logout');
					
					
					});		
						
				}else{  
				

				//Hide Testimonials
				$('#quotes').fadeOut("slow");
				
				$('#registerForm').fadeOut( "slow", function() {	
				
				$('#iconproject').fadeIn("slow");
				
				//EDIT PROJECT FORM				
				$('#editForm').fadeIn("slow");
				
				$( "#pdate" ).datepicker({
					altField: '#dateval',
					altFormat: 'yy-mm-dd'
					});
				$('#pstatus').chosen({
					disable_search: true,
					width: "72%"
					});
						
			$('#footer').html("Projects can be sorted, simply drag and drop to change the sort order");
				
				});
				
				$('span#logtxt').click();
				$('#logtxt').html("LOGOUT");
				$('#logtxt').attr('title', 'Click here to logout');
				
				$("#screenshots").html( response );

					buildAccord();
				
				$('#accordion h4').first().click();

		}	
			//HTML comes back for the login, as opposed to the registration
			$('#rsubmit').removeClass('active');
		},'html');
		
		
	});	
	
	$('#eForm').submit(function(e){
			
			e.preventDefault();
		
			// If a form already submitted:
			if($('#esubmit').hasClass('active')) return false;
	
			// show loading gif:
			$('#esubmit').addClass('active');
	
			// POST ajax request to edit.php:
			$.post($('#eForm').prop('action'),
				$('#eForm').serialize(),function(response){
				
				$('#screenshots').html(response);
				
			buildAccord();
		
				$('#status').html("Project has been modified.");		
				
				$('#status').fadeIn("slow").delay(3000).fadeOut("slow");
				
				$('#accordion h4').first().click();
		
				//html comes back for the edit
				$('#esubmit').removeClass('active');
				
			},'html');
			
			
		});	
		
		
		$('#npForm').submit(function(e){
			
			e.preventDefault();
		
			// If a form already submitted:
			if($('#newsubmit').hasClass('active')) return false;
	
			// show loading gif:
			$('#newsubmit').addClass('active');
	
			// POST ajax request to edit.php:
			$.post($('#npForm').prop('action'),
			
				$('#npForm').serialize(),function(response){

			//	$('#status').html("");

			//	$('#status').append(response.result);
				
				$('#status').html("Project has been added.");		
				
				$('#status').fadeIn("slow").delay(3000).fadeOut("slow");			
				
				$('#screenshots').html( response );
				
				buildAccord();
		
			//html comes back 
				$('#newsubmit').removeClass('active');
				
				$('#newForm').fadeOut("fast");
				
				$('#editForm').fadeIn("slow");
				
				$( "#pdate" ).datepicker({
					altField: '#dateval',
					altFormat: 'yy-mm-dd'
					});
				$('#pstatus').chosen({
					disable_search: true,
					width: "72%"
					});
				
				$('#iconproject').fadeIn("slow");
				$('#accordion h4').first().click();
				
			},'html');
			
			
		});	
		
	
	
			//Click function for icon tool bar
			$('#iconproject').click(function(e){
			
				//hide task edit form if visible
					if($('#editForm').css('display') === 'block'){ 
 	  					$('#editForm').hide('slow');
						
					}
			
				//hide task edit form if visible
					if($('#newtDiv').css('display') === 'block'){ 
 	  					$('#newtDiv').hide('slow');
						
					}
			
					 $('#newForm').show('slow');
						
				
					$('#npname').val("New Project Name");
					$('#npdesc').val('New Description');
					$('#npdate').val("Due Date");
					$('#npstatus').val('');
					$('#npstatus').trigger('chosen:updated');
				
					
					
					//hidden User ID
					p = $(".uid:first").text();
					console.log("TOOLBAR CLICK - UID "+p);
					$('#neuid').val(p);	
					
							

				$( "#npdate" ).datepicker({
					altField: '#ndateval',
					altFormat: 'yy-mm-dd'
					});

				$('#npstatus').chosen({
					disable_search: true,
					width: "72%"
					});

					
					

		});
		
		
		$('#newTform').submit(function(e){
			
			e.preventDefault();
		
			// If a form already submitted:
			if($('#tsubmit').hasClass('active')) return false;
	
			// show loading gif:
			$('#tsubmit').addClass('active');
	
			// POST ajax request to edit.php:
			$.post($('#newTform').prop('action'),
				$('#newTform').serialize(),function(response){

			//	$('#status').html("");

			//	$('#status').append(response.result);
				
				$('#status').html("Task has been added.");		
				
				$('#status').fadeIn("slow").delay(3000).fadeOut("slow");
				
				
				
				$('#screenshots').html( response );
				
			buildAccord();
		
			//html comes back 
				$('#tsubmit').removeClass('active');
				
				$('#newtDiv').fadeOut("fast");
				
				$('#editForm').fadeIn("slow");
				
				$( "#pdate" ).datepicker({
					altField: '#dateval',
					altFormat: 'yy-mm-dd'
					});
				$('#pstatus').chosen({
					disable_search: true,
					width: "72%"
					});
				
				
				$('#iconproject').fadeIn("slow");
				$('#accordion h4').first().click();
				
			},'html');
			
			
		});		
	
	
		//log in click
		$('span#logtxt').click(function(e){
	
			var logt = $('span#logtxt').html();
	
			if(logt === "LOGOUT" ) {
						
				//instead of page reload just clear containers
				$('#screenshots').html("");
				$(this).html("LOGIN");
				$('#iconproject').fadeOut("fast");
				$('#editForm').fadeOut("fast");
				$('#newForm').fadeOut("fast");
				$('#newtForm').fadeOut("fast");
				landingPage();
				$('#logtxt').attr('title', 'Login here');
				$('#registerForm').fadeIn("fast");
				$('#quotes').fadeIn("fast");
				
				showDate();
				
				showQuotes();
				
				
			}
				
			if($('#login').css('display') === 'none'){ 
			
 		 	 	$('#login').show('fast'); 
				
			} else { 
			
 				$('#login').hide('fast'); 
			}
		
	});
		
		
		showQuotes();
		
		
	
	
	
	
//END DOM READY
  });  
  	

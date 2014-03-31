// JavaScript Document
//functions

//build accordion from screenshots container

function buildAccord(){

			$( "#accordion" ).accordion({ header: "> div > h4",
				heightStyle: "content",
				collapsible: true
				})				
			 .sortable({
				axis: "y",
				handle: "h4",
			
			stop: function( event, ui ) {
			// IE doesn't register the blur when sorting
			// so trigger focusout handlers to remove .ui-state-focus
			ui.item.children( "h4" ).triggerHandler( "focusout" );
			}
			});	
				//set accordion header options
					$("#accordion").accordion("option", "icons",
					{ 'header': 'ui-icon-circle-plus', 'headerSelected': 'ui-icon-circle-minus' });
					
					accordClick();
}

//AUTO POPULATE FIELDS FOR EDITING	FROM ACCORDION CLICK
function accordClick() {
	
		
				$("#accordion h4").bind("click", function() {
					
					//hide task edit form if visible
					if($('#editTform').css('display') === 'block'){ 
 	  					$('#editTform').hide('slow');
						$('#editForm').show('slow'); 
						$('#editHeader').html("Edit Project");
						
					}
						
					//project name
					x = $(this).text();
					x = x.replace("Name: ","");
   				 $('#pname:text').val(x) ;

					//project desc
				y =	$(this).parent().find('.pdesc').text();
					y = y.replace("Description: ","");
   				 $('#pdesc').val(y) ;

					//project due date
				x = $(this).parent().find('.pdate').text();
					x = x.replace("Due Date: ","");
   				 $('#pdate').val(x) ;
				 $('#dateval').val(x);
				 
				 
				//project Status				 
				 
				x = $(this).parent().find('.pstatus').text();
			//	console.log(x);
				x = x.replace("Status: ","");

   			
				//change select box to clicked project value
				$('#pstatus').val(x);
				$('#pstatus').trigger('chosen:updated');
				
				
				//hidden Project ID
				p = $(this).parent().find("[name='pid']").text();
				$('#pid').val(p);
			//	console.log("pid "+p);
				
				//hidden User ID
				p = $(this).parent().find("[name='uid']").text();
				$('#euid').val(p);
			//	console.log("uid "+p);
			
				
				$('#editHeader').html("Edit Project");
				
				});
}




function deleteProject(pid, uid) {
	
		console.log("PID to DELETE "+pid);	
		console.log("UID to Query "+uid);	
		
		$.ajax({
			type: "POST",
			url: "xhr/deleteProject.php",
			data: { pid: pid, uid: uid }
		})
		
		.done(function( response ) {
			
		console.log("Project Deleted: " + pid + " User Query "+uid );
		
		if( (response).indexOf("[:") > -1) {
						
				var userid = response.split(':');
				
				response = response.replace(/\[.*\]/g,'');
				
				$('#editForm').fadeOut("fast");
				
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
					$('#npdate').val("");
					$('#npstatus').val('');
					$('#npstatus').trigger('chosen:updated');
					$('#neuid').val(userid[1]);
		}
		
		
		$('#screenshots').html( response );
		buildAccord();
		
		$('#status').html("Project ID: "+pid+ " has been deleted.");
		
		$('#status').fadeIn("slow").delay(3000).fadeOut( "slow", function() {
							
		$('#status').html("");

				
			});
		
		
		$('#accordion h4').first().click();
		
		});
		
}



// Helper function that creates an error tooltip:
function showTooltip(elem,txt)
{
	// elem is the text box, txt is the error text
	$('<div class="errorTip">').html(txt).appendTo(elem.closest('.formRow'));
}



function showDate(){
	//SET DATE IN FOOTER

		var d = new Date()
var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
var one = weekday[d.getDay()] + " ";
one += d.getDate() + " ";
one += monthname[d.getMonth()] + ". ";
one += d.getFullYear();
    
		$('#footer').html(one);	
		
}


function showQuotes() {
//TESTIMONIAL QUOTE ROTATION	
	var items = (Math.floor(Math.random() * ($('#testimonials li').length)));
	$('#testimonials li').hide().eq(items).show();
	
  function nextQuote(){
		$('#testimonials li:visible').delay(4000).fadeOut('slow',function(){
			$(this).appendTo('#testimonials ul');
			$('#testimonials li:first').fadeIn('slow',nextQuote);
    });
   }
   
  nextQuote();
}

//function to return landing page to normal on logout

function landingPage(){

var htm = '<img src="images/sc1.png" style="float:left; margin: 3px 20px 0px 3px;" /><ul><li>Project Tracking at its best</li><li>Free to use and unlimited projects</li><li>Projects can have unlimited tasks associated</li></ul>';

$('#screenshots').html(htm);

	
}



//Build function for new task form pass in project id
function newTask(pid,uid){ 

			console.log("Click New Task for Project ID " +pid);
			console.log("Click New Task for USER " +uid);
			
			//hide project edit form if visible	
			if($('#editForm').css('display') === 'block'){ 
			
			  $('#editForm').hide('fast'); 
			}
			
			if($('#newForm').css('display') === 'block'){ 
			
			  $('#newForm').hide('fast'); 
			}
			
			$('#newtDiv').show('slow');
			$( "#tdate" ).datepicker({
							altField: '#tdateval',
							altFormat: 'yy-mm-dd'
							});
			$('#tstatus').chosen({
				disable_search: true,
				width: "72%"
				});
				
			$('#tname').val("New Task Name");
			$('#tdesc').val('New Task Description');
			$('#tdate').val("Due Date");
			$('#tstatus').val('');
			$('#tstatus').trigger('chosen:updated');	
				
			$('#tpid').val(pid);
			$('#tuid').val(uid);

}

function deleteTask(tid,uid) {
		console.log("TID to DELETE "+tid);	
		console.log("UID to Query "+uid);	
		
		$.ajax({
			type: "POST",
			url: "xhr/deleteTask.php",
			data: { uid: uid, tid: tid }
		})
		
		.done(function( response ) {
			
		console.log("Task Deleted: " + tid + " User Query "+uid );	
		
		$('#screenshots').html( response );
		
		buildAccord();
		
		$('#status').html("Task ID: "+tid+ " has been deleted.");
		
		$('#status').fadeIn("slow").delay(3000).fadeOut( "slow", function() {
							
				$('#status').html("");

				
			});
		
		
		$('#accordion h4').first().click();
		
	});
}


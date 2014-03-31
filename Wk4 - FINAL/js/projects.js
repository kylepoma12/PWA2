// JavaScript Document

$(document).ready(function(){


 $( "#accordion" ).accordion({ header: "> div > h4",
 	autoheight: true,
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

	

$('input.input')
.button()


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






	
	
	
//END DOM READY
  });
  
  

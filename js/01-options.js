/*
 * 01-options.js - Allow user set options for viewing threads
 *                 (Only auto reload option available for now, script is still open for optimization)
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$(document).ready(function() {
	var open = false;
	var option_content = '<div id="optionView" class="option_container">';
	option_content    += '<div class="option_bg"></div>';
	option_content 	  += '<div id="optionInsideView" class="option_view">';
	option_content 	  += '<span><b><a id="close_options" href="javascript:void(0)">X</a></b></span><br><br>';
	option_content 	  += '<fieldset><legend>Auto update</legend>';
	if (localStorage.autoUpdate == "true") {
	  option_content  += '<input type="checkbox" name="a_update" id="autoUpdate" checked> Auto update thread';
	} else {
	  option_content  += '<input type="checkbox" name="a_update" id="autoUpdate"> Auto update thread';
	}
	option_content    += '</fieldset>';
	option_content    += '</div></div>';
	$('.topmenu').append('<div class="option_text"><a href="javascript:void(0)" id="options">[Options]</a></div>');
	$('body').append(option_content);
	$('#options').on('click', function(e) {
	  if (open) {
	    $('#optionView').css('display', 'none');
	    open = false;
	  } else {
	    $('#optionView').css('display', 'block');
	    open = true;
	  }
	});
	$('#autoUpdate').click(function() {
	  var $this = $(this);
	  if ($this.is(':checked')) {
    	    $('#interValue').attr('disabled', false);
    	    localStorage.autoUpdate = "true";
    	  } else {
    	    $('#interValue').attr('disabled', true);
    	    localStorage.autoUpdate = "false";
          }
	});
	$('#close_options').click(function() {
	  $('#optionView').css('display', 'none');
	  open = false;
	});
	$(document).mouseup(function (e) {
	  var container = $("#optionInsideView");
	  if ((!container.is(e.target)) && (container.has(e.target).length == 0) && (!$('#options').is(e.target))) {
	    $('#optionView').css('display', 'none');
	    open = false;
    	  }
	});
});

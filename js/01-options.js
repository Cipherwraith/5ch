/*
 * 01-options.js - Allow users choose options for viewing threads
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$(document).ready(function() {
	var open = false;
	var option_content = '<div id="optionView" class="option_container">';
	option_content    += '<div class="option_bg"></div>';
	option_content 	  += '<div id="optionInsideView" class="option_view">';
	option_content 	  += '<span><b><a id="close_options" href="javascript:void(0)">X</a></b></span><br><br>';
	option_content 	  += '<input type="checkbox" name="blink_open" id="bOpen" '+ ((localStorage.backlinkOpen=="true")?'checked':'') +'>' + _("レスへのリンクを新しいページで開く") + '<br><br>';
	option_content 	  += '<input type="checkbox" name="auto_post" id="aPost" '+ ((localStorage.autoPost=="true")?'checked':'') +'>' + _("新着レス自動表示") + '<br><br>';
	option_content 	  += '<fieldset><legend>' + _("自動更新") + '</legend>';
	if (localStorage.autoUpdate == "true") {
	  option_content  += '<input type="checkbox" name="a_update" id="autoUpdate" checked>' + '   ';
	  option_content  += '<input type="number" id="interValue" maxlength="2" min="0" max="99" style="width: 50px;" value="'+localStorage.reloadInterval+'"> ' + _("秒間隔で自動更新する");
	} else {
	  option_content  += '<input type="checkbox" name="a_update" id="autoUpdate">' + '   ';
	  option_content  += '<input type="number" id="interValue" maxlength="2" min="0" max="99" style="width: 50px;" value="'+localStorage.reloadInterval+'" disabled> ' + _("秒間隔で自動更新する");
	}
	option_content    += '</fieldset>';
	option_content    += '</div></div>';
	$('.topmenu').append('<div id="options" class="option_text">' + _("[オプション]") + '</div>');
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
	$('#bOpen').click(function() {
		var $this = $(this);
		if ($this.is(':checked')) {
			localStorage.backlinkOpen = "true";
		} else {
			localStorage.backlinkOpen = "false";
		}
	});
	$('#aPost').click(function() {
		var $this = $(this);
		if ($this.is(':checked')) {
			localStorage.autoPost = "true";
		} else {
			localStorage.autoPost = "false";
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
	$("#interValue").on('keyup keypress blur change', function(e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			// input was not number
			return false;
		} else {
			if($("#interValue").val() > 0) {
				localStorage.reloadInterval = $("#interValue").val();
			}
			if($(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
				// input can be backspace
				return false;
			}
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

/*
 * 01-ajax.js - Submit post over ajax
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	if (!localStorage.autoPost)
    localStorage.autoPost = "false";
  $('body').append('<div id="notific" style="display:none;position:fixed;bottom:45%;width:100%;text-align:center;z-index:20;"><a id="ntxt" style="color:white;"></a></div>');
  $('form').on('submit', function (e) {
	  if(localStorage.autoPost == "true") {
	    var $form = $(e.target);
	    var submit_txt = $(this).find('input[type="submit"]').val();
	    var formData = $('form').serialize();
	    e.preventDefault ? e.preventDefault() : e.returnValue = false;
	    $.ajax({
	      url: $form.attr('action'),
	      beforeSend: function( xhr ) {
			    xhr.overrideMimeType("application/x-www-form-urlencoded; charset=Shift_JIS");
			  },
	      dataType: 'text',
	      type: 'post',
	      data: formData,
	      success: function (cc) {
					$(document).trigger('new_post', this);
					$('#notific').css('display','block');
					$('#ntxt').text(_('書き込みが完了しました'));
					$('#ntxt').css('background-color','#489000');
					$('#notific').fadeOut(4000, function() {
				    $('#notific').css('display','none');
				  });
	      	$('form input[type="text"]').val('');
	      	$('form textarea').val('');
					$('form').find('input[type="submit"]').val(_(submit_txt));
					$('form').find('input[type="submit"]').attr('disabled', false);
	      },
	      error: function(xhr, status, er) {
					$('#notific').css('display','block');
					$('#ntxt').text(_('書き込みに失敗しました'));
					$('#ntxt').css('background-color','#E60000');
					$('#notific').fadeOut(4000, function() {
				    $('#notific').css('display','none');
				  });
					$('form').find('input[type="submit"]').val(_(submit_txt));
					$('form').find('input[type="submit"]').removeAttr('disabled');
	      }
	    });
	    $('form').find('input[type="submit"]').val(_('Posting...'));
	    $('form').find('input[type="submit"]').attr('disabled', true);
	  }
  });
});

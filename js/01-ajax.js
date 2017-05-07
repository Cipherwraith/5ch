/*
 * 01-ajax.js - Submit post over ajax
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	if (!localStorage.autoPost)
    localStorage.autoPost = "false";
  $('body').append('<div id="notific" style="display:none;position:fixed;top:5%;width:100%;z-index:20;font-weight:bold;color:yellow;"><div id="ntxt" style="background-color:#404040;width:18%;margin:0 auto;border-radius:15px;text-align:center;"></div></div>');
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
					$(document).trigger('notification', '書き込みが完了しました');
	      	$('form input[type="text"]').val('');
	      	$('form textarea').val('');
					$('form').find('input[type="submit"]').val(_(submit_txt));
					$('form').find('input[type="submit"]').attr('disabled', false);
	      },
	      error: function(xhr, status, er) {
	      	$(document).trigger('notification', '書き込みに失敗しました');
					$('form').find('input[type="submit"]').val(_(submit_txt));
					$('form').find('input[type="submit"]').removeAttr('disabled');
	      }
	    });
	    $('form').find('input[type="submit"]').val(_('Posting...'));
	    $('form').find('input[type="submit"]').attr('disabled', true);
	  }
  });
	$(document).on('notification', function(e, data) {
		$('#notific').stop(true, true);
		$('#notific').css('display','block');
		$('#ntxt').html(_(data));
		$('#notific').fadeOut(5000, function() {
	    $('#notific').css('display','none');
	  });
	});
});

/*
 * 01-ajax.js - Submit post over ajax
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	$(function() {
	  $('form').on('submit', function (e) {
	    var $form = $(e.target);
	    var submit_txt = $(this).find('input[type="submit"]').val();
	    var formData = $('form').serialize();
	    e.preventDefault();
	    $.ajax({
	      url: $form.attr('action'),
	      dataType: 'text',
	      type: 'post',
	      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	      data: formData,
	      success: function (cc) {
					$(document).trigger('new_post', this);
	      	$('form input[type="text"]').val('');
	      	$('form textarea').val('');
					$('form').find('input[type="submit"]').val(_('Posted'));
					$('form').find('input[type="submit"]').attr('disabled', false);
	      },
	      error: function(xhr, status, er) {
					alert(_("Error, please check post and try again"));
					$('form').find('input[type="submit"]').val(_(submit_txt));
					$('form').find('input[type="submit"]').removeAttr('disabled');
				}
	    });
	    $('form').find('input[type="submit"]').val(_('Posting...'));
	    $('form').find('input[type="submit"]').attr('disabled', true);
	  });
	});
});

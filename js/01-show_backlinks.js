/*
 * 01-show_backlinks.js - Show reply links beside posts' (with replies) header. Initial State.
 *												Backlinks will soon be enhanced with hover feature.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	$('body').find('div.post').each(function() {
		check_backlinks(this);
	});
	function check_backlinks(post) {
		var id = $(post).data('id');
		var regExp = /\>\>[1$-9]{1,3}($|\s)/g;
		// Finds all reply in the message based on regex. Reply Format: ">>{n}"
		// regex: Where 0 < n < 1000, n should have white_space OR NULL on the right and any on the left (Based on how reply is created in threads)
		var msg_reply = $(post).find('.message').text().match(regExp);
		if (msg_reply) {
			msg_reply.forEach(function(e){
				e = e.trim().replace('>>','');
				$('[data-id="' + e + '"]').find('.date').append('<span class="back-links"><a href="' + document.location + "/" + id + '">>>' + id + '</a></span>');
			});
		}
	}
	$(document).on('check_reply', function(e, post) {
		check_backlinks(post);
	});
});
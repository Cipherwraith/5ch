/*
 * 01-highlight.js - Highlight posts with the same ID by clicking ID.
 *									 Always available, no local storage variable.
 * 
 * Copyright (c) 2017 Lance Link <lance@bytesec.org>
 */
$(document).ready(function() {
	$(document).on('click', '.uid', function() {
		var tid = $(this).parent().parent().data('userid');
		$('.uid').parent().parent().removeClass("highlightpost");
		$('*[data-userid="'+tid+'"]').addClass('highlightpost');
	});

  // Needs new_post trigger to highlight if new
  // post is same with clicked ID
});

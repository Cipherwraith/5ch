$('document').ready(function () {
	$(function() {
	  $('form').on('submit', function (e) {
	    var $form = $(e.target);
	    // A bit hacky since I hard coded the submit value in that format (that value is hardcoded to bbscgi script)
	    var formData = $('form').serialize()+"&submit=%E6%9B%B8%E3%81%8D%E8%BE%BC%E3%82%80";
	    e.preventDefault();
	    var updateProgress = function(e) {
				var percentage;
				if (e.loaded === undefined) { // Firefox
					percentage = Math.round(e.loaded * 100 / e.total);
				} else { // Chrome?
					percentage = Math.round(e.loaded * 100 / e.total);
				}
				// This loading is not working very well yet
				// $('form').find('input[type="submit"]').val('Posting... (#%)').replace('#', percentage);
				$('form').find('input[type="submit"]').val('Posting...');
			};
	    $.ajax({
	      url: $form.attr('action'),
	      dataType: 'text',
	      type: 'post',
	      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	      data: formData,
	      xhr: function() {
					var xhr = $.ajaxSettings.xhr();
					if(xhr.upload) {
						xhr.upload.addEventListener('progress', updateProgress, false);
					}
					return xhr;
				},
	      success: function (cc) {
					// Reload the body after 3sec (there is 5sec waiting thing on bbscgi, I tried reloading 3sec)
					setTimeout(function() {
						$('body').load(window.location.href);
					}, 3000);
	      }
	    });
	  });
	});
});

$('document').ready(function () {
	$(function() {
	  $('form').on('submit', function (e) {
	    var $form = $(e.target);
	    var submit_txt = $(this).find('input[type="submit"]').val();
	    // A bit hacky since I hard coded the submit value in that format (that value is hardcoded in bbscgi script)
	    var formData = $('form').serialize()+"&submit=%E6%9B%B8%E3%81%8D%E8%BE%BC%E3%82%80";
	    e.preventDefault();
	    $.ajax({
	      url: $form.attr('action'),
	      dataType: 'text',
	      type: 'post',
	      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	      data: formData,
	      success: function (cc) {
					// Reload the body after 3sec (there is 5sec waiting thing on bbscgi, I tried reloading 3sec)
					setTimeout(function() {
						$('form').find('input[type="submit"]').val('Posted');
						location.reload();
					}, 3000);
	      },
	      error: function(xhr, status, er) {
					console.log(xhr);
					alert("Error, please check post and try again");
					$('form').find('input[type="submit"]').val(submit_txt);
					$('form').find('input[type="submit"]').removeAttr('disabled');
				}
	    });
	    $('form').find('input[type="submit"]').val('Posting...');
	    $('form').find('input[type="submit"]').attr('disabled', true);
	  });
	});
});

/*
 * 01-auto_reload.js - Auto reload thread on {n} time. Can be set in Options.
 *                     (5 seconds default interval, reload algorithm will be optimized soon)
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
  function reload_thread() {
    $.ajax({
      url: document.location,
      success: function(data) {
        $(data).find('div.post').each(function() {
          var id = $(this).data('id');
          if ($('[data-id="' + id + '"]').length == 0) {
            $('.thread').append(this);
            $(document).trigger('check_reply', this);
          }
        });
      }
    });
  };
  $(document).on('new_post', function(e, post) {
    reload_thread();
  });
  if (!localStorage.autoUpdate)
    localStorage.autoUpdate = "true";
  setInterval(function() {
    if (localStorage.autoUpdate == "true")
      reload_thread();
  }, 5000);
});

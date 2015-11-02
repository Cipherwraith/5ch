/*
 * 01-auto_reload.js - Auto reload thread on {n} time. Can be set in Options.
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
    setTimeout(function(){ reload_thread(); }, 2000); // Delaying to fetch the posted data successfully, (bbs.cgi adjustment would be great C: )
  });
  if (!localStorage.autoUpdate)
    localStorage.autoUpdate = "true";
  if (!localStorage.reloadInterval)
    localStorage.reloadInterval = 5;
  var reload_interval = function() {
    clearInterval(interval);
    reload_thread();
    interval = setInterval(reload_interval, (localStorage.reloadInterval*1000));
  }
  var interval = setInterval(reload_interval, localStorage.reloadInterval);
});

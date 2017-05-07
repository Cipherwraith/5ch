/*
 * 01-auto_reload.js - Auto reload thread on {n} time. Can be set in Options.
 *                     Auto reload interval grow
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
  if (!localStorage.autoUpdate)
    localStorage.autoUpdate = "false"; // Auto reload turned off by default
  if (!localStorage.reloadInterval)
    localStorage.reloadInterval = 5;
  localStorage.reloadInterval = 5; // Always set reload interval to 5 even on refresh
  var first_newpost_id = 0;
  var new_post_ctr = 0;
  function reload_thread() {
    $.ajax({
      url: document.location,
      dataType: 'text',
      cache: false,
      success: function(response) {
        var c_length = ($(response).find('div.post').length)-1;
        new_post_ctr = 0;
        first_newpost_id = 0;
        $(response).find('div.post').each(function(index, element) {
          var id = $(this).data('id');
          if ($('[data-id="' + id + '"]').length == 0) {
            $('.thread').append(this);
            new_post_ctr = new_post_ctr + 1;
            if (first_newpost_id == 0)
              first_newpost_id = id;
            $(document).trigger('check_reply', this);
            $(document).trigger('mobile_view', this);
            $(document).trigger('check_tree_view', this);
            if (localStorage.autoUpdate == "true")
              localStorage.reloadInterval = 5;
          } else {
            if (localStorage.autoUpdate == "true") {
              if(index == c_length) {
                if(localStorage.reloadInterval < 159) {
                  localStorage.reloadInterval = (localStorage.reloadInterval*2);
                } else {
                  localStorage.reloadInterval = 5;
                }
              }
            }
          }
        });
        if (new_post_ctr > 0)
          $(document).trigger('notification', '+'+new_post_ctr+'件 の新着レス <a id="s_view" onclick="s_view('+first_newpost_id+');" href="javascript:void(0)" style="text-decoration:none;color:white;">▼</a>');
      new_post_ctr = 0;
      first_newpost_id = 0;
      },
      error: function(xhr, status, er) {
        $(document).trigger('notification', '新しい記事を取得エラー');
        $('form').find('input[type="submit"]').val(_(submit_txt));
        $('form').find('input[type="submit"]').removeAttr('disabled');
      }
    });
  }
  $(document).on('new_post', function(e, post) {
    setTimeout(function(){ reload_thread(); }, 2000); // Delaying to fetch the posted data successfully, (bbs.cgi adjustment would be great C: )
  });
  var reload_interval = function() {
    clearInterval(interval);
    if (localStorage.autoUpdate == "true")
      reload_thread();
    interval = setInterval(reload_interval, (localStorage.reloadInterval*1000));
  }
  var interval = setInterval(reload_interval, localStorage.reloadInterval);
});
function s_view(first_newpost_id) {
  $("#"+first_newpost_id).get(0).scrollIntoView();
}

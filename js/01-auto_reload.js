/*
 * 01-auto_reload.js - Auto reload thread on {n} time. Can be set in Options.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
  if (!localStorage.autoUpdate)
    localStorage.autoUpdate = "true";
  if (!localStorage.reloadInterval)
    localStorage.reloadInterval = 5;
  localStorage.reloadInterval = 5; // Always set reload interval to 5 even on refresh
  function reload_thread() {
    $.ajax({
      url: document.location,
      dataType: 'text',
      cache: false,
      success: function(response) {
        var c_length = ($(response).find('div.post').length)-1;
        $(response).find('div.post').each(function(index, element) {
          var id = $(this).data('id');
          if ($('[data-id="' + id + '"]').length == 0) {
            $('.thread').append(this);
            $(document).trigger('check_reply', this);
            $(document).trigger('mobile_view', this);
            if (localStorage.autoUpdate == "true")
              localStorage.reloadInterval = 5;
          } else {
            if (localStorage.autoUpdate == "true") {
              if(index == c_length) {
                if(localStorage.reloadInterval > 79) {
                  localStorage.reloadInterval = (localStorage.reloadInterval*2);
                } else {
                  localStorage.reloadInterval = 5;
                }
              }
            }
          }
        });
      },
      error: function(xhr, status, er) {
        $('#notific').css('display','block');
        $('#ntxt').text(_('新しい記事を取得エラー'));
        $('#ntxt').css('background-color','#E60000');
        $('#notific').fadeOut(4000, function() {
          $('#notific').css('display','none');
        });
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

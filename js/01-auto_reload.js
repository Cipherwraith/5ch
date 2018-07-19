/*
 * 01-auto_reload.js - Auto reload thread on ajax post
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
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
            $('.thread').append("<br>");
            $('.thread').append(this);
            new_post_ctr = new_post_ctr + 1;
            if (first_newpost_id == 0)
              first_newpost_id = id;
            $(document).trigger('check_reply', this);
            $(document).trigger('check_tree_view', this);
          }
        });
        if (new_post_ctr > 0)
          $(document).trigger('notification', '+'+new_post_ctr+'件 の新着レス <a id="s_view" onclick="s_view('+first_newpost_id+');" href="javascript:void(0)" class="asetting_1">▼</a>');
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
});
function s_view(first_newpost_id) {
  $("#"+first_newpost_id).get(0).scrollIntoView();
}

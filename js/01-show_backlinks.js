/*
 * 01-show_backlinks.js - Show reply links beside posts header.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
var mobile = "false"; // needs to be here :D
$('document').ready(function () {
  if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, ''); 
    }
  }
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
      for(var ii = 0; ii<msg_reply.length; ii++) {
        e = msg_reply[ii].trim().replace('>>','');
        if (e == id) return true;
        if (mobile == "true") {
          $('[data-id="' + e + '"]').find('.date').parent().append('<span class="back-links"><a style="font-size:0.625em;" target="_blank" data-tooltip="'+id+'" href="'+$('#zxcvtypo').val()+"/"+id+'" onclick="highlightReply('+id+', \'hover\', event);">>>' + id + '</a></span>');
        } else {
          $('<span class="back-links"><a style="font-size:0.625em;" target="_blank" data-tooltip="'+id+'" href="'+$('#zxcvtypo').val()+"/"+id+'" onclick="highlightReply('+id+', \'hover\', event);">>>' + id + '</a></span>').insertBefore($('[data-id="' + e + '"]').find('.message'));
        }
      }
    }
  }
  $(document).on('check_reply', function(e, post) {
    check_backlinks(post);
  });
});
function highlightReply(id, where, event) {
  if (!localStorage.backlinkOpen)
    localStorage.backlinkOpen = "true";
  if (localStorage.backlinkOpen == "false") {
    // Reposition page view to div id of clicked backlink if visible
    if($('#'+id).length != 0) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      $('#'+where+'-' + id).remove();
      $("#"+id).get(0).scrollIntoView();
    } else {
      // Open link if not visible bypassing set option
      $(this).trigger('click');
    }
  }
}

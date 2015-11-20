/*
 * 01-show_backlinks.js - Show reply links beside posts' (with replies) header.
 *                        Add hover view to backlinks and reply links in a message.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
var mobile = "false"; // temporary
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
          $('[data-id="' + e + '"]').find('.date').parent().append('<span class="back-links"><a data-tooltip="'+id+'" href="'+$('#zxcvtypo').val()+"/"+id+'" onclick="highlightReply('+id+', \'hover\', event);">>>' + id + '</a></span>');
        } else {
          $('<span class="back-links"><a data-tooltip="'+id+'" href="'+$('#zxcvtypo').val()+"/"+id+'" onclick="highlightReply('+id+', \'hover\', event);">>>' + id + '</a></span>').insertBefore($('[data-id="' + e + '"]').find('.message'));
        }
        // Add hover to backlink
        $('[data-tooltip="' + id + '"]').hover(function(e) {
          if ($('[data-id="' + id + '"]').length==0)
            return true;
          var div_content = $("<div />").append($('[data-id="' + id + '"]').html()).html();
          $(this).parent().append('<div id="hover-' + id + '" class="hoverAppend">'+ div_content +'</div>');
          $('#hover-' + id).css({
            left: e.pageX + 1,
            top: e.pageY + 1
          }).stop().show(200);
          $('.hoverAppend').mouseleave(function() {
            $('.hoverAppend').remove();
          });
        }, function() {
          if ($('.hoverAppend:hover').length == 0) {
            $('.hoverAppend').remove();
          }
        });
      }
    }
  }
  // Loop to add hover to reply link in all messages
  $('.thread').find('.post').find('.message').find('a').each(function() {
    check_reply_links(this);
  });

  function check_reply_links(link) {
    var regExp = /\>\>[1$-9]{1,3}($|\s)/g;
    if ($(link).text().match(regExp)) {
      var id = $(link).text().substring(2);
      $(link).click(function(e) {
        highlightReply(id, "reply", e);
      });
      $(link).mouseenter(function(){
        if (localStorage.treeView == "true")
          return true;
        clearTimeout($(link).data('timeoutId'));
        setup_hover(id, link);
      }).mouseleave(function(){
        if (localStorage.treeView == "true")
          return true;
        var someElement = $(link),
        timeoutId = setTimeout(function(){
          if ($('[data-ha="' + id + '"]').hasClass('own'+id))
            return false;
          $('[data-ha="' + id + '"]').remove();
        }, 300);
        someElement.data('timeoutId', timeoutId);
      });
    }
  }

  function hover_recur_check(id) {
    $('[data-ha="' + id + '"]').find('.message').find('a').each(function() {
      var regExp = /\>\>[1$-9]{1,3}($|\s)/g;
      var r_link = this;
      if ($(r_link).text().match(regExp)) {
        var idd = $(r_link).text().substring(2);
        $(r_link).click(function(e) {
          highlightReply(idd, "reply", e);
        });
        $(r_link).mouseenter(function(){
        if (localStorage.treeView == "true")
          return true;
        clearTimeout($(r_link).data('timeoutId2'));
        setup_hover(idd, r_link);
        }).mouseleave(function(){
          if (localStorage.treeView == "true")
            return true;
          var someElement = $(r_link),
          timeoutId2 = setTimeout(function(){
            if ($('[data-ha="' + idd + '"]').hasClass('own'+idd))
              return false;
            $('[data-ha="' + idd + '"]').remove();
          }, 300);
          someElement.data('timeoutId2', timeoutId2);
        });
      }
    });
  }

  function setup_hover(id, link) {
    var div_content;
    if ($('[data-id="' + id + '"]').length==0) {
      $.ajax({
      url: $('#zxcvtypo').val()+"/"+id,
      dataType: 'text',
      cache: false,
      success: function(rsp) {
        div_content = $(rsp).filter('.thread').html();
        append_with_event();
      },
      error: function(xhr, status, er) {
        return false;
        $('#notific').css('display','block');
        $('#ntxt').text(_('ポストを得ることができません'));
        $('#ntxt').css('background-color','#E60000');
        $('#notific').fadeOut(4000, function() {
          $('#notific').css('display','none');
        });
        $('form').find('input[type="submit"]').val(_(submit_txt));
        $('form').find('input[type="submit"]').removeAttr('disabled');
      }
    });
    } else {
      div_content = $("<div />").append($('[data-id="' + id + '"]').html()).html();
      append_with_event();
    }
    function append_with_event() {
      $(link).after('<div id="reply-' + id + '" class="hoverAppend" data-ha="'+id+'" style="min-width:600px !important;">' + div_content + '</div>');
      $('#reply-' + id).css({ left: e.pageX - 5, top: e.pageY - 5 }).stop().show(200);
      hover_recur_check(id); // check hover recursion
      $('[data-ha="' + id + '"]').mouseenter(function(){
        $('[data-ha="' + id + '"]').addClass('own'+id);
      }).mouseleave(function(){
        $('[data-ha="' + id + '"]').remove();
      });
    }
  }

  $(document).on('check_reply', function(e, post) {
    check_backlinks(post);
    $(post).find('.message').find('a').each(function() {
      check_reply_links(this);
    });
  });
  $(".back-links > a").css('font-size','0.625em'); // make only .backlinks > a affected with font size css
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

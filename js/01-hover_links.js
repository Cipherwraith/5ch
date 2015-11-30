/*
 * 01-hover_links.js - Show hover view to reply links and backlinks.
 *                     Supports recursive hover.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
  $(document).on({
    mouseenter: function(ev) {
      var post    = this;
      var regExp  = /\>\>[1$-9]{1,3}($|\s)/g;
      if ($(post).text().match(regExp)) {
        clearTimeout($(post).data('timeoutId'));
        var id    = $(post).text().substring(2);
        var div_content;
        $(post).click(function(e) {
          highlightReply(id, "reply", e);
        });
        function append_with_event() {
          var post_hover   = $('<div id="reply-' + id + '" class=post_hover data-ha="' + id + '">'+div_content+'</div>');
          $("body").append(post_hover);
          // Hover position computation (credit: 8chan)
          var previewWidth = post_hover.outerWidth(true);
          var widthDiff    = previewWidth - post_hover.width();
          var linkLeft     = $(post).offset().left;
          var left, top;
          if (linkLeft < $(document).width() * 0.7) {
            left = linkLeft + $(post).width();
            if (left + previewWidth > $(window).width()) {
              post_hover.css('width', $(window).width() - left - widthDiff);
            }
          } else {
            if (previewWidth > linkLeft) {
              post_hover.css('width', linkLeft - widthDiff);
              previewWidth = linkLeft;
            }
            left = linkLeft - previewWidth;
          }
          top = $(post).offset().top - 10;
          var scrollTop = $(window).scrollTop();
          if(top < scrollTop + 15) {
            top = scrollTop;
          } else if(top > scrollTop + $(window).height() - post_hover.height() - 15) {
            top = scrollTop + $(window).height() - post_hover.height() - 15;
          }
          if (post_hover.height() > $(window).height()) {
            top = scrollTop;
          }
          // End of hover position computation
          post_hover.css('left', left);
          post_hover.css('top', top);
          post_hover.css("cursor","pointer");
          post_hover.css("display","none");
          post_hover.fadeIn("fast");
          if(!$('#reply-' + id).hasClass('vis')) {
            $('#reply-' + id).addClass('vis');
          }
          $('[data-ha="' + id + '"]').mouseenter(function() {
            $('[data-ha="' + id + '"]').addClass('own' + id);
          }).mouseleave(function() {
            $('[data-ha="' + id + '"]').remove();
          });
        }
        if ($('[data-id="' + id + '"]').length==0) {
          $.ajax({
            url: $('#zxcvtypo').val()+"/"+id,
            dataType: 'text',
            cache: false,
            success: function(rsp) {
              if ($(rsp).find('#'+id).length > 0) {
                div_content = $(rsp).filter('.thread').html();
                var content = $(div_content).not('div.treeView').clone();
                content     = $('<div></div>').append(content);
                $(content).find('.message').find('.hoverAppend').remove();
                $(content).find('.back-links').find('.hoverAppend').remove();
                div_content = content.html();
              } else {
                return false;
              }
              append_with_event();
            },
            error: function(xhr, status, er) {
              $(document).trigger('notification', 'ポストを得ることができません');
              $('form').find('input[type="submit"]').val(_(submit_txt));
              $('form').find('input[type="submit"]').removeAttr('disabled');
              return false;
            }
          });
        } else {
          var content = $('#'+id+' > *').not('div.treeView').clone();
          content     = $('<div></div>').append(content);
          $(content).find('.message').find('.hoverAppend').remove();
          $(content).find('.back-links').find('.hoverAppend').remove();
          div_content = content.html();
          append_with_event();
        }
      }
    },
    mouseleave: function() {
      var id          = $(this).text().substring(2);
      var someElement = $(this),
      timeoutId       = setTimeout(function() {
        if ($('[data-ha="' + id + '"]').hasClass('own' + id))
          return false;
        $('[data-ha="' + id + '"]').remove();
        }, 300);
      someElement.data('timeoutId', timeoutId);
    }
  }, 'a');
});

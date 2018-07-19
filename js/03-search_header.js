/*
 * 03-search_header.js - functionalities for 5ch search header
 * 
 * Copyright (c) 2017 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
  $('#search-button').on('click', function() {
    var search_data = location.protocol + '//find.5ch.net/search?q=' + encodeURI($('#search-text').val());
    var win = window.open(search_data, '_blank');
    if (win) {
      win.focus(); // allowed
    } else {
      alert(_('このウェブサイトのポップアップを許可してください')); // blocked
    }
  });
  $('#search-text').bind("enterKey",function(e) {
    var search_data = location.protocol + '//find.5ch.net/search?q=' + encodeURI($('#search-text').val());
    var win = window.open(search_data, '_blank');
    if (win) {
      win.focus(); // allowed
    } else {
      alert(_('このウェブサイトのポップアップを許可してください')); // blocked
    }
  });
  $('#search-text').keyup(function(e) {
    if(e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
  $('<a class="searchform_input-close hidden" href="#"><i class="fa fa-close"><img src="//penguin.5ch.net/images/close-search.png"/></i></a>').insertBefore('.navbar-header #search-text');

   $(document ).on("keyup", "#search-text", function() {
         if ($('#search-text').val()!="") {
            $('.searchform_input-close').removeClass('hidden');
         } else {
            $('.searchform_input-close').addClass('hidden');
         }     
   });
   $(document).on("click", ".searchform_input-close", function() {
      $('.searchform_input-close').addClass('hidden');
      $('#search-text').val('').focus();
      return false;
   });
   var $window = $(window); 
   var $pane   = $('body'); 
   var windowsize = $window.width(); 
   if (windowsize < 768) { 
	   $("#mySetting").prepend('<a id="optsetting-link"><img class="dropBtnSetting settingDrop searchright" src="//penguin.5ch.net/images/icon_settings.png">' + _('設定') + '</a>');
   } else {
	   $("#optsetting-link").remove();
   }

  var r_logout = '<div class="search-login">';
  r_logout +=     '<a href="http://login.5ch.net" target="_blank" class="irlog_1">';
  r_logout +=     '<img src="//penguin.5ch.net/images/icon_login.png" class="irlog_2">';
  r_logout +=     '<span>' + _('ログイン') + '</span>';
  r_logout +=    '</a>';
  r_logout +=   '</div>';

  $('.search-right').prepend(r_logout);

  var r_premium = '<div class="search-premium">';
  r_premium +=      '<span>';
  r_premium +=      '<a href="https://premium.5ch.net" target="_blank" class="irlog_3">';
  r_premium +=      '<img src="//penguin.5ch.net/images/icon_premium_disable.png" class="irlog_4">';
  r_premium +=      '<span class="irlog_5">';
  r_premium +=        _('プレミアムサービス');
  r_premium +=       '</span>';
  r_premium +=      '</a>';
  r_premium +=      '</span>';
  r_premium +=    '</div>';

  $('.search-right').prepend(r_premium);
});

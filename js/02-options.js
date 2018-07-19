/*
 * 01-options.js - Allow users choose options for viewing threads
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$(document).ready(function() {
	var open = false;
	var parts = location.hostname.split('.');
	var subdomain = parts.shift();
	var upperleveldomain = parts.join('.');
	var option_content = '<div id="optionView" class="option_container_style">';
	option_content    += '<div class="option_container_bg"></div>';
	option_content 	  += '<div id="optionInsideView" class="option_container_view">';
	option_content 	  += '<div class="option_style_1">';
	option_content 	  +=   '<div class="option_style_2">閲覧設定</div>';
	option_content 	  +=   '<div class="option_style_3">';
	option_content 	  +=     '<a id="close_options" href="javascript:void(0)">';
	option_content 	  +=       '<img src="//penguin.5ch.net/images/icon_close.png">';
	option_content 	  +=     '</a>';
	option_content 	  +=   '</div>';
	option_content 		+= '</div>';
	option_content		+= '<div class="option_style_4">';
	option_content		+= '<div class="option_style_5">';
	option_content		+=   '<input type="checkbox" name="blink_open" class="option_style_6" id="bOpen" '+ ((localStorage.backlinkOpen=="true")?'checked':'') +'>';
	option_content		+=   'レスへのリンクを新しいページで開く';
	option_content		+= '</div>';
	option_content		+= '<div class="option_style_7">';
	option_content		+=   '<input type="checkbox" name="tree_view" class="option_style_6" id="tView" '+ ((localStorage.treeView=="true")?'checked':'') +'>';
	option_content		+=   'ツリー表示';
	option_content		+= '</div>';
	option_content		+= '<div class="option_style_8">';
	option_content		+=   '<input type="checkbox" name="auto_post" class="option_style_6" id="aPost" '+ ((localStorage.autoPost=="true")?'checked':'') +'>';
	option_content		+=   'ページ遷移せずに書き込む';
	option_content		+= '</div>';
	option_content		+= '<div class="option_style_7">';
	option_content		+=   '<div class="hoverlay option_style_10"></div>'; // Not logged in
	option_content		+=   '<hr>';
	option_content		+=   '<div class="option_style_14">Roninユーザーのみ設定できます</div>'; // Not logged in notice
	option_content  	+=   '<input type="checkbox" class="option_style_6" disabled>';
	option_content  	+=   '<input type="number" class="option_style_9" maxlength="2" min="0" max="99" value="" disabled> ' + _("秒間隔で自動更新する");
	option_content		+= '</div>';
	option_content		+= '</div>';
	option_content		+= '<div class="option_style_11">';
	option_content		+=   '<button id="saveOptions" class="option_style_12">変更を保存</button>';
	option_content		+=   '<button id="cancelOptions" class="option_style_13">キャンセル</button>';
	option_content		+= '</div>';
	option_content		+= '</div>';
	option_content		+= '</div>';
	$('body').append(option_content);
	$('.option_text').removeAttr('style').css('position','fixed');
	$('.option_text').css({'position':'absolute'});
	$('.option_view').css({'height':'270px'});

	// Temporary move down right--ad
	$('.ad--right').css('top', '110px;');
	// End Temporary move down right--ad

	$('#options').on('click', function(e) {
	  if (open) {
	    $('#optionView').css('display', 'none');
	    open = false;
			$(".arrow-triangle").hide();
	  } else {
	    $('#optionView').css('display', 'block');
	    open = true;
			$(".arrow-triangle").hide();
	  }
	});

	$('#close_options').click(function() {
		if (localStorage.backlinkOpen == "true") {
  		$('#bOpen').prop('checked', true);
  	} else {
  		$('#bOpen').prop('checked', false);
  	}

  	if (localStorage.treeView == "true") {
  		$('.treeView').css({'display':'block'});
  		$('#tView').prop('checked', true);
  	} else {
  		$('.treeView').css({'display':'none'});
  		$('#tView').prop('checked', false);
  	}

		if (localStorage.autoPost == "true") {
  		$('#aPost').prop('checked', true);
  	} else {
  		$('#aPost').prop('checked', false);
  	}

	  $('#optionView').css('display', 'none');

	  open = false;
	});
  $('#cancelOptions').on('click', function() {
  	if (localStorage.backlinkOpen == "true") {
  		$('#bOpen').prop('checked', true);
  	} else {
  		$('#bOpen').prop('checked', false);
  	}

  	if (localStorage.treeView == "true") {
  		$('.treeView').css({'display':'block'});
  		$('#tView').prop('checked', true);
  	} else {
  		$('.treeView').css({'display':'none'});
  		$('#tView').prop('checked', false);
  	}

		if (localStorage.autoPost == "true") {
  		$('#aPost').prop('checked', true);
  	} else {
  		$('#aPost').prop('checked', false);
  	}

    $('#optionView').css('display', 'none');

    open = false;
  });

  $('#saveOptions').on('click', function() {
  	if ($('#bOpen').is(":checked")) {
		  localStorage.backlinkOpen = "true";
		} else {
			localStorage.backlinkOpen = "false";
		}

		if ($('#tView').is(":checked")) {
		  $('.treeView').css({'display':'block'});
			localStorage.treeView = "true";
		} else {
			$('.treeView').css({'display':'none'});
			localStorage.treeView = "false";
		}

		if ($('#aPost').is(":checked")) {
		  localStorage.autoPost = "true";
		} else {
			localStorage.autoPost = "false";
		}

    $('#optionView').css('display', 'none');
    open = false;
  });

	$(document).mouseup(function (e) {
	  var container = $("#optionInsideView");
	  if ((!container.is(e.target)) && (container.has(e.target).length == 0) && (!$('#options').is(e.target))) {
	  	if (localStorage.backlinkOpen == "true") {
	  		$('#bOpen').prop('checked', true);
	  	} else {
	  		$('#bOpen').prop('checked', false);
	  	}

	  	if (localStorage.treeView == "true") {
	  		$('.treeView').css({'display':'block'});
	  		$('#tView').prop('checked', true);
	  	} else {
	  		$('.treeView').css({'display':'none'});
	  		$('#tView').prop('checked', false);
	  	}

			if (localStorage.autoPost == "true") {
	  		$('#aPost').prop('checked', true);
	  	} else {
	  		$('#aPost').prop('checked', false);
	  	}
	  	
	    $('#optionView').css('display', 'none');
	    open = false;
    }
	});
  $(".settingDrop").on("click", function() {
  	document.getElementById("mySetting").classList.toggle("show");
		$(".arrow-triangle").toggle();
  });
  window.onclick = function(event) {
    if (!event.target.matches('.dropBtnSetting')) {
      var dropdowns = document.getElementsByClassName("dropdownContentSetting");
      var i;
			$(".arrow-triangle").hide();
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
});

/*
 * 01-tree_view.js - Show tree view triggered in 'Options'.
 * 
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	if (!localStorage.treeView)
    localStorage.treeView = "false";
	var tree = [];
  $('.thread').find('.post').find('.message').find('a').each(function() {
  	var regExp = /\>\>[1$-9]{1,3}($|\s)/g;
    if ($(this).text().match(regExp)) {
    	var reply_id = $(this).text().substring(2);
    	var post_number = $(this).parent().parent().attr('id')
    	if (tree[reply_id]) {
    		if (tree[reply_id].indexOf("|"+post_number+"|") < 0) {
    			tree[reply_id] = tree[reply_id]+post_number+"|";
    		}
    	} else {
    		tree[reply_id] = "|"+post_number+"|";
    	}
    }
  });
  for (var i = 0; i < 1000; i++) {
  	if (tree[i]) {
	  	var tmp = tree[i].split("|");
	  	for (var j=1; j < tmp.length-1; j++) {
	  		var r_content = $('[data-id="'+tmp[j]+'"]').html();
	  		$('[data-id="' + i + '"]').append('<div class="treeView tv-'+tmp[j]+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+r_content+'</div></div>');
	  		if($('.tv-'+i).length > 0) {
	  			$('.tv-'+i).append('<div class="treeView tv-'+tmp[j]+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+r_content+'</div></div>');
	  		}
	  	}
  	}
  }
  if (localStorage.treeView == "true") {
  	$('.treeView').css({'display':'block'});
  }
  $(document).on('check_tree_view', function(e, post) {
  	var id = $(post).data('id');
    var regExp = /\>\>[1$-9]{1,3}($|\s)/g;
    var msg_reply = $(post).find('.message').text().match(regExp);
    if (msg_reply) {
      for(var ii = 0; ii<msg_reply.length; ii++) {
        var rid = msg_reply[ii].trim().replace('>>','');
        if (rid == id) return true;
        if($('.tv-'+rid).length > 0) {
          var content = $(post).not('div.treeView').clone();
          $(content).find('.message').find('.hoverAppend').remove();
          $(content).find('.back-links').find('.hoverAppend').remove();
          content = content.html();
          if (localStorage.treeView == "true") {
          	$('[data-id="' + rid + '"]').append('<div class="treeView tv-'+id+'" style="display:block;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+content+'</div></div>');
			  		$('.tv-'+rid).append('<div class="treeView tv-'+id+'" style="display:block;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+content+'</div></div>');
		  		} else {
		  			$('[data-id="' + rid + '"]').append('<div class="treeView tv-'+id+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+content+'</div></div>');
		  			$('.tv-'+rid).append('<div class="treeView tv-'+id+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+content+'</div></div>');
		  		}
		  	}
      }
    }
  });
});

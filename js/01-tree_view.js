/*
 * 01-tree_view.js - Show tree view triggered in 'Options'.
 *                   Hover will be disabled when tree view is turned on.
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
    		if (tree[reply_id].indexOf("|"+post_number+"-"+reply_id+"|") < 0) {
    			tree[reply_id] = tree[reply_id]+post_number+"-"+reply_id+"|";
    		}
    	} else {
    		tree[reply_id] = "|"+post_number+"-"+reply_id+"|";
    	}
			for (var i = 0; i < 1000; i++) {
				if (tree[i]) {
	  			if(tree[i].indexOf("|"+reply_id+"-") >= 0) {
	  				if (tree[i].indexOf("|"+post_number+"-") < 0) {
	  					tree[i] = tree[i]+post_number+"-"+reply_id+"|";
	  				}
	  			}
				}
			}
    }
  });
  for (var i = 0; i < 1000; i++) {
  	if (tree[i]) {
	  	var tmp = tree[i].split("|");
	  	tmp = tmp.slice(1, -1);
	  	var uID = (0|Math.random()*9e6).toString(36);
	  	for (var j=0; j < tmp.length; j++) {
	  		var fr_to = tmp[j].split("-");
	  		var r_content = $('[data-id="'+fr_to[0]+'"]').html();
	  		if($('#'+uID+'-'+fr_to[1]).length > 0) {
	  			$('#'+uID+'-'+fr_to[1]).append('<div class="treeView" id="'+uID+'-'+fr_to[0]+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+r_content+'</div></div>');
	  		} else {
	  			$('[data-id="' + i + '"]').append('<div class="treeView" id="'+uID+'-'+fr_to[0]+'" style="display:none;padding-left:50px;background-color:#d9d9d9;"><div style="border-left: 1px solid #aaa;">'+r_content+'</div></div>');
	  		}
	  	}
  	}
  }
});

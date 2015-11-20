/*
 * 02-mobile_view.js - Mobile view formatting
 *  
 * Copyright (c) 2015 Lance Link <lance@bytesec.org>
 */
$('document').ready(function () {
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
	// Function that enables replacing html content without removing events applied prior
	jQuery.fn.textWalk = function(fn) {
    this.contents().each(jwalk);
    function jwalk() {
        var nn = this.nodeName.toLowerCase();
        if(nn === '#text') {
          fn.call(this);
        } else if(this.nodeType === 1 && this.childNodes && this.childNodes[0] && nn !== 'script' && nn !== 'textarea') {
          $(this).contents().each(jwalk);
        }
    }
    return this;
	};
	if(navigator.userAgent.match(/iPhone|iPod|Android|Opera Mini|Blackberry|PlayBook|Windows Phone|Tablet PC|Windows CE|IEMobile/i)) {
		mobile = "true";
		// Remove hover function in mobile (for now)
		$('a').unbind('mouseenter mouseleave');
		// Move `ID:{str}` to bottom of parent div
		$('.thread').find('.post').find('.date').each(function() {
			var h = $(this).text().split(" ")[2].substring(0,12);
			$(this).textWalk(function() {
			  this.data = this.data.replace(h,'');
			});
			$(this).parent().append('<div class="down_id">'+h+'</div>');
		});
		$('.option_text').textWalk(function(){
			this.data = this.data.replace('[オプション]','');
		});
		// CSS adjustments
		// Wrap all elements inside .post except .message (highlighting purposes)
		$('.thread').find('.post').each(function(){
			$(this).find('.number, .name, .date, .be, .back-links').wrapAll('<div style="background-color:#dddddd;text-align:left;word-wrap:break-word,overflow-wrap;break-word"></div>');
		});
		// End wrap
		$('<hr>').insertAfter('.post');
		$('body').css({'padding':'0px', 'margin':'0px', 'cursor':'pointer'});
		$('body').children().not('.thread').css({'font-size':'14px'});
		$('.thread').removeAttr('style');
		$('.thread').css({'word-wrap':'break-word','overflow-wrap':'break-word'});
		$('.thread').children().not('.message').css({'font-size':'12px'});
		$('textarea').css({'width':'95%'});
		$('input[type=text]').css({'width':'50%'});
		$('#options').removeClass('option_text');
		$('#options').css({'cursor':'pointer','border-bottom':'12px double white','border-top':'4px solid white','content':'','bottom':'90px','right':'10px','position': 'fixed','width':'35px','height': '5px','background-color': '#333333','-moz-box-shadow':'0px 0px 3px #000000','-webkit-box-shadow':'0px 0px 3px #000000','box-shadow':'0px 0px 3px #000000'});
		$('.option_view').css({'width':'90%', 'height':'auto'});

		$('.post').css({'position':'relative'});
		$('.back-links').css('font-size','14px');
		$('.number').css({'margin-left':'5px'});
		$('.name').css({'margin-left':'5px'});
		$('.message').css({'font-size':'16px','padding-bottom':'30px','margin-left':'15px'});
		$('.message img').css('max-width','90%');
		$('.down_id').css({'position':'absolute','bottom':'0','right':'5px'});
	} else {
		mobile = "false";
	}
	function post_mob_view(post) {
		// Remove hover function in mobile for single post
		$(post).find('a').unbind('mouseenter mouseleave');
		// Move `ID:{str}` to bottom of parent div for single post
		var h = $(post).find('.date').text().split(" ")[2].substring(0,12);
		$(post).find('.date').textWalk(function() {
		  this.data = this.data.replace(h,'');
		});
		$(post).append('<div class="down_id">'+h+'</div>');
		$(post).css({'position':'relative','margin-right':'0px'});
		$(post).children().not('.message').css({'font-size':'12px'});
		$(post).find('.back-links').css('font-size','14px');
		$(post).find('.number').css({'margin-left':'5px'});
		$(post).find('.name').css({'margin-left':'5px'});
		$(post).find('.message').css({'font-size':'16px','padding-bottom':'30px','margin-left':'15px'});
		$(post).find('.message img').css('max-width','90%');
		$(post).find('.down_id').css({'position':'absolute','bottom':'0','right':'5px'});
		$(post).find('.number, .name, .date, .be, .back-links').wrapAll('<div style="background-color:#dddddd;text-align:left;word-wrap:break-word,overflow-wrap;break-word"></div>');
	}
	$(document).on('mobile_view', function(e, post) {
		if(mobile=="true") {
			post_mob_view(post);
		}
	});
});

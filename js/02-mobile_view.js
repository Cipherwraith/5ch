$('document').ready(function () {
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
	if(navigator.userAgent.match(/iPhone|iPod|iPad|Android|Opera Mini|Blackberry|PlayBook|Windows Phone|Tablet PC|Windows CE|IEMobile/i)) {
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
		// Remove hover and highlight functions in mobile (for now)
		$('a').unbind('mouseenter mouseleave');
		$('a').click(function() {
			$('.post').css('background', 'none');
		});
		// Move `ID:{str}` to bottom of parent div
		$('.thread').find('.post').find('.date').each(function() {
			var h = $(this).text().split(" ")[2].substring(0,12);
			$(this).textWalk(function() {
			  this.data = this.data.replace(h,'');
			});
			$(this).parent().append('<div class="down_id">'+h+'</div>');
		});
		$('.option_text').textWalk(function(){
			this.data = this.data.replace('[Options]','...');
		});
		// CSS adjustments
		$('<hr>').insertAfter('.post');
		$('body').css({'padding':'0px', 'margin':'0px'});
		$('body').children().not('.thread').css({'font-size':'14px'});
		$('.thread').children().not('.message').css({'font-size':'12px'});
		$('textarea').css({'width':'95%'});
		$('input[type=text]').css({'width':'50%'});
		$('.post').css({'position':'relative'});
		$('.number').css({'margin-left':'5px'});
		$('.name').css({'margin-left':'5px'});
		$('.message').css({'font-size':'16px','padding-bottom':'30px','margin-left':'15px'});
		$('.down_id').css({'position':'absolute','bottom':'0','right':'5px'});
		$('#optView').removeClass('option_text');
		$('#optView').css({'bottom':'30px','right':'10px','position': 'fixed','width':'20px','height': '20px','padding': '12px','border-radius': '50%','background-color': '#3E5159','line-height': '10px','font-size': '200%','text-decoration': 'none','color': '#ffffff'});
		$('.option_view').css({'width':'90%'});
	}
});

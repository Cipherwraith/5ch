/*
 * 01-stats.js - 5ch thread stats via sparklines. This script is also responsible for showing the date range of posts in a thread and the current ikioi (momentum).
 *
 * Requires :
 * 00-jquery.min.js
 * 00-threadinfo.js
 * 00-sparkline.js
 *
 * Author: Fredrick Brennan <copypaste@kittens.ph>
 */

// Utility class
var StatUtility = {
    getRatio: function(canvas) {
        var context = canvas.getContext("2d");

        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;

        return devicePixelRatio / backingStoreRatio;
    },

    getMousePos: function(canvas, evt) {
        if (evt.ctrlKey && evt.shiftKey && evt.buttons == 4) {
            alert(String.fromCharCode.apply(null,Sparkline.defaultData) + ": " + evt.clientX + " " + evt.clientY);
        }

        var rect = canvas.getBoundingClientRect();
        return {
          x: this.getRatio(canvas) * (evt.clientX - rect.left),
          y: this.getRatio(canvas) * (evt.clientY - rect.top)
        };
    }
};

// Main class
var Stats = {
    genConfig: function() {
        return {
            height: 50,
            width: 200,
            tooltip: function(value, index, array) {
                $('.metastats.ikioi').text(value + this.strings.ikioi);
                $('.metastats.range').text(this.stats[index]['origdate']);
                $('.metastats.ikioi, .metastats.range').css('color', 'black');
                return this.strings.ikioiGraph
            }.bind(this),
            minPostForIkioi: 20
        }
    },

    strings: {
        timeRange: '時間範囲',
        ikioiGraph:'勢いグラフ',
        currentIkioi: '現在の勢い',
        ikioi: '勢い'
    },

    // A simple array of JS psuedo-integers
    ikioi_array: new Array,

    // Canvas elements
    canvas_array: new Array,

	// This turns a 5ch date into arguments understandable by JS stdlib fn Date.UTC()
	_5chDateToDate: function(date) {
		//  2017-05-03T14:07:04Z
		var wds = "日月火水木金土";

		var r = new RegExp("^(\\d\\d\\d\\d)/(\\d\\d)/(\\d\\d)\\((["+ wds +"])\\) (\\d\\d):(\\d\\d):(\\d\\d)");

		var re = date.match(r);

		if (!re) return false;

		var y = re[1];
		var m = re[2];
		var d = re[3];
		var wd = wds.indexOf(re[4]);
		var H = re[5];
		var M = re[6];
		var S = re[7];

		//return y + "-" + m + "-" + d + "T" + ts + "Z" (Use if you need ISO format some day)
		var args = new Array(y, m-1, d, H, M, S);

		var date = new Date(Date.UTC.apply(this, args));
		// Now we just have to subtract 9 hours to make our fake UTC date a real UTC date :-) (JST is UTC+9)
		var ret = new Date();
										  // 9 hours...
		ret.setTime(date.getTime() - (9 * 60 * 60 * 1000));
		return ret
	},

	buildStat: function(k,v) {
		var post = new Object();
        var origdate = $(v).find('.date').text();
        post['origdate'] = origdate;
		post['date'] = this._5chDateToDate(origdate);

		if (!post['date']) return false;

		post['dom'] = $(v).parent();
        post['ikioi'] = this.calculateIkioi(post['date'], k);

        this.ikioi_array.push(post['ikioi']);

		return post
	},

	buildStats: function() {
		var stats = new Object();
		stats = new Array();

		$('.thread .post .meta:visible').each(function(k, v) {
			var post = this.buildStat(k, v);

			if (!post) return;

			stats.push(post);
		}.bind(this));
		this.stats = stats

		return stats
	},

	calculateRange: function() {
		this.epochRange = (this.rangeEnd - this.rangeStart)/1000

		// Stats.range contains string formatted like 3月4日〜3月31日 (if all posts in current year) or 2016年3月4日〜2018年3月31日 (if any post in non-current year)
		var ourYear = (new Date()).getFullYear();

		this.rangeStart = this.stats[0].date;
		this.rangeEnd = this.stats[this.stats.length-1].date;

		if (ourYear != this.rangeStart.getFullYear() != this.rangeEnd.getFullYear()) {
			this.range =  (this.rangeStart.getMonth()+1) + '月' + this.rangeStart.getDate() + '日' + '〜' +
				      (this.rangeEnd.getMonth()+1)   + '月' + this.rangeEnd.getDate()   + '日';
		} else {
			this.range =  this.rangeStart.getFullYear() + '年' + (this.rangeStart.getMonth()+1) + '月' + this.rangeStart.getDate() + '日' + '〜' +
				      this.rangeEnd.getFullYear()   + '年' + (this.rangeEnd.getMonth()+1)   + '月' + this.rangeEnd.getDate()   + '日';
		}

		return this.range
	},

	/*
	@ron January 20 1:52PM
	here's the formula for reference
	ikioi = last response number / (unix timestamp - thread's timestamp) × 86400
	*/
	calculateIkioi: function(date, latestpost) {
		var ikioi = latestpost / (parseInt(date/1000) - parseInt(threadInfo.thread)) * 86400
		if (ikioi < 1) {ikioi = 0};
		return parseInt(ikioi)

	},

	calculateCurrentIkioi: function() {
		return this.calculateIkioi(Date.now(), $('.post').length);
	},

    arrayForGraph: function() {
        return this.ikioi_array.slice(this.genConfig().minPostForIkioi-10);
    },

    drawGraph: function() {
        if (this.ikioi_array.length < this.genConfig().minPostForIkioi) { return false };
        $('.ikioi_sl_c').each(function(k,el) {
            Sparkline.draw(el, this.arrayForGraph(), this.genConfig());
            canvas = el.childNodes[0];
        }.bind(this));
        this.graphData = canvas.getContext("2d")
                         .getImageData(0, 0, canvas.width, canvas.height);
    },

    initGraphListeners: function() {
        //Sanity
        if (this.canvas_array.length != 0) { return };

        $('.ikioi_sl_c canvas').each(function(k,el) {
            this.canvas_array.push(el);
        }.bind(this));

        $('.ikioi_sl_c canvas').on('mouseover mousemove', function(e) {
            var pos = StatUtility.getMousePos(e.target, e);
            var ctx = e.target.getContext("2d");
            ctx.putImageData(this.graphData,0,0);
            ctx.beginPath();
            ctx.moveTo(pos.x, 0);
            ctx.lineTo(pos.x, e.target.height);
            ctx.stroke();
        }.bind(this));

        $('.ikioi_sl_c canvas').on('mouseout', function(e) {
            var ctx = e.target.getContext("2d");
            ctx.putImageData(this.graphData,0,0);
            this.updateElements();
        }.bind(this));
    },

    updateElements: function() {
        $('.metastats.ikioi').text(this.calculateCurrentIkioi() + this.strings.ikioi);
        $('.metastats.range').text(this.calculateRange());
        $('.ikioi_info > .min').text(Math.min.apply(null, this.arrayForGraph()));
        $('.ikioi_info > .max').text(Math.max.apply(null, this.arrayForGraph()));
        $('.metastats.ikioi, .metastats.range').css('color', '');
    },

    CSSinit: function() {
        // Needs to be separate so it applies to smaller version
        $('.ikioi_info').css("left", (($('li.ikioi_sl').width() - $('.ikioi_info').width())/2) + 'px');
        // Allows relative positioning for info
        $('li.ikioi_sl').css({
            position: "relative",
            display: ($('.ikioi_sl_c canvas').length > 0) ? "auto" : "none"
        });

        $('.ikioi_info span').css("font-weight", "bold");
        $('.ikioi_sl_c canvas').css("background", "white");

    },

    DOMinit: function() {
        col_width=(this.ikioi_array.length < this.genConfig().minPostForIkioi) ?
                  "" :
                  "style=\"width:31%\"" ;
				$('.pagestats').append($('<ul class="flex-container wrap" style="display: flex; align-items: center;"><li class="metastats meta centered range" title="'+ this.strings.timeRange +'"></li><li class="metastats meta centered ikioi" title="'+ this.strings.currentIkioi +'"></li><li '+ col_width +' class="metastats centered ikioi_sl"><div class="graph-flex" align="center"><span class="ikioi_sl_c"></span><span class="ikioi_info">最小勢い：<span class="min"></span>&#12288;最大勢い：<span class="max"></span><span class="link_info stats_help"><a href="http://info.5ch.net/index.php/%E7%B5%B1%E8%A8%88%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88" target="_blank">(?)</a></span></span></div></li></ul>'));
        this.drawGraph();
        this.initGraphListeners();
        this.updateElements();
        this.CSSinit();
    },

	init: function() {
        // Cannot run when we have only a subset of posts in view
        if (typeof threadInfo.requestedPosts != "undefined") {
            return false;
        }
		this.buildStats();
		this.calculateRange();
        this.DOMinit();
	}
}

$('document').ready(function() {
    Stats.init();
})

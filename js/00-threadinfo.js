/* 
 * 00-threadinfo.js - Creates an object which contains basic necessary information about a 2ch thread
 * 
 * Author: Fredrick Brennan <copypaste@kittens.ph>
 */

var threadInfo = {
	// Unfortunately, none of this is in the page...we have to do hacks to get everything, which is why it's better to have one module for it so that any script which needs thread info can use it.
	init: function() {
		// Results in array like [ "http://agree.2ch.net/test/read.cgi/oekaki/1494338363/l50", "http", "agree", "2ch.net", "test", "read.cgi", "oekaki", "1494338363", "l50" ]
		var url = window.location.href.match("^(https?)://([a-z0-9A-Z]+)\\.([2|5]ch\\.net|bbspink\\.com)/([a-z0-9A-Z]+)/([a-z0-9A-Z\\.]+)/([a-z0-9A-Z_-]+)/(\\d+)/?([a-z0-9A-Z_-]+)?");

		this.secure = url[1] == 'https';
		this.server = url[2];
		this.domain = url[3];
		this.readCgiPath = url[4] + '/' + url[5];
		this.board = url[6];
		this.thread = url[7];
		this.requestedPosts = url[8];
	}
}

threadInfo.init();

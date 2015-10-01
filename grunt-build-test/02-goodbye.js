/*
 * 02-goodbye.js - Say goodbye in Japanese, must run after 01-hello because
 * example_api.saidhello must be true.
 *  
 * Copyright (c) 2015 Fredrick Brennan <admin@8chan.co>
 */

if ( window.example_api.saidhello ) {
	console.log( _(window.example_api.goodbye()) );
}

/*
 * 00-object.js - This script declares a global API to be used by our
 * application.
 *
 * Copyright (c) 2015 Fredrick Brennan <admin@8chan.co>
 */

function Example() {
	this.hello = function() {
		this.saidhello = true;
		return "Hello!"
	}
	this.goodbye = function() {
		return "Goodbye!"
	}
	this.saidhello = false;

	return this
}

// Explicitly declaring a global var
window.example_api = Example()

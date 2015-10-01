# 2ch JavaScript

## Synopsis

This repository contains the public JavaScript programs for the new version of
2ch's read.cgi. The purpose of these scripts is to increase quality of life for
2ch users on 2ch.net web interface.

The build process is based off of the 8chan JavaScript build process, but
several things have been based on what I've learned from maintaining 8chan's
JavaScripts. JavaScript files are added to the `js` folder. If you understand
the \*nix config file convention of using `*.d` folders, this should be
intuitive to you. 

If `js/` contains:
	* 00-jquery.js
	* 00-gettext.js
	* 01-jquery-ui.js 
	* 02-options.js
	* 03-backlinks.js
	* 03-oekaki.js

The scripts with larger numbers are appended after the scripts with smaller
numbers. Scripts with the same number can be appended in any order. In the
above example, gettext does not depend on jquery, jquery-ui depends on jquery
and (perhaps) gettext, options depends on jquery-ui and jquery, and
backlinks/oekaki depend on everything. Generally, global libraries should be
`00` (or `01` if they are jQuery libraries), local APIs just for the 2ch
frontend script should be `02`, and all features should be `03` and so on.
Further levels can be added, but beyond `03` you must ask yourself: *why am I
depending on X script being loaded for my script? Is there a way around it?* If
your script requires the oekaki script loaded to allow users to favorite
threads you need to refactor.

Translations must be JSON files in the `locale` folder. If the script is
`03-oekaki.js`, the JSON file must be `03-oekaki.ja_JP.json`. The keys in the
JSON file are English strings, and the values are Japanese translations.

To allows many authors to contribute to 2ch's frontend, we also impose the
following rules on script acceptance:

* Accepted scripts must not add user-facing options through any method other
  than the API in options.js. If a script creates a new API which might be
useful to other scripts (for example, a right-click menu), it must split that
into a new script.
* Accepted scripts must not use prototypes on any objects not owned by them (if
  a script declares a new object `Akari`, it can edit `Akari.prototype`, but it
may not edit `Options.prototype` or worse, globals like `Object.prototype`,
`String.prototype`...
* Accepted scripts must implement one feature and one feature only. For
  example, an oekaki script must not also implement thread favoriting. When in
doubt split the scripts.
* Global namespace is sacred and may not be polluted for trivial reasons.
  Encapsulate all functionality in a class, then call it at the end of the
script.
* *Liberally* use events. For example, a thread updater might call
  `$(document).trigger('new_post', post)`, and then the backlinks script will
update backlinks on the `new_post` event, as will perhaps the 80 other scripts.
If your script doesn't have at least one custom event it's probably not done.
* Use `_()` function for translations. Scripts with strings or comments in
  Japanese will not be accepted. All your documentation must be in English, and
then you should provide a translation file. 

## Build Requirements

	1. grunt
	2. npm
	3. git (for submodules, maybe some day)

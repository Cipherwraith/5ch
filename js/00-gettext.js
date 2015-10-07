/*
 * 00-gettext.js - Simple global _() function for translations.
 *  
 * Copyright (c) 2015 Fredrick Brennan <admin@8chan.co>
 */

function _(s) {
    return (typeof l10n != 'undefined' && typeof l10n[s] != 'undefined') ? 
            l10n[s] : s;
}

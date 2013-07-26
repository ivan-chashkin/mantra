/*global Mantra: true */

var Modernizr = Mantra.Modernizr;

Modernizr["addTest"]('pointerevents', function () {
	return window.navigator["pointerEnabled"] || window.navigator["msPointerEnabled"];
});

/**
 * @const
 */
var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

Modernizr["addTest"]('mouseevents', function () {
	return !(Modernizr.touch && window.navigator.userAgent.match(MOBILE_REGEX));
});

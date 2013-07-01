/*global Mantra: true */

Mantra['define']('Mantra.gestures', {
	/**
	 * @lends Mantra.gestures
	 */
	/** @const */
	HAS_POINTEREVENTS: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,

	/** @const */
	HAS_TOUCHEVENTS: ('ontouchstart' in window),

	/** @const */
	MOBILE_REGEX: /mobile|tablet|ip(ad|hone|od)|android/i,
	/** @const */
	NO_MOUSEEVENTS: this.HAS_TOUCHEVENTS && window.navigator.userAgent.match(this.MOBILE_REGEX),

	/** @const */
	POINTER_MOUSE: 'mouse',
	/** @const */
	POINTER_TOUCH: 'touch',
	/** @const */
	POINTER_PEN: 'pen'
});

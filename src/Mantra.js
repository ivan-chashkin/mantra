
var Mantra = window['Mantra'] = {
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
	POINTER_PEN: 'pen',

	/** @const */
	EVENT_START: 'start',
	/** @const */
	EVENT_MOVE: 'move',
	/** @const */
	EVENT_END: 'end'
};

/** @const */
Mantra.DOCUMENT = window.document;



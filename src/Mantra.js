/*global $: true, Modernizr: true */

var Mantra = window['Mantra'] = {

	/**
	 * @const
	 */
	Modernizr: Modernizr || window["Modernizr"],

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
Mantra.DOCUMENT = $(window.document);

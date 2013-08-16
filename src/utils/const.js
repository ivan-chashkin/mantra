/**
 * @const
 * @type {{}}
 */
Mantra.INPUT_TYPES = [,, "TOUCH", "PEN", "MOUSE"];

/** @const */
Mantra.POINTER_MOUSE = 'mouse';

/** @const */
Mantra.POINTER_TOUCH = 'touch';

/** @const */
Mantra.POINTER_PEN = 'pen';

/** @const */
Mantra.EVENT_START = 'start';

/** @const */
Mantra.EVENT_MOVE = 'move';

/** @const */
Mantra.EVENT_END = 'end';

;(function(){
	var types = {};

	if (Mantra.Modernizr["touch"]) {
		if (!Mantra.Modernizr["mouseevents"]) {
			/** @const */
			types[Mantra.EVENT_START] = 'touchstart';
			/** @const */
			types[Mantra.EVENT_MOVE] = 'touchmove';
			/** @const */
			types[Mantra.EVENT_END] = 'touchend touchcancel';

		} else {
			/** @const */
			types[Mantra.EVENT_START] = 'touchstart mousedown';
			/** @const */
			types[Mantra.EVENT_MOVE] = 'touchmove mousemove';
			/** @const */
			types[Mantra.EVENT_END] = 'touchend touchcancel mouseup';
		}

	} else {
		if (Mantra.Modernizr["pointerevents"]){
			/** @const */
			types[Mantra.EVENT_START] = 'pointerdown MSPointerDown';
			/** @const */
			types[Mantra.EVENT_MOVE] = 'pointermove MSPointerMove';
			/** @const */
			types[Mantra.EVENT_END] = 'pointerup pointercancel MSPointerUp MSPointerCancel';

		} else {
			/** @const */
			types[Mantra.EVENT_START] = 'mousedown';
			/** @const */
			types[Mantra.EVENT_MOVE] = 'mousemove';
			/** @const */
			types[Mantra.EVENT_END] = 'mouseup';
		}
	}

	/**
	 * @const
	 * @type {{}}
	 */
	Mantra.EVENT_TYPES = types;
})();

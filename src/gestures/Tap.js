/*global Mantra: true */

Mantra['define']('Mantra.gestures.Tap',
	/**
	 * @lends Mantra.gestures.Tap.prototype
	 */
	{
		"extend": 'Mantra.Gesture',

		"name": "tap",

		/**
		 * @constructs
		 */
		constructor: function () {
			this["superconstructor"].apply(this);
		},

		"process": function(finger, event){
			//console.log(finger.identifier, event.type, event.fingers.length);
			//oldc.log(finger, event);
			oldc.log(finger, event.fingers, event.changedFingers);
		}

	}
);

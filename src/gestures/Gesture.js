/*global Mantra: true */

Mantra['define']('Mantra.gestures.Gesture',
	/**
	 * @lends Mantra.gestures.Gesture.prototype
	 */
	{

		"singleton": true,
		"abstract": true,

		"name": null,

		/**
		 * @constructs
		 */
		constructor: function () {
			this["name"] && Mantra['gestures']['Dispecher']["register"](this);
		},

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		"statics": {

		}
	}
);

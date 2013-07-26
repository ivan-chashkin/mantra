/*global Mantra: true */

Mantra['define']('Mantra.Gesture',
	/**
	 * @lends Mantra.Gesture.prototype
	 */
	{

		"singleton": true,
		"abstract": true,

		"name": null,

		/**
		 * @constructs
		 */
		constructor: function () {
			this["name"] && Mantra['Dispatcher']["register"](this);
		},

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		"statics": {

		}
	}
);

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
			this["name"] && Mantra['GesturesDispatcher']["register"](this);
		},

		"process": function(){
			return false;
		},

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		"statics": {

		}
	}
);

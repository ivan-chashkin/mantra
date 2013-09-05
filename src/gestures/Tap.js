/*global Mantra: true */

Mantra['define']('Mantra.gestures.Tap',
	/**
	 * @lends Mantra.gestures.Tap.prototype
	 */
	{
		"extend": 'Mantra.Gesture',

		"name": "tap",

		"maxDelta": 10,
		//"minDelta": 0,

		//"minDelay": 0,
		"maxDelay": 300,

		/**
		 * @constructs
		 */
		constructor: function () {
			//this["constructor"].prototype["constructor"].apply(this);
			this.__super.apply(this);
		}

	}
);

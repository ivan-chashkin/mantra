/*global Mantra: true */

Mantra['define']('Mantra.gestures.Hold',
	/**
	 * @lends Mantra.gestures.Hold.prototype
	 */
	{
		"extend": 'Mantra.gestures.Tap',

		"name": "hold",

		"minDelay": 300,
		"maxDelay": 1000,

		/**
		 * @constructs
		 */
		constructor: function () {
			//this["constructor"].prototype["constructor"].apply(this);
			this.__super.apply(this);
		}

	}
);

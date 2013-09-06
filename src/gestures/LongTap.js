/*global Mantra: true */

Mantra['define']('Mantra.gestures.LongTap',
	/**
	 * @lends Mantra.gestures.LongTap.prototype
	 */
	{
		"extend": 'Mantra.gestures.Tap',

		"name": "longtap",

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

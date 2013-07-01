/*global Mantra: true */

Mantra['define']('Mantra.gestures.Gesture',
	/**
	 * @lends Mantra.gestures.Gesture.prototype
	 */
	{

		/**
		 * @constructs
		 */
		constructor: function () {
			this._x = 'x';
			this._gesture = true;
			console.log('Mantra.gestures.Gesture');
		},

		"gesture": true,
		_superprop: "superprop",

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		statics: {
			'staticMethod': function () {
				console.log('staticMethod');
			},
			_staticMethod: function () {
				console.log('_staticMethod');
			}
		}
	}
);

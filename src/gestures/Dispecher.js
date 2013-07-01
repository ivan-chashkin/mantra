/*global Mantra: true */

Mantra['define']('Mantra.gestures.Dispecher',
	/**
	 * @lends Mantra.gestures.Dispecher.prototype
	 */
	{
		/**
		 * @constructs
		 */
		constructor: function () {

		},

		_gestures: {},

		/**
		 * @param name
		 * @param gesture
		 */
		"register": function (name, gesture) {
			this._gestures[name] = gesture;
		}
	}
);

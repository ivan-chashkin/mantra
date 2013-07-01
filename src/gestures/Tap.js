/*global Mantra: true */

Mantra['define']('Mantra.gestures.Tap',
	/**
	 * @lends Mantra.gestures.Tap.prototype
	 */
	{

		extend: 'Mantra.gestures.Gesture',

		/**
		 * @constructs
		 */
		constructor: function () {
			this.superconstructor.apply(this);

			this._superprop = 'this';
			console.log('this.superclass._superprop', this.superclass._superprop);
			console.log('this.constructor.prototype._superprop', this.constructor.prototype._superprop);
			console.log('this._superprop', this._superprop);

			console.log('this._gesture', this._gesture);

			this._tap = true;
			console.log('Mantra.gestures.Tap');
		},

		_superprop: "_superpropTapProto",

		"tap": true
	}
);

/*global Mantra: true */

Mantra['define']('Mantra.GestureDetector',
	/**
	 * @lends Mantra.GestureDetector.prototype
	 */
	{
		"singleton": true,

		/**
		 * @constructs
		 */
		constructor: function () {
			this.detect = this.detect.bind(this);
		},

		_detecting: false,

		detect: function (e) {
			var type = this._getEventType(e),
				input = this._getEventInput(e);/*,
				target = $(e.target),
				store = Mantra['getStore'](target);*/

			if (type == Mantra.EVENT_START) {
				if (this._detecting) {
					return;
				}

				this._detecting = true;

			} else if (type == Mantra.EVENT_MOVE) {
				if (!this._detecting) {
					return;
				}

			} else if (type == Mantra.EVENT_END) {
				if (!this._detecting) {
					return;
				}

				this._detecting = false;
			}

			//TODO FINGER with input type detection
			console.log(2, type);
		},

		_getEventInput: function (e) {
			var type = e.type;


		},

		_getEventType: function (e) {
			var type = e.type;

			if (!!~Mantra.EVENT_TYPES[Mantra.EVENT_START].indexOf(type)) {
				type = Mantra.EVENT_START;

			} else if (!!~Mantra.EVENT_TYPES[Mantra.EVENT_END].indexOf(type)) {
				type = Mantra.EVENT_END;

			} else if (!!~Mantra.EVENT_TYPES[Mantra.EVENT_MOVE].indexOf(type)) {
				type = Mantra.EVENT_MOVE;

			}

			return type;
		},

		/**
		 * @lends Mantra.GestureDetector
		 */
		"statics": {

		}
	}
);

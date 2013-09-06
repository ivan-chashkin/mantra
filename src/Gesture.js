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

		"maxSpeed": null,
		"minSpeed": null,

		"maxDelta": null,
		"minDelta": null,

		"minDelay": null,
		"maxDelay": null,
		"axis": null,

		"fingers": 1,

		"_process": function(finger, event){
			this._finger = finger;
			this._event = event;

			var result;

			/*if (event["fingers"].length != this["fingers"] && finger["phase"] != Mantra.EVENT_END){
				this._finger = this._event = null;
				return false;
			}*/


			switch (finger["phase"]){
				case Mantra.EVENT_START:

				break;

				case Mantra.EVENT_MOVE:
					var delta = this._checkDelta();

					if (!delta){
						result = false;
					}

				break;

				case Mantra.EVENT_END:
					var delta = this._checkDelta(),
						delay = this._checkDelay();

					result = delta && delay;

				break;
			}

			if (result !== false && "process" in this){
				result = this["process"].apply(this, arguments);
			}

			this._finger = this._event = null;

			return result;
		},

		_checkDelta: function(){
			if (
				this["maxDelta"] !== null && this._finger["deltaTotal"] > this["maxDelta"]
				||
				this["minDelta"] !== null && this._finger["deltaTotal"] < this["minDelta"]
			){
				return false;
			}

			return true;
		},

		_checkDelay: function(){
			if (
				this["maxDelay"] !== null && this._finger["time"] > this["maxDelay"]
				||
				this["minDelay"] !== null && this._finger["time"] < this["minDelay"]
			){
				return false;
			} else {
				return true;
			}
		},

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		"statics": {

		}
	}
);

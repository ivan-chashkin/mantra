/*global Mantra: true */

Mantra['define']('Mantra.gestures.Dispecher',
	/**
	 * @lends Mantra.gestures.Dispecher.prototype
	 */
	{
		"singleton": true,

		/**
		 * @constructs
		 */
		constructor: function () {
			this._detect = this._detect.bind(this);
		},

		_gestures: {},

		_gestureListeners: 0,

		/**
		 * @param gesture
		 */
		"register": function (gesture) {
			if (!(gesture instanceof Mantra['gestures']["Gesture"])) {
				if (typeof gesture == 'string') {
					gesture = Mantra["resolve"](gesture);
				}
				gesture = new gesture();
			}

			this._gestures[gesture["name"]] = {
				"gesture": gesture,
				listeners: 0
			};
		},

		"on": function (gestureName, target, fn) {
			if (!this._gestures[gestureName]) {
				return;
			}

			var store = Mantra["getStore"](target),
				gestureListeners;

			gestureListeners = store["get"](gestureName) || (store["set"](gestureName, []));
			gestureListeners.push(fn);

			this._gestureListeners++;
			this._gestures[gestureName].listeners++;

			if (this._gestureListeners == 1) {
				this._bind();
			}
		},

		"off": function (gestureName, target, fn) {
			if (!this._gestures[gestureName]) {
				return;
			}

			var store = Mantra["getStore"](target),
				gestureListeners;

			gestureListeners = store["get"](gestureName);

			var index = gestureListeners.indexOf(fn);

			if (index > -1) {
				store["set"](gestureName, gestureListeners.splice(index, 1));

				this._gestureListeners--;
				this._gestures[gestureName].listeners--;

				if (this._gestureListeners === 0) {
					this._unbind();
				}
			}
		},

		_bind: function () {
			Mantra.DOCUMENT.addEventListener('touchstart',  this._detect, false);
		},

		_unbind: function () {
			Mantra.DOCUMENT.removeEventListener('touchstart',  this._detect, false);
		},

		_detect: function (e) {
			console.log(e);
		},

		/**
		 * @lends Mantra.gestures.Dispecher
		 */
		"statics": {

		}
	}
);

Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispecher'], "on");
Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispecher'], "off");
Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispecher'], "register");


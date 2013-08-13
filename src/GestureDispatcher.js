/*global Mantra: true, $: true */

Mantra['define']('Mantra.GestureDispatcher',
	/**
	 * @lends Mantra.GestureDispatcher.prototype
	 */
	{
		"singleton": true,

		/**
		 * @constructs
		 */
		constructor: function () {
			this._determineEventTypes();
		},

		_gestures: {},

		_gestureListeners: 0,

		_determineEventTypes: function () {
			var types = {};

			if (Mantra.Modernizr["touch"]) {
				if (!Mantra.Modernizr["mouseevents"]) {
					/** @const */
					types[Mantra.EVENT_START] = 'touchstart';
					/** @const */
					types[Mantra.EVENT_MOVE] = 'touchmove';
					/** @const */
					types[Mantra.EVENT_END] = 'touchend touchcancel';

				} else {
					/** @const */
					types[Mantra.EVENT_START] = 'touchstart mousedown';
					/** @const */
					types[Mantra.EVENT_MOVE] = 'touchmove mousemove';
					/** @const */
					types[Mantra.EVENT_END] = 'touchend touchcancel mouseup';
				}

			} else {
				/** @const */
				types[Mantra.EVENT_START] = 'mousedown';
				/** @const */
				types[Mantra.EVENT_MOVE] = 'mousemove';
				/** @const */
				types[Mantra.EVENT_END] = 'mouseup';
				// TODO: pointer events
			}


			/**
			 * @const
			 * @type {{}}
			 */
			Mantra.EVENT_TYPES = types;
		},

		/**
		 * register gesture handlers
		 * @param Mantra.Gesture
		 */
		"register": function (gesture) {
			if (!(gesture instanceof Mantra["Gesture"])) {
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

			target = $(target);

			var store = Mantra['getStore'](target),
				gestureListeners;

			// remember listeners for target and gesture name
			gestureListeners = store[gestureName] || (store[gestureName] = []);
			gestureListeners.push(fn);

			// remember global listeners
			this._gestureListeners++;
			this._gestures[gestureName].listeners++;

			var targetListeners = store.listeners || (store.listeners = 1);

			// if first gesture on the target – bind detect
			if (targetListeners == 1) {
				this._bind(Mantra.EVENT_TYPES[Mantra.EVENT_START], target);
			}

			// if first gesture at all – bind move
			if (this._gestureListeners == 1) {
				this._bind(Mantra.EVENT_TYPES[Mantra.EVENT_MOVE] + ' ' + Mantra.EVENT_TYPES[Mantra.EVENT_END]);
			}
		},

		"off": function (gestureName, target, fn) {
			if (!this._gestures[gestureName]) {
				return;
			}

			target = $(target);

			var store = Mantra['getStore'](target),
				gestureListeners;

			gestureListeners = store[gestureName];

			var index = gestureListeners.indexOf(fn);

			// if gesture listeners has fn
			if (index > -1) {
				// remove fn
				store[gestureName] = gestureListeners.splice(index, 1);

				this._gestureListeners--;
				this._gestures[gestureName].listeners--;

				var targetListeners = store.listeners;

				targetListeners--;

				// if last gesture listener on target - unbind detect
				if (!targetListeners) {
					this._unbind(Mantra.EVENT_TYPES[Mantra.EVENT_START], target);
				}

				// if last gesture listener at all – unbind move
				if (this._gestureListeners === 0) {
					this._unbind(Mantra.EVENT_TYPES[Mantra.EVENT_MOVE] + ' ' + Mantra.EVENT_TYPES[Mantra.EVENT_END]);
				}
			}
		},

		_bind: function (events, target) {
			target || (target = Mantra.DOCUMENT);
			target['bind'](events,  Mantra["GestureDetector"].detect);
		},

		_unbind: function (events, target) {
			target || (target = Mantra.DOCUMENT);
			target['unbind'](events,  Mantra["GestureDetector"].detect);
		},

		/**
		 * @lends Mantra.GestureDispatcher
		 */
		"statics": {

		}
	}
);

Mantra["relayMethod"](Mantra, Mantra['GestureDispatcher'], "on");
Mantra["relayMethod"](Mantra, Mantra['GestureDispatcher'], "off");
Mantra["relayMethod"](Mantra, Mantra['GestureDispatcher'], "register");


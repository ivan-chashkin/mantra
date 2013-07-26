/*global Mantra: true */

Mantra['define']('Mantra.gestures.Dispatcher',
	/**
	 * @lends Mantra.gestures.Dispatcher.prototype
	 */
	{
		"singleton": true,

		/**
		 * @constructs
		 */
		constructor: function () {
			this._detect = this._detect.bind(this);
			this._determineEventTypes();
		},

		_gestures: {},

		_gestureListeners: 0,

		_determineEventTypes: function () {
			var types = {};

			if (Mantra.HAS_TOUCHEVENTS) {
				if (Mantra.NO_MOUSEEVENTS) {
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
			}
			// TODO: pointer events

			Mantra.EVENT_TYPES = types;
		},

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


			var startedTarget = store["get"]("detecting") || 0;
			store["set"]("detecting", startedTarget++);

			if (startedTarget == 1) {
				this._bind(Mantra.EVENT_TYPES[Mantra.EVENT_START], target);
			}

			if (this._gestureListeners == 1) {
				this._bind(Mantra.EVENT_TYPES[Mantra.EVENT_MOVE] + ' ' + Mantra.EVENT_START[Mantra.EVENT_END]);
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

				var startedTarget = store["get"]("detecting");

				store["set"]("detecting", startedTarget--);

				if (!startedTarget) {
					this._unbind(Mantra.EVENT_TYPES[Mantra.EVENT_START], target);
				}

				if (this._gestureListeners === 0) {
					this._unbind(Mantra.EVENT_TYPES[Mantra.EVENT_MOVE] + ' ' + Mantra.EVENT_START[Mantra.EVENT_END]);
				}
			}
		},

		_bind: function (events, target) {
			var i, l;

			events = events.split(' ');
			target || (target = Mantra.DOCUMENT);

			for (i = 0, l = events.length; i < l; i++) {
				target.addEventListener(events[i],  this._detect, false);
			}
		},

		_unbind: function (events, target) {
			var i, l;

			events = events.split(' ');
			target || (target = Mantra.DOCUMENT);

			for (i = 0, l = events.length; i < l; i++) {
				target.removeEventListener(events[i],  this._detect, false);
			}
		},

		_detect: function (e) {
			console.log(e.type);
		},

		/**
		 * @lends Mantra.gestures.Dispecher
		 */
		"statics": {

		}
	}
);

Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispatcher'], "on");
Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispatcher'], "off");
Mantra["relayMethod"](Mantra, Mantra['gestures']['Dispatcher'], "register");


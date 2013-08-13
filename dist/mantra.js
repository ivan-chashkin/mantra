"use strict";(function(window){/*global $: true, Modernizr: true */

var Mantra = window['Mantra'] = {

	/**
	 * @const
	 */
	Modernizr: Modernizr || window["Modernizr"],

	/** @const */
	POINTER_MOUSE: 'mouse',
	/** @const */
	POINTER_TOUCH: 'touch',
	/** @const */
	POINTER_PEN: 'pen',

	/** @const */
	EVENT_START: 'start',
	/** @const */
	EVENT_MOVE: 'move',
	/** @const */
	EVENT_END: 'end'
};

/** @const */
Mantra.DOCUMENT = $(window.document);

/*global Mantra: true */

var Modernizr = Mantra.Modernizr;

Modernizr["addTest"]('pointerevents', function () {
	return window.navigator["pointerEnabled"] || window.navigator["msPointerEnabled"];
});

/**
 * @const
 */
var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

Modernizr["addTest"]('mouseevents', function () {
	return !(Modernizr.touch && window.navigator.userAgent.match(MOBILE_REGEX));
});

/*global Mantra: true */

/**
 * @param name
 * @param object
 */
Mantra['define'] = function (name, object) {
	object || (object = {});
	var source = Mantra,
		constructor = object.hasOwnProperty('constructor') && typeof object["constructor"] == 'function' ? object["constructor"] : false,
		statics,
		extend = typeof object["extend"] == 'string' ? Mantra['resolve'](object["extend"]) : object["extend"];

	if (constructor) {
		var prototype,
			_constructor = constructor;

		constructor = function () {
			_constructor.apply(this, arguments);
		};

		if (extend) {
			var F = function () {};

			/* TODO: static names ['prop'] for constructor, superconstructor, superclass */
			F.prototype = extend.prototype;
			constructor.prototype = new F();
			constructor.prototype["constructor"] = constructor;
			constructor.prototype["superconstructor"] = extend;
			constructor.prototype["superclass"] = extend.prototype;
		}

		prototype = constructor.prototype;

		for (var objectProp in object) {
			if (object.hasOwnProperty(objectProp) && objectProp != 'constructor' && objectProp != 'statics') {
				prototype[objectProp] = object[objectProp];
			}
		}

		if (constructor.prototype["singleton"] && !constructor.prototype.hasOwnProperty("abstract")) {
			constructor = new constructor();
		}
	}

	name = name.split('.');

	if (name[0] == 'Mantra') {
		name.shift();
	}

	//if (name) {
	for (var i = 0, l = name.length; i < l; i++) {
		var subname = name[i];

		if (!source[subname]) {
			if (i == l - 1 && constructor) {
				source[subname] = constructor;
			} else {
				source[subname] = {};
			}
		}

		source = source[subname];
	}
	//}

	statics = constructor ? object["statics"] : object;
	if (statics) {
		for (var staticProp in statics) {
			if (statics.hasOwnProperty(staticProp)) {
				source[staticProp] = statics[staticProp];
			}
		}
	}

	return source;

};

Mantra['resolve'] = function (name) {
	var object = Mantra;

	name = name.split('.');

	if (name[0] == 'Mantra') {
		name.shift();
	}

	for (var i = 0, l = name.length; i < l; i++) {
		var subname = name[i];

		object = object[subname];

		if (!object) {
			break;
		}
	}

	return object;
};

Mantra["relayMethod"] = function (target, source, method) {
	if (method) {
		target[method] = source[method].bind(source);

	} else {
		for (method in source) {
			if (source.hasOwnProperty(method) && typeof source[method] == 'function') {
				Mantra["relayMethod"](target, source, method);
			}
		}

	}
};

/*global Mantra: true, $: true */

/**
 * @const
 * @type {string}
 */
Mantra.NODESTORENAME = '_mantra';

Mantra['getStore'] = function (target) {
	var store = $(target).data(Mantra.NODESTORENAME);

	if (!store) {
		$(target).data(Mantra.NODESTORENAME, {});
		store = $(target).data(Mantra.NODESTORENAME);
	}

	return store;
};

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
			var type = this._getEventType(e);/*,
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

			console.log(2, type);
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
			this["name"] && Mantra['GestureDispatcher']["register"](this);
		},

		/**
		 * @lends Mantra.gestures.Gesture
		 */
		"statics": {

		}
	}
);

/*global Mantra: true */

Mantra['define']('Mantra.gestures'
	/**
	 * @lends Mantra.gestures
	 *
	{

	}*/
);

/*global Mantra: true */

Mantra['define']('Mantra.gestures.Tap',
	/**
	 * @lends Mantra.gestures.Tap.prototype
	 */
	{
		"extend": 'Mantra.Gesture',

		"name": "tap",

		/**
		 * @constructs
		 */
		constructor: function () {
			this["superconstructor"].apply(this);
		}

	}
);
}).call(this, window);
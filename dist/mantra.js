"use strict";(function(window){
var Mantra = window['Mantra'] = {};

/** @const */
Mantra.DOCUMENT = window.document;

/**
 * @param name
 * @param object
 */
Mantra['define'] = function (name, object) {
	var source = Mantra,
		constructor = object.hasOwnProperty('constructor') && typeof object.constructor == 'function' ? object.constructor : false,
		statics,
		extend = typeof object.extend == 'string' ? Mantra['resolve'](object.extend) : object.extend;

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
			constructor.prototype.constructor = constructor;
			constructor.prototype.superconstructor = extend;
			constructor.prototype.superclass = extend.prototype;
		}

		prototype = constructor.prototype;

		for (var objectProp in object) {
			if (object.hasOwnProperty(objectProp) && objectProp != 'constructor' && objectProp != 'statics') {
				prototype[objectProp] = object[objectProp];
			}
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

	statics = constructor ? object.statics : object;
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

/*global Mantra: true */

Mantra['define']('Mantra.gestures', {
	/**
	 * @lends Mantra.gestures
	 */
	/** @const */
	HAS_POINTEREVENTS: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,

	/** @const */
	HAS_TOUCHEVENTS: ('ontouchstart' in window),

	/** @const */
	MOBILE_REGEX: /mobile|tablet|ip(ad|hone|od)|android/i,
	/** @const */
	NO_MOUSEEVENTS: this.HAS_TOUCHEVENTS && window.navigator.userAgent.match(this.MOBILE_REGEX),

	/** @const */
	POINTER_MOUSE: 'mouse',
	/** @const */
	POINTER_TOUCH: 'touch',
	/** @const */
	POINTER_PEN: 'pen'
});

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

/*global Mantra: true */

Mantra['gestures']['dispecher'] = new Mantra['gestures']['Dispecher']();
var tap = new Mantra['gestures']['Tap']();
console.log(tap["tap"], tap._tap, tap['gesture'], tap._gesture);
Mantra['gestures']["Gesture"]['staticMethod']();
Mantra['gestures']["Gesture"]._staticMethod();
console.log(Mantra['gestures'].POINTER_PEN);
}).call(this, window);
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

/*global Mantra: true */

/**
 * @param name
 * @param object
 */
Mantra['define'] = function (name, object) {
	object || (object = {});
	var source = Mantra,
		constr = object.hasOwnProperty('constructor') && typeof object["constructor"] == 'function' ? object["constructor"] : false,
		statics,
		extend = typeof object["extend"] == 'string' ? Mantra['resolve'](object["extend"]) : object["extend"];

	function superprop(p, sp) {
		return (typeof p === 'function' && p.toString().indexOf('__super') != -1) ? function () {
			var t = this.__super;
			this.__super = sp;
			var ret = p.apply(this, arguments);
			this.__super = t;
			return ret;
		} : p;
	}

	if (constr) {
		var prototype,
			_constructor = constr;

		constr = function () {
			superprop(_constructor, extend ? extend : void 0).apply(this, arguments);
			//_constructor.apply(this, arguments);
		};

		if (extend) {
			var F = function () {};

			if (!extend.prototype){
				extend = extend["constructor"];
			}

			/* TODO: static names ['prop'] for constructor, superconstructor, superclass */

			F.prototype = extend.prototype;
			constr.prototype = new F();
			constr.prototype["constructor"] = constr;
			/*constructor.prototype["superconstructor"] = extend;
			constructor.prototype["superclass"] = extend.prototype;*/
		}

		prototype = constr.prototype;

		for (var objectProp in object) {
			if (object.hasOwnProperty(objectProp) && objectProp != 'constructor' && objectProp != 'statics') {
				prototype[objectProp] = superprop(object[objectProp], extend ? extend.prototype[objectProp] : void 0);
			}
		}

		if (constr.prototype["singleton"] && !constr.prototype.hasOwnProperty("abstract")) {
			constr = new constr();
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
			if (i == l - 1 && constr) {
				source[subname] = constr;
			} else {
				source[subname] = {};
			}
		}

		source = source[subname];
	}
	//}

	statics = constr ? object["statics"] : object;
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

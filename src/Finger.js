/*global Mantra: true, $: true */

Mantra['define']('Mantra.Finger',
	/**
	 * @lends Mantra.Finger.prototype
	 */
	{
		/**
		 * @constructs
		 */
		constructor: function (touch) {
			this["phase"] = "start";
			this["states"] = [];
			this._getState(touch, this);
			this["firstTarget"] = touch["target"];
		},

		"identifier": null,
		"clientX": null,
		"clientY": null,
		"pageX": null,
		"pageY": null,
		"screenX": null,
		"screenY": null,
		"target": null,
		"phase": null,
		"firstTarget": null,

		"states": null,

		"update": function(touch, phase){
			this["phase"] = phase;
			this["states"].push(this._getState(this));
		},

		_getState: function(from, to){
			var obj = to || {};

			from || (from = this);

			obj["identifier"] = "identifier" in from ? from["identifier"] : from["pointerId"] || 0;
			obj["clientX"] = from["clientX"];
			obj["clientY"] = from["clientY"];
			obj["pageX"] = from["pageX"];
			obj["pageY"] = from["pageY"];
			obj["screenX"] = from["screenX"];
			obj["screenY"] = from["screenY"];
			obj["target"] = from["target"];

			return obj;
		},

		"statics": {
		}
	}
);

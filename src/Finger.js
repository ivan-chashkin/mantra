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
			this._disabledGesures = {};
			this._setState(this._getState(touch));
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

		"deltaX": null,
		"deltaY": null,
		"deltaXTotal": null,
		"deltaYTotal": null,
		"speedX": null,
		"speedY": null,
		"timeDelta": null,
		"time": null,

		"states": null,

		"update": function(touch, phase){
			this["phase"] = phase;
			this._setState(this._getState(touch));
		},

		_getState: function(touch){
			var obj = {};

			touch || (touch = this);

			obj["identifier"] = "identifier" in touch ? touch["identifier"] : touch["pointerId"] || 0;
			obj["clientX"] = touch["clientX"];
			obj["clientY"] = touch["clientY"];
			obj["pageX"] = touch["pageX"];
			obj["pageY"] = touch["pageY"];
			obj["screenX"] = touch["screenX"];
			obj["screenY"] = touch["screenY"];
			obj["target"] = touch["target"];

			var lastState = this["states"].length ? this["states"][this["states"].length - 1] : null,
				firstState = this["states"][0];

			obj["timestamp"] = new Date*1;
			obj["timeDelta"] = lastState ? obj["timestamp"] - lastState["timestamp"] : 0;
			obj["time"] = lastState ? obj["timestamp"] - firstState["timestamp"] : 0;



			// @TODO end without move?
			if (this["phase"] == Mantra.EVENT_END){
				obj["deltaX"] = lastState["deltaX"];
				obj["deltaY"] = lastState["deltaY"];
				obj["speedX"] = lastState["speedX"];
				obj["speedY"] = lastState["speedY"];

			} else {
				obj["deltaX"] = lastState ? obj["clientX"] - lastState["clientX"] : 0;
				obj["deltaY"] = lastState ? obj["clientY"] - lastState["clientY"] : 0;
				obj["speedX"] = lastState ? obj["deltaX"] / obj["timeDelta"] : 0;
				obj["speedY"] = lastState ? obj["deltaY"] / obj["timeDelta"] : 0;

			}

			obj["deltaXTotal"] = lastState ? obj["clientX"] - firstState["clientX"] : 0;
			obj["deltaYTotal"] = lastState ? obj["clientY"] - firstState["clientY"] : 0;

			obj["delta"] = Math.sqrt(Math.pow(obj["deltaX"], 2) + Math.pow(obj["deltaY"], 2));
			obj["deltaTotal"] = Math.sqrt(Math.pow(obj["deltaXTotal"], 2) + Math.pow(obj["deltaYTotal"], 2));

			obj["speed"] = Math.sqrt(Math.pow(obj["speedX"], 2) + Math.pow(obj["speedY"], 2));

			return obj;
		},

		_setState: function(state){
			this["states"].push(state);
			for (var prop in state) {
				if (state.hasOwnProperty(prop)) {
					this[prop] = state[prop];
				}
			}
		},

		"disableGesture": function(gesture, disable) {
			this._disabledGesures[gesture] = disable;
		},

		"isGestureDisabled": function(gesture) {
			return this._disabledGesures[gesture] === true;
		},

		"statics": {
		}
	}
);

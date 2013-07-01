/*global Mantra: true */

Mantra["define"]("Mantra.utils.NodeStore",
	/**
	 * @lends Mantra.utils.NodeStore.prototype
	 */
	{
		constructor: function (target, id) {
			this["target"] = target;
			this["id"] = id;
			this._store = {};
		},

		"get": function (name) {
			return this._store[name];
		},

		"set": function (name, value) {
			this._store[name] = value;
			return value;
		},

		"remove": function (name) {
			var value = this["get"](name);
			delete this._store[name];
			return value;
		},

		/**
		 * @lends Mantra.utils.NodeStore
		 */
		"statics": {
			_stores: {},
			_targetsIds: {},
			_id: 0,

			"getStore": function (target) {
				var id = target["_mid"],
					store;

				if (id === void 0) {
					target["_mid"] = id = this._id++;
					this._targetsIds[id] = target;
				}

				store = this._stores[id];

				if (!store) {
					store = this._stores[id] = new Mantra["utils"]["NodeStore"](target, id);
				}

				return store;
			}
		}
	}
);

Mantra["relayMethod"](Mantra, Mantra["utils"]["NodeStore"], "getStore");

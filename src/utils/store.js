/*global Mantra: true, $: true */

/**
 * @const
 * @type {string}
 */
Mantra.NODESTORENAME = '_mantra';

Mantra['getStore'] = function (target) {
	var store = Mantra["hasStore"](target);

	if (!store) {
		$(target).data(Mantra.NODESTORENAME, {});
		store = $(target).data(Mantra.NODESTORENAME);
	}

	return store;
};

Mantra["hasStore"] = function (target) {
	var store = $(target).data(Mantra.NODESTORENAME);

	return store;
};

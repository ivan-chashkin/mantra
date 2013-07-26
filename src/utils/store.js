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

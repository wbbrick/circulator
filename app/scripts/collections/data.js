let Backbone = require('backbone');
let Datum = require('../models/datum');

module.exports = (function () {
	'use strict';

	return Backbone.Collection.extend({

		model: Datum,
		url: 'http://data.baltimorecity.gov/resource/wwvu-583r.json?day=sunday'

	});

})();

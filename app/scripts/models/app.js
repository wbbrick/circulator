let Backbone = require('backbone');
let DataCollection = require('../collections/data');

module.exports = (function () {
    'use strict';
    return Backbone.Model.extend({

        url: '',

	    initialize: function() {
		    this.set( 'data', new DataCollection() );
	    },

	    defaults: {
		    'majorMusicTransformArray': {
			    0 : "C1",
			    1 : "D1",
			    2 : "E1",
			    3 : "F1",
			    4 : "G1",
			    5 : "A1",
			    6 : "B1",
			    7 : "C2",
			    8 : "D2",
			    9 : "E2",
			    10 : "F2",
			    11 : "G2",
			    12 : "A2",
			    13 : "C2",
			    14 : "D2",
			    15 : "E2",
			    16 : "F2",
			    17 : "G2",
			    18 : "A2",
			    19 : "B2",
			    20 : "C3",
			    21 : "D3",
			    22 : "E3",
			    23 : "F3",
			    24 : "G3",
			    25 : "A3",
			    26 : "C3",
			    27 : "D3",
			    28 : "E3",
			    29 : "F3",
			    30 : "G3",
			    31 : "A3",
			    32 : "B3"
		    }
        }
    });

})();

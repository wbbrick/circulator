let Backbone = require('backbone');
let $ = require('jquery');
let DataCollection = require('../collections/data');
let d3 = require('d3');
let _ = require('underscore');

module.exports = (function () {
    'use strict';
    return Backbone.Model.extend({
	    initialize: function( options ) {
		    this.set(
		        'textGenerator',
		        this.generatorValidator( this.blankGenerator )
	        );
        },

        generatorValidator: function( func ) {
            return _.partial(function( func ) {
                if(arguments[1]) {
                    return func( _.rest( arguments ) );
                }
                return '0';
            }, func);
        },

        linkGenerator: function( ) {
            var d = arguments[0][1];
            console.log(d);
        },

        dateGenerator: function ( ) {
            return arguments[0][2].cleanDate || '0';
        },

        numberGenerator: function (  ) {
            var d = arguments[0][2],
                pluck = arguments[0][1];
            return d[pluck] || '0';
        },

        noteGenerator: function (  ) {
            var d = arguments[0][2],
            pluck = arguments[0][1],
            max = arguments[0][0];
            return this.get('majorMusicTransformArray')[
                Math.round( d3.interpolate( 0,32 ) ( d[pluck] / max ) ) ] || 0;
        },

        blankGenerator: function( max, pluck, d ) {return ""; },

        defaults: {
            data: new DataCollection(),
            attributes: [
                {
                    "pluck" : "orangeaverage",
                    "interp" : d3.interpolate(
                        d3.rgb(255,255,255),
                        d3.rgb(255, 165, 0))
                },{
                    "pluck" : "purpleaverage",
                    "interp" : d3.interpolate(
                        d3.rgb(255,255,255),
                        d3.rgb(128, 0, 128))
                },{
                    "pluck" : "greenaverage",
                    "interp" : d3.interpolate(
                        d3.rgb(255,255,255),
                        d3.rgb(0, 128, 0))
                },{
                    "pluck" : "banneraverage",
                    "interp" : d3.interpolate(
                        d3.rgb(255,255,255),
                        d3.rgb(255, 0, 0))
                }
            ],
            divHeight: 'auto',
	        divMinHeight: '2px',
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
        },

        setTextMode: function(mode) {
            if(mode == 'date') {
                this.set('textGenerator',
                         this.generatorValidator( this.dateGenerator ) );
            } else if(mode == 'number') {
                this.set('textGenerator',
                         this.generatorValidator( this.numberGenerator ) );
            } else if(mode == 'note') {
                this.set('textGenerator',
                         this.generatorValidator( this.noteGenerator ) );
            } else {
                this.set('textGenerator',
                         this.generatorValidator( this.blankGenerator ) );
            }
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();

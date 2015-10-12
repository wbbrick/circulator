let Backbone = require('backbone');
let $ = require('jquery');
let DataCollection = require('../collections/data');
let d3 = require('d3');
let _ = require('underscore');

module.exports = (function () {
    'use strict';
    return Backbone.Model.extend({
	    initialize: function( options ) {
		    this.model = options.model;
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
            return this.model.get('majorMusicTransformArray')[
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
            divMinHeight: '2px'
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

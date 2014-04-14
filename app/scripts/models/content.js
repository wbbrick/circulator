/*global D3Interpolator, Backbone*/

D3Interpolator.Models = D3Interpolator.Models || {};

(function () {
    'use strict';

    D3Interpolator.Models.Content = Backbone.Model.extend({
        initialize: function() {
            this.set( 'textGenerator',
                    this.noteGenerator)
        },

        noteGenerator: function ( max, pluck, d ) {
            return D3Interpolator.app.get('majorMusicTransformArray')[
                Math.round(d3.interpolate( 0,32 ) (
                    this.getPercentage(d[pluck], max)))
            ] || 0;
        },

        defaults: {
            data: new D3Interpolator.Collections.RouteData(),
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
            textGenerator: function( d ) {return d.cleanDate; }
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();

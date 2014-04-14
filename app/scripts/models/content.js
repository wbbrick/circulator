/*global D3Interpolator, Backbone*/

D3Interpolator.Models = D3Interpolator.Models || {};

(function () {
    'use strict';

    D3Interpolator.Models.Content = Backbone.Model.extend({

        url: '',

        initialize: function() {
            this.set( 'data', new D3Interpolator.Collections.RouteData() );
            this.set( 'attributes', [
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
            ] );
            
        },

        defaults: {
            data: {},
            attributes: []
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();

/*global D3Interpolator, Backbone*/

D3Interpolator.Models = D3Interpolator.Models || {};

(function () {
    'use strict';

    D3Interpolator.Models.App = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();

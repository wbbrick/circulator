/*global D3Interpolator, Backbone*/

D3Interpolator.Collections = D3Interpolator.Collections || {};

(function () {
    'use strict';

    D3Interpolator.Collections.RouteData = Backbone.Collection.extend({

        model: D3Interpolator.Models.Datum,
        url: "http://data.baltimorecity.gov/resource/wwvu-583r.json"

    });

})();

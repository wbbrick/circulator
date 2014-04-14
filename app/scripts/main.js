/*global D3Interpolator, $*/


window.D3Interpolator = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        D3Interpolator.app = new D3Interpolator.Models.App();

        D3Interpolator.app.router = new D3Interpolator.Routers.Routes( {
            pushState: true,
            root: "/" } );
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    D3Interpolator.init();
});

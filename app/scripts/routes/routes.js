/*global D3Interpolator, Backbone*/

D3Interpolator.Routers = D3Interpolator.Routers || {};

(function () {
    'use strict';

    D3Interpolator.Routers.Routes = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        home: function() {
            var contentView = new D3Interpolator.Views.Content();
            contentView.setElement( "#content" ).render().el;
        }
    });

})();

/*global D3Interpolator, Backbone, JST*/

D3Interpolator.Views = D3Interpolator.Views || {};

(function () {
    'use strict';

    D3Interpolator.Views.ContentOptions = Backbone.View.extend({

        template: JST['app/scripts/templates/ContentOptions.ejs'],

        tagName: 'div',

        id: 'content',

        className: '',

        events: {
            'click .btn-text' : 'textChange'
        },

        textChange: function ( ev ) {
            if(ev.currentTarget.id === 'text-notes'){
                this.model.setTextMode('note');
            } else if(ev.currentTarget.id === 'text-numbers'){
                this.model.setTextMode('number');
            } else if(ev.currentTarget.id === 'text-dates'){
                this.model.setTextMode('date');
            } else {
                this.model.setTextMode('none');
            }
        },

        initialize: function (mod) {
            this.model = mod;
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();

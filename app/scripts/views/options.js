let Backbone = require('backbone');
let $ = require('jquery');
let ContentModel = require('../models/content');

module.exports = (function () {
    'use strict';
	return Backbone.View.extend({

	    template: require( '../templates/options.ejs' ),

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

		initialize: function ( options ) {
			this.model = options.model;
            this.listenTo( this.model, 'change', this.render );
        },

        render: function () {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

})();

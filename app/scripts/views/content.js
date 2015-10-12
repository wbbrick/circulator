let Backbone = require('backbone');
let $ = require('jquery');
let _ = require('underscore');
let ContentModel = require('../models/content');
let OptionsView = require('./options');
let d3 = require('d3');

module.exports = (function () {
    'use strict';
    return Backbone.View.extend({
	    template: require( '../templates/content.ejs' ),

	    model: new ContentModel(),

        tagName: 'div',

        id: 'content',

        className: '',

        events: {},

	    initialize: function () {
		    this.optionsView = new OptionsView ( { 'model': this.model } );

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.get( 'data' ), 'reset', this.render);

            this.model.get( 'data' ).fetch( {
                "reset" : true
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.display();
            this.optionsView.setElement( $("#options") ).render();
            return this;
        },

        getMax: function(data, value) {
            return _.chain(data)
                .pluck( value )
                .max(function( d ) { return parseInt(d, 10); } )
                .value();
        },

        getPercentage: function(num, max) {
            if( _.isUndefined( num ) ) {
                return -1;
            }
            return ( num / max) ;
        },

        createColumn: function(data, attributes){
            var pluck = attributes["pluck"];
            var colorInterp = attributes["interp"];

            var max = this.getMax(data, pluck);

            var textFunction = _.bind(
                _.partial(this.model.get('textGenerator'), max, pluck), this
            );

            d3.select("#" + pluck).selectAll("div")
                .data(  data  )
                .enter()
                .append( "div" )
                .attr( "class", "day" )
                .style( "width", "100%" )
                .style( "height", this.model.get( 'divHeight' ) )
                .style( "min-height", this.model.get( 'divMinHeight' ) )
                .text ( textFunction )
                .style("background-color", _.bind( function(d) {
                    return colorInterp(this.getPercentage(d[pluck], max) );
                }, this ) );
        },

        display: function() {
            var data = this.model.get( 'data' ).toJSON();
            var dataColumn = _.partial(this.createColumn, data);
	        debugger;
            _.each( this.model.get( 'attributes' ),
                    _.bind(dataColumn, this
                    )
                  );
        }

    });

})();

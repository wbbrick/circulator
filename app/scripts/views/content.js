/*global D3Interpolator, Backbone, JST*/

D3Interpolator.Views = D3Interpolator.Views || {};

(function () {
    'use strict';

    D3Interpolator.Views.Content = Backbone.View.extend({

        template: JST['app/scripts/templates/content.ejs'],

        model: new D3Interpolator.Models.Content(),

        tagName: 'div',

        id: '',

        className: 'row',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.get( 'data' ), 'reset', this.render);
            this.model.get( 'data' ).fetch( {
                "reset" : true
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.display( );
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
            var interp = attributes["interp"];

            var max = this.getMax(data, pluck);


            d3.select("#" + pluck).selectAll("div")
                .data(  data  )
                .enter()
                .append("div")
                .attr("class", "day")
                .style("width", "100%" )
                .style("height", "3px" )
                /*.text( function( d ) {
                    return d['cleanDate'];
                } )*/
                .style("background-color", _.bind( function(d) {
                    return interp(this.getPercentage(d[pluck], max) );
                }, this ) )
            ;
        },

        display: function() {
            var data = this.model.get( 'data' ).toJSON();
            _.each( this.model.get( 'attributes' ),
                    _.bind(
                        _.partial(this.createColumn, data),
                        this
                    )
                  );
/*
            this.createColumn(data, "orangeaverage", d3.rgb(255, 165, 0));
            this.createColumn(data, "purpleaverage", d3.rgb(128, 0, 128));
            this.createColumn(data, "greenaverage", d3.rgb(0, 128, 0));
            this.createColumn(data, "banneraverage", d3.rgb(255, 0, 0));
*/
        }

    });

})();

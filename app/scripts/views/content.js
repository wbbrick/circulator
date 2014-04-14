/*global D3Interpolator, Backbone, JST*/

D3Interpolator.Views = D3Interpolator.Views || {};

(function () {
    'use strict';

    D3Interpolator.Views.Content = Backbone.View.extend({

        template: JST['app/scripts/templates/content.ejs'],

        model: new D3Interpolator.Models.Content(),

        tagName: 'div',

        id: 'content',

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
            this.display();
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

        scalefunc: function ( max, pluck, d ) {
            return D3Interpolator.app.get('majorMusicTransformArray')[
                Math.round(d3.interpolate( 0,32 ) (
                    this.getPercentage(d[pluck], max)))
            ] || 0;
        },

        createColumn: function(data, attributes){
            var pluck = attributes["pluck"];
            var colorInterp = attributes["interp"];

            var max = this.getMax(data, pluck);

            var scaleinterp = d3.interpolate(1,32);

            var textFunction = _.bind(
                _.partial(this.model.get('textGenerator'), max, pluck),
                this
            );

            d3.select("#" + pluck).selectAll("div")
                .data(  data  )
                .enter()
                .append( "div" )
                .attr( "class", "day" )
                .style( "width", "100%" )
                .style( "height", this.model.get( 'divHeight' ) )
            //.text( function( d ) {return d.cleanDate; } )
                .text ( _.bind( textFunction, this ) )
                .style("background-color", _.bind( function(d) {
                    return colorInterp(this.getPercentage(d[pluck], max) );
                }, this ) )
            ;

            $('div .day').tipsy({
                gravity: 'w',
                //html: true,
                title: function() {
                    var d = this.__data__;
                    return d['cleanDate'];
                }
            });
        },

        display: function() {
            var data = this.model.get( 'data' ).toJSON();
            var dataColumn = _.partial(this.createColumn, data);

            _.each( this.model.get( 'attributes' ),
                    _.bind(dataColumn, this
                    )
                  );
        }

    });

})();

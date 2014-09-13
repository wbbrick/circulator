/*global D3Interpolator, Backbone, JST*/

D3Interpolator.Views = D3Interpolator.Views || {};

(function () {
    'use strict';

    D3Interpolator.Views.Content = Backbone.View.extend({

        template: JST['app/scripts/templates/content.ejs'],

        model: new D3Interpolator.Models.Content(),

        tagName: 'div',

        id: 'content',

        className: '',

        events: {},

        initialize: function () {
            this.optionsView =
                new D3Interpolator.Views.ContentOptions( this.model );

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.get( 'data' ), 'reset', this.render);

            this.model.get( 'data' ).fetch( {
                "reset" : true
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.display();
            this.optionsView.setElement( $("#options") ).render().$el;
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
                }, this ) )
            ;
            /* this was kind of annoying
            $('div .day').tipsy({
                gravity: 'w',
                //html: true,
                title: function() {
                    var d = this.__data__;
                    return d['cleanDate'];
                }
            });*/
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

let Backbone = require('backbone');
let $ = require('jquery');

module.exports = (function () {
    'use strict';

    return Backbone.Model.extend({
        parse: function(response, options)  {
            response.cleanDate = new Date(response.date).toDateString();
            return response;
        }
    });

})();

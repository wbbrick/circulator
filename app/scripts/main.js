let ContentView = require('./views/content');
let Backbone = require('backbone');
let $ = require('jquery');
require( '../../node_modules/tipsy/src/javascripts/jquery.tipsy.js' );

require( '../styles/main.css' );
require( '../../node_modules/bootstrap/dist/css/bootstrap.css' );
require( '../../node_modules/tipsy/src/stylesheets/tipsy.css' );

$(document).ready(function () {
	'use strict';
	let contentView = new ContentView();
	contentView.setElement( "#content" ).render();
});


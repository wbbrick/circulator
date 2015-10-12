let ContentView = require('./views/content');
let Backbone = require('backbone');
let $ = require('jquery');

require( '../styles/main.css' );
require( '../../node_modules/bootstrap/dist/css/bootstrap.css' );

$(document).ready(function () {
	'use strict';
	let contentView = new ContentView();
	contentView.setElement( "#content" ).render();
});


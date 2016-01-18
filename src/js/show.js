var $ = require('jquery');

var staff = require('../data/staff.json');

var Event = require('./event.js');
$('.start').click(function(){

	Event.trigger('begin',{
		type:"0"
	})
})




// library
var $ = require('jquery');

// staff data
var staff = require('./staff.js');

var Event = require('./event.js');


Event.on('choujiang',function(args){
	console.log(args);
})

Event.trigger('choujiang',{
	name:'asd',
	id:'123',
})
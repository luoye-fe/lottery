var $ = require('jquery');

var staff = require('../data/staff.json');

var Event = require('./event.js');
/*$('.start').on('click', function() {
    alert(1)
        Event.trigger('begin',{
		type:"0"
	})

});*/
var oUl = document.createElement('ul');
for(var i<0;i<50;i++){
	var oLi = document.createElement('li');
	oUl.appendChild(oLi);

}

var fs = require('fs');
var path = require('path');



var imagePath = '../src/staffImage';


var result = [];


fs.readdir(imagePath, function(err, files) {
    files.forEach(function(item) {
    	if(path.extname(item) === '.jpg' || path.extname(item) === '.jpeg' || path.extname(item) === '.png'){
    		var _current = item.split(/\-|\－/);
    		var tpl = {}
    		tpl.EMPLOYEE_ID = _current[0];
    		tpl.empName = _current[2].replace(/.jpg|.png|.jpeg/ig,'');
    		tpl.IMAGE = 'src/staffImage/' + item;
    		result.push(tpl);
    	}
    })
    console.log(result);
    fs.writeFileSync('../src/data/staff.json', JSON.stringify(result), 'utf-8');
})

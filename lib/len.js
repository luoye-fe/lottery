var fs = require('fs');


fs.readFile('../src/data/staff.json','utf-8',function(err,data){
	console.log(JSON.parse(data).length);
})
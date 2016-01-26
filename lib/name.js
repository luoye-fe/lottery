var fs = require('fs');
var path = require('path');



var imagePath = '../src/staffImage/';


var result = [];



var randomsort = function(a, b) {
    return Math.random() > .5 ? -1 : 1;
}

fs.readdir(imagePath, function(err, files) {
    files.forEach(function(item) {
        fs.renameSync(imagePath+item,imagePath+item.replace(/\s+/g,'').replace(/\－/g,'-'));
        var _current = item.replace(/\s+/g,'').replace(/\－/g,'-').split(/\-/);
        var tpl = {};
        tpl.EMPLOYEE_ID = _current[0];
        tpl.empName = _current[2].replace(/.jpg|.png|.jpeg/ig, '');
        tpl.IMAGE = 'src/staffImage/' + item;
        result.push(tpl);
    })
    console.log(result.sort(randomsort));
    fs.writeFileSync('../src/data/staff.json', JSON.stringify(result.sort(randomsort)), 'utf-8');
})

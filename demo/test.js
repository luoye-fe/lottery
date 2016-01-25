var rand = require('./rand.js');


var staff = require('../src/data/staff.json');

var result = {};
for (var i = 0; i < 10000000; i++) {
    var _current = parseInt(rand.random() * staff.length);
    if (result[_current] === undefined) {
        result[_current] = {}
        result[_current]['num'] = 0;
    }
    result[_current]['num'] += 1;
}

for (var item in result) {
    result[item]['pre'] = result[item]['num'] / 10000000 * 100 + '%';
}
console.log(result);



// console.log(parseInt(rand.random() * staff.length));


// console.log(parseInt(Math.random() * staff.length));


// console.log(rand.randomint());

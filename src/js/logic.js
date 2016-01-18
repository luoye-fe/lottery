var utils = require('./utils.js');

var staff = require('../data/staff.json');
var reward = require('../data/reward.json');


var staffInfo = null;
if (localStorage.getItem('staffInfo') === null) {
    staffInfo = staff;
} else {
    staffInfo = utils.getItem('staffInfo');
}

window.addEventListener('beforeunload', function(e) {
    if (staffInfo !== null) {
    	utils.setItem('staffInfo',staffInfo);
    }
    var message = "是否退出抽奖？";
    e.returnValue = message;
    return message;
});

// ctrl+shift+i 初始化抽奖程序
window.addEventListener('keyup', function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        utils.confirm('是否初始化抽奖程序？', function() {
            for (i in localStorage) {
                staffInfo = null;
                localStorage.removeItem(i);
            }
            console.log("has init all!");
        }, function() {
            console.log('no init all!');
        })
    }
})

var drawLottery = function(obj) {
    var awards = reward[obj.type];
    console.log(awards);
}

drawLottery({
    type: '0'
})

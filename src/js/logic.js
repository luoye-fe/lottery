var utils = require('./utils.js');

var Event = require('./event.js');

var staff = require('../data/staff.json');
var reward = require('../data/reward.json');


var staffInfo;
var rewrdResult;
var init = function() {
    staffInfo = null;
    if (utils.getItem('staffInfo') === null) {
        staffInfo = staff;
        utils.setItem('staffInfo', staffInfo);
    } else {
        staffInfo = utils.getItem('staffInfo');
    }

    if (utils.getItem('rewrdResult') === null) {
        rewrdResult = {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
        };
        utils.setItem('rewrdResult', rewrdResult);
    } else {
        rewrdResult = utils.getItem('rewrdResult');
    }
}
init();

window.addEventListener('beforeunload', function(e) {
    if (staffInfo !== null) {
        utils.setItem('staffInfo', staffInfo);
    }
    if (rewrdResult !== null) {
        utils.setItem('rewrdResult', rewrdResult);
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
                utils.removeItem(i);
            }
            init();
            console.log("has init all!");
        }, function() {
            console.log('no init all!');
        })
    }
})

var Zwes = function(arr, type) {
    var len;
    if (reward[type].step > 0 && reward[type].number > 0) {
        len = reward[type].number / reward[type].step;
    }
    if (reward[type].step == '-1') {
        len = 1;
    }
    var newArr = [];
    for (var i = 0; i < len; i++) {
        var index = parseInt(Math.random() * arr.length);
        newArr.push(arr[index]);
        // 把抽过奖的从 staffInfo 中剔除
        arr.splice(index, 1);
    }
    return newArr;
}

var drawLottery = function(obj) {
    var type = obj.type;
    var awards = reward[obj.type];
    var result;
    if (checkDraw(obj)) {
        result = Zwes(staffInfo, type);
        for (var i = 0; i < result.length; i++) {
            rewrdResult[type].push(result[i])
        }
        window.currentResult = result;
        utils.setItem('rewrdResult',rewrdResult);
        utils.setItem('staffInfo',staffInfo);
    } else {
        utils.confirm('您已抽过' + awards.name + '！是否重新抽取？', function() {
            var _current = rewrdResult[type];
            for (var i = 0; i < _current.length; i++) {
                staffInfo.push(_current[i]);
            }
            rewrdResult[type].length = 0;
            drawLottery(obj);
            window.drawErr = false;
        }, function() {
            window.drawErr = true;
            return;
        })
    }
}

var checkDraw = function(obj) {
    var type = obj.type;
    var awards = reward[obj.type];
    if (rewrdResult[type].length >= awards.number && awards.number !== '-1') {
        return false;
    } else {
        return true;
    }
}


Event.on('start', function(obj) {
    drawLottery(obj);
})



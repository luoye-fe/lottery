var $ = require('jquery');
var ease = require('./easing.js');

var Event = require('./event.js');
var utils = require('./utils.js');

var staff = require('../data/staff.json');
var reward = require('../data/reward.json');


var html = {
    tpl: {
        base: '<li><img src="src/images/xiaolangren.png"></li>',
        staffList: (function() {
            var _current = [];
            for (var i = 0; i < staff.length; i++) {
                _current.push('<img index="' + i + '" staff-id="' + staff[i].EMPLOYEE_ID + '" class="staff-item" src="' + staff[i].IMAGE + '"/>');
            }
            return '<li class="people"><div class="staff-list">' + _current.join('') + '</div></li>';
        })()
    },
    createHtml: function(htmlTpl) {
        $('.list').html(htmlTpl);
        $('.staff-list').each(function(index) {
            $(this).css({
                'top': -parseInt(Math.random() * staff.length) * 222 + 'px',
            });
        })
    },
    createList: function(obj) {
        var type = obj.type;
        var tpl = this.tpl;
        switch (type) {
            case '0':
                var temp = tpl.base + tpl.staffList + tpl.base + tpl.staffList + tpl.base;
                this.createHtml(temp);
                break;
            case '1':
                var temp = tpl.staffList + tpl.base + tpl.staffList + tpl.base + tpl.staffList;
                this.createHtml(temp);
                break;
            case '2':
                var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
                this.createHtml(temp);
                break;
            case '3':
                var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
                this.createHtml(temp);
                break;
            case '4':
                var temp = tpl.base + tpl.base + tpl.staffList + tpl.base + tpl.base;
                this.createHtml(temp);
                break;
        }
    }
}

var rewardListSwtich = function() {
    if ($('.triangle').hasClass('on')) {
        $('.triangle').css({
            '-webkit-transform': 'translateY(-50%) rotate(-90deg)'
        }).addClass('off').removeClass('on');
        $('.bonus_set ul').css({
            'height': '0px',
            'border-top': 'none',
            'border-bottom': 'none'
        })
    } else {
        $('.triangle').css({
            '-webkit-transform': 'translateY(-50%) rotate(0deg)'
        }).addClass('on').removeClass('off');
        $('.bonus_set ul').css('display', 'block');
        $('.bonus_set ul').css({
            'height': '316px',
            'border-top': '3px solid #ff95a8',
            'border-bottom': '3px solid #ff95a8'
        })
    }
}

$('.bonus_set_title').on('click', function() {
    rewardListSwtich();
})


$('.bonus_set ul li').on('click', function() {
    window.drawErr = false;
    var index = $(this).attr('reward');
    rewardListSwtich();
    $('.bonus_set .bonus_set_title').css({
        'background': 'url(' + reward[index]['bg'] + ') no-repeat center '
    })
    html.createList({
        type: index
    })
    $('.bonus_set_title').attr('reward', index);
    $('.message').html('<li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li>');
})

// staff-list 动画
var ani = {
    oneTime: 100, // 每人动画时间 100ms
    ing: false,
    oneHeight: 222,
    staffLen: staff.length,
    loopStat: false,
    linearLoopAni: function() { // 循环匀速运行
        var _this = this;
        if (!this.loopStat) {
            return;
        }
        $('.staff-list').each(function(index) {
            $(this).animate({
                'top': -_this.oneHeight * (_this.staffLen - 1) + 'px'
            }, _this.oneTime * _this.staffLen, 'linear', function() {
                $(this).css('top', '0');
                _this.linearLoopAni();
            })
        })
    },
    easeInAni: function(cb) { // 加速运行到最底部
        var _this = this;
        $('.staff-list').each(function(index) {
            var staffIndex = Math.abs(parseInt($(this).css('top')) / ani.oneHeight);
            var diffIndex = ani.staffLen - 1 - staffIndex;
            if (diffIndex < 20) {
                $(this).css('top', -ani.oneHeight * (staffIndex - 20));
                staffIndex = staffIndex - 20;
            }
            $(this).animate({
                'top': -_this.oneHeight * (_this.staffLen - 1) + 'px'
            }, _this.oneTime * (_this.staffLen - staffIndex), 'easeInQuad', function() {
                $(this).stop();
                $(this).css('top', '0');
                cb && cb();
            })
        })
    },
    easeOutAni: function() {

    }
}


$('.start').on('click', function() {
    if (ani.ing) {
        return;
    }
    ani.ing = true;
    ani.loopStat = true;
    ani.easeInAni(function(){
        ani.linearLoopAni();
    });
})



$('.stop').on('click', function() {
    if (!ani.ing) {
        return;
    }
    ani.ing = false;
    ani.loopStat = false;
    $('.staff-list').each(function(index) {
        $(this).stop();
    })
})

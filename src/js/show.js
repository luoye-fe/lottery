var $ = require('jquery');
var ease = require('./easing.js');

var Event = require('./event.js');
var utils = require('./utils.js');

var staff = require('../data/staff.json');
var reward = require('../data/reward.json');



var tpl = {
    base: '<li><img src="src/images/xiaolangren.png"></li>',
    staffList: (function() {
        var _current = [];
        for (var i = 0; i < staff.length; i++) {
            _current.push('<img index="' + i + '" staff-id="' + staff[i].EMPLOYEE_ID + '" class="staff-item" src="' + staff[i].IMAGE + '"/>');
        }
        return '<li class="people"><div class="staff-list">' + _current.join('') + '</div></li>';
    })()
}
var createList = function(obj) {
    var type = obj.type;
    switch (type) {
        case '0':
            var temp = tpl.base + tpl.staffList + tpl.base + tpl.staffList + tpl.base;
            $('.list').html(temp);
            $('.staff-list').each(function(index) {
                $(this).css('top', -parseInt(Math.random() * staff.length) * 222 + 'px');
            })
            break;
        case '1':
            var temp = tpl.staffList + tpl.base + tpl.staffList + tpl.base + tpl.staffList;
            $('.list').html(temp);
            $('.staff-list').each(function(index) {
                $(this).css('top', -parseInt(Math.random() * staff.length) * 222 + 'px');
            })
            break;
        case '2':
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
            $('.list').html(temp);
            $('.staff-list').each(function(index) {
                $(this).css('top', -parseInt(Math.random() * staff.length) * 222 + 'px');
            })
            break;
        case '3':
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
            $('.list').html(temp);
            $('.staff-list').each(function(index) {
                $(this).css('top', -parseInt(Math.random() * staff.length) * 222 + 'px');
            })
            break;
        case '4':
            var temp = tpl.base + tpl.base + tpl.staffList + tpl.base + tpl.base;
            $('.list').html(temp);
            $('.staff-list').each(function(index) {
                $(this).css('top', -parseInt(Math.random() * staff.length) * 222 + 'px');
            })
            break;
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

$('.bonus_set_title').click(function() {
    rewardListSwtich();
})


$('.bonus_set ul li').click(function() {
    window.drawErr = false;
    var index = $(this).attr('reward');
    rewardListSwtich();
    $('.bonus_set .bonus_set_title').css({
        'background': 'url(' + reward[index]['bg'] + ') no-repeat center '
    })
    createList({
        type: index
    })
    $('.bonus_set_title').attr('reward', index);
    $('.message').html('<li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li>');
})


var ing = false;


var oneHeight = 222;
var stage1_num = 20;
var oneTime = 200;
var len = staff.length;
var allHeight = (len - 1) * oneHeight;
var allNum = 0;


$('.start').click(function() {

    var rewardIndex = $('.bonus_set_title').attr('reward');
    if (rewardIndex !== 'null' && !ing) {

        Event.trigger('start', {
            type: rewardIndex
        })

        if (window.drawErr) {
            return;
        }

        $('audio')[0].play();

        allNum = 0;

        $('.message').html('<li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li>');

        ing = true;
        var len = staff.length;

        $('.staff-list').each(function(index) {
            var curHeight = parseInt($('.staff-list').eq(index).css('top'));

            var obj = $(this);
            allNum = index;
            setTimeout(function() {
                obj.animate({
                    'top': curHeight + (-stage1_num * oneHeight) < -allHeight ? -allHeight + 'px' : curHeight + (-stage1_num * oneHeight) + 'px'
                }, {
                    duration: curHeight + (-stage1_num * oneHeight) < -allHeight ? (allHeight - Math.abs(curHeight)) / oneHeight * oneTime : stage1_num * oneTime,
                    easing: "easeInQuad",
                    step: function() {},
                    complete: function() {
                        obj.css('top', 0);
                        fn(obj);
                    }
                });
            }, index * 500);
        });

        function fn(ele) {
            ele.animate({
                'top': -allHeight + 'px'
            }, 20 * oneTime, 'linear', function() {
                ele.css('top', 0);
                fn(ele, true);
            })
        }
    }

})

$('.stop').click(function() {
    if (ing) {
        var nowNum = 0;
        var rewardIndex = $('.bonus_set_title').attr('reward');
        Event.trigger('stop');

        ing = false;

        var peopleLen = utils.getItem('staffInfo').length;

        $('.staff-list').each(function(index) {


            var obj = $(this);
            obj.stop();

            var tarHeight = -($('[staff-id="' + window.currentResult[index].EMPLOYEE_ID + '"]').attr('index') * oneHeight);


            var curHeight = parseInt($('.staff-list').eq(index).css('top'));


            var diff = Math.abs(Math.abs(tarHeight) - Math.abs(curHeight));



            var noLoop = function(index) {
                $('.staff-list').eq(index).animate({
                    'top': tarHeight + 'px'
                }, 7000 + index * 100, 'easeOutQuad', function() {
                    $('.message li').eq($('.people').eq(index).index())[0].innerHTML = '<div>' + window.currentResult[index].empName + '</div><div>' + window.currentResult[index].EMPLOYEE_ID + '</div>'
                    if (allNum == nowNum) {
                        $('audio')[0].pause();
                    }
                    nowNum++;
                })
            }



            var loop = function(index) {
                $('.staff-list').eq(index).animate({
                    'top': -allHeight + 'px'
                }, 20 * oneTime / (staff.length - $('[staff-id="' + window.currentResult[index].EMPLOYEE_ID + '"]').attr('index')), 'linear', function() {
                    $('.staff-list').css('top', 0);
                    $('.staff-list').eq(index).animate({
                        'top': tarHeight + 'px'
                    }, 7000 + index * 100 - 10 * oneTime, 'easeOutQuad', function() {
                        $('.message li').eq($('.people').eq(index).index())[0].innerHTML = '<div>' + window.currentResult[index].empName + '</div><div>' + window.currentResult[index].EMPLOYEE_ID + '</div>'
                        if (allNum == nowNum) {
                            $('audio')[0].pause();
                        }
                        nowNum++;
                    })
                })
            }

            if (curHeight > tarHeight) {
                if (diff < allHeight / 2) {
                    obj.css('top', '0');
                }
                noLoop(index);
            } else {
                if (Math.abs(tarHeight) < allHeight / 2) {
                    loop(index);
                } else {
                    obj.css('top', '0');
                    noLoop(index);
                }
            }
        })

    }
})

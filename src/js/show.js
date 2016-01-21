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
            break;
        case '1':
            var temp = tpl.staffList + tpl.base + tpl.staffList + tpl.base + tpl.staffList;
            $('.list').html(temp);
            break;
        case '2':
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
            $('.list').html(temp);
            break;
        case '3':
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
            $('.list').html(temp);
            break;
        case '4':
            var temp = tpl.base + tpl.base + tpl.staffList + tpl.base + tpl.base;
            $('.list').html(temp);
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
    var index = $(this).attr('reward');
    rewardListSwtich();
    $('.bonus_set .bonus_set_title').css({
        'background': 'url(' + model[index]['bg'] + ') no-repeat center '
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
var oneTime = 100;
var len = staff.length;
var allHeight = (len - 1) * oneHeight;

$('.start').click(function() {
    var rewardAttr = $('.bonus_set_title').attr('reward');
    if (rewardAttr !== 'null') {

        $('.message').html('<li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li>');

        ing = true;
        var len = staff.length;
        var index = 1;

        Event.trigger('start', {
            type: rewardAttr
        })


        $('.staff-list').each(function(index) {
            var obj = $(this);
            setTimeout(function() {
                obj.animate({
                    'top': -stage1_num * oneHeight + 'px'
                }, {
                    duration: stage1_num * oneTime,
                    easing: "easeInQuad",
                    step: function() {},
                    complete: function() {
                        fn(obj);
                    }
                });
            }, index * 300);
        });

        function fn(obj, btn) {
            if (btn) {
                var rest = len;
            } else {
                var rest = len - stage1_num;
            }
            obj.animate({
                'top': -allHeight + 'px'
            }, rest * 50, 'linear', function() {
                obj.css('top', 0);
                fn(obj, true);
            })
        }
    }

})

$('.stop').click(function() {
    if (ing) {
        var rewardAttr = $('.bonus_set_title').attr('reward');
        Event.trigger('stop');
        ing = false;

        $('.staff-list').each(function() {
            var obj = $(this);
            obj.stop();
        });
        var result = [];
        for (var i = 0; i < utils.getItem(model[rewardAttr].name).length; i++) {
            result.push($('.people').eq(i).find('[staff-id="' + utils.getItem(model[rewardAttr].name)[i].EMPLOYEE_ID + '"]'));
        }
        $('.staff-list').each(function(index) {
            $('.staff-list').eq(index).animate({
                'top': -result[index].attr('index') * 222 + 'px'
            }, result[index].attr('index') * 50, 'easeOutQuad', function() {
                $('.message li').eq($('.people').eq(index).index()).html('<div>' + utils.getItem(model[rewardAttr].name)[index].empName + '</div><div>' + utils.getItem(model[reward].name)[index].EMPLOYEE_ID + '</div>')
            })
        })
    }
})

var $ = require('jquery');
var ease = require('./easing.js');

var Event = require('./event.js');
var utils = require('./utils.js');

var staff = require('../data/staff.json');



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
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
            $('.list').html(temp);
            break;
        case '5':
            var temp = tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList + tpl.staffList;
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
            'height': '378px',
            'border-top': '3px solid #ff95a8',
            'border-bottom': '3px solid #ff95a8'
        })
    }
}

$('.bonus_set_title').click(function() {
    rewardListSwtich();
})


var model = {
    '0': {
        'bg': 'src/images/yidengjiang.png',
        'name': '一等奖'
    },
    '1': {
        'bg': 'src/images/erdengjiang.png',
        'name': '二等奖'
    },
    '2': {
        'bg': 'src/images/sandengjiang.png',
        'name': '三等奖'
    },
    '3': {
        'bg': 'src/images/nuanxin1.png',
        'name': '暖心奖1'
    },
    '4': {
        'bg': 'src/images/nuanxin2.png',
        'name': '暖心奖2'
    },
    '5': {
        'bg': 'src/images/xianjin.png',
        'name': '现金红包'
    }
}

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
var allNum = 0;
$('.start').click(function() {
    $('audio')[0].play();
    allNum = 0;
    var reward = $('.bonus_set_title').attr('reward');

    if (reward !== 'null') {

        $('.message').html('<li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li><li><div>***</div><div>*****</div></li>');

        ing = true;
        var len = staff.length;
        var index = 1;

        Event.trigger('start', {
            type: reward
        })



        $('.staff-list').each(function(index) {
            var obj = $(this);
            allNum = index;
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
        var nowNum = 0;
        var reward = $('.bonus_set_title').attr('reward');
        Event.trigger('stop');
        ing = false;

        $('.staff-list').each(function() {
            var obj = $(this);
            obj.stop();
        });
        var result = [];
        for (var i = 0; i < utils.getItem(model[reward].name).length; i++) {
            result.push($('.people').eq(i).find('[staff-id="' + utils.getItem(model[reward].name)[i].EMPLOYEE_ID + '"]'));

        }
        var peopleLen = utils.getItem('staffInfo').length;
        $('.staff-list').each(function(index) {
            var str = $(this).eq(0).html();
            var n = '';
            for (var i = 0; i < index + 2; i++) {
                n += str;
            }

            $(this).eq(0).html(n);
        })
        $('.staff-list').each(function(index) {
            //如果当前的
            var curHeight = Math.abs(parseInt($('.staff-list').eq(index).css('top')));
            var tarHeight = result[index].attr('index') * oneHeight;
            var loop;
            var time;
            //console.log(curHeight + '/' + tarHeight)
            if(curHeight < tarHeight){
                //只转一轮
                loop = 0;
                time = result[index].attr('index') - (curHeight / 222);

            }else{
                //转完当前轮再转到目标位置
                loop = allHeight;
                time = (peopleLen - curHeight / 222) + tarHeight / oneHeight  ///;
            }
            
            $('.staff-list').eq(index).animate({
                'top': -(loop + tarHeight) + 'px'
            }, time * 200, 'easeOutQuad', function() {
                $('.message li').eq($('.people').eq(index).index()).html('<div>' + utils.getItem(model[reward].name)[index].empName + '</div><div>' + utils.getItem(model[reward].name)[index].EMPLOYEE_ID + '</div>')

                if (allNum == nowNum) {
                    $('audio')[0].pause();

                }
                nowNum++;
            })
        })
    }
})

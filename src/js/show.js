var $ = require('jquery');
var ease = require('./easing.js');

var Event = require('./event.js');

var staff = require('../data/staff.json');



var tpl = {
    base: '<li><img src="src/images/xiaolangren.png"></li>',
    staffList: (function() {
        var _current = [];
        for (var i = 0; i < staff.length; i++) {
            _current.push('<img class="staff-item" src="' + staff[i].IMAGE + '"/>');
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
    },
    '1': {
        'bg': 'src/images/erdengjiang.png',
    },
    '2': {
        'bg': 'src/images/sandengjiang.png',
    },
    '3': {
        'bg': 'src/images/nuanxin1.png',
    },
    '4': {
        'bg': 'src/images/nuanxin2.png',
    },
    '5': {
        'bg': 'src/images/xianjin.png',
    }
}

$('.bonus_set ul li').click(function() {
    var index = $(this).attr('reward');
    rewardListSwtich();
    $('.bonus_set .bonus_set_title').css({
        'background': 'url(' + model[index]['bg'] + ') no-repeat center	'
    })
    createList({
        type: index
    })
    $('.bonus_set_title').attr('reward', index);
})

var ing = false;
$('.start').click(function() {
    var reward = $('.bonus_set_title').attr('reward');
    if (reward !== 'null') {
        ing = true;
        Event.trigger('start', {
            type: reward
        })

        // var fn = function() {
        //     $('.people').each(function() {
        //         $(this).animate({
        //             'top': '-10878px'
        //         }, 4000, 'linear', function() {
        //             $(this).css('top', 0);
        //             fn();
        //         });
        //     })

        // }
        
        $('.staff-list').each(function() {
            $(this).eq(0).animate({
                'top': '-500px'
            }, {
                duration: 500,
                easing: "linear",
                step:function(){
                    console.log("!");
                },
                complete: function() {
                    // if (index == 3) isBegin = false;
                    console.log("!");
                }
            });
        })
    }

})
$('.stop').click(function() {
    if (ing) {
        var reward = $('.bonus_set_title').attr('rewar,d');
        Event.trigger('stop');
        ing = false;
    }

})

// library
var $ = require('jquery');

// staff data
var staff = require('./staff.js');



var staff = new Vue({
    el: '#staff',
    data: {
        staff: staff,
        newStaff:{
        	EMPLOYEE_ID:'',
        	empName:'',
        	job:'',
        	work_position:'',
        	deptname:''
        }
    },
    extra: {
        asce: true
    },
    created: function() {
        var btn = $(this.$options.el).find('.sort');
        if (this.$options.extra.asce) {
            btn.html('降序');
            this.asce();
        } else {
            btn.html('升序');
            this.desc();
        }
    },
    events: {
        greeting: function(msg) {
            console.log(msg);
        },
        bye: 'sayGoodbye',

    },
    methods: {
        sayGoodbye: function() {
            console.log('goodbye!')
        },
        sort: function(event) {
            if (this.$options.extra.asce) {
                this.$options.extra.asce = false;
                event.target.innerHTML = '升序';
                this.desc();
            } else {
                this.$options.extra.asce = true;
                event.target.innerHTML = '降序';
                this.asce();
            }
        },
        asce: function() {
            this.staff.sort(function(a, b) {
                return a.EMPLOYEE_ID - b.EMPLOYEE_ID;
            })
        },
        desc: function() {
            this.staff.sort(function(a, b) {
                return b.EMPLOYEE_ID - a.EMPLOYEE_ID;
            })
        },
        addStaff:function(){
        	this.staff.push(this.newStaff)
        },
        delStaff:function(index){
        	this.staff = this.staff.slice(0,index).concat(this.staff.slice(index));
        }
    },

})


new Vue({
    // el: '#demo',
    data: {
        msg: 'hello!'
    }
})



Vue.directive('demo', {
    bind: function() {
        console.log('first bind!');
    },
    update: function(value) {
        this.el.innerHTML =
            'name - ' + this.name + '<br>' +
            'expression - ' + this.expression + '<br>' +
            'argument - ' + this.arg + '<br>' +
            'modifiers - ' + JSON.stringify(this.modifiers) + '<br>' +
            'value - ' + value
    }
})

var utils = {};


utils.confirm = function(msg, fn1, fn2) {
    if (confirm(msg)) {
        fn1 && fn1();
    } else {
        fn2 && fn2();
    }
}


// query -> {key:value}
utils.find = function(query, data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        for (key in query) {
            if (data[i][key].indexOf(query[key]) >= 0) {
                result.push(data[i]);
            }
        }
    }
    return result;
}


utils.getItem = function(key) {
    return JSON.parse(localStorage.getItem(key));
}

// value -> string | obj
utils.setItem = function(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

utils.removeItem = function(key) {
    localStorage.removeItem(key);
}


module.exports = utils;

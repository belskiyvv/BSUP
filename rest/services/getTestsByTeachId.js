//поиск тестов учителя
var mongoose = require('mongoose');
var Test = require('../../models/test');


module.exports = function (teachId, callback) {
    Test.find({teach_id: teachId}).lean().exec(function (err, tests) {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, tests);
        }
    })
};
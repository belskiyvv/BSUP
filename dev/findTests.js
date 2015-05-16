//поиск тестов учителя
var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

mongoose.connect(dbConfig.url);

Teacher.findOne({username: 'teacher'},function(err,teacher) {
    Test.find({teach_id: teacher._id},function(err,tests) {
        console.log(tests);
    })
});


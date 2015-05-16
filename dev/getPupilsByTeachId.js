var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');
var Group = require('../models/group');

var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);

Teacher.findOne({username: 'teacher'},function(err,teach) {
    console.log(teach);
    Group.find({'teacher_id': teach._id}).lean().exec(function(err,groups) {
        console.log(groups);
        var pupils = [];
        if(err) {
            callback(err,null);
        }
        for(var i=0; i<groups.length; i++) {
            pupils = pupils.concat(groups[i].pupils);
        }
        console.log(pupils);
    });
});
//Group.find().lean().exec(function(err,groups) {
//    console.log(groups);
//})
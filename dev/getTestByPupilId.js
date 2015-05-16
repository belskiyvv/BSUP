var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

var ObjectId = mongoose.Schema.Types.ObjectId;


var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);

var testArray = [];
//Test.findOne({'name':'name2'},function(err,test) {
//    console.log(test.pupils);
//})
Pupil.findOne({'username': 'pupil1'},function(err,pupil) {
    //console.log(pupil);
    //Test.find({'pupils._id':pupil._id}).lean().exec(function(err,pupils) {
    //    console.log(pupils);
    //})
    console.log(pupil._id);
    Test.find(
        {'pupils.pupil_id': pupil._id},function(err,result) {
            console.log(result);
        })
})
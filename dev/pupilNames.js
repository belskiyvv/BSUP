//имена всех учеников, проходящих тест
var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

mongoose.connect(dbConfig.url);

var pupilNames = [];

function findPupils(index,length,test,callback) {
    //console.log(test.pupils[index].pupil_id);
    Pupil.findById(test.pupils[index].pupil_id,function(err, pupil) {
        //console.log('PUPIL: ' + pupil);
        pupilNames.push(pupil.name);
        index++;
        if(index===length) {
            return callback();
        }
        else {
            return findPupils(index,length,test,callback)
        }
    })
};

Teacher.findOne({username: 'teacher'},function(err,teacher) {
   Test.findOne({teach_id: teacher._id},function(err, test) {
       var index = 0;
       findPupils(index,test.pupils.length,test,function() {
           console.log(pupilNames);
       })
   })
});

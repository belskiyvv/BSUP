var mongoose = require('mongoose');
var Test = require('../../models/test');

module.exports = function(testId,pupilId,answers,callback) {
    Test.findById(testId,function(err,test) {
        if(err) {
            return callback(err);
        }
       test.pupils.id(pupilId,function(err,pupil) {
           if(err) {
               return callback(err);
           }
           pupil.asnwers = answers;
           pupil.save(function(err,callback) {
               if(err) {
                   return callback(err);
               }
               return callback(null)
           });
       })
    });
};
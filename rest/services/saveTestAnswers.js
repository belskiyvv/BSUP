var mongoose = require('mongoose');
var Test = require('../../models/test');

module.exports = function(testId,pupilId,answers,callback) {
    Test.findById(testId,function(err,test) {
        if(err) {
            return callback(err);
        }
        var pupilFind;
        var pupil;
       for(var pupilIndex = 0; pupilIndex<test.pupils.length;pupilIndex++) {
           pupil = test.pupils[pupilIndex];
           pupilFind = true;
           //console.log(pupil.pupil_id.toString()===pupilId.toString());
           if(pupil.pupil_id.toString()===pupilId.toString()) {
               if(pupil.answers.length > 0) {
                   return callback('answers exists');
               }
               test.pupils[pupilIndex].answers = answers;
               console.log(test);
               test.save(function(err) {
                   if(err) {
                       return callback(err);
                   }
                   return callback(null)
               });
           }
       }
        if(!pupilFind) {
            return callback('not found');
        }
    });
};
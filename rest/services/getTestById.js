var mongoose = require('mongoose');
var Test = require('../../models/test');

module.exports = function(testId,pupilId,callback) {
  Test.findById(testId,function(err,test) {
     if(err) {
         return callback(err, null);
     }
          for (var questIndex = 0; questIndex < test.questions.length; questIndex++) {
              //console.log(tests[testIndex].questions[questIndex]);
              delete test.questions[questIndex].correct;
          }
          for(var pupilIndex = 0; pupilIndex < test.questions.length; pupilIndex++) {
              if(test.pupils[pupilIndex].pupil_id.toString() === pupilId.toString()) {
                  test.answers = test.pupils[pupilIndex].answers;
              }
          }
          delete test.pupils;
      return callback(null,test);
  });
};
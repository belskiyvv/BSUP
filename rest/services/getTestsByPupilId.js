//поиск тестов учителя
var mongoose = require('mongoose');
var Test = require('../../models/test');


module.exports = function (pupilId, callback) {
    Test.find(
        {'pupils.pupil_id': pupilId}).lean().exec(function (err, tests) {
            if (err) {
                return callback(err, null);
            }
            else {
                //console.log(tests.length);
                for (var testIndex = 0; testIndex < tests.length; testIndex++) {
                    //console.log(tests[testIndex]);
                    for (var questIndex = 0; questIndex < tests[testIndex].questions.length; questIndex++) {
                        //console.log(tests[testIndex].questions[questIndex]);
                        delete tests[testIndex].questions[questIndex].correct;
                    }
                    for(var pupilIndex = 0; pupilIndex < tests[testIndex].questions.length; pupilIndex++) {
                        if(tests[testIndex].pupils[pupilIndex].pupil_id.toString() === pupilId.toString()) {
                            tests[testIndex].answers = tests[testIndex].pupils[pupilIndex].answers;
                        }
                    }
                    delete tests[testIndex].pupils;
                }

                return callback(null, tests);
            }
        })
};
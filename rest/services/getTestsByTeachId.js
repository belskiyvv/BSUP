//поиск тестов учителя
var mongoose = require('mongoose');
var Test = require('../../models/test');


module.exports = function (teachId, callback) {
    Test.find({teach_id: teachId}).lean().exec(function (err, tests) {
        if (err) {
            return callback(err, null);
        }
        var pupilsDone;
        var pupil, test;
        for (var testIndex = 0; testIndex < tests.length; testIndex++) {
            pupilsDone = [];
            test = tests[testIndex];
            for (var pupilIndex = 0; pupilIndex < test.pupils.length; pupilIndex++) {
                pupil = tests[testIndex].pupils[pupilIndex];
                if (pupil.answers.length === test.questions.length) {
                    pupilsDone.push(pupil);
                }
            }
            test.pupilsDone = pupilsDone;
        }
        return callback(null, tests);
    })
};
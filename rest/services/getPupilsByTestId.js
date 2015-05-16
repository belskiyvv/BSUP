var mongoose = require('mongoose');
var Test = require('../../models/test');
var Pupil = require('../../models/pupil');


module.exports = function (testId, callback) {

    function getCorrectLength(answers, questions) {
        var result = 0;
        for (var i = 0; i < questions.length; i++) {
            if (answers[i] == questions[i].correct) {
                result++;
            }
        }
        return result;
    }

    function getPupil(i, pupils, test, result, callback) {
        Pupil.findById(pupils[i].pupil_id, function (err, pupil) {
                if (err) {
                    return callback(err, null)
                }
                var correct = getCorrectLength(pupils[i].answers, test.questions);
                var status = pupils[i].answers.length === test.questions.length ? true : false;

                result.push({
                    id: pupil._id,
                    name: pupil.name,
                    secondName: pupil.secondName,
                    answers: pupils[i].answers,
                    correct: status ? correct : '-',
                    mistake: status ? pupils[i].answers.length - correct : '-',
                    status: status,
                    displayStatus: status ? 'Пройден' : 'Ожидается',
                })

                i++;
                if (i === pupils.length) {
                    return callback(null, result)
                }
                return getPupil(i, pupils, test, result, callback);
            }
        )
    }

    Test.findById(testId).lean().exec(function (err, test) {
        var pupils = test.pupils;
        if (err) {
            return callback(err, null);
        }
        if (!test) {
            return callback('not found', null)
        }
        var result = [];
        var i = 0;
        return getPupil(i, pupils, test, result, callback);
    });
}

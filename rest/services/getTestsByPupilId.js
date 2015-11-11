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
				for (var testIndex = 0; testIndex < tests.length; testIndex++) {

					//TODO: сделать выборку
					for (var questIndex = 0; questIndex < tests[testIndex].questions.length; questIndex++) {
						delete tests[testIndex].questions[questIndex].correct;
					}
					for (var pupilIndex = 0; pupilIndex < tests[testIndex].pupils.length; pupilIndex++) {
						if (tests[testIndex].pupils[pupilIndex].pupil_id.toString() === pupilId.toString()) {
							tests[testIndex].answers = tests[testIndex].pupils[pupilIndex].answers ? tests[testIndex].pupils[pupilIndex].answers : [];
						}
					}
					delete tests[testIndex].pupils;
				}

				return callback(null, tests);
			}
		})
};
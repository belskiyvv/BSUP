var mongoose = require('mongoose');
var Test = require('../../models/test');

module.exports = {
	pupil: function (testId, pupilId, callback) {
		Test.findById(testId, function (err, test) {
			if (err) {
				return callback(err, null);
			}

			//TODO: сделать выборку
			for (var questIndex = 0; questIndex < test.questions.length; questIndex++) {
				delete test.questions[questIndex].correct;
			}

			for (var pupilIndex = 0; pupilIndex < test.pupils.length; pupilIndex++) {
				if (test.pupils[pupilIndex].pupil_id.toString() === pupilId.toString()) {
					test.answers = test.pupils[pupilIndex].answers;
				}
			}

			delete test.pupils;
			return callback(null, test);
		});
	},
	teacher: function (testId, callback) {
		Test.findById(testId, function (err, test) {
			if (err) {
				return callback(err, null);
			}

			return callback(null, test);
		});
	}
};
//поиск тестов учителя
var mongoose = require('mongoose');
var Test = require('../../models/test');


module.exports = function (teachId, callback) {
	Test.find({teach_id: teachId}).lean().exec(function (err, tests) {
		if (err) {
			return callback(err, null);
		}

		tests.forEach(function (test) {
			test.pupilsDone = test.pupils.filter(function (pupil) {
				return pupil.answers.length === test.questions.length
			});
		});

		//for (var testIndex = 0; testIndex < tests.length; testIndex++) {
		//	pupilsDone = [];
		//	test = tests[testIndex];
		//
		//	test.pupils.forEach(function(pupil) {
		//		if (pupil.answers.length === test.questions.length) {
		//			pupilsDone.push(pupil);
		//		}
		//	});

		//for (var pupilIndex = 0; pupilIndex < test.pupils.length; pupilIndex++) {
		//	pupil = tests[testIndex].pupils[pupilIndex];
		//	if (pupil.answers.length === test.questions.length) {
		//		pupilsDone.push(pupil);
		//	}
		//}

		//	test.pupilsDone = pupilsDone;
		//}

		return callback(null, tests);
	})
};
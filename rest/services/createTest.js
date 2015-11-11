var mongoose = require('mongoose');
var Test = require('../../models/test')

module.exports = function (test, callback) {
	var newTest = new Test;

	newTest.name = test.name;
	newTest.view = test.view;
	newTest.pupils = test.pupils;
	newTest.questions = test.questions;
	newTest.teach_id = test.teach_id;

	newTest.save(function (err) {
		if (err) {
			return callback(err)
		}
		callback();
	});
}

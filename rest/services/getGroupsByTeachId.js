var mongoose = require('mongoose');
var Group = require('../../models/group');


module.exports = function (teachId, callback) {
	Group.find({'teacher_id': teachId}).lean().exec(function (err, groups) {
		var pupils = [];

		if (err) {
			return callback(err, null);
		}

		return callback(null, groups);
	});
};

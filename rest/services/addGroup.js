var mongoose = require('mongoose');
var Group = require('../../models/group');

module.exports = function (groupName, teacherId, callback) {
	var group = new Group();
	group.name = groupName;
	group.teacher_id = teacherId;

	group.save(function (err) {
		if (err) {
			return callback(err);
		}

		return callback(null, group);
	})
};
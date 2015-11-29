var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');
var Group = require('../models/group');

var bCrypt = require('bcrypt-nodejs');

//mongoose.connect(dbConfig.url);
module.exports = function () {
	var group = new Group;

	Teacher.findOne({'username': 'teacher'}, function (err, teacher) {
		group.teacher_id = teacher._id;
		group.pupils = [];

		Pupil.findOne({'username': 'pupil1'}, function (err, pupil) {
			if(!pupil) {
				return;
			}
			group.pupils.push({pupil_id: pupil._id});

			Pupil.findOne({'username': 'pupil2'}, function (err, pupil) {
				group.pupils.push({pupil_id: pupil._id});

				Pupil.findOne({'username': 'pupil3'}, function (err, pupil) {
					group.pupils.push({pupil_id: pupil._id});
					group.save(function (err) {
						if (!err) {
							console.log('ok');
						}
					})
				});
			});
		});
	});
}
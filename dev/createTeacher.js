var mongoose = require('mongoose');
var dbConfig = require('../db');
var Teacher = require('../models/teacher');
var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);
//module.exports = function () {
	var createHash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

	var username = 'admin';
	var password = 'admin';
	var name = 'admin';
	var secondName = 'admin';
	Teacher.findOne({'username': username}, function (err, user) {
		if (err) {
			console.log('Error in signup: ' + err);
			return;
		}
		if (user) {
			console.log('teacher already exists: ' + username);
			return;
		}

		var newTeacher = new Teacher();

		newTeacher.username = username;
		newTeacher.password = createHash(password);
		newTeacher.name = name;
		newTeacher.secondName = secondName;

		newTeacher.save(function (err) {
			if (err) {
				console.log('Error in saving teacher: ' + err);
				throw err;
			}

			console.log('new teacher ' + username);
		})
	});
//};


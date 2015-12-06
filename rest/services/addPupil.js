var mongoose = require('mongoose');
var Pupil = require('../../models/pupil');
var Teacher = require('../../models/teacher');
var Group = require('../../models/group');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (pupil, teacherId, callback) {
	//console.log(pupil);
	var createHash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

	Group.findOne({teacher_id: teacherId, _id: pupil.group}, function (err, group) {
		//console.log(group);
		if (err) {
			return callback(err);
		}
		if (!group) {
			group = new Group;
			group.teacher_id = teacherId;
		}
		Pupil.findOne({'username': pupil.username}, function (err, user) {
			if (err) {
				return callback(err)
			}
			if (user) {
				return callback('pupil exists')
			}

			var newPupil = new Pupil();

			var username = pupil.username;
			var password = pupil.password;
			var name = pupil.name;
			var secondName = pupil.secondName;

			//console.log(pupil);

			newPupil.username = username;
			newPupil.password = createHash(password);
			newPupil.name = name;
			newPupil.secondName = secondName;

			newPupil.save(function (err) {
				if (err) {
					return callback(err)
				}

				group.pupils.push({pupil_id: newPupil._id});
				group.save(function (err) {
					if (err) {
						return callback(err)
					}
					return callback(null);
				})
			})
		});
	});
	//Pupil.findOne({'username': username}, function (err, user) {
	//    if (err) {
	//        console.log('Error in signup: ' + err);
	//        return done(err);
	//    }
	//    if (user) {
	//        console.log('Pupil already exists: ' + username);
	//        return done(null, false, req.flash('message', 'Pupil Already Exists'));
	//    }
	//
	//    var newPupil = new Pupil();
	//
	//    newPupil.username = username;
	//    newPupil.password = createHash(password);
	//    newPupil.name = name;
	//    newPupil.secondName = secondName;
	//
	//    newPupil.save(function () {
	//        if (err) {
	//            console.log('Error in saving Pupil: ' + err);
	//            throw err;
	//        }
	//
	//        console.log('new Pupil ' + username);
	//    })
	//});
};
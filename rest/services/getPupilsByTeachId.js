var mongoose = require('mongoose');
var Group = require('../../models/group');
var Pupil = require('../../models/pupil');


module.exports = function (teachId, callback) {

	function getPupil(i, pupils, result, callback) {
		Pupil.findById(pupils[i].pupil_id, function (err, pupil) {
			if (err) {
				return callback(err, null)
			}

			result.push({
				id: pupil._id,
				name: pupil.name,
				secondName: pupil.secondName
			});

			i++;

			if (i === pupils.length) {
				return callback(null, result)
			}

			return getPupil(i, pupils, result, callback);
		})
	}

	Group.find({'teacher_id': teachId}).lean().exec(function (err, groups) {
		var pupils = [];

		if (err) {
			return callback(err, null);
		}

		groups.forEach(function(group) {
			pupils = pupils.concat(group.pupils);
		});

		//for (var i = 0; i < groups.length; i++) {
		//	pupils = pupils.concat(groups[i].pupils);
		//}

		var result = [];
		var i = 0;

		if (pupils.length === 0) {
			return callback(null, []);
		}

		return getPupil(i, pupils, result, callback);
	});
};

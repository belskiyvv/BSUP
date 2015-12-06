var express = require('express');
var router = express.Router();
var rest = require('../rest/rest');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	res.sendfile('public/loginPage.html');
};

module.exports = function (passport) {

	router.post('/login', function (req, res, next) {
		passport.authenticate('login', function (err, account, info) {
			req.logIn(account, function () {
				//if (!account) {
				//	return res.sendfile('public/loginPage.html')
				//}
				//if (info === 'teacher') {
				//	return res.sendfile('public/teacher/index2.html');
				//}
				//if (info === 'pupil') {
				//	return res.sendfile('public/pupil/index2.html');
				//}
				res.redirect('/');

			});
		})(req, res, next)
	});

	router.get('/home', isAuthenticated, function (req, res) {
		console.log(req.user);
	});

	router.post('/rest/tests', isAuthenticated, function (req, res) {
		var test = req.body;
		console.log(req.user._id);
		test.teach_id = req.user._id;
		console.log(test);
		rest.createTest(test, function (err) {
			if (err) {
				res.send(500);
			}
			else {
				res.send(200);
			}
		})
	});

	router.get('/rest/pupils', isAuthenticated, function (req, res) {
		rest.getPupilsByTeachId(req.user._id, function (err, pupils) {
			if (pupils) {
				res.json(pupils);
			}
			else {
				res.send(500);
			}
		});

	});

	router.post('/rest/pupils', isAuthenticated, function (req, res) {
		if (req.user.role !== 'teacher') {
			return res.send(401);
		}

		return rest.addPupil(req.body, req.user._id, function (err) {
			if (err) {
				console.log(err);
				return res.send(500);
			}
			else {
				return res.send(200);
			}
		})

	});

	router.get('/rest/tests', isAuthenticated, function (req, res) {
		if (req.user.role === 'teacher') {
			return rest.getTestsByTeachId(req.user._id, function (err, tests) {
				if (tests) {
					res.json(tests);
				}
				else {
					res.send(500);
				}
			});
		}
		if (req.user.role === 'pupil') {
			console.log('pupil tests');
			return rest.getTestsByPupilId(req.user._id, function (err, tests) {
				if (tests) {
					res.json(tests);
				}
				else {
					res.send(500);
				}
			});
		}

	});

	router.get('/rest/pupils/:pupilId', isAuthenticated, function (req, res) {
		if (req.user.role === 'teacher') {
			rest.getPupilById(req.params.pupilId, function (err, pupil) {
				if (err) {
					return res.send(500);
				}
				return res.json(pupil);
			})
		}
		else {
			res.send(401);
		}
	});

	router.get('/rest/tests/:testId', isAuthenticated, function (req, res) {
		if (req.user.role === 'pupil') {
			return rest.getTestById.pupil(req.params.testId, req.user._id, function (err, test) {
				if (err) {
					return res.send(500);
				}
				return res.json(test);
			})
		}
		if (req.user.role === 'teacher') {
			return rest.getTestById.teacher(req.params.testId, function (err, test) {
				if (err) {
					return res.send(500);
				}
				return res.json(test);
			})
		}
	});

	router.get('/rest/tests/:testId/pupils', isAuthenticated, function (req, res) {
		if (req.user.role !== 'teacher') {
			return res.send(401);
		}
		return rest.getPupilsByTestId(req.params.testId, function (err, pupils) {
			if (err) {
				return res.send(500);
			}
			return res.json(pupils);
		})
	});

	router.put('/rest/tests/:testId', isAuthenticated, function (req, res) {
		return rest.saveTestAnswers(req.params.testId, req.user._id, req.body, function (err) {
			if (err) {
				console.log('500');
				console.log(err);
				return res.send(500);
			}
			else {
				console.log('200');
				return res.send(200);
			}
		})
	});

	router.get('/rest/groups', isAuthenticated, function (req, res) {
		if (req.user.role === 'teacher') {
			return rest.getGroupsByTeachId(req.user._id, function (err, groups) {
				if (err) {
					return res.send(500);
				}
				return res.json(groups);
			});
		}
	});

	router.post('/rest/groups', isAuthenticated, function (req, res) {
		if (req.user.role === 'teacher') {
			return rest.addGroup(req.body.name, req.user._id, function (err, group) {
				if (err) {
					return res.send(500);
				}

				return res.json(group);
			})
		}
	})


	router.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('*', isAuthenticated, function (req, res) {
		// Display the Login page with any flash message, if any
		var pupilFile = 'public/pupil/index2.html',
			teacherFile = 'public/teacher/index2.html';
		res.sendfile(req.user.role === 'teacher' ? teacherFile : pupilFile);

	});


	return router;
};

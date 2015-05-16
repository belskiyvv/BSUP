var express = require('express');
var router = express.Router();
var rest = require('../rest/rest');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.sendfile('public/loginPage.html');
};

module.exports = function(passport){

    router.get('/', isAuthenticated, function(req, res) {
        // Display the Login page with any flash message, if any
        //res.sendfile('public/teacher/index2.html');
    });

    router.post('/login', function(req,res,next) {
        passport.authenticate('login',function (err, account,info) {
            req.logIn(account, function() {
                if(!account) {
                    return res.sendfile('public/loginPage.html')
                }
                if(info === 'teacher') {
                    return res.sendfile('public/teacher/index2.html');
                }
                if(info === 'pupil') {
                    return res.sendfile('public/pupil/index2.html');
                }

            });
    })(req, res, next)
    });


    router.post('/signup', passport.authenticate('signup'),function() {
    });

    router.get('/home', isAuthenticated,function(req,res) {
        console.log(req.user);
    });

    router.post('/rest/createTest',isAuthenticated,function(req,res) {
        var test = req.body;
        console.log(req.user._id);
        test.teach_id = req.user._id;
        console.log(test);
        rest.createTest(test,function(err) {
            if(err) {
                res.send(500);
            }
            else {
                res.send(200);
            }
        })
    });

    router.get('/rest/myPupils',isAuthenticated, function(req,res) {
        rest.getPupilsByTeachId(req.user._id,function(err,pupils) {
            if(pupils) {
                res.json(pupils);
            }
            else {
                res.send(500);
            }
        });

    });

    router.get('/rest/myTests',isAuthenticated, function(req,res) {
        if(req.user.role === 'teacher') {
            return rest.getTestsByTeachId(req.user._id, function (err, tests) {
                if (tests) {
                    res.json(tests);
                }
                else {
                    res.send(500);
                }
            });
        }
        if(req.user.role === 'pupil') {
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

    router.get('/rest/test/:testId',isAuthenticated, function(req,res){
       return rest.getTestById(req.params.testId,req.user._id,function(err,test) {
           if(err) {
               return res.send(500);
           }
           return res.json(test);
       })
    });

    router.post('/rest/test/:testId/saveAnswers',isAuthenticated, function(req,res){
        return rest.saveTestAnswers(req.params.testId,req.user._id,req.body,function(err) {
            if(err) {
                return res.send(500);
            }
            return res.send(200);
        })
    });



    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    return router;
};

var LocalStrategy = require('passport-local').Strategy;
var Teacher = require('../models/teacher');
var Pupil = require('../models/pupil');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use('login',new LocalStrategy({
        passReqToCallback : true
    }, function(req, username, password, done) {
        console.log(username);
        Teacher.findOne({'username': username},
            function(err, teacher) {
                if(err) {
                    return done(err);
                }
                if(!teacher) {
                    console.log('teacher not found ('+username+')');
                    //return done(null, false, req.flash('message', 'teacher not found'));

                   return Pupil.findOne({'username': username},function(err,pupil) {
                        if(err) {
                            return done(err);
                        }
                        if(!pupil) {
                            console.log('pupil not found ('+username+')');
                            return done(null, false);
                        }

                        if(!isValidPassword(pupil, password)) {
                            return done(null, false);
                        }

                        return done(null,pupil,'pupil');
                    })

                }

                if(!isValidPassword(teacher, password)) {
                    return done(null, false);
                }
                req.role = 'teacher';
                return done(null,teacher,'teacher');
        })
    }));

    var isValidPassword = function(user, password) {
            return bCrypt.compareSync(password, user.password);
    }
};
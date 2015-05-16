var login = require('./login');
var signup = require('./signup');
//var User = require('../models/user');
var Teacher = require('../models/teacher');
var Pupil = require('../models/pupil');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deser');
        Teacher.findById(id, function(err, user) {
            //console.log('deserializing user:',user);
            if(user) {
                user.role = 'teacher';
                return done(err, user);
            }

            Pupil.findById(id,function(err,user) {
                if(user) {
                    user.role = 'pupil';
                    return done(err, user);
                }
            })
        });
    });

    login(passport);
    signup(passport);
};
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use('signup',new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({'username': username},function(err, user){
                if(err) {
                    console.log('Error in signup: '+ err);
                    return done(err);
                }
                if(user) {
                    console.log('user already exists: '+username);
                    return done(null, false, req.flash('message','User Already Exists'));
                }

                var newUser = new User();

                newUser.username = username;
                newUser.password = createHash(password);

                newUser.save(function() {
                    if(err) {
                        console.log('Error in saving user: '+ err);
                        throw err;
                    }

                    console.log('new user '+ username);
                    return done(null, newUser);
                })
            });
        };
        process.nextTick(findOrCreateUser);
    }));

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
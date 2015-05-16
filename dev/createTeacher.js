var mongoose = require('mongoose');
var dbConfig = require('../db');
var Teacher = require('../models/teacher');
var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

var username = 'teacher';
var password = 'teacher';
var name = 'teacher';
var secondName = 'teacher';
Teacher.findOne({'username': username},function(err, user){
    if(err) {
        console.log('Error in signup: '+ err);
        return done(err);
    }
    if(user) {
        console.log('teacher already exists: '+username);
        return done(null, false, req.flash('message','teacher Already Exists'));
    }

    var newTeacher = new Teacher();

    newTeacher.username = username;
    newTeacher.password = createHash(password);
    newTeacher.name = name;
    newTeacher.secondName = secondName;

    newTeacher.save(function(err) {
        if(err) {
            console.log('Error in saving teacher: '+ err);
            throw err;
        }

        console.log('new teacher '+ username);
    })
});


var mongoose = require('mongoose');
var dbConfig = require('../db');
var Pupil = require('../models/pupil');
var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

var username = 'pupil3';
var password = 'pupil3';
var name = 'pupil3';
var secondName = 'pupil3';
Pupil.findOne({'username': username},function(err, user){
    if(err) {
        console.log('Error in signup: '+ err);
        return done(err);
    }
    if(user) {
        console.log('Pupil already exists: '+username);
        return done(null, false, req.flash('message','Pupil Already Exists'));
    }

    var newPupil = new Pupil();

    newPupil.username = username;
    newPupil.password = createHash(password);
    newPupil.name = name;
    newPupil.secondName = secondName;

    newPupil.save(function() {
        if(err) {
            console.log('Error in saving Pupil: '+ err);
            throw err;
        }

        console.log('new Pupil '+ username);
    })
});
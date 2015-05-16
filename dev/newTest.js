var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);


var test = new Test;
//var test = {
//    name: 'name',
//    view: 'tim',
//    teach_id: 1,
//    questions: [{
//        text: 'text1',
//        answers: ['11','21','31','41'],
//        correct: ['11']
//    },{
//        text: 'text2',
//        answers: ['12','22','32','42'],
//        correct: ['12']
//    }],
//    pupils: [{
//       pupil_id: 1,
//        answers: ['11','12']
//    }]
//}

var quest1 = {
    text: 'text1',
    answers: ['11','21','31','41'],
    correct: ['11']
},
    quest2 = {
        text: 'text2',
        answers: ['12','22','32','42'],
        correct: ['12']
    },
    pupil = {
        pupil_id: 1,
        answers: ['11','12']
    };

test.name = 'name';
test.view = 'cars';
test.teach_id = 1;
test.questions = [];
test.questions.push(quest1);
test.questions.push(quest2);
test.pupils = [];
test.pupils.push(pupil);

test.save(function(err) {
    if(err) {
        console.log(err);
    }
    console.log('saved');
});
//Test.findOne({'username': username},function(err, user){
//    if(err) {
//        console.log('Error in signup: '+ err);
//        return done(err);
//    }
//    if(user) {
//        console.log('user already exists: '+username);
//        return done(null, false, req.flash('message','User Already Exists'));
//    }
//
//    var newTeacher = new Teacher();
//
//    newTeacher.username = username;
//    newTeacher.password = createHash(password);
//    newTeacher.name = name;
//    newTeacher.secondName = secondName;
//
//    newTeacher.save(function() {
//        if(err) {
//            console.log('Error in saving user: '+ err);
//            throw err;
//        }
//
//        console.log('new user '+ username);
//    })
//});




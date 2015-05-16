var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);


var test = new Test;


var quest1 = {
        text: 'text1',
        answers: ['11','21','31','41'],
        correct: ['11']
    },
    quest2 = {
        text: 'text2',
        answers: ['12','22','32','42'],
        correct: ['12']
    };
test.name = 'name2';
test.view = 'tim';
test.questions = [];
test.questions.push(quest1);
test.questions.push(quest2);
test.pupils = [];

Pupil.findOne({username: 'pupil1'},function(err,pupil) {
    test.pupils.push({pupil_id: pupil._id, answers: ['11','12']});

    Pupil.findOne({username: 'pupil2'},function(err,pupil) {
        test.pupils.push({pupil_id: pupil._id, answers: ['11','12']});

        Pupil.findOne({username: 'pupil3'},function(err,pupil) {
            test.pupils.push({pupil_id: pupil._id, answers: ['11','12']});

            Teacher.findOne({username: 'teacher'},function(err,teacher) {
                test.teach_id = teacher._id;

                test.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                    console.log('saved '+ test);
                });
            });
        })
    })
})




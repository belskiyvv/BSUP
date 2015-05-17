var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

mongoose.connect(dbConfig.url);

Pupil.find({},function(err,pupils) {
    console.log(pupils);
});


var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');
var Pupil = require('../models/pupil');
var Teacher = require('../models/teacher');

var bCrypt = require('bcrypt-nodejs');

mongoose.connect(dbConfig.url);
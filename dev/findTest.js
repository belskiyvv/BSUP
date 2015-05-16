var mongoose = require('mongoose');
var dbConfig = require('../db');
var Test = require('../models/test');

mongoose.connect(dbConfig.url);

Test.findOne({'teach_id': 1},function(err,test){
    if(err) {
        console.log(err);
    }
    else {
        console.log(test);
    }
});
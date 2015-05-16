var mongoose = require('mongoose');
var Group = require('../../models/group');
var Pupil = require('../../models/pupil');


module.exports = function(pupilId,callback) {

    Pupil.findById(pupilId,function(err,pupil) {
        if(err) {
            return callback(err,null);
        }
        return callback(null,pupil)
    })
};

var mongoose = require("mongoose");

module.exports = mongoose.model('Pupil', {
    username: String,
    password: String,
    name: String,
    secondName: String
});

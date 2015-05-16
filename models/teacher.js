var mongoose = require("mongoose");

module.exports = mongoose.model('Teacher', {
    username: String,
    password: String,
    name: String,
    secondName: String
});

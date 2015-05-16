var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Test', {
    teach_id: ObjectId,
    name: String,
    view: String,
    questions: [{
        text: String,
        answers: [String],
        correct: Number
    }],
    pupils: [{
        pupil_id: ObjectId,
        answers: [Number]
    }]
});

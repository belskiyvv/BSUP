var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Group', {
    teacher_id: ObjectId,
    name: String,
    pupils: [{
        pupil_id: ObjectId
    }]
});
var createTest = require('./services/createTest');
var getPupilsByTeachId = require('./services/getPupilsByTeachId');
var getTestsByTeachId = require('./services/getTestsByTeachId');
var getTestsByPupilId = require('./services/getTestsByPupilId');
var getTestById = require('./services/getTestById');
var saveTestAnswers = require('./services/saveTestAnswers');
var express = require('express');

module.exports = {
    createTest: createTest,
    getPupilsByTeachId: getPupilsByTeachId,
    getTestsByTeachId: getTestsByTeachId,
    getTestsByPupilId: getTestsByPupilId,
    getTestById: getTestById,
    saveTestAnswers: saveTestAnswers

}
var createTest = require('./services/createTest');
var getPupilsByTeachId = require('./services/getPupilsByTeachId');
var getTestsByTeachId = require('./services/getTestsByTeachId');
var getTestsByPupilId = require('./services/getTestsByPupilId');
var getTestById = require('./services/getTestById');
var saveTestAnswers = require('./services/saveTestAnswers');
var getPupilById = require('./services/getPupilById');
var getPupilsByTestId = require('./services/getPupilsByTestId');
var addPupil = require('./services/addPupil');
var getGroupsByTeachId = require('./services/getGroupsByTeachId');
var addGroup = require('./services/addGroup');
var express = require('express');

module.exports = {
	createTest: createTest,
	getPupilsByTeachId: getPupilsByTeachId,
	getTestsByTeachId: getTestsByTeachId,
	getTestsByPupilId: getTestsByPupilId,
	getTestById: getTestById,
	saveTestAnswers: saveTestAnswers,
	getPupilById: getPupilById,
	getPupilsByTestId: getPupilsByTestId,
	addPupil: addPupil,
	getGroupsByTeachId: getGroupsByTeachId,
	addGroup: addGroup
};
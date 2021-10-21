const express = require('express');
const userController = require('../controllers/users.controller');
const exercisesController = require('../controllers/exercises.controller');
const logsController = require('../controllers/logs.controller');
const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.postUsers);
router.get('/users/:_id/logs', logsController.getLogs);
router.post('/users/:_id/exercises', exercisesController.postExercises);

module.exports = router;

const {HttpBadRequestException} = require('../../error-handling');
const Db = require('../db/index');
const {isDateValid} = require('../utils');
const {
  CREATE_EXERCISE,
  CREATE_EXERCISE_WITH_DATE,
  GET_EXERCISE_BY_USER_ID,
  GET_USERS_EXERCISES
} = require('../db/exercises.queries');

const createExercise = async (userId, exercise) => {
  try {
    if (Number.isNaN(Number(exercise.duration))) {
      throw new HttpBadRequestException('Duration must be integer');
    }

    if (exercise.date) {
      if (!isDateValid(exercise.date)) {
        throw new HttpBadRequestException('Date format is not valid, use yyyy-mm-dd');
      }

      const parsedDate = +new Date(exercise.date);
      await Db.run(CREATE_EXERCISE_WITH_DATE, exercise.description, exercise.duration, userId, parsedDate);
    } else {
      await Db.run(CREATE_EXERCISE, exercise.description, exercise.duration, userId);
    }
  } catch (e) {
    throw e;
  }
};

const getExerciseByUserId = async (id) => {
  return await Db.all(GET_EXERCISE_BY_USER_ID, id);
};

const getAllUsersExercises = (from, to, userId, hasLimit, limit) => {
  const hasFromDate = from ? 'AND date > ?' : '';
  const hasToDate = to ? 'AND date < ?' : '';

  return async (...args) => {
    const dates = args.filter(el => el !== undefined);
    return await Db.all(`${GET_USERS_EXERCISES} ${hasFromDate} ${hasToDate} ${hasLimit}`,
      userId, ...dates, limit);
  };
};

const getUserExercises = async (userId, from, to, limit) => {
  const hasLimit = limit ? 'LIMIT ?' : '';
  const parsedFrom = from && +new Date(from);
  const parsedTo = to && +new Date(to);
  const getAllExercises = getAllUsersExercises(from, to, userId, hasLimit, limit);

  return await getAllExercises(parsedFrom, parsedTo);
};

module.exports = {
  createExercise,
  getExerciseByUserId,
  getUserExercises
};

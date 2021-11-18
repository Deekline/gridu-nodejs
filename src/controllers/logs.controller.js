const {HttpNotFoundException, HttpBadRequestException} = require('../../error-handling');
const {getUserExercises, getExerciseByUserId} = require('../services/exercises.service');
const {getUserById} = require('../services/users.service');
const {isDateValid, transformTimestamp} = require('../utils');

const getLogs = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await getUserById(userId);

    if (!user) {
      throw new HttpNotFoundException('User not found');
    }

    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit

    if ((from && !isDateValid(from)) || (to && !isDateValid(to))) {
      throw new HttpBadRequestException('Date format is not valid, use yyyy-mm-dd');
    }

    if(!Number.isInteger(parseFloat(limit))) {
      throw new HttpBadRequestException('Limit format is not valid, use integer number')
    }

    user.exercises = await getUserExercises(userId, from, to, limit);

    if(user.exercises.length) {
      user.exercises.forEach(transformTimestamp)
    }

    const userExercises = await getExerciseByUserId(userId);

    user.count = userExercises.length;

    res.json(user);
  } catch (e) {
    res.status(e.code).json(e);
  }
};

module.exports = {
  getLogs,
};

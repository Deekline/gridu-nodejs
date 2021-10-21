const CREATE_EXERCISE = 'INSERT INTO Exercises (description, duration, userId) VALUES (?, ?, ?)'
const CREATE_EXERCISE_WITH_DATE = 'INSERT INTO Exercises (description, duration, userId, date) VALUES (?, ?, ?, ?)'
const GET_EXERCISE_BY_USER_ID = 'SELECT * FROM Exercises WHERE userId = ?'
const GET_USERS_EXERCISES = 'SELECT duration, description, date FROM Exercises WHERE userId = ?'



module.exports = {
  CREATE_EXERCISE,
  CREATE_EXERCISE_WITH_DATE,
  GET_EXERCISE_BY_USER_ID,
  GET_USERS_EXERCISES,
}

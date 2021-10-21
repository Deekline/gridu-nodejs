const GET_ALL_USERS = 'SELECT * FROM Users';
const GET_USER_BY_ID = 'SELECT * FROM Users WHERE _id = ?';
const ADD_USER = 'INSERT INTO USERS (username) VALUES (?)';


module.exports = {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  ADD_USER
};

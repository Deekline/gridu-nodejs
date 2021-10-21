const Db = require('../db/index');
const {GET_ALL_USERS, GET_USER_BY_ID, ADD_USER} = require('../db/users.queries');

const addUser = async (user) => {
  const {lastID} = await Db.run(ADD_USER, user.username);
  return await Db.get(GET_USER_BY_ID, lastID);
};

const getAllUsers = async () => {
  return await Db.all(GET_ALL_USERS);
};

const getUserById = async (id) => {
  return await Db.get(GET_USER_BY_ID, id);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById
};

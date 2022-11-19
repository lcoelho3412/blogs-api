const statusCode = require('../helpers/statusCode');
const { User } = require('../models');
const jwtUtil = require('../utils/jwt.util');

const findOne = async ({ email, password }) => {
  const response = await User.findOne({
    where: { email, password },
  });

  if (!response) return { message: 'Invalid fields' };

  return response;
};

const findEmail = async (email) => {
  const checkEmail = await User.findOne({ where: { email } });
  return checkEmail;
};

const createUser = async ({ displayName, email, password, image }) => {
  const checkEmail = await findEmail(email);
  if (checkEmail) {
    return { 
      status: 409,
      message: { message: 'User already registered' }, 
    };
  }
  await User.create({ displayName, email, password, image });
  const token = jwtUtil.createToken({ displayName, email, password, image });
  return {
    status: 201,
    message: { token },
  };
};

const getUsers = async () => {
  const userFound = await User.findAll({ attributes: { exclude: 'password' } });
  return { status: statusCode.OK, message: userFound };
};

const getUserById = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  if (!result) {
    return { status: statusCode.NotFound, message: { message: 'User does not exist' } };
  }
  return { status: statusCode.OK, message: result };
};

const deleteAccount = async (id) => {
  const result = await User.destroy({ where: { id } });
  return result;
};
module.exports = { findOne, createUser, getUsers, getUserById, deleteAccount };
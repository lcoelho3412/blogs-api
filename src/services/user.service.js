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
module.exports = { findOne, createUser };
const loginService = require('../services/login.service.js');
const userService = require('../services/user.service');

const login = async (req, res) => {
    const { type, message } = loginService.validateBody(req.body);
// if data doesn't follow bussiness rules
    if (type) {
      return res.status(400).json({ message });
    }
    
    const { email, password } = message;
   
    const token = await loginService.validateLogin({ email, password });
    // if data does not exist in db
    if (token.type) {
      return res.status(400).json({ message: token.message });
    }

    res.status(200).json(token);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  return res.status(newUser.status).json(newUser.message);
};

const getUsers = async (_req, res) => {
  const result = await userService.getUsers();
  return res.status(result.status).json(result.message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserById(id, req.body);
  return res.status(result.status).json(result.message);
};

module.exports = { login, createUser, getUsers, getUserById };
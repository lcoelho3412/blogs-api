const loginService = require('../services/login.service.js');

const login = async (req, res) => {
    const { type, message } = loginService.validateBody(req.body);
// if data doesn't follow bussiness rules
    if (type) {
      return res.status(400).json({ message });
    }
    console.log(message);
    
    const { email, password } = message;
   
    const token = await loginService.validateLogin({ email, password });
    // if data does not exist in db
    if (token.type) {
      return res.status(400).json({ message: token.message });
    }

    res.status(200).json({ token });
};

module.exports = { login };
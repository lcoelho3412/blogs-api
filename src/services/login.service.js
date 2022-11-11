const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models/index');

const validateBody = (params) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error, value } = schema.validate(params);

    if (error) {
        return ({
            type: 400,
            message: 'Some required fields are missing',
          });
    }

    return ({
        type: null,
        message: value });
};

const validateLogin = async (body) => {
    // access db and finds user data that matches  parameter sent
   /*  const user = await User.findOne({ where: { email } }); */
   const { email, password } = body;
   const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
       return ({
            type: 400,
            message: 'Invalid fields',
       });
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwtUtil.createToken(userWithoutPassword);

    return { token };
};

const validateToken = (token) => {
    if (!token) {
        const e = new Error('Token obrigatório!');
        e.name = 'Token obrigatório';
        throw e;
    }

    const user = jwtUtil.validateToken(token);

    return user;
};

module.exports = { validateBody, validateLogin, validateToken };
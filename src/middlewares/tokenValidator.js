const jwt = require('jsonwebtoken');
const statusCode = require('../helpers/statusCode');
const loginService = require('../services/login.service');

const tokenValidator = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(statusCode.error401).json({ message: 'Token not found' });
    }
    try {
        // unencrypts user data and inserts in req.user 
        const user = loginService.validateToken(authorization);
        req.user = user;
        jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(statusCode.error401).json({ message: 'Expired or invalid token' });
    }
    next();
};

module.exports = { tokenValidator };
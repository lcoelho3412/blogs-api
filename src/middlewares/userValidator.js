const statusCode = require('../helpers/statusCode');

const displayNameValidator = (req, res, next) => {
    const { displayName } = req.body;
    if (!displayName || displayName.length < 8) {
        return res.status(statusCode.BadRequest).json({
            message: '"displayName" length must be at least 8 characters long' });
    }
    next();
};

const emailValidator = (req, res, next) => {
    const { email } = req.body;
 const checkEmail = String(email).toLowerCase().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!email || !checkEmail) {
        return res.status(statusCode.BadRequest).json({
            message: '"email" must be a valid email',
        });
    }
    next();
};

const passwordvalidator = (req, res, next) => {
    const { password } = req.body;   
    if (!password || password.length < 6) {
        return res.status(statusCode.BadRequest).json({
            message: '"password" length must be at least 6 characters long',
          });
    }
    next();
};

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordvalidator,
};
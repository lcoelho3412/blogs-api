const statusCode = require('../helpers/statusCode');

const checkField = (req, res, next) => {
    console.log('file: fieldValidators.js ~ line 4 ~ checkInputs ~ req');
    
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return res.status(statusCode.BadRequest)
        .json({ message: 'Some required fields are missing' });
    }
    next();
};

module.exports = { checkField };
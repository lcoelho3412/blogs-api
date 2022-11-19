const statusCode = require('../helpers/statusCode');

const checkField = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return res.status(statusCode.BadRequest)
        .json({ message: 'Some required fields are missing' });
    }
    next();
};

module.exports = { checkField };
const statusCode = require('../helpers/statusCode');
const { Category } = require('../models');

const createCategory = async (name) => {
    const result = await Category.create({ name });
    return {
        status: statusCode.CreatedSucess,
        message: result,
    };
};

const getCategory = async () => {
    const result = await Category.findAll();
    return {
        status: statusCode.OK,
        message: result,
    };
};

module.exports = { createCategory, getCategory };
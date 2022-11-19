const statusCode = require('../helpers/statusCode');
const { Category } = require('../models');

const createCategory = async (name) => {
    const result = await Category.create({ name });
    
    console.log('file: category.service.js ~ line 9 ~ createCategory ~  statusCode.CreatedSuccess', statusCode.CreatedSuccess);
    return {
        status: statusCode.CreatedSuccess,
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
const categoryService = require('../services/category.service.js');

const createCategory = async (req, res) => {
    const { name } = req.body;
    const result = await categoryService.createCategory(name);
    return res.status(result.status).json(result.message);
};

const getCategory = async (_req, res) => {
    const result = await categoryService.getCategory();
    return res.status(result.status).json(result.message);
};

module.exports = { createCategory, getCategory };
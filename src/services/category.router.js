const express = require('express');
const categoryController = require('../controllers/categorie.controller.js');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { validateName } = require('../middlewares/CategoryValidator.js');

const router = express.Router();

router.post('/', tokenValidator, validateName, categoryController.createCategory);

router.get('/', tokenValidator, categoryController.getCategory);

module.exports = router;
const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { displayNameValidator,
  emailValidator,
  passwordvalidator, 
} = require('../middlewares/userValidator');

router.post('/', 
displayNameValidator, 
emailValidator, 
passwordvalidator, 
userController.createUser);

module.exports = router;
const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { displayNameValidator,
  emailValidator,
  passwordvalidator, 
} = require('../middlewares/userValidator');

router.post('/', 
displayNameValidator, 
emailValidator, 
passwordvalidator, 
userController.createUser);

router.get('/', tokenValidator, userController.getUsers);

module.exports = router;
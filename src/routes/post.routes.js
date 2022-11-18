const express = require('express');
const postController = require('../controllers/post.controllers');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { checkField } = require('../middlewares/fieldValidators');

const router = express.Router();

router.post('/', tokenValidator, checkField, postController.createPost);
router.get('/', tokenValidator, postController.getPosts);

module.exports = router;
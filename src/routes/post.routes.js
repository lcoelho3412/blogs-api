const express = require('express');
const postController = require('../controllers/post.controllers');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { checkField } = require('../middlewares/fieldValidators');

const router = express.Router();

router.use(tokenValidator);
// every route below this line uses tokenValidator

router.post('/', checkField, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostByid);

module.exports = router;
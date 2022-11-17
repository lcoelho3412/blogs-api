const postService = require('../services/post.service');

const createPost = async (req, res) => {
    const { id } = req.user;
    const data = req.body;
    const result = await postService.createPost(id, data);
    console.log('file: post.controllers.js ~ line 7 ~ createPost ~ result', result);
    return res.status(result.status).json(result.message);
};

module.exports = { createPost };
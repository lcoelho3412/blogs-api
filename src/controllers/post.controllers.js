const postService = require('../services/post.service');

const createPost = async (req, res) => {
    const { id } = req.user;
    const data = req.body;
    const result = await postService.createPost(id, data);
    return res.status(result.status).json(result.message);
};

const getPosts = async (req, res) => {
    const result = await postService.getPosts();
    return res.status(result.status).json(result.message);
};

const getPostById = async (req, res) => {
const { id } = req.params;
const getId = await postService.getPostById(id);
return res.status(getId.status).json(getId.message);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user } = req;
    
    const validaBagaca = postService.validateFieldUpdate(req.body);
    if (validaBagaca) return res.status(validaBagaca.status).json(validaBagaca.message);
    const updatedPostResult = await postService.updatePost(id, title, content, user);
    return res.status(updatedPostResult.status).json(updatedPostResult.message);
};

module.exports = { createPost, getPosts, getPostById, updatePost };
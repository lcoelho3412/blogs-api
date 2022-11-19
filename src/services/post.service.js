const Joi = require('joi');
const statusCode = require('../helpers/statusCode');
const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async (id, { title, content, categoryIds }) => {
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
    if (categoryIds.length !== count) {
        return {
            status: statusCode.BadRequest,
            message: { message: 'one or more "categoryIds" not found' },
        };
    }
  const { dataValues } = await BlogPost.create({
      title, content, categoryIds, userId: id,
  });

  const categories = categoryIds
      .map((category) => ({ postId: dataValues.id, categoryId: category }));
  await PostCategory.bulkCreate(categories);
  return { status: statusCode.CreatedSuccess, message: dataValues };
};

const getPosts = async () => {
    const allPosts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });
    return { status: statusCode.OK, message: allPosts }; 
};

const getPostById = async (id) => {
const findPostById = await BlogPost.findOne({
    where: { id },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
    ],
});
if (!findPostById) {
    return { status: statusCode.NotFound, message: { message: 'Post does not exist' } };
}
return { status: statusCode.OK, message: findPostById };
};

const validateFieldUpdate = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(), 
    });
    const validationResult = schema.validate(body);
    const { error } = validationResult;
    if (error) {
        return { status: statusCode.BadRequest,
             message: { message: 'Some required fields are missing' } };
    }
};

const updatePost = async (id, title, content, user) => {
    const { message: { userId } } = await getPostById(id);

    if (userId !== user.id) {
        return { status: statusCode.error401, message: { message: 'Unauthorized user' } };
}
 await BlogPost.update(
        { title, content },
        { where: { id } },
    ); 

    return getPostById(id);
};

const deletePost = async (id, user) => {
    const { message: { userId, id: postId } } = await getPostById(id);
    if (!postId) {
        return { status: statusCode.NotFound, message: { message: 'Post does not exist' } };
    }
    if (userId !== user.id) { 
        return { status: statusCode.error401, message: { message: 'Unauthorized user' } }; 
}
    await BlogPost.destroy({ where: { id } });
    return { status: statusCode.successRequestDelete, message: null };
};

module.exports = { createPost, getPosts, getPostById, updatePost, validateFieldUpdate, deletePost };
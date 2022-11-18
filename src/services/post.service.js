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
  console.log('file: post.service.js ~ line 15 ~ createPost ~ dataValues.id', dataValues.id);

  const categories = categoryIds
      .map((category) => ({ postId: dataValues.id, categoryId: category }));
  await PostCategory.bulkCreate(categories);
  return { status: statusCode.CreatedSucess, message: dataValues };
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

module.exports = { createPost, getPosts };
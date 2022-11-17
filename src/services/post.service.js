const statusCode = require('../helpers/statusCode');
const { BlogPost, PostCategory, Category } = require('../models');

const createPost = async (id, { title, content, categoryIds }) => {
  const date = new Date();
  const { dataValues } = await BlogPost.create({
      title, content, categoryIds, userId: id, published: date, updated: date,
  });
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (categoryIds.length !== count) {
      return {
          status: statusCode.BadRequest,
          message: { message: 'one or more "categoryIds" not found' },
      };
  }
  const categories = categoryIds
      .map((category) => ({ postId: dataValues.id, categoryId: category }));
  await PostCategory.bulkCreate(categories);
  return { status: statusCode.CreatedSucess, message: dataValues };
};

module.exports = { createPost };
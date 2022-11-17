module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',{
    categoryId: {type: DataTypes.INTEGER, primaryKey: true},
    postId: {type: DataTypes.INTEGER, primaryKey: true},
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  }

  return PostCategory;
}
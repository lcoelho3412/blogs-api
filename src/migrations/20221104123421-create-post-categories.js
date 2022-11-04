module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories',{
      postId: {
        type: Sequelize.INTERGER,
        primaryKey: true,
        allowNull: false,
        field: 'post_id',
        reference: {
          model: 'blog_posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
       categoryId:{
        type: Sequelize.INTERGER,
        allowNull: false,
        field: 'category_id',
        reference: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
       }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('posts_categories');
  }
};

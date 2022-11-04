module.exports = {
  up: async (queryInterface, Sequelize) => {
return queryInterface.createTable('categories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};

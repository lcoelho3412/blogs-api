module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true }, 
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image:DataTypes.STRING,
  },
  {
    tablename: 'users',
    underscored: true,
    timestamps: false,
  });

  /* User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blog_post'
    });
  }
 */
  return UserTable;
};
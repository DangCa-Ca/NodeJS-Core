'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category  = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          description: {
            type: DataTypes.STRING(50),
            allowNull: true
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
    }, {
        tableName: 'categories',
        timestamps: true, // Quản lý createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Category.associate = (models) => {
      Category.hasMany(models.Post, {
          foreignKey: 'category_id',
          as: 'posts'
      });
  };
    return Category ;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment  = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
          user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
    }, {
        tableName: 'comments',
        timestamps: true, // Quản lý createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    
   Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            foreignKey: "post_id",
            as: "post"
        });
        Comment.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        });
    };
    return Comment ;
};
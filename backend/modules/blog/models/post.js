"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

    },
    {
      tableName: "posts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Post.associate = (models) => {
    Post.hasMany(models.PostTranslate, {
      foreignKey: "post_id",
      as: "translations",
      onDelete: "CASCADE",
      hooks: true,
    });
   Post.hasMany(models.Comment, { foreignKey: "post_id", as: "comments" }); // ✅ Đúng



    Post.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Post;
};

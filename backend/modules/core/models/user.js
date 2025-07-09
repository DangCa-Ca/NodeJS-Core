'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING(100),  // Giới hạn 100 ký tự để khớp thiết kế DB
            allowNull: false
          },
          role_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
              model: 'roles',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          avatar: {
           type: DataTypes.TEXT('long'),  // ✅ đúng cú pháp
            allowNull: true
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1  // Trạng thái mặc định là 1
          },
    }, {
        tableName: 'users',
        timestamps: true, // Quản lý createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
//     User.associate = function(models) {
//   User.hasMany(models.Post, {
//     foreignKey: 'user_id',
//     as: 'posts'
//   });

// User.hasMany(models.Comment, {
//     foreignKey: "user_id",
//     as: 'comments'
//   });
//   };
    return User;
};

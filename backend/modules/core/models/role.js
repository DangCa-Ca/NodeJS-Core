'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 // Trạng thái mặc định là 1
          },
    }, {
        tableName: 'roles',
        timestamps: true, // Quản lý createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Role;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Language  = sequelize.define('Language', {
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
          locale: {
            type: DataTypes.STRING(10),
            allowNull: false
          },
          image: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
    }, {
        tableName: 'languages',
        timestamps: true, // Quản lý createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Language.associate = (models) => {
     Language.hasMany(models.PostTranslate, {
  as: "translations",
  foreignKey: "language_id",
});

  };
  
    return Language ;
};
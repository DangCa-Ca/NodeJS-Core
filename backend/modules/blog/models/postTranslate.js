'use strict';
module.exports = (sequelize, DataTypes) => {
    const PostTranslate = sequelize.define('PostTranslate', {
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
        language_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        origin_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Tham chiếu đến bản gốc của bài viết'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    }, {
        tableName: 'posts_translate',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    PostTranslate.associate = function (models) {
        PostTranslate.belongsTo(models.Post, {
            foreignKey: 'post_id',
            as: 'post',
            onDelete: 'CASCADE',
            hooks: true,
        });

        PostTranslate.belongsTo(models.Language, {
            as: "language",
            foreignKey: "language_id",
        });

        // ✅ Quan hệ tự liên kết (bản dịch tham chiếu bản gốc)
        PostTranslate.belongsTo(models.PostTranslate, {
            foreignKey: 'origin_id',
            as: 'original'
        });

        // ✅ Ngược lại: bản gốc có nhiều bản dịch
        PostTranslate.hasMany(models.PostTranslate, {
            foreignKey: 'origin_id',
            as: 'translations'
        });
    };

    return PostTranslate;
};

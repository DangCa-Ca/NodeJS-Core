'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_translate', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      language_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
        is_origin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Đánh dấu đây là bản gốc của bài viết'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Thêm indexes để tối ưu truy vấn
    await queryInterface.addIndex('post_translate', ['post_id'], {
      name: 'post_translate_post_id_index'
    });

    await queryInterface.addIndex('post_translate', ['language_id'], {
      name: 'post_translate_language_id_index'
    });

    await queryInterface.addIndex('post_translate', ['post_id', 'language_id'], {
      name: 'post_translate_post_language_unique',
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_translate');
  }
};


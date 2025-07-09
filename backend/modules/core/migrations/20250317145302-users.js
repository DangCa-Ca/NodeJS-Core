'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(100),  // Giới hạn 100 ký tự để khớp thiết kế DB
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      avatar: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1  // Trạng thái mặc định là 1
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

    // Thêm index cho role_id để tối ưu truy vấn
    await queryInterface.addIndex('users', ['role_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};


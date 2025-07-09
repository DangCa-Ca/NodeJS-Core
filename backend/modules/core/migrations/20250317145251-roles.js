'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1 // Trạng thái mặc định là 1
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

    // Thêm index cho status để tối ưu truy vấn
    await queryInterface.addIndex('roles', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};

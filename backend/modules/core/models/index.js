'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Load config
const env = process.env.NODE_ENV || 'development';
const config = require('../../../configs/config.json')[env];

const db = {};

// Khởi tạo Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// === TỰ ĐỘNG LOAD MODEL TRONG core/models ===
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const modelFactory = require(path.join(__dirname, file));
    if (typeof modelFactory === 'function') {
      const model = modelFactory(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️ Bỏ qua file model '${file}' vì không export là function`);
    }
  });

// === TỰ ĐỘNG LOAD MODEL TRONG blog/models ===
// const blogModelsPath = path.resolve(__dirname, '../../blog/models');
// fs.readdirSync(blogModelsPath)
//   .filter(file =>
//     file.indexOf('.') !== 0 &&
//     file !== 'index.js' &&
//     file.slice(-3) === '.js'
//   )
//   .forEach(file => {
//     const modelFactory = require(path.join(blogModelsPath, file));
//     if (typeof modelFactory === 'function') {
//       const model = modelFactory(sequelize, Sequelize.DataTypes);
//       db[model.name] = model;
//     } else {
//       console.warn(`⚠️ Bỏ qua file blog model '${file}' vì không export là function`);
//     }
//   });

// Thiết lập association nếu có
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

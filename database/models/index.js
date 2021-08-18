'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
/*
  Get Connection Configuration 
*/
// const config_env = require(path.join(__dirname, "config/config")); // return Objet {development, test, production}
const config_env = require(__dirname + "/../config/config.js"); // return Object {development, test, production}
const env = process.env.NODE_ENV || 'development'; // return test

const config = config_env[env]; // if env == test then config_env.test || if env == production then config_env.production || then config_env.development
const db = {};


let sequelize;
if (config.url) { // config.url is defined then connection using connectionString
  const {url} = config
  console.log('url is defined with: ' + url);
  sequelize = new Sequelize(config.url);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.auth = require("./auth")(sequelize, Sequelize);
db.profil = require("./profile")(sequelize, Sequelize);

module.exports = db;

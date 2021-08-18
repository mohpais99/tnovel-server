require('dotenv').config()

const {Pool} = require('pg');

const config_env = require('./config')
const env = process.env.NODE_ENV || 'development'; // return test for now
const config = config_env[env]; // if env == test then config_env.test || if env == production then config_env.production || then config_env.development

var sequelize;
if (config.url) { // config.url is defined then connection using connectionString
    const {url} = config
    console.log(`Current status is ${env}!`);
    console.log(`URL is defined with: ${url}!\n`);
    sequelize = {
        connectionString: url
    };
} else {
    sequelize = {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASS,
        HOST: process.env.DB_HOST,
        DB: "tnovel-test",
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

// const developmentConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
// const productionConfig = process.env.DATABASE_URL

const pool = new Pool(sequelize)

module.exports = {
    query(quertText, params) {
        return new Promise((resolve, reject) => {
            pool.query(quertText, params, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    pool
}

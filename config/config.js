require('dotenv').config();

const urls = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/`

module.exports = {
    development: {
        url: `${urls}tnovel-dev`,
        dialect: 'postgres'
    },
    test: {
        url: `${urls}tnovel-test`,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    }
}
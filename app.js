require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const {pool} = require('./config/database')
const path = require('path');
const app = express()

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static('uploads'))
app.use('/poster', express.static('uploads/poster'))
app.use('/v1', indexRouter);

pool.connect()
    .then((client, release) => {
        client.query('SELECT NOW()', (err, result) => {
            if (err) { 
                return console.error( 
                    'Error executing query', err.stack) 
            } 
            console.log("Connected to Database at " + result.rows[0].now +" !")
            console.log('Database connected!')
        })
    })
    .catch(err => console.log('Error: ' + err))

module.exports = app;


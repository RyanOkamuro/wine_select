'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: redWineRouter } = require('./redWine');
const { router: whiteWineRouter } = require('./whiteWine');

mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/whiteWine/', whiteWineRouter);
app.use('/redWine/', redWineRouter);

const jwtAuth = passport.authenticate('jwt', {session: false })

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'wineDetails'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});
    
let server;

  function runServer() {
    return new Promise((resolve, reject) => {
      mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
        if (err) {
          return reject(err);
        }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };
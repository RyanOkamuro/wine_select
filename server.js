'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {wineListRouter} = require('./wineListRouter');
//const {userReviewRouter} = require('./userReviewRouter');

const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/wineList', wineListRouter);
//app.use('/userReview', userReviewRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};


//if (require.main === module) {
  //app.listen(process.env.PORT || 8080, function () {
    //console.info(`App listening on ${this.address().port}`);
  //});
//}

//module.exports = app;
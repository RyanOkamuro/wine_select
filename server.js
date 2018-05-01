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
//--new add
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//app.use('/wineList', wineListRouter);
//app.use('/userReview', userReviewRouter);

app.get('/wineBottles', (req, res) => {
  wineListRouter
    .find().exec()
    .then(wineBottles => {
      //console.log(wineBottles, 'xyl');
      res.json({
        wineBottles: wineBottles.map(
          (wineListRouter) => wineListRouter.serialize())
        });
        res.status(200).json(wineBottles)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
  });
  
app.get('/wineBottles/:id', (req,res) => {
  wineListRouter
    .findById(req.params.id)
    .then(wineListRouter => res.json(wineListRouter.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

app.post('/wineBottles', (req, res) => {
  const requiredFields = ['brand', 'wineName', 'color', 'type', 'rating', 'averagePrice', 'region', 'country', 'year', 'foodSuggestion', 'image', 'history', 'moreInformation'];
  console.log(req.body);
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  wineListRouter
    .create({
      brand: req.body.brand,
      wineName: req.body.wineName,
      color: req.body.color,
      type: req.body.type,
      rating: req.body.rating,
      averagePrice: req.body.averagePrice,
      region: req.body.region,
      country: req.body.country,
      year: req.body.year,
      foodSuggestion: req.body.foodSuggestion,
      image: req.body.image,
      history: req.body.history, 
      moreInformation: req.body.moreInformation
    })
    .then(wineBottle => res.status(201).json(wineBottle.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/wineBottles/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
      return res.status(400).json({ message: message });
    }

  const toUpdate = {};
  const updateableFields = ['rating', 'averagePrice', 'foodSuggestion'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  wineListRouter
    .findByIdAndUpdate(req.params.id, { $set: toUpdate})
    .then(wineBottle => res.status(204).end())
    .catch(err => res.status(500).json ({ message: 'Internal server error'}));
  });

  app.delete('/wineBottles/:id', (req, res) => {
    wineListRouter
      .findByIdAndRemove(req.params.id)
      .then(wineBottle => res.status(204).end())
      .catch(err => res.status(500).json({ message: 'Internal server error' }));
  });

  app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not found' });
  });
    
let server;

  function runServer(DATABASE_URL, port = PORT) {
    console.log(DATABASE_URL);
    return new Promise((resolve, reject) => {
      mongoose.connect(DATABASE_URL, err => {
        if (err) {
          return reject(err);
        }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err)
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
        reject(err);
        return;
      }
      resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};


//if (require.main === module) {
  //app.listen(process.env.PORT || 8080, function () {
    //console.info(`App listening on ${this.address().port}`);
  //});
//}

//module.exports = app;
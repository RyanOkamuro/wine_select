const express = require('express');
const config = require('../config');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Red} = require('./models');

const jwtAuth = passport.authenticate('jwt', {session: false});
router.get('/', jwtAuth, (req, res) => {
    Red
    .find({}).exec()
    .then(redWine => {
      res.json({
        redWine: redWine.map(
          (Red) => Red.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
  });
  
router.get('/:id', (req,res) => {
    Red
    .findById(req.params.id)
    .then(Red => res.json(Red.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['brand', 'wineName', 'color', 'type', 'rating', 'averagePrice', 'region', 'country', 'year', 'foodSuggestion', 'image', 'history', 'moreInformation'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

    Red
    .create({
      brand: req.body.brand,
      wineName: req.body.wineName,
      color: req.body.color,
      type: req.body.type,
      rating: req.body.rating,
      numRaters: req.body.numRaters,
      cumulativeRating: req.body.cumulativeRating,
      averagePrice: req.body.averagePrice,
      region: req.body.region,
      country: req.body.country,
      year: req.body.year,
      foodSuggestion: req.body.foodSuggestion,
      image: req.body.image,
      history: req.body.history, 
      moreInformation: req.body.moreInformation
    })
    .then(redWines => res.status(201).json(redWines.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  }
  const toUpdate = {};
  const updateableFields = ['rating', 'numRaters', 'cumulativeRating', 'averagePrice'];

  updateableFields.forEach(field => {
    if (req.body.redBottle[field]) {
      toUpdate[field] = req.body.redBottle[field];
    }
  });
    Red
    //for matching criteria with same id, $set operator will update new inputed values for rating & averagePrice
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(redWines => {return res.status(202).json(redWines)})
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
    Red
    .findByIdAndRemove(req.params.id)
    .then(redWines => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
  });

router.use('*', function(req, res) {
    res.status(404).json({message: 'Not found'});
  });

module.exports = {router};
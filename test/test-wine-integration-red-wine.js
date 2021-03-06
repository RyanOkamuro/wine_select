'use strict';

require('dotenv').config();
const chai = require('chai');

const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {User} = require('../users/models');
const {Red} = require('../redWine/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);

function seedWineData() {
  console.info('seeding wine info');
  const seedData = [];

  for (let i=1; i<=4; i++) {
    seedData.push(generateWineData());
  }
  return Red.insertMany(seedData)
  .then(() => {
    return User.insertMany([{username: 'newuser', firstName: 'john', lastName: 'smith', password: '$2a$10$e0MH4k7wVdhPJYcrByPL7OeYj85xu7o0/kU183JYqUsWni7HtT7Dy'}])
  .then(() => loginUser())
  })
}

let randomBottle = 0;
function generateLabel() {
  const bottleLabel = ['Baileyana Firepeak', 'Tarapaca Etiqueta Negra Gran Reserva', 'Layer Cake Primitivo', 'Penfolds Bin 2'];
  randomBottle = Math.floor(Math.random() * bottleLabel.length)
    return bottleLabel[randomBottle];
}

function generateBrand() {
  const brand = ['Baileyana', 'Tarapaca', 'Layer Cake', 'Penfolds'];
  return brand[randomBottle];
}

function generateWineName() {
  const wineName = ['Firepeak', 'Etiqueta Negra Gran Reserva', 'Primitivo', 'Bin 2'];
  return wineName[randomBottle];
}

function generateColor() {
  const color = ['Red', 'Red', 'Red', 'Red'];
  return color[Math.floor(Math.random() * color.length)];
}

function generateType() {
  const type = ['Pinot Noir', 'Cabernet Sauvignon', 'Primitivo', 'Bin 2'];
  return type[Math.floor(Math.random() * type.length)];
}

function generateRating() {
  const rating = [5, 4.6, 3.9, 3.7];
  return rating[Math.floor(Math.random() * rating.length)];
}

function generateAveragePrice() {
  const averagePrice = [19, 29.99, 15, 19.99];
  return averagePrice[Math.floor(Math.random() * averagePrice.length)];
}

let randomLocation = 0;
function generateWineOrigin() {
  const wineOrigin = ['Edna Valley, USA', 'Maipo Valley, Chile', 'Puglia, Italy', 'South Australia, Australia'];
  randomLocation = Math.floor(Math.random() * wineOrigin.length)
    return wineOrigin[randomLocation];
}

function generateRegion() {
  const region = ['Edna Valley', 'Maipo Valley', 'Puglia', 'South Australia'];
  return region[randomLocation];
}

function generateCountry() {
  const country = ['USA', 'Chile', 'Italy', 'Australia'];
    return country[randomLocation];
}

function generateYear() {
  const year = [2014, 2014, 2014, 2012];
  return year[Math.floor(Math.random() * year.length)];
}

function generateFoodSuggestion() {
  const foodSuggestion = ['Chicken and Turkey', 'Lamb', 'Beef and Chicken', 'Beef and Lamb'];
  return foodSuggestion[Math.floor(Math.random() * foodSuggestion.length)]; 
}

function generateImage() {
  const image = ['https://www.winetransit.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/b/a/baileyana_firepeak_pnoir_mv_750.png', 'https://files.thewinebowgroup.com/PDF/brand5002/T0008448_tarapaca-g-reserva-etiq-negra-s-f-jpg-1.jpg', 'https://www.b-21.com/labels/live/ITLCPR14AE.jpg', 'https://www.nataliemaclean.com/images/winepicks/058ba29dde3c11dc0f1c8adf3ae14ed6/original_penfolds-bin-2-shiraz-mourv-dre-2012-209478-bottle-1415126015.jpg'];
  return image[Math.floor(Math.random() * image.length)];
  }

function generateHistory() {
  const history = ['The flagship winery from the Niven Family, Baileyana was created over 30 years ago by our matriarch, Catharine Niven, and is now in the expert hands of the second and third generations of her family. An expression of classic cool climate varietals, each wine is sourced from select blocks from our estate Paragon Vineyard—planted in 1973 by Catharine’s husband, Jack. Baileyana’s range of Chardonnays, Pinot Noirs, Syrahs,and sparkling wines are all crafted by our dynamic winemaking team. Refined, rich, and perfectly balanced, Baileyana wines emulate the spirited woman who brought them to life. Boldly Beautiful.', 'Since we were founded at the foothills of the Andes mountain range in 1874, we have crafted elegant, quality wines, becoming one of the most traditional and historical Chilean wineries, as well as a benchmark for viticulture in Chile and over 50 countries.', 'At Layer Cake, we work directly with the farmers to grow the fruit we work with. Our grapes are grown to exacting standards in some of the most diversely-layered vineyards around the world. They are handpicked, separated and fermented with care, then aged in French Oak. The character of each Layer Cake wine is influenced by the vineyard soil, which is layered like a cake…every layer tells a story.', 'The success of Penfolds has been driven by the generations of visionaries and innovators. From the beginning in 1844 to today, the merging of science, art and innovation has driven Penfolds to become one of Australia’s most famed and respected winemakers.'];
  return history[Math.floor(Math.random() * history.length)];
  }

function generateInformation() {
  const moreInformation = ['http://baileyana.com/', 'http://www.tarapaca.cl/en/history/', 'http://layercakewines.com/about/', 'https://www.penfolds.com/en-us/about-penfolds/heritage/our-history'];
  return moreInformation[Math.floor(Math.random() * moreInformation.length)];
  }


function generateWineData() {
  return {
    'wineLabelDetails': generateLabel(),
    'brand': generateBrand(),
    'wineName': generateWineName(),
    'color': generateColor(),
    'type': generateType(),
    'rating': generateRating(),
    'averagePrice': generateAveragePrice(),
    'wineOrigin': generateWineOrigin(),
    'region': generateRegion(),
    'country': generateCountry(),
    'year': generateYear(),
    'foodSuggestion': generateFoodSuggestion(),
    'image': generateImage(),
    'history': generateHistory(),
    'moreInformation': generateInformation(),
  };
}

function tearDownDb() {
  console.warn('Delete database');
  return mongoose.connection.dropDatabase();
}

let authToken;
function loginUser() {
  return chai
    .request(app)
    .post('/api/auth/login')
    .send({username: 'newuser', password: 'demopassword'})
    .then(function(_res) {
        authToken = _res.body.authToken
        return false;
    })
  }

  describe('Red wine API resource', function() {
    
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function() {
      return seedWineData();
    });

    afterEach(function() {
      return tearDownDb();
    });

    after(function() {
      return closeServer();
    });

  describe('GET Label Information', function() {
    it('should list information on GET', function() {
      let res;
      return chai
        .request(app)
        .get('/redWine')
        .set('Authorization', `Bearer ${authToken}`)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.redWine).to.have.lengthOf.at.least(1);
          return Red.count();
        })
        .then(function(count) {
          expect(res.body.redWine).to.have.lengthOf(count);
        });
      });

      it('should return the correct fields for redWine', function() {
        let resWine;
        return chai
          .request(app)
          .get('/redWine')
          .set('Authorization', `Bearer ${authToken}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.redWine).to.be.a('array');
            expect(res.body.redWine).to.have.lengthOf.at.least(1);
            const expectedKeys = ['wineLabelDetails', 'type', 'rating', 'averagePrice', 'wineOrigin', 'year', 'foodSuggestion', 'image', 'history', 'moreInformation'];
            res.body.redWine.forEach(function(wine) {
              expect(wine).to.be.a('object');
              expect(wine).to.include.keys(expectedKeys);
          });
          resWine = res.body.redWine[0];
          return Red.findById(resWine.id);
        })
        .then(function(wine) {
          expect(resWine.id).to.equal(wine.id);
          expect(resWine.wineLabelDetails).to.equal(wine.wineLabelDetails);
          expect(resWine.type).to.equal(wine.type);
          expect(resWine.rating).to.equal(wine.rating);
          expect(resWine.averagePrice).to.equal(wine.averagePrice);
          expect(resWine.wineOrigin).to.equal(wine.wineOrigin);
          expect(resWine.year).to.equal(wine.year);
          expect(resWine.foodSuggestion).to.equal(wine.foodSuggestion);
          expect(resWine.image).to.equal(wine.image);
          expect(resWine.history).to.equal(wine.history);
          expect(resWine.moreInformation).to.equal(wine.moreInformation);
      })
  });
});

  describe('POST Label Information', function() {
    it('should add an item on POST', function() {
      const newWineBottle = generateWineData();
      return chai.request(app)
        .post('/redWine')
        .set('Authorization', `Bearer ${authToken}`)
        //use .send() to pass in an object representing a new wine bottle label
        .send(newWineBottle)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('wineLabelDetails', 'type', 'rating', 'averagePrice', 'wineOrigin', 'year', 'foodSuggestion', 'image', 'history', 'moreInformation');
          expect(res.body.wineLabelDetails).to.equal(newWineBottle.wineLabelDetails);
          expect(res.body.type).to.equal(newWineBottle.type);
          expect(res.body.rating).to.equal(newWineBottle.rating);
          expect(res.body.averagePrice).to.equal(newWineBottle.averagePrice);
          expect(res.body.wineOrigin).to.equal(newWineBottle.wineOrigin);
          expect(res.body.year).to.equal(newWineBottle.year);
          expect(res.body.foodSuggestion).to.equal(newWineBottle.foodSuggestion);
          expect(res.body.image).to.equal(newWineBottle.image);
          expect(res.body.history).to.equal(newWineBottle.history);
          expect(res.body.moreInformation).to.equal(newWineBottle.moreInformation);
          expect(res.body.id).to.not.be.null;
          return Red.findById(res.body.id);
        })
        .then(function(wine) {
          expect(wine.wineLabelDetails).to.equal(newWineBottle.wineLabelDetails);
          expect(wine.type).to.equal(newWineBottle.type);
          expect(wine.rating).to.equal(newWineBottle.rating);
          expect(wine.averagePrice).to.equal(newWineBottle.averagePrice);
          expect(wine.wineOrigin).to.equal(newWineBottle.wineOrigin);
          expect(wine.year).to.equal(newWineBottle.year);
          expect(wine.foodSuggestion).to.equal(newWineBottle.foodSuggestion);
          expect(wine.image).to.equal(newWineBottle.image);
          expect(wine.history).to.equal(newWineBottle.history);
          expect(wine.moreInformation).to.equal(newWineBottle.moreInformation);
        });
      });
  });

  describe('PUT Label Information', function() {
    it('should replace an existing item on PUT', function() {
      const updateData = {
        redBottle: {
          rating: 4.3,
          averagePrice: 49.99 
        }
      };
      
      return Red
        .findOne()
        .then(function(redWines){
          updateData.id = redWines.id;

      return chai.request(app)
        .put(`/redWine/${redWines.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(202);
          return Red.findById(updateData.id);
      })
        .then(function(redWines) {
          expect(redWines.rating).to.equal(updateData.redBottle.rating);
          expect(redWines.averagePrice).to.equal(updateData.redBottle.averagePrice);
      });
    });
  });

  describe('DELETE Label Information', function() {
    it('delete wine by id', function() {
      let wine;
      return Red
        .findOne()
        .then(function(_wine) {
          wine = _wine;
          return chai
          .request(app)
          .delete(`/redWine/${wine.id}`)
          .set('Authorization', `Bearer ${authToken}`);
        })
        .then(function(res) {
         expect(res).to.have.status(204);
          return Red.findById(wine.id);
        })
        .then(function(_wine) {
          expect(_wine).to.be.null;
        });
    }); 
  });
});


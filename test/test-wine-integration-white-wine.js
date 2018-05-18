'use strict';

const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const {White} = require('../whiteWine/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

let authToken;
let agent = request.agent(app);

function seedWineData() {
  console.info('seeding wine info');
  const seedData = [];

  for (let i=1; i<=4; i++) {
    seedData.push(generateWineData());
  }
  return White.insertMany(seedData);
}

let randomBottle = 0;
function generateLabel() {
  const bottleLabel = ['Christian Moreau Chablis', 'Dr. Thanisch Bernkasteler Badstube', 'Gaja Alteni Di Brassica', 'Holm Oak Tasmania'];
  randomBottle = Math.floor(Math.random() * bottleLabel.length)
    return bottleLabel[randomBottle];
}

function generateBrand() {
  const brand = ['Christian Moreau', 'Dr. Thanisch', 'Gaja', 'Holm Oak'];
  return brand[randomBottle];
}

function generateWineName() {
  const wineName = ['Chablis', 'Bernkasteler Badstube', 'Alteni Di Brassica', 'Tasmania'];
  return wineName[randomBottle];
}

function generateColor() {
  const color = ['White', 'White', 'White', 'White'];
  return color[Math.floor(Math.random() * color.length)];
}

function generateType() {
  const type = ['Chardonnay', 'Riesling', 'Sauvignon Blanc', 'Pinot Gris'];
  return type[Math.floor(Math.random() * type.length)];
}

function generateRating() {
  const rating = [4.3, 4.5, 4.1, 3.7];
  return rating[Math.floor(Math.random() * rating.length)];
}

function generateAveragePrice() {
  const averagePrice = [21.99, 23.99, 149.99, 23.99];
  return averagePrice[Math.floor(Math.random() * averagePrice.length)];
}

let randomLocation = 0;
function generateWineOrigin() {
  const wineOrigin = ['Burgundy, France', 'Mosel, Germany', 'Piedmont, Italy', 'Tamar Valley, Australia'];
  randomLocation = Math.floor(Math.random() * wineOrigin.length)
    return wineOrigin[randomLocation];
}

function generateRegion() {
  const region = ['Burgundy', 'Mosel', 'Piedmont', 'Tamar Valley'];
  return region[randomLocation];
}

function generateCountry() {
  const country = ['France', 'Germany', 'Italy', 'Australia'];
    return country[randomLocation];
}

function generateYear() {
  const year = [2015, 2016, 2015, 2015];
  return year[Math.floor(Math.random() * year.length)];
}

function generateFoodSuggestion() {
  const foodSuggestion = ['Seafood', 'Seafood', 'Cured Meat, Chicken, Seafood', 'Seafood and Chicken'];
  return foodSuggestion[Math.floor(Math.random() * foodSuggestion.length)]; 
}

function generateImage() {
  const image = ['https://www.goodfood.com.au/content/dam/images/2/8/l/k/8/image.related.articleLeadNarrow.300x0.28lep.png/1351728018290.jpg', 'https://www.dynamicwines.com.au/assets/full/DT1115.jpg', 'https://images-na.ssl-images-amazon.com/images/I/31LjFKzCJeL._SX342_.jpg', 'https://cdn6.bigcommerce.com/s-kkxmb/products/6414/images/9897/46581FB8F76904381824AA7C7E6FA9C0__46308.1498782782.600.600.PNG?c=2'];
  return image[Math.floor(Math.random() * image.length)];
  }

function generateHistory() {
  const history = ['Our vineyard is located in the village of Chablis, in the very heart of the Chablis country, on the left bank of the Serein River, with a south-south east exposure. It is located in the climat Les Pargues. The soil is kimmeridgien calcareously clay which goes back to the upper jurrassic age (portlandien).', 'The internationally recognized Wwe. Dr. H. Thanisch, Erben Müller-Burgraef estate is located in the picturesque town of Bernkastel-Kues in the heart of the Middle Mosel. Here we cultivate, 12 hectares (ca. 30 acres) of prime, steep Riesling sites.', 'The internationally recognized Wwe. Dr. H. Thanisch, Erben Müller-Burgraef estate is located in the picturesque town of Bernkastel-Kues in the heart of the Middle Mosel. Here we cultivate, 12 hectares (ca. 30 acres) of prime, steep Riesling sites.', 'Golden yellow with an elegant perfume with aromatic notes in harmony with the distinct fruit. Dense structure and balanced body, supported by perfectly integrated acidity.'];
  return history[Math.floor(Math.random() * history.length)];
  }

function generateInformation() {
  const moreInformation = ['http://www.domainechristianmoreau.com/eng/wines.html', 'http://www.dr-thanisch.de/index.php?id=3&L=1', 'https://www.wine.com/product/gaja-alteni-di-brassica-sauvignon-blanc-2015/335280', 'http://www.holmoakvineyards.com.au/About-Us/Our-Vineyards'];
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

  describe('White wine API resource', function() {

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
      agent
        .get('/whiteWine')
        .set('Authorization', `Bearer ${authToken}`)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.whiteWine).to.have.lengthOf.at.least(1);
          return White.count();
        })
        .then(function(count) {
          expect(res.body.whiteWine).to.have.lengthOf(count);
        });
      });

      it('should return the correct fields for whiteWine', function() {
        let resWine;
        agent
          .get('/whiteWine')
          .set('Authorization', `Bearer ${authToken}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.whiteWine).to.be.a('array');
            expect(res.body.whiteWine).to.have.lengthOf.at.least(1);
            const expectedKeys = ['wineLabelDetails', 'type', 'rating', 'averagePrice', 'wineOrigin', 'year', 'foodSuggestion', 'image', 'history', 'moreInformation'];
            res.body.whiteWine.forEach(function(wine) {
              expect(wine).to.be.a('object');
              expect(wine).to.include.keys(expectedKeys);
          });
          resWine = res.body.whiteWine[0];
          return White.findById(resWine.id);
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
        .post('/whiteWine')
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
          return White.findById(res.body.id);
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
        whiteBottle: {
          rating: 4.3,
          averagePrice: 49.99 
        }
      };

      return White
        .findOne()
        .then(function(whiteWines){
          updateData.id = whiteWines.id;

      return chai.request(app)
        .put(`/whiteWine/${whiteWines.id}`)
        .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(202);
          return White.findById(updateData.id);
      })
        .then(function(whiteWines) {
          expect(whiteWines.rating).to.equal(updateData.whiteBottle.rating);
          expect(whiteWines.averagePrice).to.equal(updateData.whiteBottle.averagePrice);
      });
    });
  });

  describe('DELETE Label Information', function() {
    it('delete wine by id', function() {
      let wine;
      return White
        .findOne()
        .then(function(_wine) {
          wine = _wine;
          return chai.request(app).delete(`/whiteWine/${wine.id}`);
        })
        .then(function(res) {
         expect(res).to.have.status(204);
          return White.findById(wine.id);
        })
        .then(function(_wine) {
          expect(_wine).to.be.null;
        });
    }); 
  });
});


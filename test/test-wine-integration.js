'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {wineListRouter} = require('./wineListRouter');
const {app, closeServer, runServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

function seedWineData() {
  console.info('seeding wine info');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateWineData());
  }
  return wineListRouter.insertMany(seedData);
}

function generateBrand() {
  const brand = [
    'Baileyana', 'Tarapaca', 'Layer Cake', 'Penfolds'];
  return brand[Math.floor(Math.random() * brand.length)];
}

function generatewineName() {
  const wineName = [
    'Firepeak', 'Etiqueta Negra Gran Reserva', 'Primitivo', 'Bin 2'];
  return wineName[Math.floor(Math.random() * wineName.length)];
}

function generateColor() {
  const color = [
    'Red', 'Red', 'Red', 'Red'];
  return generateColor[Math.floor(Math.random() * generateColor.length)];
}

function generateType() {
  const type = [
    'Pinot Noir', 'Cabernet Sauvignon', 'Primitivo', 'Bin 2'];
  return generateType[Math.floor(Math.random() * generateType.length)];
}

function generateRating() {
  const rating = [
    5, 4.6, 3.9, 3.7];
  return generateRating[Math.floor(Math.random() * generateRating.length)];
}

function generateAveragePrice() {
  const averagePrice = [
    19, 29.99, 15, 19.99];
  return generateAveragePrice[Math.floor(Math.random() * generateAveragePrice.length)];
}

function generateRegion() {
  const region = [
    'Edna Valley', 'Maipo Valley', 'Puglia', 'South Australia'];
  return generateRegion[Math.floor(Math.random() * generateRegion.length)];
}

function generateCountry() {
  const country = [
    'USA', 'Chile', 'Italy', 'Australia'];
    return generateCountry[Math.floor(Math.random() * generateCountry.length)];
}

function generateYear() {
  const year = [
    '2014', '2014', '2014', '2012'];
  return generateYear[Math.floor(Math.random() * generateYear.length)];
}

function generateFoodSuggestion() {
  const foodSuggestion = [
    'Chicken and Turkey', 'Lamb', 'Beef and Chicken', 'Beef and Lamb'];
  return generateFoodSuggestion[Math.floor(Math.random() * generateFoodSuggestion.length)]; 
}

function generateImage() {
  const image = [
    'https://www.winetransit.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/b/a/baileyana_firepeak_pnoir_mv_750.png', 'https://files.thewinebowgroup.com/PDF/brand5002/T0008448_tarapaca-g-reserva-etiq-negra-s-f-jpg-1.jpg', 'https://www.b-21.com/labels/live/ITLCPR14AE.jpg', 'https://www.nataliemaclean.com/images/winepicks/058ba29dde3c11dc0f1c8adf3ae14ed6/original_penfolds-bin-2-shiraz-mourv-dre-2012-209478-bottle-1415126015.jpg'];
  return generateImage[Math.floor(Math.random() * generateImage.length)];
  }

function generateHistory() {
  const history = [
    'The flagship winery from the Niven Family, Baileyana was created over 30 years ago by our matriarch, Catharine Niven, and is now in the expert hands of the second and third generations of her family. An expression of classic cool climate varietals, each wine is sourced from select blocks from our estate Paragon Vineyard—planted in 1973 by Catharine’s husband, Jack. Baileyana’s range of Chardonnays, Pinot Noirs, Syrahs,and sparkling wines are all crafted by our dynamic winemaking team. Refined, rich, and perfectly balanced, Baileyana wines emulate the spirited woman who brought them to life. Boldly Beautiful.', 'Since we were founded at the foothills of the Andes mountain range in 1874, we have crafted elegant, quality wines, becoming one of the most traditional and historical Chilean wineries, as well as a benchmark for viticulture in Chile and over 50 countries.', 'At Layer Cake, we work directly with the farmers to grow the fruit we work with. Our grapes are grown to exacting standards in some of the most diversely-layered vineyards around the world. They are handpicked, separated and fermented with care, then aged in French Oak. The character of each Layer Cake wine is influenced by the vineyard soil, which is layered like a cake…every layer tells a story.', 'The success of Penfolds has been driven by the generations of visionaries and innovators. From the beginning in 1844 to today, the merging of science, art and innovation has driven Penfolds to become one of Australia’s most famed and respected winemakers.'];
  return generateHistory[Math.floor(Math.random() * generateHistory.length)];
  }

function generateInformation() {
  const information = [
    'http://baileyana.com/', 'http://www.tarapaca.cl/en/history/', 'http://layercakewines.com/about/', 'https://www.penfolds.com/en-us/about-penfolds/heritage/our-history'];
  return generateInformation[Math.floor(Math.random() * generateInformation.length)];
  }


//describe('Label Information', function() {


  //before(function() {
    //return runServer();
  //});

  //after(function() {
    //return closeServer();
  //});

  //it('should list information on GET', function() {
    //return chai.request(app)
      //.get('/wineList')
      //.then(function(res) {
        //expect(res).to.have.status(200);
        //expect(res).to.be.json;
        //expect(res.body).to.be.a('array');
        //expect(res.body.length).to.be.at.least(1);
        //const expectedKeys = ['brand', 'wineName', 'color', 'type', 'rating', 'averagePrice', 'region', 'country', 'year', 'foodSuggesion', 'image', 'history', 'moreInformation'];
        //res.body.forEach(function(item) {
          //expect(item).to.be.a('object');
          //expect(item).to.include.keys(expectedKeys);
        //});
      //});
  //});

  //it('should add an item on POST', function() {
    //const newWineBottle = {brand: 'Burn Cottage', wineName: 'Cashburn Pinot Noir', color: 'Red', type: 'Pinot Noir', rating: 4.5, averagePrice: 30.99, region: 'Central Otago', country: 'New Zealand', year: 2015, foodSuggesion: 'Beef or chicken', image: 'https://cdn.shopify.com/s/files/1/0380/7593/products/cashburn-11-bottle_grande.png?v=1458579525', history: 'Burn Cottage Vineyard Property is a twenty four hectare estate in the foothills of the Pisa range in Central Otago, New Zealand. The vineyard is owned by the Sauvage family which also owns the celebrated Koehler Ruprecht estate in the Pfalz region of Germany, as well as several fine wine importing and wholesaling companies in the United States.', moreInformation: 'https://www.burncottage.com/history.html'};
    //return chai.request(app)
      //.post('/wineList')
      //.send(newWineBottle)
      //.then(function(res) {
        //expect(res).to.have.status(201);
        //expect(res).to.be.json;
        //expect(res.body).to.be.a('object');
        //expect(res.body).to.include.keys('brand', 'wineName', 'color', 'type', 'rating', 'averagePrice', 'region', 'country', 'year', 'foodSuggesion', 'image', 'history', 'moreInformation');
        // response should be deep equal to `newItem` from above if we assign
        // `id` to it from `res.body.id`
      //});
  //});


describe('index page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});
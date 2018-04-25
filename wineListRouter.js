'use strict';

const mongoose = require ('mongoose');

const wineSchema = mongoose.Schema({
    brand: {type: String, required: true},
    wineName: {type: String, required: true},
    color: {type: String, required: true},
    type: {type: String, required: true},
    rating: {type: Number, required: true},
    averagePrice: {type: Number, required: true},
    region: {type: String, required: true},
    country: {type: String, required: true},
    year: {type: Number, required: true},
    foodSuggestion: {type: String, required: true},
    image: {type: Text, required: true},
    history: {type: Text, required: true},
    moreInformation: {type: Text, required: true},
});

wineSchema.virtual('wineLabelDetails').get(function() {
    return `${this.brand} ${this.wineName}`.trim()});

wineSchema.virtual('wineOrigin').get(function() {
    return `${this.region} ${this.country}`.trim()});

wineSchema.methods.serialize = function() {
    return {
        id: this._id,
        wineName: this.wineName,
        rating: this.rating,
        averagePrice: this.averagePrice,
        wineOrigin: this.wineOrigin,
        year: this.year
    };
}

const wineListRouter = mongoose.model('wineListRouter', wineSchema);

module.exports = {wineListRouter};

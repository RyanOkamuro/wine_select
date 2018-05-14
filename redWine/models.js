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
    image: {type: String, required: true},
    history: {type: String, required: true},
    moreInformation: {type: String, required: true},
});

wineSchema.virtual('wineLabelDetails').get(function() {
    return `${this.brand} ${this.wineName}`.trim()});

wineSchema.virtual('wineOrigin').get(function() {
    return `${this.region}, ${this.country}`.trim()});

wineSchema.methods.serialize = function() {
    return {
        id: this._id,
        wineLabelDetails: this.wineLabelDetails,
        type: this.type,
        rating: this.rating,
        averagePrice: this.averagePrice,
        wineOrigin: this.wineOrigin,
        year: this.year,
        foodSuggestion: this.foodSuggestion,
        image: this.image,
        history: this.history,
        moreInformation: this.moreInformation
    };
}

const Red = mongoose.model('Red', wineSchema);

module.exports = {Red};

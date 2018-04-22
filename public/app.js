let MOCK_DATA =
{
    "redWineCollection": [
        {
            "brand": "Baileyana",
            "wineName": "Firepeak",
            "type": "Pinot Noir",
            "rating": 5,
            "averagePrice": "$19",
            "region": "Edna Valley",
            "country": "USA",
            "year": 2015,
            "foodSuggestion": "Chicken and Turkey"
        },
        {
            "brand": "Tarapaca",
            "wineName": "Etiqueta Negra Gran Reserva", 
            "type": "Cabernet Sauvignon",
            "rating": 4.6,
            "averagePrice": "$29.99",
            "region": "Maipo Valley",
            "country": "Chile",
            "year": 2014,
            "foodSuggestion": "Lamb"
        },
        {
            "brand": "Layer Cake",
            "wineName": "Primitivo",
            "type": "Zinfandel",
            "rating": 3.9,
            "averagePrice": "$15",
            "region": "Puglia",
            "country": "Italy",
            "year": 2014,
            "foodSuggestion": "Beef and Chicken"
        },
        {
            "brand": "Penfolds",
            "wineName": "Bin 2",
            "type": "Shiraz",
            "rating": 3.7,
            "averagePrice": "$19.99",
            "region": "South Australia",
            "country": "Australia",
            "year": 2012,
            "foodSuggestion": "Beef and Lamb"
        }
    ]
};

function getRedWine(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_DATA)}, 100);
}

function displayRedWine(data) {
    for (index in data.redWineCollection) {
       $('body').append(
        '<p>' + data.redWineCollection[index].type + '</p>');
    }
}

function getAndDisplayRedWine() {
    getRedWine(displayRedWine);
}

$(function() {
    getAndDisplayRedWine();
})


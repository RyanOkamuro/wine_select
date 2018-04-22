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
            "year": 2014,
            "foodSuggestion": "Chicken and Turkey",
            "image": "https://www.winetransit.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/b/a/baileyana_firepeak_pnoir_mv_750.png"
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
            "foodSuggestion": "Lamb",
            "image": "https://files.thewinebowgroup.com/PDF/brand5002/T0008448_tarapaca-g-reserva-etiq-negra-s-f-jpg-1.jpg"
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
            "foodSuggestion": "Beef and Chicken",
            "image": "https://www.b-21.com/labels/live/ITLCPR14AE.jpg"
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
            "foodSuggestion": "Beef and Lamb",
            "image": "https://www.nataliemaclean.com/images/winepicks/058ba29dde3c11dc0f1c8adf3ae14ed6/original_penfolds-bin-2-shiraz-mourv-dre-2012-209478-bottle-1415126015.jpg"
        }
    ]
};

let wineryHistory = {
    "wineVineyard": [
        {
            "brand": "Baileyana",
            "history": "The flagship winery from the Niven Family, Baileyana was created over 30 years ago by our matriarch, Catharine Niven, and is now in the expert hands of the second and third generations of her family. An expression of classic cool climate varietals, each wine is sourced from select blocks from our estate Paragon Vineyard—planted in 1973 by Catharine’s husband, Jack. Baileyana’s range of Chardonnays, Pinot Noirs, Syrahs,and sparkling wines are all crafted by our dynamic winemaking team. Refined, rich, and perfectly balanced, Baileyana wines emulate the spirited woman who brought them to life. Boldly Beautiful.",
            "moreInformation": "http://baileyana.com/"
        },
        {
            "brand": "Tarapaca",
            "history": "Since we were founded at the foothills of the Andes mountain range in 1874, we have crafted elegant, quality wines, becoming one of the most traditional and historical Chilean wineries, as well as a benchmark for viticulture in Chile and over 50 countries.",
            "information": "http://www.tarapaca.cl/en/history/" 
        },
        {
            "brand": "Layer Cake",
            "history": "At Layer Cake, we work directly with the farmers to grow the fruit we work with. Our grapes are grown to exacting standards in some of the most diversely-layered vineyards around the world. They are handpicked, separated and fermented with care, then aged in French Oak. The character of each Layer Cake wine is influenced by the vineyard soil, which is layered like a cake…every layer tells a story.",
            "information": "http://layercakewines.com/about/"
        },
        {
            "brand": "Penfolds",
            "history": "The success of Penfolds has been driven by the generations of visionaries and innovators. From the beginning in 1844 to today, the merging of science, art and innovation has driven Penfolds to become one of Australia’s most famed and respected winemakers.",
            "information": "https://www.penfolds.com/en-us/about-penfolds/heritage/our-history"
        }
    ]
};

let userReview = {
    "userReviewComments": [
        {
            "userName": "RedZin",
            "rating": 4.5,
            "reviewStatement": "Very smooth, compliments the dining experience when eating filet mignon"
        },
        {
            "userName": "ShirazMe",
            "rating": 4.3,
            "reviewStatement": "Has a nice fruity taste, makes for a great daily dining wine"
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

function displayRedWineImage(data) {
    for (index in data.redWineCollection) {
       $('body').append(
        '<p>' + `<img src='${data.redWineCollection[index].image}'>` + '</p>');
    }
}

function getAndDisplayRedWine() {
    getRedWine(displayRedWine);
    getRedWine(displayRedWineImage);
}

$(function() {
    getAndDisplayRedWine();
})


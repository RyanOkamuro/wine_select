
let MOCK_DATA =
{
    "redWineCollection": [
        {
            "brand": "Baileyana",
            "wineName": "Firepeak",
            "color": "Red",
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
            "color": "Red",
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
            "color": "Red",
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
            "color": "Red",
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

//Search by querying wine label.  
//Search by red or white wine by clicking on the wine bottle image. 
function wineQuery() {
    let wineSearch = `
    <section role='region' class='wineLabelRedWhite'>
        <form role='form' class='wineBrand'>
            <fieldset name='wineLabel'>
            <legend>Wine Label Search</legend>
            <label for='js-wine-label' class='winery'>Wine Label</label>
            <input placeholder='Layer Cake' type='text' name='js-wine-label' id='js-wine-label' autofocus/>
            <button role="button" type="submit" class="js-label-search">Submit</button>
            </fieldset>
        </form>
        <img src='http://www.leclos.net/wp-content/uploads/850761.png' class='red' alt='Lafite'>
        <img src='http://www.jpost.com/HttpHandlers/ShowImage.ashx?id=327394' class='white' alt='Jadot Lous'>
    </section>
    `;
    $('.login-form').hide();
    //display brand, red wine, or white wine search page
    let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
}

//Display wine list from search results
function wineCollectionListing() {
    let searchResultsList = `
    <section role='region' class='wineResults'>
        <ul id='labelInformation'></ul>
    </section>
    `;
    $('.wineLabelRedWhite').hide();
    let outputElem = $('#wineList');
        outputElem
            .prop('hidden', false)
            .html(searchResultsList);
}

//Display single wine information
function singleWineResult(currentWine) {
    let singleWine = `
    <section role='region' class='oneWine'>
        <img src='${currentWine.image}' class='singleRedWineImage' alt='wine-bottle'>
        <ul id='singleLabel'></ul>
    </section>
    `;
    let li = document.createElement('li');
    li.innerHTML = `
        Wine Label: ${currentWine.brand} <br />
        Type: ${currentWine.type} <br />
        Rating: ${currentWine.rating} <br /> 
        Price: ${currentWine.averagePrice} <br />
        Region: ${currentWine.country} <br />
        Year: ${currentWine.year} <br />
    `;
    $('.wineResults').hide();
    let outputElem = $('#wineDetails');
        outputElem
            .prop('hidden', false)
            .html(singleWine);
    $('#singleLabel').append(li);
}

function getWine(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_DATA)}, 100);
}

function createWineListing(data) {
    for (index in data.redWineCollection) {
    let li = document.createElement('li');
    li.innerHTML = `
    Wine Label: ${data.redWineCollection[index].brand} <br /> 
    Type: ${data.redWineCollection[index].type} <br /> 
    Rating: ${data.redWineCollection[index].rating} <br />
    Price: ${data.redWineCollection[index].averagePrice} <br />  
    Region: ${data.redWineCollection[index].country} <br /> 
    Year: ${data.redWineCollection[index].year} <br />    
    <img src='${data.redWineCollection[index].image}' class='redWine' data-index='${index}' alt='wine-bottle'>
    `;
    $('#labelInformation').append(li);
    }
}

function startSearchWindow() {
    $('.login-form').submit(event => {
        event.preventDefault();
        wineQuery();
    });
}

function wineSearchWindow() {
    $('body').on('click', '.red', event=> {
        event.preventDefault();
        wineCollectionListing();
        getAndDisplayWineResults();
    })
}

function singleWineSearchWindow(data) {
    $('body').on('click', '.redWine', event=> {
        let profileWineName = $(event.target).data('index');
        console.log(profileWineName);
        let currentWine = MOCK_DATA.redWineCollection[profileWineName]
        console.log(currentWine);
        event.preventDefault();
        singleWineResult(currentWine);
    })
}

function handleCreateApp() {
    startSearchWindow();
    wineSearchWindow();
    singleWineSearchWindow();
}

function getAndDisplayWineResults() {
    getWine(createWineListing);
}

$(handleCreateApp);

$(function() {
    getAndDisplayWineResults();
})
//let REDWINE_URL = 'redWine';
//let WHITEWINE_URL = 'whiteWine';
let user = localStorage.getItem('currentUser');

//Create new user account
function newUser() {
    let newUserAccount = `
    <section role='region' class='newAddUser'>
        <form role='form' class='newUser-form'>
            <fieldset name='newAddedUser'>
            <legend>New User</legend>
            <label for='js-new-first-name' class='newUserFirstName'>First Name</label>
            <input placeholder='Alice' type='text' name='js-new-first-name' id='js-new-first-name'>
            <label for='js-new-last-name' class='newUserLastName'>Last Name</label>
            <input placeholder='Red' type='text' name='js-new-last-name' id='js-new-last-name'>
            <label for='js-new-user-name' class='newUserName'>User Name</label>
            <input placeholder='username' type='text' name='js-new-user-name' id='js-new-user-name'>
            <label for='js-new-user-password' class='newUserPassword'>Password</label>
            <input placeholder='mysecretpassword' type='text' name='js-new-user-password' id='js-new-user-password'>
            <button role='button' type='submit' class='js-add-user'>Submit</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.login-form').hide();
    //display new accout registration form
    let outputElem = $('#new-registration');
        outputElem
            .prop('hidden', false)
            .html(newUserAccount);    
}

function getRedWine(updatedBottleInformation) {
    let authToken = localStorage.getItem('authToken');
    console.log(authToken);
    const settings = {
        'async': true,
        'crossDomain': true,
        'url': '/redWine',
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(data) {
            createRedWineListing(data)
            singleRedWineSearchWindow(data)
            editWineLabel(data)
            removeRedWine(data)
            if (updatedBottleInformation !== undefined){
                singleWineResult(updatedBottleInformation)
            } 
        }
    }
    $.ajax(settings);
}

function getWhiteWine() {
    let authToken = localStorage.getItem('authToken');
    const settings2 = {
        'async': true,
        'crossDomain': true,
        'url': '/whiteWine',
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(data) {
            createWhiteWineListing(data)
            singleWhiteWineSearchWindow(data)
        }
    }
    $.ajax(settings2);
}

//Add Red Wine 
function addNewRedWine(redBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings3 = {
        'async': true,
        'crossDomain': true,
        'url': '/redWine',
        'method': 'POST',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'dataType': 'json',
        'contentType': 'application/json',
        'data': JSON.stringify(redBottle),
        'success': function(redVino) {
            getRedWine(redVino)
        }
    }
    $.ajax(settings3);
}

//Edit Red Wine
function editCurrentRedWine(id, redBottle) {
    console.log(id);
    console.log(JSON.stringify(redBottle));
    let authToken = localStorage.getItem('authToken');
    const settings4 = {
        'async': true,
        'crossDomain': true,
        'url': '/redWine/' + id,
        'method': 'PUT',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'dataType': 'json',
        'contentType': 'application/json',
        'data': JSON.stringify({id, redBottle}),
        'success': function(modifiedRedVino) {
            console.log(modifiedRedVino);
            getRedWine(modifiedRedVino)
            
        }
    }
    $.ajax(settings4);
}

//Delete Red Wine
function deleteRedWine(id) {
    let authToken = localStorage.getItem('authToken');
    const settings5 = {
        'async': true,
        'crossDomain': true,
        'url': '/redWine/' + id,
        'method': 'DELETE',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(redVino) {
            getRedWine(redVino)
        }
    }
    $.ajax(settings5);
}


//Search by querying wine label.  
//Search by red or white wine by clicking on the wine bottle image. 
function wineQuery() {
    let wineSearch = `
    <section role='region' class='wineLabelRedWhite'>
        <form role='form' class='wineBrand-form'>
            <fieldset name='wineLabel'>
            <legend>Wine Label Search</legend>
            <label for='js-wine-label' class='winery'>Wine Label</label>
            <select name='js-wine-label' id='js-wine-label'>
                <option value="BF">Baileyana Firepeak</option>
                <option value="CMC">Christian Moreau Chablis</option>
                <option value="DTBB">Dr. Thanisch Bernkasteler Badstube</option>
                <option value="GADB">Gaja Alteni Di Brassica</option>
                <option value="HOT">Holm Oak Tasmania</option>
                <option value="LCP">Layer Cake Primitivo</option>
                <option value="PB">Penfolds Bin 2</option>
                <option value="TENGR">Tarapaca Etiqueta Negra Gran Reserva</option>
            </select>
            <button role='button' type='submit' class='js-label-search'>Submit</button>
            <button role='button' type='button' class='js-label-add-wines'>Add New Bottle</button>
            </fieldset>
        </form>
    </section>
    <section role='region' class='newWineInputArea' aria-live='assertive' hidden></section>
    <section role='region' class='wineRedWhiteImages'>
        <img src='http://www.leclos.net/wp-content/uploads/850761.png' class='red' alt='Lafite'>
        <img src='http://www.jpost.com/HttpHandlers/ShowImage.ashx?id=327394' class='white' alt='Jadot Lous'>
    </section>
    `;
    $('.login-form').hide();
    $('.newUser-form').hide();
    //display brand, red wine, or white wine search page
    let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
            
}

//<label for='js-wine-color' class='newWineColor'>Wine Color</label>
//<select name='js-wine-color id='js-wine-color'>
    //<option value='Red'>Red</option>
    //<option value='White'>White</option>


//Add New Wine
function addWine() {
    let newWine = `
    <section role='region' class='addBottle'>
        <form role='form' class='newBottle-form'>
            <fieldset name='addNewWineListing'>
                <legend>Add New Wine Bottle</legend>
                <label for='js-wine-brand' class='newWineBrand'>Wine Brand</label>
                <input placeholder='Shafer' type='text' name='js-wine-brand' id='js-wine-brand'>
                <label for='js-wine-name' class='newWineName'>Wine Name</label>
                <input placeholder='Hillside Select' type='text' name='js-wine-name' id='js-wine-name'>
                <label for='js-wine-color' class='newWineColor'>Wine Color</label>
                <input placeholder='red' type='text' name='js-wine-color' id='js-wine-color'>
                <label for='js-wine-type' class='newWineType'>Wine Type</label>
                <input placeholder='Cabernet Sauvignon' type='text' name='js-wine-type' id='js-wine-type'>
                <label for='js-wine-rating' class='newWineRating'>Rating</label>
                <input placeholder= 4.8 type='number' step='any' name='js-wine-rating' id='js-wine-rating'>
                <label for='js-wine-averagePrice' class='newWineAveragePrice'>Average Price</label>
                <input placeholder= 30.99 type='number' step='any' name='js-wine-averagePrice' id='js-wine-averagePrice'>
                <label for='js-wine-region' class='newWineRegion'>Region</label>
                <input placeholder='Napa Valley' type='text' name='js-wine-region' id='js-wine-region'>
                <label for='js-wine-country' class='newWineCoutry'>Country of Origin</label>
                <input placeholder='USA' type='text' name='js-wine-country' id='js-wine-country'>
                <label for='js-wine-year' class='newWineYear'>Year</label>
                <input placeholder= 2013 type='number' name='js-wine-year' id='js-wine-year'>
                <label for='js-wine-food' class='newWineFood'>Food Pairing</label>
                <input placeholder='Beef' type='text' name='js-wine-food' id='js-wine-food'>
                <label for='js-wine-image' class='newWineImage'>Wine Image URL</label>
                <input placeholder='www.wineimage...' type='text' name='js-wine-image' id='js-wine-image'>
                <label for='js-wine-history' class='newWineHistory'>History</label>
                <input placeholder='The 2013 Hillside Select is...' type='text' name='js-wine-history' id='js-wine-history'>
                <label for='js-wine-information' class='newWineInformation'>More Information URL</label>
                <input placeholder='www.shafervine...' type='text' name='js-wine-information' id='js-wine-information'>
                <button role='button' type='submit' class='js-add-bottle'>Submit</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.wineRedWhiteImages').hide();
    let outputElem = $('#wineDetails');
    outputElem
        .prop('hidden', false)
        .html(newWine);
}

//Edit Wine Label Information
function editWine(currentWine) {
    console.log(currentWine);
    let editBottleLabel = `
    <section role='region' class='editBottle'>
        <form role='form' class='editBottle-form'>
            <fieldset name='editWineInformation'>
                <legend>Edit Wine Label</legend>
                <label for='js-edit-wine-brand' class='editWineBrand'>Wine Brand</label>
                <input placeholder='Shafer' type='text' name='js-edit-wine-brand' id='js-edit-wine-brand'>
                <label for='js-edit-wine-name' class='editWineName'>Wine Name</label>
                <input placeholder='Hillside Select' type='text' name='js-edit-wine-name' id='js-edit-wine-name'>
                <label for='js-edit-wine-rating' class='editWineRating'>Rating</label>
                <input placeholder= 4.8 type='number' step='any' name='js-edit-wine-rating' id='js-edit-wine-rating'>
                <label for='js-edit-wine-averagePrice' class='editWineAveragePrice'>Average Price</label>
                <input placeholder= 30.99 type='number' step='any' name='js-edit-wine-averagePrice' id='js-edit-wine-averagePrice'>
                <label for='js-edit-wine-food' class='editWineFood'>Food Pairing</label>
                <input placeholder='Beef' type='text' name='js-edit-wine-food' id='js-edit-wine-food'>
                <button role='button' type='submit' class='js-update-bottle'>Update</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.wineResults').hide();
    let outputElem = $('#editWineDetails');
    outputElem
        .prop('hidden', false)
        .html(editBottleLabel);
        submitEditRedLabel();
}

//Display wine list from search results
function wineCollectionListing() {
    let searchResultsList = `
    <section role='region' class='wineResults'>
        <ul id='labelInformation'></ul>
    </section>
    `;
    $('.wineLabelRedWhite').hide();
    $('.wineRedWhiteImages').hide();
    $('.addBottle').hide();
    let outputElem = $('#wineList');
        outputElem
            .prop('hidden', false)
            .html(searchResultsList);
            
}

//Display single wine information
function singleWineResult(currentWine) {
    console.log(currentWine);
    let singleWine = `
    <section role='region' class='oneWine'>
        <img src='${currentWine.image}' class='singleRedWineImage' alt='wine-bottle'>
        <ul id='singleLabel'></ul>
    </section>
    <section role='region' class='history-winerylink'>
    ${currentWine.history}
    <a href='${currentWine.information}'>More information</a>
    </section>
    `;
    let li = document.createElement('li');
    li.innerHTML = `
        Wine Label: ${currentWine.wineLabelDetails} <br />
        Type: ${currentWine.type} <br />
        Rating: ${currentWine.rating} <br /> 
        Price: ${currentWine.averagePrice} <br />
        Region: ${currentWine.wineOrigin} <br />
        Year: ${currentWine.year} <br />
    `;
    $('.wineResults').hide();
    $('.addBottle').hide();
    $('.wineLabelRedWhite').hide();
    $('.editBottle-form').hide();
    let outputElem = $('#wineDetails');
        outputElem
            .prop('hidden', false)
            .html(singleWine);
    $('#singleLabel').append(li);
}

//Red Wine Listing
function createRedWineListing(data) {
    for (index in data.redWine) {
    let li = document.createElement('li');
    li.classList.add('vino');
    li.innerHTML = `
    Wine Label: ${data.redWine[index].wineLabelDetails} <br /> 
    Type: ${data.redWine[index].type} <br /> 
    Rating: ${data.redWine[index].rating} <br />
    Price: ${data.redWine[index].averagePrice} <br />  
    Region: ${data.redWine[index].wineOrigin} <br /> 
    Year: ${data.redWine[index].year} <br />    
    <img src='${data.redWine[index].image}' class='redWine' data-index='${index}' alt='wine-bottle'>
    <button role='button' value='${data.redWine[index].id}' type='button' class='js-edit-wine-info'>Edit</button>
    <button role='button' value='${data.redWine[index].id}' type='button' class='js-delete-wine'>Delete</button>
    `;
    console.log($(data.redWine[index].id));
    $('#labelInformation').append(li);
    }
}

//White Wine Listing
function createWhiteWineListing(data) {
    for (index in data.whiteWine) {
    let li = document.createElement('li');
    li.classList.add('vino');
    li.innerHTML = `
    Wine Label: ${data.whiteWine[index].wineLabelDetails} <br /> 
    Type: ${data.whiteWine[index].type} <br /> 
    Rating: ${data.whiteWine[index].rating} <br />
    Price: ${data.whiteWine[index].averagePrice} <br />  
    Region: ${data.whiteWine[index].wineOrigin} <br /> 
    Year: ${data.whiteWine[index].year} <br />    
    <img src='${data.whiteWine[index].image}' class='whiteWine' data-index='${index}' alt='wine-bottle'>
    <button role='button' type='button' class='js-edit-wine-info'>Edit</button>
    <button role='button' type='button' class='js-delete-wine'>Delete</button>
    `;
    $('#labelInformation').append(li);
    }
}

function startSearchWindow() {
    $('.login-form').submit(event => {
        event.preventDefault();
        let username = $('#js-user-name').val();
        let password = $('#js-user-password').val();
        let userInformation = {username, password};
        const loginPass = {
            'url': '/api/auth/login',
            'type': 'POST',
            'contentType': 'application/json',
            'data': JSON.stringify(userInformation),
            'success': function(data) {
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('currentUser', username);
                user = username;
                console.log(data);
                wineQuery(data);
            },
            error: function(err) {
                console.log(err);
            }
        };
        $.ajax(loginPass);
    });
}

//Register New User
function registerNewUser() {
    $('#register-new-user').click(function() {
        newUser();
    });
}

//Add New User
function addNewUser() {
    $('#new-registration').submit('.js-add-user', event => {
        event.preventDefault();
        let firstName = $('#js-new-first-name').val();
        let lastName = $('#js-new-last-name').val();
        let username = $('#js-new-user-name').val();
        let password = $('#js-new-user-password').val();
        let userInformation = {firstName, lastName, username, password};
        console.log(JSON.stringify(userInformation));
        const registerUser = {
            'url': '/api/users/',
            'type': 'POST',
            'contentType': 'application/json',
            'data': JSON.stringify(userInformation),
            'success': function(data) {
                //$("#new-registration input[type='text']").val('');
                wineQuery();
            },
            'error': function(err) {
                if (password.length < 10) {
                    $('#new-registration').html("Password must be a minimum of 10 characters")
                }
            }
        };
        $.ajax(registerUser);
    });
}

function addNewWineBottle() {
    $('#red-white').on('click', '.js-label-add-wines', event => {
        event.preventDefault();
        addWine();
    });
}

function addRedWine() {
    $('#wineDetails').submit('.js-add-bottle', event => {
        event.preventDefault();
        var wineData = {
            brand: $(event.target).find('#js-wine-brand').val(),
            wineName: $(event.target).find('#js-wine-name').val(),
            color: $(event.target).find('#js-wine-color').val(),
            type: $(event.target).find('#js-wine-type').val(),
            rating: $(event.target).find('#js-wine-rating').val(),
            averagePrice: $(event.target).find('#js-wine-averagePrice').val(),
            region: $(event.target).find('#js-wine-region').val(),
            country: $(event.target).find('#js-wine-country').val(),
            year: $(event.target).find('#js-wine-year').val(),
            foodSuggestion: $(event.target).find('#js-wine-food').val(),
            image: $(event.target).find('#js-wine-image').val(),
            history: $(event.target).find('#js-wine-history').val(),
            moreInformation: $(event.target).find('#js-wine-information').val(),
        };
        console.log(wineData);
        $("#wineDetails input[type='text']").val('');
        addNewRedWine(wineData);
        singleWineResult(wineData);
    });
}

//Red Wine Search Window
function redWineSearchWindow() {
    $('body').on('click', '.red', event=> {
        event.preventDefault();
        getRedWine();
        wineCollectionListing();
        //getAndDisplayRedWineResults();
    })
}

//White Wine Search Window
function whiteWineSearchWindow() {
    $('body').on('click', '.white', event=> {
        event.preventDefault();
        getWhiteWine();
        wineCollectionListing();
        //getAndDisplayWhiteWineResults();
    })
}

//Button to edit Red Wine
function editWineLabel(data) {
    console.log(data);
    $('.js-edit-wine-info').on('click', event => {
        let currentWine = $('.js-edit-wine-info').val();
        event.preventDefault();
        editWine(currentWine);
    })    
}

//Button to delete single Red Wine bottle entry
function removeRedWine(data) {
    $('.js-delete-wine').on('click', event => {
        let currentID = $('.js-delete-wine').val();
        console.log(currentID);
        event.preventDefault();
        deleteRedWine(currentID);
        createRedWineListing(data);
    })
} 

//Edit Red Wine brand, name, price
function submitEditRedLabel() {
    $('.editBottle-form').submit('.js-update-bottle', event => {
        event.preventDefault();
        let current_id = $('.js-edit-wine-info').val();
        var wineData = {
            brand: $(event.target).find('#js-edit-wine-brand').val(),
            wineName: $(event.target).find('#js-edit-wine-name').val(),
            rating: $(event.target).find('#js-edit-wine-rating').val(),
            averagePrice: $(event.target).find('#js-edit-wine-averagePrice').val(),
            foodSuggestion: $(event.target).find('#js-edit-wine-food').val()
        };
        console.log(wineData);
        editCurrentRedWine(current_id, wineData);
    });
}

//Single Red Wine Search Window
function singleRedWineSearchWindow(data) {
    $('body').on('click', '.redWine', event=> {
        let profileWineName = $(event.target).data('index');
        let currentWine = data.redWine[profileWineName]
        event.preventDefault();
        singleWineResult(currentWine);
    })
}

//Single White Wine Search Window
function singleWhiteWineSearchWindow(data) {
    $('body').on('click', '.whiteWine', event=> {
        let profileWineName = $(event.target).data('index');
        let currentWine = data.whiteWine[profileWineName]
        event.preventDefault();
        singleWineResult(currentWine);
    })
}

function handleCreateApp() {
    startSearchWindow();
    registerNewUser();
    addNewUser();
    addNewWineBottle();
    addRedWine(); 
    //editWineLabel();
    //removeRedWine();
    redWineSearchWindow();
    whiteWineSearchWindow();
}

$(handleCreateApp);


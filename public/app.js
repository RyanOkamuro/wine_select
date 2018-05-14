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
            <label for='js-new-user-password' class='newUserPassword'>Password <span id='reenterPass'></span></label>
            <input placeholder='mysecretpassword' type='text' name='js-new-user-password' id='js-new-user-password'>
            <button role='button' type='submit' class='js-add-user'>Submit</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.login-form').hide();
    $('.heading').hide();
    $('.footer').hide();
    //display new accout registration form
    let outputElem = $('#new-registration');
        outputElem
            .prop('hidden', false)
            .html(newUserAccount);    
}

//Get Red Wine JSON 
function getRedWine() {
    let authToken = localStorage.getItem('authToken');
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
            redWineQuery(data)
            searchRedWine(data)
            createRedWineListing(data)
            singleRedWineSearchWindow(data)
            editWineLabel()
            submitEditLabel(data)
            removeWine(data)
        }
    }
    $.ajax(settings);
}

//Get White Wine JSON
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
            whiteWineQuery(data)
            searchWhiteWine(data)
            createWhiteWineListing(data)
            singleWhiteWineSearchWindow(data)
            editWineLabel()
            submitEditLabel(data)
            removeWine(data)
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

//Add White Wine 
function addNewWhiteWine(whiteBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings4 = {
        'async': true,
        'crossDomain': true,
        'url': '/whiteWine',
        'method': 'POST',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'dataType': 'json',
        'contentType': 'application/json',
        'data': JSON.stringify(whiteBottle),
        'success': function(whiteVino) {
            getWhiteWine(whiteVino)
        }
    }
    $.ajax(settings4);
}

//Edit Red Wine
function editCurrentRedWine(id, redBottle) {
    console.log(id);
    console.log(JSON.stringify(redBottle));
    let authToken = localStorage.getItem('authToken');
    const settings5 = {
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
            getRedWine(modifiedRedVino);
            wineCollectionListing();
        }
    }
    $.ajax(settings5);
}

//Edit White Wine
function editCurrentWhiteWine(id, whiteBottle) {
    console.log(id);
    console.log(JSON.stringify(whiteBottle));
    let authToken = localStorage.getItem('authToken');
    const settings6 = {
        'async': true,
        'crossDomain': true,
        'url': '/whiteWine/' + id,
        'method': 'PUT',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'dataType': 'json',
        'contentType': 'application/json',
        'data': JSON.stringify({id, whiteBottle}),
        'success': function(modifiedWhiteVino) {
            getWhiteWine(modifiedWhiteVino);
            wineCollectionListing();
        }
    }
    $.ajax(settings6);
}

//Delete Red Wine
function deleteRedWine(id) {
    let authToken = localStorage.getItem('authToken');
    const settings7 = {
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
    $.ajax(settings7);
}

//Delete White Wine
function deleteWhiteWine(id) {
    let authToken = localStorage.getItem('authToken');
    const settings8 = {
        'async': true,
        'crossDomain': true,
        'url': '/whiteWine/' + id,
        'method': 'DELETE',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(whiteVino) {
            getWhiteWine(whiteVino)
        }
    }
    $.ajax(settings8);
}

//Search by querying wine label.  
//Search by red or white wine by clicking on the wine bottle image. 
function wineQuery() {
    let wineSearch = `
    <section role='region' class='wineLabelRedWhite'>
        <h3>Search for Red or White Wine</h3>
        <h4>Click on the red/white bottle for full wine listing or search from the drop down wine menu</h4>
        <div class='row'>
            <div class='col-6'>
                <form role='form' class='redWineBrand-form'>
                    <fieldset name='redWineLabel'>
                    <legend>Red Wine</legend>
                    <img src='http://www.leclos.net/wp-content/uploads/850761.png' class='red' alt='Lafite'>
                    <label for='js-red-wine-label' class='winery'>Collection</label>
                    <select name='js-red-wine-label' id='js-red-wine-label'>
                    </select>
                    <button role='button' type='button' class='js-red-label-search'>Search</button>
                    <button role='button' type='button' class='js-label-add-wines'>Add New Bottle</button>
                    </fieldset>
                </form>
            </div>
            <div class='col-6'>
                <form role='form' class='whiteWineBrand-form'>
                    <fieldset name='whiteWineLabel'>
                    <legend>White Wine</legend>
                    <img src='http://www.jpost.com/HttpHandlers/ShowImage.ashx?id=327394' class='white' alt='Jadot Lous'>
                    <label for='js-white-wine-label' class='winery'>Collection</label>
                    <select name='js-white-wine-label' id='js-white-wine-label'>
                    </select>
                    <button role='button' type='button' class='js-white-label-search'>Search</button>
                    <button role='button' type='button' class='js-label-add-wines'>Add New Bottle</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </section>
    <section role='region' class='newWineInputArea' aria-live='assertive' hidden></section>
    `;
    $('.login-form').hide();
    $('.heading').hide();
    $('.footer').hide();
    $('.newUser-form').hide();
    $('#login-landing').hide();
    //display brand, red wine, or white wine search page
    let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
}

function redWineQuery(redLabel) {
    for (index in redLabel.redWine) {
        let valueID = redLabel.redWine[index].id;
        let wineBottleLabel = redLabel.redWine[index].wineLabelDetails;
        $('#js-red-wine-label').append($('<option>', {
            value: valueID,
            text: wineBottleLabel
        }));
    }
}

function whiteWineQuery(whiteLabel) {
    for (index in whiteLabel.whiteWine) {
        let valueID = whiteLabel.whiteWine[index].id;
        let wineBottleLabel = whiteLabel.whiteWine[index].wineLabelDetails;
        $('#js-white-wine-label').append($('<option>', {
            value: valueID,
            text: wineBottleLabel
        }));
    }
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
                    <select name='js-wine-color' id='js-wine-color'>
                        <option value='Red'selected>Red</option>
                        <option value='White'>White</option>
                    </select>
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
                <textarea placeholder='The 2013 Hillside Select is...' rows="6" cols="65" id='js-wine-history'></textarea>
                <label for='js-wine-information' class='newWineInformation'>More Information URL</label>
                <input placeholder='www.shafervine...' type='text' name='js-wine-information' id='js-wine-information'>
                <button role='button' type='submit' class='js-add-bottle'>Submit</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.wineLabelRedWhite').hide();
    let outputElem = $('#wineDetails');
    outputElem
        .prop('hidden', false)
        .html(newWine);
}

//Edit Wine Label Information
function editWine(currentWine, color) {
    console.log(currentWine, color);
    let editBottleLabel = `
    <section role='region' class='editBottle'>
        <form role='form' class='editBottle-form'>
            <fieldset name='editWineInformation'>
                <legend>Edit Wine Rating and Average Price</legend>
                <label for='js-edit-wine-rating' class='editWineRating'>Rating</label>
                <input placeholder= 4.8 type='number' step='any' name='js-edit-wine-rating' id='js-edit-wine-rating'>
                <label for='js-edit-wine-averagePrice' class='editWineAveragePrice'>Average Price</label>
                <input placeholder= 30.99 type='number' step='any' name='js-edit-wine-averagePrice' id='js-edit-wine-averagePrice'>
                <input type='hidden' id='js-editWineColor' value='${color}'>
                <button role='button' type='submit' value='${currentWine}' class='js-update-bottle'>Update</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.wineResults').hide();
    $('.wineListing').hide();
    let outputElem = $('#editWineDetails');
    outputElem
        .prop('hidden', false)
        .html(editBottleLabel);
        submitEditLabel();
        //submitEditWhiteLabel();
}

//Display wine list from search results
function wineCollectionListing() {
    let searchResultsList = `
    <section role='region' class='wineListing'>
        <h5>Wine Collection</h5>
        <h6>Click on the wine bottle for more details or click edit/delete to make changes to the wine bottle.</h6>
    </header>
    <section role='region' class='wineResults'>
    
    </section>
    `;
    $('#red-white').hide();
    $('.wineLabelRedWhite').hide();
    $('.addBottle').hide();
    $('.editBottle').hide();
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
        <img src='${currentWine.image}' class='singleWineImage' alt='wine-bottle'>
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
        Price: $${currentWine.averagePrice} <br />
        Region: ${currentWine.wineOrigin} <br />
        Year: ${currentWine.year} <br />
        Food Suggestion: ${currentWine.foodSuggestion} <br />
    `;
    $('#red-white').hide();
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
    let ul = document.createElement('ul');
    ul.classList.add('labelInformation');
    for (index in data.redWine) {
        let li = document.createElement('li');
        li.classList.add('vino');
        li.innerHTML = `
        Wine Label: ${data.redWine[index].wineLabelDetails} <br /> 
        Type: ${data.redWine[index].type} <br /> 
        Rating: ${data.redWine[index].rating} <br />
        Price: $${data.redWine[index].averagePrice} <br />  
        Region: ${data.redWine[index].wineOrigin} <br /> 
        Year: ${data.redWine[index].year} <br />    
        <img src='${data.redWine[index].image}' class='redWine' data-index='${index}' alt='wine-bottle'>
        <button role='button' value='${data.redWine[index].id}' type='button' class='js-edit-wine-info'>Edit</button>
        <button role='button' value='${data.redWine[index].id}' type='button' class='js-delete-wine'>Delete</button>
        `;
        ul.append(li);
    }
    $('.wineResults').html(ul)
}

//White Wine Listing
function createWhiteWineListing(data) {
    let ul = document.createElement('ul');
    ul.classList.add('labelInformation');
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
        <button role='button' type='button' value='${data.whiteWine[index].id}' class='js-edit-wine-info'>Edit</button>
        <button role='button' type='button' value='${data.whiteWine[index].id}' class='js-delete-wine'>Delete</button>
        `;
        ul.append(li);
    }
    $('.wineResults').html(ul)
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
                if (data.login) {
                    var html = document.getElementsByTagName('html')[0];
                    var body = document.getElementsByTagName('body')[0];
                    console.log(body);
                    html.style.backgroundImage = 'none';
                    body.style.backgroundImage = 'none';
                }
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('currentUser', username);
                user = username;
                getRedWine();
                getWhiteWine();
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
                wineQuery();
            },
            'error': function(err) {
                if (password.length < 10) {
                    $('#reenterPass').html('Password must be a minimum of 10 characters')
                }
            }
        };
        $.ajax(registerUser);
    });
}

function searchRedWine(redBottles) {
    $('#red-white').on('click', '.js-red-label-search', event => {
        event.preventDefault();
        let singleRedWineID = $('#js-red-wine-label').val();
        for (index in redBottles.redWine) {
            let value_ID = redBottles.redWine[index].id;
            console.log(value_ID);
            if (singleRedWineID === value_ID) {
                singleWineResult(redBottles.redWine[index]);
            } 
        };
    });
}

function searchWhiteWine(whiteBottles){
    $('#red-white').on('click', '.js-white-label-search', event => {
        event.preventDefault();
        let singleWhiteWineID = $('#js-white-wine-label').val();
        for (index in whiteBottles.whiteWine) {
            let value_ID = whiteBottles.whiteWine[index].id;
            if (singleWhiteWineID === value_ID) {
                singleWineResult(whiteBottles.whiteWine[index]);
            }
        }
    });
}

function addNewWineBottle() {
    $('#red-white').on('click', '.js-label-add-wines', function(event) {
        event.preventDefault();
        addWine();
    });
}

function submitNewWine() {
    $('#wineDetails').submit('.js-add-bottle', event => {
        event.preventDefault();
        let wineData = {
            brand: $(event.target).find('#js-wine-brand').val(),
            wineName: $(event.target).find('#js-wine-name').val(),
            color: $('#js-wine-color').val(),
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
        let brand = $(event.target).find('#js-wine-brand').val();
        let wineName = $(event.target).find('#js-wine-name').val();
        let region = $(event.target).find('#js-wine-region').val();
        let country = $(event.target).find('#js-wine-country').val();
        let singleWine = {
            wineLabelDetails: `${brand} ${wineName}`.trim(),
            color: $('#js-wine-color').val(),
            type: $(event.target).find('#js-wine-type').val(),
            rating: $(event.target).find('#js-wine-rating').val(),
            averagePrice: $(event.target).find('#js-wine-averagePrice').val(),
            wineOrigin: `${region}, ${country}`.trim(),
            year: $(event.target).find('#js-wine-year').val(),
            foodSuggestion: $(event.target).find('#js-wine-food').val(),
            image: $(event.target).find('#js-wine-image').val(),
            history: $(event.target).find('#js-wine-history').val(),
            moreInformation: $(event.target).find('#js-wine-information').val(),
        }
        if ($('#js-wine-color').val() === 'Red') {
            addNewRedWine(wineData);
            singleWineResult(singleWine);
        } else {
            addNewWhiteWine(wineData);
            singleWineResult(singleWine);
        }
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

//Button to edit Red/White Wine
function editWineLabel() {
    $('.js-edit-wine-info').on('click', function(event) {
        let currentWine = $(this).val();
        let color = $(this).siblings('img').attr('class');
        console.log(currentWine);
        event.preventDefault();
        getRedWine();
        getWhiteWine();
        editWine(currentWine, color);
    })    
}

//Button to delete single Red Wine bottle entry
function removeWine(data) {
    console.log(data);
    $('.js-delete-wine').on('click', function(event) {
        let currentID = $(this).val();
        let color = $(this).siblings('img').attr('class');
        console.log(currentID);
        console.log(color);
        event.preventDefault();
        if (color === 'redWine') {
            deleteRedWine(currentID);
            createRedWineListing(data);
        } else {
            deleteWhiteWine(currentID);
            createWhiteWineListing(data);
        }
    })
} 

//Submit edited wine information
function submitEditLabel(wine) {
    $('.editBottle-form').submit('.js-update-bottle', event => {
        event.preventDefault();
        let current_id = $('.js-update-bottle').val();
        console.log(current_id);
        let wineData = {
            rating: $(event.target).find('#js-edit-wine-rating').val(),
            averagePrice: $(event.target).find('#js-edit-wine-averagePrice').val(),
        };
        if ($(event.target).find('#js-editWineColor').val() === 'redWine') {
            editCurrentRedWine(current_id, wineData)
        } else {
            editCurrentWhiteWine(current_id, wineData)
        }
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
    submitNewWine(); 
    redWineSearchWindow();
    whiteWineSearchWindow();
}

$(handleCreateApp);


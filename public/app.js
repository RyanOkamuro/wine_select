let user = localStorage.getItem('currentUser');
let currentWine;
let color;
let currentWineID;

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
            editWineLabel()
            removeWine(data)
        }
    }
    $.ajax(settings);
}

//Get Red Wine by ID
function getRedWineByID(id, color) {
    let authToken = localStorage.getItem('authToken');
    const settings2 = {
        'async': true,
        'crossDomain': true,
        'url': '/redWine/' + id,
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(currentID) {
            if(color === 'redWine') {
                editWine(currentID);
                routie('edit-red-wines');
            } else {
                singleWineResult(currentID);
                routie('red-bottle-details');
            }
        }
    }
    $.ajax(settings2);
}

//Get White Wine JSON
function getWhiteWine() {
    let authToken = localStorage.getItem('authToken');
    const settings3 = {
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
            editWineLabel()
            removeWine(data)
        }
    }
    $.ajax(settings3);
}

//Get White Wine by ID
function getWhiteWineByID(id, color) {
    let authToken = localStorage.getItem('authToken');
    const settings4 = {
        'async': true,
        'crossDomain': true,
        'url': '/whiteWine/' + id,
        'method': 'GET',
        'headers': {
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
        },
        'success': function(currentID) {
            if(color === 'whiteWine') {
                editWine(currentID);
                routie('edit-white-wines');
            } else {
                singleWineResult(currentID);
                routie('white-bottle-details');
            }
        }
    }
    $.ajax(settings4);
}

//Add Red Wine 
function addNewRedWine(redBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings5 = {
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
            currentWineID = redVino.id;
            singleWineResult(redVino)
            routie('red-bottle-details')
        }
    }
    $.ajax(settings5);
}

//Add White Wine 
function addNewWhiteWine(whiteBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings6 = {
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
            currentWineID = whiteVino.id;
            singleWineResult(whiteVino)
            routie('white-bottle-details')
        }
    }
    $.ajax(settings6);
}

//Update Red Wine
function editCurrentRedWine(id, redBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings7 = {
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
            routie('red-wines');
        }
    }
    $.ajax(settings7);
}

//Update White Wine
function editCurrentWhiteWine(id, whiteBottle) {
    let authToken = localStorage.getItem('authToken');
    const settings8 = {
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
            routie('white-wines');
        }
    }
    $.ajax(settings8);
}

//Delete Red Wine
function deleteRedWine(id) {
    let authToken = localStorage.getItem('authToken');
    const settings9 = {
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
    $.ajax(settings9);
}

//Delete White Wine
function deleteWhiteWine(id) {
    let authToken = localStorage.getItem('authToken');
    const settings10 = {
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
    $.ajax(settings10);
}

//Create new user account
function newUser() {
    let newUserAccount = `
    <section role='region' class='newAddUser'>
        <form role='form' class='newUser-form'>
            <fieldset name='newAddedUser'>
            <legend>New User</legend>
            <label for='js-new-first-name' class='newUserFirstName'>First Name</label>
            <input placeholder='Ryan' type='text' name='js-new-first-name' id='js-new-first-name'>
            <label for='js-new-last-name' class='newUserLastName'>Last Name</label>
            <input placeholder='Okamuro' type='text' name='js-new-last-name' id='js-new-last-name'>
            <label for='js-new-user-name' class='newUserName'>Username</label>
            <input placeholder='username' type='text' name='js-new-user-name' id='js-new-user-name'>
            <label for='js-new-user-password' class='newUserPassword'>Password <br/><span id='reenterPass'></span></label>
            <input placeholder='password' type='text' name='js-new-user-password' id='js-new-user-password'>
            <button role='button' type='submit' class='js-add-user'>Submit</button>
            <button role='button' type='button' class='js-cancel-add-user'>Cancel</button>
            </fieldset>
        </form>
    </section>
    `;
    $('.login-form').hide();
    $('.perfectBottle').hide();
    $('.footer').hide();
    let outputElem = $('#new-registration');
        outputElem
            .prop('hidden', false)
            .html(newUserAccount);
    $('#new-registration').show();    
}

//Search by querying wine label.  
//Search by red or white wine by clicking on the wine bottle image. 
function wineQuery() {
    let wineSearch = `
    <section role='region' class='wineLabelRedWhite'>
        <h3>Click on a red/white bottle for full wine listing or search from the drop down wine menu</h3>
        <div class='row'>
            <div class='col-6'>
                <form role='form' class='redWineBrand-form'>
                    <fieldset name='redWineLabel'>
                    <legend>Red Wine</legend>
                    <img src='./images/Red_Wine_Images/Lafite.png' class='red' alt='Lafite'>
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
                    <img src='./images/White_Wine_Images/Jadot_Lous.png' class='white' alt='Jadot Lous'>
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
    $('.perfectBottle').hide();
    $('.footer').hide();
    $('#new-registration').hide();
    $('#wineDetails').hide();
    $('#wineList').hide();
    let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
    $('#red-white').show();      
}

//Red Wine Search
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

//White Wine Search
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

//Add New Wine
function addWine() {
    let newWine = `
    <section role='region' class='addBottle'>
        <form role='form' class='newBottle-form'>
            <fieldset name='addNewWineListing'>
                <legend>Add New Wine Bottle</legend>
                <label for='js-wine-brand' class='newWineBrand'>Wine Brand</label>
                <input placeholder='Shafer' type='text' name='js-wine-brand' id='js-wine-brand' required/>
                <label for='js-wine-name' class='newWineName'>Wine Name</label>
                <input placeholder='Hillside Select' type='text' name='js-wine-name' id='js-wine-name' required/>
                <label for='js-wine-color' class='newWineColor'>Wine Color</label>
                    <select name='js-wine-color' id='js-wine-color'>
                        <option value='Red'selected>Red</option>
                        <option value='White'>White</option>
                    </select>
                <label for='js-wine-type' class='newWineType'>Wine Type</label>
                <input placeholder='Cabernet Sauvignon' type='text' name='js-wine-type' id='js-wine-type' required/>
                <label for='js-wine-rating' class='newWineRating'>Rating</label>
                <input placeholder= 4 type='number' min='0' max='5' name='js-wine-rating' id='js-wine-rating' required/>
                <label for='js-wine-averagePrice' class='newWineAveragePrice'>Average Price</label>
                <input placeholder= 30.99 type='number' min='0' step='any' name='js-wine-averagePrice' id='js-wine-averagePrice' required/>
                <label for='js-wine-region' class='newWineRegion'>Region</label>
                <input placeholder='Napa Valley' type='text' name='js-wine-region' id='js-wine-region' required/>
                <label for='js-wine-country' class='newWineCoutry'>Country of Origin</label>
                <input placeholder='USA' type='text' name='js-wine-country' id='js-wine-country' required/>
                <label for='js-wine-year' class='newWineYear'>Year</label>
                <input placeholder= 2013 type='number' min='1800' max='2018' name='js-wine-year' id='js-wine-year' required/>
                <label for='js-wine-food' class='newWineFood'>Food Pairing</label>
                <input placeholder='Beef' type='text' name='js-wine-food' id='js-wine-food' required/>
                <label for='js-wine-image' class='newWineImage'>Wine Image URL</label>
                <input placeholder='www.wineimage...' type='text' name='js-wine-image' id='js-wine-image' required/>
                <label for='js-wine-history' class='newWineHistory'>History</label>
                <textarea placeholder='The 2013 Hillside Select is...' rows="6" cols="65" id='js-wine-history'></textarea>
                <label for='js-wine-information' class='newWineInformation'>More Information URL</label>
                <input placeholder='www.shafervine...' type='text' name='js-wine-information' id='js-wine-information' required/>
                <button role='button' type='submit' class='js-add-bottle'>Submit</button>
                <button role='button' type='button' class='js-cancel-add-bottle'>Cancel</button>
            </fieldset>
        </form>
    </section>
    `;
    $('#red-white').hide();
    let outputElem = $('#wineDetails');
    outputElem
        .prop('hidden', false)
        .html(newWine);
    $('#wineDetails').show();
}

//Edit Wine Label Information
function editWine(currentWine) {
    let editBottleLabel = `
    <section role='region' class='editBottle'>
        <form role='form' class='editBottle-form'>
            <fieldset name='editWineInformation'>
                <legend>Edit Wine Rating and Average Price</legend>
                <label for='js-edit-wine-rating' class='editWineRating'>Rating</label>
                <input placeholder= 4 type='number' min='0' max='5' name='js-edit-wine-rating' id='js-edit-wine-rating'>
                <label for='js-edit-wine-averagePrice' class='editWineAveragePrice'>Average Price</label>
                <input placeholder= 30.99 type='number' min='0' step='any' name='js-edit-wine-averagePrice' id='js-edit-wine-averagePrice'>
                <button role='button' type='submit' class='js-update-bottle'>Update</button>
                <button role='button' type='button' class='js-cancel-update-bottle'>Cancel</button>
            </fieldset>
        </form>
    </section>
    `;
    $('#wineList').hide();
    $('#wineDetails').hide();
    let outputElem = $('#editWineDetails');
    outputElem
        .prop('hidden', false)
        .html(editBottleLabel);
        submitEditLabel(currentWine);
        cancelEditLabel(currentWine);
    $('#editWineDetails').show();
}

//Display wine list from search results
function wineCollectionListing() {
    let searchResultsList = `
    <section role='region' class='wineListing'>
        <h4>Click on the wine bottle for more details or click edit to make changes to the rating/price.</h4>
    </section>
    <section role='region' class='wineResults'>
    </section>
    <section role='region' class='switchWineColorResults'>
        
    </section>
    `;
    $('#red-white').hide();
    $('#wineDetails').hide();
    $('#editWineDetails').hide();
    let outputElem = $('#wineList');
        outputElem
            .prop('hidden', false)
            .html(searchResultsList);
    $('#wineList').show();
}

//Display single wine information
function singleWineResult(currentWine) {
    let singleWine = `
    <section role='region' class='oneWine'>
        <img src='${currentWine.image}' class='singleWineImage' alt='wine-bottle'>
        <ul id='singleLabel'></ul>
    </section>
    <section role='region' class='history-winerylink'>
        ${currentWine.history}
        <a href='${currentWine.moreInformation}'>More information</a>
        <button role='button' type='button' class='js-back-wine-search'>Return to Wine Search</button>
    </section>
    `;
    let li = document.createElement('li');
    li.innerHTML = `
        Wine Label: ${currentWine.wineLabelDetails} <br />
        Type: ${currentWine.type} <br />
        Rating: ${currentWine.rating} <br />
        Number of Reviewers: ${currentWine.numRaters} <br />
        Price: $${currentWine.averagePrice} <br />
        Region: ${currentWine.wineOrigin} <br />
        Year: ${currentWine.year} <br />
        Food Suggestion: ${currentWine.foodSuggestion} <br />
    `;
    $('#wineList').hide();
    $('#red-white').hide();
    $('#editWineDetails').hide();
    let outputElem = $('#wineDetails');
        outputElem
            .prop('hidden', false)
            .html(singleWine);
    $('#singleLabel').append(li);
    $('#wineDetails').show();
}

//Red Wine Listing
function createRedWineListing(data) {
    let ul = document.createElement('ul');
    ul.classList.add('labelInformation');
    let switchButton;
    for (index in data.redWine) {
        let li = document.createElement('li');
        li.classList.add('vino');
        li.innerHTML = `
        Wine Label: ${data.redWine[index].wineLabelDetails} <br /> 
        Type: ${data.redWine[index].type} <br /> 
        Rating: ${data.redWine[index].rating} <br />
        Number of Reviewers: ${data.redWine[index].numRaters} <br />
        Price: $${data.redWine[index].averagePrice} <br />  
        Region: ${data.redWine[index].wineOrigin} <br /> 
        Year: ${data.redWine[index].year} <br />    
        <img src='${data.redWine[index].image}' class='redWine' data-index='${data.redWine[index].id}' alt='wine-bottle'>
        <button role='button' value='${data.redWine[index].id}' type='button' class='js-edit-wine-info'>Edit</button>
        <button role='button' value='${data.redWine[index].id}' type='button' class='js-delete-wine'>Delete</button>
        `;
        ul.append(li);
        switchButton = `<button role='button' value=${data.redWine[index].color} type='button' class='js-switch-bottle'>Switch Wine Color Bottle Results</button>`;
    }
    $('.wineResults').html(ul)
    $('.switchWineColorResults').html(switchButton);
}

//White Wine Listing
function createWhiteWineListing(data) {
    let ul = document.createElement('ul');
    ul.classList.add('labelInformation');
    let switchButton;
    for (index in data.whiteWine) {
        let li = document.createElement('li');
        li.classList.add('vino');
        li.innerHTML = `
        Wine Label: ${data.whiteWine[index].wineLabelDetails} <br /> 
        Type: ${data.whiteWine[index].type} <br /> 
        Rating: ${data.whiteWine[index].rating} <br />
        Number of Reviewers: ${data.whiteWine[index].numRaters} <br />
        Price: $${data.whiteWine[index].averagePrice} <br />  
        Region: ${data.whiteWine[index].wineOrigin} <br /> 
        Year: ${data.whiteWine[index].year} <br />    
        <img src='${data.whiteWine[index].image}' class='whiteWine' data-index='${data.whiteWine[index].id}' alt='wine-bottle'>
        <button role='button' type='button' value='${data.whiteWine[index].id}' class='js-edit-wine-info'>Edit</button>
        <button role='button' type='button' value='${data.whiteWine[index].id}' class='js-delete-wine'>Delete</button>
        `;
        ul.append(li);
        switchButton = `<button role='button' value='White' type='button' class='js-switch-bottle'>Switch Wine Color Bottle Results</button>`;
    }
    $('.wineResults').html(ul)
    $('.switchWineColorResults').html(switchButton);
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
                    html.style.backgroundImage = 'none';
                    body.style.backgroundImage = 'none';
                }
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('currentUser', username);
                user = username;
                routie('wine-select');
            },
            error: function(err) {
                if(err.status === 401) {
                    $('#wrongPass').html('Incorrect user name or password');
                }
            }
        };
        $.ajax(loginPass);
    });
}

//Register New User
function registerNewUser() {
    $('#register-new-user').click(function() {
        newUser();
        routie('new-user-signup')
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
        const registerUser = {
            'url': '/api/users/',
            'type': 'POST',
            'contentType': 'application/json',
            'data': JSON.stringify(userInformation),
            'success': function(data) {
                $('#new-registration').hide();
                let outputElem = $('#landing');
                    outputElem 
                        .prop('hidden', false)
                        $('.heading').show();
                        $('.login-form').show();
                        $('.footer').show();
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

//Cancel Add User
function cancelAddUser() {
    $('#new-registration').on('click','.js-cancel-add-user', event => {
        $('#new-registration').hide();
        let outputElem = $('#landing');
            outputElem 
                .prop('hidden', false)
                $('.heading').show();
                $('.login-form').show();
                $('.footer').show();
                routie('');
    })
}

//Search Red Wine Bottles
function searchRedWine(redBottles) {
    $('#red-white').on('click', '.js-red-label-search', event => {
        event.preventDefault();
        let singleRedWineID = $('#js-red-wine-label').val();
        for (index in redBottles.redWine) {
            let value = redBottles.redWine[index];
            let value_ID = redBottles.redWine[index].id;
            if (singleRedWineID === value_ID) {
                currentWineID = singleRedWineID;
                singleWineResult(value);
                routie('red-bottle-details');
            } 
        };
    });
}

//Search White Wine Bottles
function searchWhiteWine(whiteBottles){
    $('#red-white').on('click', '.js-white-label-search', event => {
        event.preventDefault();
        let singleWhiteWineID = $('#js-white-wine-label').val();
        for (index in whiteBottles.whiteWine) {
            let value_ID = whiteBottles.whiteWine[index].id;
            if (singleWhiteWineID === value_ID) {
                currentWineID = singleWhiteWineID;
                singleWineResult(whiteBottles.whiteWine[index]);
                routie('white-bottle-details')
            }
        }
    });
}

//Button to Move to New Wine Bottle Form
function addNewWineBottle() {
    $('#red-white').on('click', '.js-label-add-wines', function(event) {
        event.preventDefault();
        $('#wineList').prop('hidden'); 
        addWine();
        routie('add-new-bottle');
    });
}

//Submit New Wine Bottle
function submitNewWine() {
    $('#wineDetails').submit('.js-add-bottle', event => {
        event.preventDefault();
        let wineData = {
            brand: $(event.target).find('#js-wine-brand').val(),
            wineName: $(event.target).find('#js-wine-name').val(),
            color: $('#js-wine-color').val(),
            type: $(event.target).find('#js-wine-type').val(),
            rating: $(event.target).find('#js-wine-rating').val(),
            numRaters: 1,
            cumulativeRating: $(event.target).find('#js-wine-rating').val(),
            averagePrice: $(event.target).find('#js-wine-averagePrice').val(),
            region: $(event.target).find('#js-wine-region').val(),
            country: $(event.target).find('#js-wine-country').val(),
            year: $(event.target).find('#js-wine-year').val(),
            foodSuggestion: $(event.target).find('#js-wine-food').val(),
            image: $(event.target).find('#js-wine-image').val(),
            history: $(event.target).find('#js-wine-history').val(),
            moreInformation: $(event.target).find('#js-wine-information').val(),
        };
        if ($('#js-wine-color').val() === 'Red') {
            addNewRedWine(wineData);
        } else {
            addNewWhiteWine(wineData)
        }
    });
}

//Cancel Add Wine Information
function cancelAddNewWineBottle() {
    $('#wineDetails').on('click','.js-cancel-add-bottle', event => {
        $('#wineDetails').prop('hidden');
        $('#red-white').html(wineQuery());
        routie('wine-select');
    })
}

//Red Wine Search Window
function redWineSearchWindow() {
    $('body').on('click', '.red', event=> {
        event.preventDefault();
        getRedWine();
        wineCollectionListing();
        routie('red-wines');
    })
}

//White Wine Search Window
function whiteWineSearchWindow() {
    $('body').on('click', '.white', event=> {
        event.preventDefault();
        getWhiteWine();
        wineCollectionListing();
        routie('white-wines');
    })
}

//Button to Edit Red/White Wine
function editWineLabel() {
    $('.js-edit-wine-info').on('click', function(event) {
        currentWine = $(this).val();
        color = $(this).siblings('img').attr('class');
        event.preventDefault();
        if (color === 'redWine') {
            getRedWineByID(currentWine, color);
            routie('red-wines');
        } else {
            getWhiteWineByID(currentWine, color);
            routie('white-wines');
        }
    })    
}

//Button to Delete Single Wine Bottle
function removeWine(data) {
    $('.js-delete-wine').on('click', function(event) {
        let currentID = $(this).val();
        if(confirm('Click OK to confirm to delete')){
            let color = $(this).siblings('img').attr('class');
            event.preventDefault();
            if (color === 'redWine') {
                deleteRedWine(currentID);
                createRedWineListing(data);
            } else {
                deleteWhiteWine(currentID);
                createWhiteWineListing(data);
                }    
        } else {
            return
        }
    })
} 

//Submit Edited Wine Information
function submitEditLabel(currentWine) {
    $('.editBottle-form').submit('.js-update-bottle', event => {
        event.preventDefault();
        let id = currentWine.id
        let currentRating = $(event.target).find('#js-edit-wine-rating').val();
        let combinedRating = parseFloat(currentRating) + parseFloat(currentWine.cumulativeRating);
        let totalRaters;
        if (isNaN(combinedRating)) {
            totalRaters = parseFloat(currentWine.numRaters)
        } else {
            totalRaters = parseFloat(currentWine.numRaters) + 1;
        }
        let ratingEquation = combinedRating/totalRaters;
        let rating = Math.round(ratingEquation*10)/10;
        let wineData = {
            rating: rating,
            cumulativeRating: combinedRating,
            numRaters: totalRaters,
            averagePrice: $(event.target).find('#js-edit-wine-averagePrice').val()
        };
        if (currentWine.color === 'Red') {
            editCurrentRedWine(id, wineData)
        } else {
            editCurrentWhiteWine(id, wineData)
        }
    });
}

//Cancel Edit Wine Information
function cancelEditLabel(currentWine) {
    $('#editWineDetails').on('click','.js-cancel-update-bottle', event => {
        event.stopPropagation();
        if (!currentWine) {
            return;
        } 
        else if (currentWine.color === 'Red') {
            getRedWine();
            wineCollectionListing();
            routie('red-wines');
        } else {
            getWhiteWine();
            wineCollectionListing();
            routie('white-wines');
        }
        $('#editWineDetails').prop('hidden');
    })
}

//Single Red Wine Search Window
function singleRedWineSearchWindow() {
    $('body').on('click', '.redWine', event=> {
        currentWineID = $(event.target).data('index');
        event.preventDefault();
        getRedWineByID(currentWineID);
        routie('red-bottle-details')
    })
}

//Single White Wine Search Window
function singleWhiteWineSearchWindow() {
    $('body').on('click', '.whiteWine', event=> {
        currentWineID = $(event.target).data('index');
        event.preventDefault();
        getWhiteWineByID(currentWineID);
    })
}

//Switch wine bottle listing
function switchBottleColor(data) {
    $('#wineList').on('click', '.js-switch-bottle', event => {
        $('#wineList').prop('hidden');
        let bottleColor = $('.js-switch-bottle').val();
            if (bottleColor === 'Red') {
                getWhiteWine();
                routie('white-wines');
            } else if (bottleColor === 'White') {
                getRedWine();
                routie('red-wines');
            }
        })
};

//Re-start search
function returnSearchWindow() {
    $('#wineDetails').on('click','.js-back-wine-search', event=> {
        $('#wineDetails').prop('hidden');   
        $('#wineList').prop('hidden'); 
        $('#red-white').html(wineQuery());
        routie('wine-select');
    });
  }

function handleCreateApp() {
    startSearchWindow();
    registerNewUser();
    cancelAddUser();
    addNewUser();
    addNewWineBottle();
    cancelAddNewWineBottle();
    submitNewWine(); 
    redWineSearchWindow();
    whiteWineSearchWindow();
    cancelEditLabel();
    singleRedWineSearchWindow();
    singleWhiteWineSearchWindow();
    switchBottleColor();
    returnSearchWindow();
    routie('', function() {
        $('#new-registration').hide();
        let outputElem = $('#landing');
            outputElem 
                .prop('hidden', false)
                $('.heading').show();
                $('.login-form').show();
                $('.footer').show();
    });  
    routie('new-user-signup', function() {
        newUser();
    });  
    routie('wine-select', function() {
        getRedWine();
        getWhiteWine();
        wineQuery();
    });
    routie('add-new-bottle', function() {
        addWine();
    });
    routie('edit-red-wines', function() {
        getRedWineByID(currentWine, color);
    });
    routie('edit-white-wines', function() {
        getWhiteWineByID(currentWine, color);
    });
    routie('red-wines', function() {
        getRedWine();
        wineCollectionListing();
    });
    routie('white-wines', function() {
        getWhiteWine();
        wineCollectionListing();
    }); 
    routie('red-bottle-details', function() {
        getRedWineByID(currentWineID);
    });
    routie('white-bottle-details', function() {
        getWhiteWineByID(currentWineID);
    });
}

$(handleCreateApp);

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
        <img src='http://www.leclos.net/wp-content/uploads/850761.png' class='redAndwhite' alt='Lafite'>
        <img src='http://www.jpost.com/HttpHandlers/ShowImage.ashx?id=327394' class='redAndwhite' alt='Jadot Lous'>
    </section>
    `;
    $('.login-form').hide();
    let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
}


function wineCollection() {
    
}

function redWineSearchWindow() {
    $('.wineLabelRedWhite').on('click', event=> {
        event.preventDefault();
        wineCollection();
    })
}


function startSearchWindow() {
    $('.login-form').submit(event => {
        event.preventDefault();
        wineQuery();
    });
}

function handleCreateApp() {
    startSearchWindow();
}

$(handleCreateApp);
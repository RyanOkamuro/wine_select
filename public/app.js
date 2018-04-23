
function wineSearch() {
    let wineQuery = `
    <section role='region' class='redOrWhite'>
        <form role='form' class='brandSearch'>
            <fieldset name='brandQuery'>
            <legend>Search for Brand</legend>
            <label for='js-brand' class='wineBrand'>Brand Name</label>
            <input placeholder='Layer Cake' type='text' name='js-brand' id='js-brand' autofocus/>
            <button role="button" type="submit" class="js-submit-wine-search">Submit</button>
            </fieldset>
        </form>
    </section>
    `;
}





function startSearchPage() {
    $('.login-form').submit(event => {
        event.preventDefault();
        let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineQuery);
        getExchange();
        locateBanks();
        });
    }
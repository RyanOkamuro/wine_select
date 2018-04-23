
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
    </section>
    `;
}

function startSearchWindow() {
    $('.login-form').submit(event => {
        event.preventDefault();
        $('.login-form').hide();
        let outputElem = $('#red-white');
        outputElem
            .prop('hidden', false)
            .html(wineSearch);
    });
}
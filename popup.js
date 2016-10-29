(function() {
    "use strict";

    let config = {
        selector: 'td, td *',
    };

    chrome.fontSettings.getFontList(function(font) {

        for(let i=0; i < font.length; i++) {
            let $newOption = $('<option>');
            $('.font-list').append(
                $($newOption).val(font[i].fontId).html(font[i].displayName)
            )
        }
    });

    $('.font-list').on('input', function(event) {
        event.preventDefault();
        /* Act on the event */
        config.fontId = $(this).val();
        onChanged(config);
    });

    $('.font-size').on('input', function(event) {
        event.preventDefault();
        /* Act on the event */
        config.fontSize = $(this).val();
        onChanged(config);
    });

    var onChanged = function(config) {
        chrome.tabs.executeScript(null, {code: 'var config = ' + JSON.stringify(config)},
            () => {chrome.tabs.executeScript(null, {file: "script.js"})});
    };

})();

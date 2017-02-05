(function() {
    "use strict";

    let config = {};

    chrome.tabs.getSelected(null, function(tab) {
        var url = new URL(tab.url);
        var domain = url.hostname;
        console.log(domain);
        // config.domain will be updated at the next event.
        config.domain = domain;
    })

    config = {
        selector_github: 'td, td *',
        // selector_gitlab: 'code span.line > span',
        selector_gitlab: 'code span.line',
    };

    chrome.fontSettings.getFontList(function(font) {

        for (let i=0; i < font.length; i++) {
            let $newOption = $('<option>');
            $('.font-list').append(
                $($newOption).val(font[i].fontId).html(font[i].displayName)
            )
        }
    });
    
    $('.font-list').on('input', function(event) {
        event.preventDefault();
        config.fontId = $(this).val();
        onChanged(config);
    });

    $('.font-size').on('input', function(event) {
        event.preventDefault();
        config.fontSize = $(this).val();
        onChanged(config);
    });

    var onChanged = function(config) {
        chrome.tabs.executeScript(null,
            {code: 'var config = ' + JSON.stringify(config)},
            () => {chrome.tabs.executeScript(null,{file:"script.js"})});
    };

})();

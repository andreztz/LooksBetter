(function() {
    "use strict";

    let config = {
        selector_github: 'td, td *',
        selector_gitlab: 'code span.line',
        // selector_gitlab: 'code span.line > span',
    };

    let onChanged = function(config) {
        chrome.tabs.executeScript(null,
            {code: 'var config = ' + JSON.stringify(config)},
            () => {chrome.tabs.executeScript(null,{file:"script.js"})});
    };
   
    chrome.tabs.getSelected(null, function(tab) {
        let url = new URL(tab.url);
        let domain = url.hostname;
        // config.domain will be updated at the next event.
        config.domain = domain;
     
    });

    chrome.fontSettings.getFontList(function(font) {

        for (let i=0; i < font.length; i++) {
            let $newOption = $('<option>');
            $('.font-list').append(
                $($newOption).val(font[i].fontId).html(font[i].displayName)
            )
        }
    });

    chrome.storage.sync.get(['font', 'fontsize'], (data) => {
        if (! $.isEmptyObject(data)) {
            config.fontId = data.font;
            config.fontSize = data.fontsize;
         }
        console.log(config)
        onChanged(config); 
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
})();

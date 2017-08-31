"use strict";

var changeFont = function(config) {
    let elements = [];
    chrome.storage.sync.set({'font': config.fontId, 'fontsize': config.fontSize});

    if (config.domain === 'github.com') {
        elements = document.querySelectorAll(config.selector_github);
    }
    if (config.domain === 'gitlab.com') {
        elements = document.querySelectorAll(config.selector_gitlab);
    }

    elements.forEach(
        elem => {
            elem.style.fontFamily = config.fontId;
            elem.style.fontSize = config.fontSize + 'px';
        }
    );
    


};
changeFont(config);

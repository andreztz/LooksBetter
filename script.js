"use strict";

var changeFont = function(config) {
    if (config.domain == 'github') {
        var elements = document.querySelectorAll(config.selector_github);
    }
    if (config.domain == 'gitlab.com') {
        var elements = document.querySelectorAll(config.selector_gitlab);
        console.log(elements);
    }

    elements.forEach(
        elem => {
            elem.style.fontFamily = config.fontId;
            elem.style.fontSize = config.fontSize + 'px'
        });

};
changeFont(config);

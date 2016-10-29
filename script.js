"use strict";

var changeFont = function(config) {

    let elements = document.querySelectorAll(config.selector);

    elements.forEach(
        elem => {
            elem.style.fontFamily = config.fontId;
            elem.style.fontSize = config.fontSize + 'px'
        }
    );

};
changeFont(config);

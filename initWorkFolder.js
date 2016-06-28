'use strict';

const fs = require('fs');

fs.mkdir(exports.spriteSrc, function(resp) {
    if(resp) {
        console.log(resp);
    }
});

fs.mkdir(exports.compressSrc, function(resp) {
    if(resp) {
        console.log(resp);
    }
});
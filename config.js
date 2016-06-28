'use strict';

exports = module.exports = {
    spriteSrc: './images/', // 組縮圖+壓縮 檔案來源路徑
    spriteDest: './build/', // 組縮圖+壓縮 結果產生路徑
    compressSrc: './只做壓縮來源/', // 只做壓縮 檔案來源路徑
    compressDest: './只做壓縮結果/' // 只做壓縮 結果產生路徑
};

if(process.argv.indexOf('--init') !== -1) {
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
}
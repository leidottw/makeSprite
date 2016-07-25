'use strict';

exports = module.exports = {
    spriteSrc: './workarea/images/', // 組縮圖+壓縮 檔案來源路徑
    spriteDest: './workarea/build/', // 組縮圖+壓縮 結果產生路徑
    compressSrc: './workarea/只做壓縮來源/', // 只做壓縮 檔案來源路徑
    compressDest: './workarea/只做壓縮結果/', // 只做壓縮 結果產生路徑
    iconFontSrc: './workarea/iconFontSrc/',
    iconFontDest: './workarea/iconFontDest/',
    appIconSrc: './workarea/appIcon來源/',
    appIconDestQpkg: './workarea/appIcon結果/qpkg/',
    appIconDestMobileApp: './workarea/appIcon結果/mobileApp/',
    launchImageSrc: 'workarea/launch_image_source/',
    launchImageDest: 'workarea/launch_image_result/',
    launchImage: [{
        name: '_ipad_landscape',
        width: 1024,
        height: 768,
        centerWidth: 400,
        centerHeight: 400,
        footerHeight: 54
    }, {
        name: '_ipad_protrait',
        width: 768,
        height: 1024,
        centerWidth: 400,
        centerHeight: 400,
        footerHeight: 54
    }, {
        name: '_ipad_landscape@2x',
        width: 2048,
        height: 1536,
        centerWidth: 846,
        centerHeight: 846,
        footerHeight: 112
    }, {
        name: '_ipad_protrait@2x',
        width: 1536,
        height: 2048,
        centerWidth: 846,
        centerHeight: 846,
        footerHeight: 112
    }, {
        name: '_ipad_landscape@3x',
        width: 3072,
        height: 2304,
        centerWidth: 1300,
        centerHeight: 1300,
        footerHeight: 190
    }, {
        name: '_ipad_protrait@3x',
        width: 2304,
        height: 3072,
        centerWidth: 1300,
        centerHeight: 1300,
        footerHeight: 190
    }, {
        name: '_ipad_landscape@ipadpro',
        width: 2732,
        height: 2048,
        centerWidth: 1140,
        centerHeight: 1140,
        footerHeight: 146
    }, {
        name: '_ipad_protrait@ipadpro',
        width: 2048,
        height: 2732,
        centerWidth: 1140,
        centerHeight: 1140,
        footerHeight: 146
    }, {
        name: '_iphone_landscape@4s',
        width: 960,
        height: 640,
        centerWidth: 370,
        centerHeight: 370,
        footerHeight: 50
    }, {
        name: '_iphone_protrait@4s',
        width: 640,
        height: 960,
        centerWidth: 370,
        centerHeight: 370,
        footerHeight: 50
    }, {
        name: '_iphone_landscape@5',
        width: 1136,
        height: 640,
        centerWidth: 446,
        centerHeight: 446,
        footerHeight: 50
    }, {
        name: '_iphone_protrait@5',
        width: 640,
        height: 1136,
        centerWidth: 446,
        centerHeight: 446,
        footerHeight: 50
    }, {
        name: '_iphone_landscape@6',
        width: 1334,
        height: 750,
        centerWidth: 510,
        centerHeight: 510,
        footerHeight: 66
    }, {
        name: '_iphone_protrait@6',
        width: 750,
        height: 1334,
        centerWidth: 510,
        centerHeight: 510,
        footerHeight: 66
    }, {
        name: '_iphone_landscape@6plus',
        width: 1920,
        height: 1080,
        centerWidth: 740,
        centerHeight: 740,
        footerHeight: 96
    }, {
        name: '_iphone_protrait@6plus',
        width: 1080,
        height: 1920,
        centerWidth: 740,
        centerHeight: 740,
        footerHeight: 96
    }]
};
'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const gm = require('gm').subClass({ imageMagick: true });
const gulp = require('gulp');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');
const imageResize = require('gulp-image-resize');
const gulpPngquant = require('gulp-pngquant');
const gulpRename = require('gulp-rename');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const config = require('./config.js');
const gray = require('./gray.js');

gulp.task('default', ['sprite']);
gulp.task('appIcon', ['qpkgIcon', 'mobileAppIcon']);
gulp.task('qpkgIcon', ['icon_100', 'icon_80', 'icon_80_gray', 'icon_68', 'icon_68_gray', 'icon_64', 'icon_64_gray', 'icon_48', 'icon_24', 'icon_20', 'icon_16', 'icon_512', 'icon_380', 'icon_350', 'icon_256']);
gulp.task('mobileAppIcon', ['androidIcon', 'iosIcon', 'watchkitIcon', 'imessengerIcon']);
gulp.task('androidIcon', ['mipmap-hdpi', 'mipmap-ldpi', 'mipmap-mdpi', 'mipmap-xdpi', 'mipmap-xxdpi', 'mipmap-xxxdpi', 'playstore-icon']);
gulp.task('iosIcon', ['29@1x', '29@2x', '29@3x', '40@1x', '40@2x', '40@3x', '60@1x', '60@2x', '60@3x', '76@1x', '76@2x', '76@3x', '83.5@2x', 'iTunesArtwork@1x', 'iTunesArtwork@2x', 'iTunesArtwork@3x']);
gulp.task('watchkitIcon', ['watchkit24@2x', 'watchkit27.5@2x', 'watchkit29@2x', 'watchkit29@3x', 'watchkit40@2x', 'watchkit44@2x', 'watchkit86@2x', 'watchkit98@2x']);
gulp.task('imessengerIcon', ['imessenger27x20@1x', 'imessenger27x20@2x', 'imessenger27x20@3x', 'imessenger67x50@2x', 'imessenger74x55@2x', 'imessenger60x45@1x', 'imessenger60x45@2x', 'imessenger60x45@3x', 'imessenger32x24@1x', 'imessenger32x24@2x', 'imessenger32x24@3x']);

gulp.task('sprite', function() {
    fs.readdir(config.spriteSrc, function(err, files) {
        if (err) {
            throw err;
        }

        files.filter(function (file) {
            return fs.statSync(path.join(config.spriteSrc, file)).isDirectory();
        }).forEach(function (file) {
            let spriteData = gulp.src(path.join(config.spriteSrc, file, '*.png')).pipe(spritesmith({
                imgName: file + '.png',
                cssName: file + '.css',
                algorithm: 'binary-tree',
                cssTemplate: function(data) {
                    let selectorList = [],
                        css = '';
                    data.sprites.forEach(function (sprite, index) {
if(/_hover$/.test(sprite.name)) {
css += `.${file}-${sprite.name.replace(/_hover$/, ':hover')} {
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;
} else if(/_active$/.test(sprite.name)) {
css += `.${file}-${sprite.name.replace(/_active$/, ':active')} {
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;
}

selectorList.push(`.${file}-${sprite.name}`);
css += `.${file}-${sprite.name} {
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;

if(data.sprites.length === index + 1) {
css = `${selectorList.join(', ')} {
    background-image: url(${sprite.escaped_image});
}\n${css}`;
}
                    });
                    return css;
                }
            }));

            spriteData.img
                .pipe(buffer())
                .pipe(gulpPngquant())
                .pipe(gulp.dest(config.spriteDest + 'images/'));    //產生後的sprite圖路徑

            spriteData.css.pipe(gulp.dest(config.spriteDest + 'css/'));   //產生後的css路徑
        });
    });
});

gulp.task('compress', function() {
    gulp.src(config.compressSrc + '**/*.png')
        .pipe(gulpPngquant())
        .pipe(gulp.dest(config.compressDest));
});

/* qpkg icon */
gulp.task('icon_100', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 100,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_100');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_80', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 80,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_80');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_80_gray', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 80,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_80_gray');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_68', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 68,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_68');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_68_gray', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 68,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_68_gray');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_64', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 64,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_64');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_64_gray', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 64,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_64_gray');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_48', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 48,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_48');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_24', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 24,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_24');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_20', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 20,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_20');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_16', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 16,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.basename = path.basename.replace('_qpkg', '_16');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_512', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 512,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename = path.basename.replace('_qpkg', '_512');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_380', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 380,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename = path.basename.replace('_qpkg', '_380');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_350', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 350,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename = path.basename.replace('_qpkg', '_350');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});

gulp.task('icon_256', function() {
    gulp.src(config.appIconSrc + '*/*_qpkg.png')
        .pipe(imageResize({
            width: 256,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename = path.basename.replace('_qpkg', '_256');
        }))
        .pipe(gulp.dest(config.appIconDestQpkg));
});


/*android icon*/
gulp.task('mipmap-hdpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 72,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-hdpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('mipmap-ldpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 36,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-ldpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('mipmap-mdpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 48,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-mdpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('mipmap-xdpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 96,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-xdpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('mipmap-xxdpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 144,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-xxdpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('mipmap-xxxdpi', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 192,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android/mipmap-xxxdpi';
            path.basename = 'ic_launcher';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('playstore-icon', function() {
    gulp.src(config.appIconSrc + '*/*_android.png')
        .pipe(imageResize({
            width: 512,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/android';
            path.basename = 'playstore-icon';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

/*iosIcon*/
gulp.task('29@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 29,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-29x29@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('29@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 58,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-29x29@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('29@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 87,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-29x29@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('40@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 40,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-40x40@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('40@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 80,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-40x40@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('40@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 120,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-40x40@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('60@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 60,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-60x60@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('60@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 120,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-60x60@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('60@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 180,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-60x60@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('76@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 76,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-76x76@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('76@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 152,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-76x76@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('76@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 228,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-76x76@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('83.5@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 167,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'Icon-App-83.5x83.5@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('iTunesArtwork@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 512,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'iTunesArtwork@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('iTunesArtwork@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 1024,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'iTunesArtwork@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('iTunesArtwork@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 1536,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/ios';
            path.basename = 'iTunesArtwork@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit24@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 48,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-24@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit27.5@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 55,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-27.5@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit29@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 58,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-29@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit29@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 87,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-29@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit40@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 80,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-40@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit44@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 88,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-44@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit86@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 172,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-86@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('watchkit98@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 196,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/watchkit';
            path.basename = 'Icon-98@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger27x20@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 27,
            height: 20,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-27x20@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger27x20@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 54,
            height: 40,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-27x20@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger27x20@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 81,
            height: 60,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-27x20@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger67x50@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 134,
            height: 100,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-iPadAir-67x50@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger74x55@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 148,
            height: 110,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-iPadAir-74x55@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger60x45@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 60,
            height: 45,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-iPhone-60x45@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger60x45@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 120,
            height: 90,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-iPhone-60x45@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger60x45@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 180,
            height: 135,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-app-iPhone-60x45@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger32x24@1x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 32,
            height: 24,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-transcript-32x24@1x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger32x24@2x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 64,
            height: 48,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-transcript-32x24@2x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('imessenger32x24@3x', function() {
    gulp.src(config.appIconSrc + '*/*_ios.png')
        .pipe(imageResize({
            width: 96,
            height: 72,
            crop: true,
            imageMagick: true,
            upscale: true
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/imessenger';
            path.basename = 'icon-messages-transcript-32x24@3x';
        }))
        .pipe(gulp.dest(config.appIconDestMobileApp));
});

gulp.task('launchImage', function() {
    fs.readdir(config.launchImageSrc, function(err, files) {
        if (err) {
            throw err;
        }

        try {
            fs.accessSync(config.launchImageDest);
        } catch(err) {
            fs.mkdir(config.launchImageDest);
        }

        files.filter(function (file) {
            return !fs.statSync(path.join(config.launchImageSrc, file)).isDirectory() && /.*\.png$/.test(file);
        }).forEach(function (file) {
            var filename = path.basename(file, '.png');

            try {
                fs.accessSync(config.launchImageDest + filename + '/');
            } catch(err) {
                fs.mkdir(config.launchImageDest + filename + '/');
            }

            config.launchImage.forEach((conf) => {
                console.log(chalk.blue('Generate launch image: ') + filename + conf.name + '.png');

                var iconPositionX = (conf.width - conf.centerWidth) / 2,
                    iconPositionY = (conf.height - conf.centerHeight - conf.footerHeight) / 2,
                    linePositionX = (conf.width - conf.footerHeight * 2.2) / 2,
                    linePositionY = conf.height - conf.footerHeight + 1,
                    qnapWidth = conf.footerHeight * 2.2;

                gm(conf.width, conf.height, '#ffffff')
                .draw(['image Over ' + iconPositionX + ',' + iconPositionY + ' ' + conf.centerWidth + ',' + conf.centerHeight + ' ' + config.launchImageSrc + file])
                .draw(['image Over ' + linePositionX + ',' + linePositionY + ' ' + qnapWidth +',' + conf.footerHeight + ' ' +'assets/qnap.png'])
                .stroke('#b4b4b4', 1)
                .drawLine(0, linePositionY, conf.width, linePositionY)
                .stream('png')
                .pipe(source(filename + conf.name + '.png'))
                .pipe(buffer())
                .pipe(gulpPngquant())
                .pipe(gulp.dest(config.launchImageDest + filename + '/'));
            });
        });
    });
});

gulp.task('launchImageODM', function() {
    fs.readdir(config.launchImageSrc, function(err, files) {
        if (err) {
            throw err;
        }

        try {
            fs.accessSync(config.launchImageDest);
        } catch(err) {
            fs.mkdir(config.launchImageDest);
        }

        files.filter(function (file) {
            return !fs.statSync(path.join(config.launchImageSrc, file)).isDirectory() && /.*\.png$/.test(file);
        }).forEach(function (file) {
            var filename = path.basename(file, '.png');

            try {
                fs.accessSync(config.launchImageDest + filename + '/');
            } catch(err) {
                fs.mkdir(config.launchImageDest + filename + '/');
            }

            config.launchImage.forEach((conf) => {
                console.log(chalk.blue('Generate launch image: ') + filename + conf.name + '.png');

                var iconPositionX = (conf.width - conf.centerWidth) / 2,
                    iconPositionY = (conf.height - conf.centerHeight) / 2,
                    qnapWidth = conf.footerHeight * 2.2;

                gm(conf.width, conf.height, '#ffffff')
                .draw(['image Over ' + iconPositionX + ',' + iconPositionY + ' ' + conf.centerWidth + ',' + conf.centerHeight + ' ' + config.launchImageSrc + file])
                .stream('png')
                .pipe(source(filename + conf.name + '.png'))
                .pipe(buffer())
                .pipe(gulpPngquant())
                .pipe(gulp.dest(config.launchImageDest + filename + '/'));
            });
        });
    });
});

gulp.task('iconfont', function() {
    gulp.src(config.iconFontSrc + '*.svg')
        .pipe(iconfont({
            fontName: 'qnapIconFont',
            prependUnicode: true,
            normalize: true
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(['assets/iconFontHtmlTemplate.html', 'assets/iconFontCSSTemplate.css'])
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: 'qnapIconFont',
                fontPath: config.iconFontDest,
                className: 'qf'
            }))
            .pipe(gulp.dest(config.iconFontDest));
        })
        .pipe(gulp.dest(config.iconFontDest));
});
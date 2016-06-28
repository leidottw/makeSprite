'use strict';

const config = require('./config.js');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gulpPngquant = require('gulp-pngquant');
const spritesmith = require('gulp.spritesmith');
const fs = require('fs');
const path = require('path');

gulp.task('default', ['sprite']);

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
                .pipe(gulpPngquant({
                    quality: '35-50'
                }))
                .pipe(gulp.dest(config.spriteDest + 'images/'));    //產生後的sprite圖路徑

            spriteData.css.pipe(gulp.dest(config.spriteDest + 'css/'));   //產生後的css路徑
        });
    });
});

gulp.task('compress', function() {
    gulp.src(config.compressSrc + '**/*.png')
        .pipe(gulpPngquant({
            quality: '35-50'
        }))
        .pipe(gulp.dest(config.compressDest));
});
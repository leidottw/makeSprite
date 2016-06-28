'use strict';

const config = require('./config.js');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gulpPngquant = require('gulp-pngquant');
const spritesmith = require('gulp.spritesmith');
const fs = require('fs');
const path = require('path');
const gulpRename = require('gulp-rename');
const gray = require('./gray.js');
const imageResize = require('gulp-image-resize');

gulp.task('default', ['sprite']);
gulp.task('qpkgIcon', ['icon_100', 'icon_80', 'icon_80_gray', 'icon_68', 'icon_68_gray', 'icon_64', 'icon_64_gray', 'icon_48', 'icon_24', 'icon_20', 'icon_16', 'icon_512', 'icon_380', 'icon_350', 'icon_256']);

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

/* qpkg icon */
gulp.task('icon_100', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 100
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_100';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_80', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 80
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_80';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_80_gray', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 80
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename += '_80_gray';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_68', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 68
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_68';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_68_gray', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 68
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename += '_68_gray';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_64', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 64
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_64';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_64_gray', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 64
        }))
        .pipe(gray())
        .pipe(gulpRename(function(path) {
            path.basename += '_64_gray';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_48', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 48
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_48';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_24', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 24
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_24';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_20', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 20
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_20';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_16', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 16
        }))
        .pipe(gulpRename(function(path) {
            path.basename += '_16';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_512', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 512
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename += '_512';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_380', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 380
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename += '_380';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_350', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 350
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename += '_350';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});

gulp.task('icon_256', function() {
    gulp.src(config.appIconSrc + '*/*.png')
        .pipe(imageResize({
            width: 256
        }))
        .pipe(gulpRename(function(path) {
            path.dirname += '/HDStation';
            path.basename += '_256';
        }))
        .pipe(gulpPngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest(config.appIconDest));
});
const ROOT = './images';
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gulpPngquant = require('gulp-pngquant');
const spritesmith = require('gulp.spritesmith');
const fs = require('fs');
const path = require('path');

gulp.task('default', ['sprite']);

gulp.task('sprite', function() {
    fs.readdir(ROOT, function(err, files) {
        if (err) {
            throw err;
        }

        files.filter(function (file) {
            return fs.statSync(path.join(ROOT, file)).isDirectory();
        }).forEach(function (file) {
            var spriteData = gulp.src(path.join(ROOT, file, '*.png')).pipe(spritesmith({
                imgName: file + '.png',
                cssName: file + '.css',
                algorithm: 'top-down',
                // cssTemplate: 'handlebarsStr.css.handlebars'
                cssTemplate: function(data) {
                    var css = '';
                    data.sprites.forEach(function (sprite) {
if(/_hover$/.test(sprite.name)) {
css += `.${file}-${sprite.name.replace(/_hover$/, ':hover')} {
    background-image: url(${sprite.escaped_image});
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;
} else if(/_active$/.test(sprite.name)) {
css += `.${file}-${sprite.name.replace(/_active$/, ':active')} {
    background-image: url(${sprite.escaped_image});
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;
} else {
css += `.${file}-${sprite.name} {
    background-image: url(${sprite.escaped_image});
    background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
    width: ${sprite.px.width};
    height: ${sprite.px.height};
}\n`;
}
                    });
                    return css;
                }
            }));

            spriteData.img
                .pipe(buffer())
                .pipe(gulpPngquant({
                    quality: [65, 80]
                }))
                .pipe(gulp.dest('./build/images/'));    //產生後的sprite圖路徑

            spriteData.css.pipe(gulp.dest('./build/css/'));   //產生後的css路徑
        });
    });
});
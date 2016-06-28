const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const pngquant = require('pngquant-bin');
const fs = require('fs');
const execFileSync = require('child_process').execFileSync;

const jimp = require('jimp');

// consts
const PLUGIN_NAME = 'gulp-pngquant';

// plugin level function (dealing with files)
function gulpMakeAppIcon(options) {
    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            jimp.read(file.contents, (err, image) => {
                image.greyscale()
                    .brightness(0.5)
                    .getBuffer(jimp.MIME_PNG, (err, buffer) => {
                        file.contents = buffer;

                        // make sure the file goes through the next gulp plugin
                        this.push(file);

                        // tell the stream engine that we are done with this file
                        cb();
                    });;
            });
        }
    });

    // returning the file stream
    return stream;
};

// exporting the plugin main function
module.exports = gulpMakeAppIcon;
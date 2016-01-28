var gulp      = require('gulp'),
  browserSync = require('browser-sync'),
  gConfig     = require('../gulp-config'),
  opts        = gConfig.pluginOpts,
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  /*
    start; creates local static livereload server using browser-sync.
  */
  start = function() {
    browserSync(opts.browserSync);
    return gulp.watch(src.overwatch).on('change', function(file) {
      if (file.path.indexOf('.css') === -1) browserSync.reload();
    });
  };

module.exports = {
  start: start
};

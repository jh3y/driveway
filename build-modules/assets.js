var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  /* img:publish */
  publishImages = function() {
    return gulp.src(src.img)
      .pipe(gulp.dest(dest.img));
  };

module.exports = {
  images   : {
    publish: publishImages
  }
};

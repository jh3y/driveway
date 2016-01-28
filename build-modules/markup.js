var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* markup:lint */
  lint = function() {
    return gulp.src(src.markup)
      .pipe(plugins.jadelint());
  },
  /* markup:compile */
  compile = function() {
    return gulp.src(src.markup)
      .pipe(plugins.plumber())
      .pipe(env.deploy ? plugins.jade(): plugins.jade(opts.jade))
      .pipe(gulp.dest(dest.html));
  },
  /* markup:watch */
  watch = function() {
    gulp.watch(src.markup, ['markup:compile']);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};

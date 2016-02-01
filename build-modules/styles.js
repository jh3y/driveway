var gulp      = require('gulp'),
  browserSync = require('browser-sync'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* styles:lint */
  lint = function() {
    return gulp.src(src.styles)
      .pipe(plugins.stylint(opts.stylint))
      .pipe(plugins.stylint.reporter());
  },
  /* styles:compile */
  compile = function() {
    var licenseComment = '/*!\n  * driveway\n  *\n  * @author jh3y\n  * @license MIT\n*/\n';
    return gulp.src(src.styles)
      .pipe(plugins.plumber())
      .pipe(plugins.stylus())
      .pipe(plugins.prefix(opts.prefix))
      .pipe(env.dist ? plugins.header(licenseComment): plugins.gUtil.noop())
      .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
      .pipe(env.deploy ? plugins.gUtil.noop(): gulp.dest(env.dist ? dest.dist: dest.css))
      .pipe(plugins.minify())
      .pipe(plugins.rename(opts.rename))
      .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
      .pipe(gulp.dest(env.dist ? dest.dist: dest.css))
      .pipe(browserSync.stream());
  },
  /* styles:watch */
  watch = function() {
    gulp.watch(src.styles, ['styles:compile']);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};

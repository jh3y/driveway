var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  dConfig     = require('../driveway-config.json'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  extend      = function(obj, src) {
    for(var key in src) {
        if(src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  },
  /* markup:lint */
  lint = function() {
    return gulp.src(src.markup)
      .pipe(plugins.jadelint());
  },
  /* markup:compile */
  compile = function() {
    if (env.deploy) {
      opts.jade.pretty = false;
    }
    opts.jade.data = extend(opts.jade.data, dConfig);
    return gulp.src(src.markup)
      .pipe(plugins.plumber())
      .pipe(plugins.jade(opts.jade))
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

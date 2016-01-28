var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* TODO: populate linting */
  lint = function() {},
  /* TODO: populate compilation task */
  compile = function() {},
  /* TODO: populate watching task */
  watch = function() {};

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};

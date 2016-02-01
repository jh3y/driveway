var gulp  = require('gulp'),
  gutil   = require('gulp-util'),
  server  = require('./build-modules/server'),
  assets  = require('./build-modules/assets'),
  styles  = require('./build-modules/styles'),
  markup  = require('./build-modules/markup'),
  deploy  = require('./build-modules/deploy');

/*
  serve; creates local static livereload server using browser-sync.
*/
gulp.task('serve', ['compile'], server.start);

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task('styles:lint', styles.lint);
gulp.task('styles:compile', ['styles:lint'], styles.compile);
gulp.task('styles:watch', styles.watch);

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task('markup:lint', markup.lint);
gulp.task('markup:compile', ['markup:lint'], markup.compile);
gulp.task('markup:watch', markup.watch);


gulp.task('img:publish', assets.images.publish);

gulp.task('deploy', ['compile'], deploy.run);

gulp.task('compile', [
  'markup:compile',
  'styles:compile',
  'img:publish'
]);

gulp.task('watch', [
  'markup:watch',
  'styles:watch'
]);

var defaultTasks = ((gutil.env.deploy) ? true: false) ? [
  'deploy'
]:[
  'serve',
  'watch'
];

gulp.task('default', defaultTasks);

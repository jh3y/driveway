var gulp      = require('gulp'),
  gConfig     = require('./gulp-config'),
  browserSync = require('browser-sync'),
  opts        = gConfig.pluginOpts,
  plugins     = require('gulp-load-plugins')(opts.load),
  isDist      = (plugins.gUtil.env.dist)    ? true: false,
  isDeploy    = (plugins.gUtil.env.deploy)  ? true: false,
  isStat      = (plugins.gUtil.env.stat)    ? true: false,
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations;

/*
  serve; creates local static livereload server using browser-sync.
*/
gulp.task('serve', ['compile'], function(event) {
  browserSync(opts.browserSync);
  return gulp.watch(src.overwatch).on('change', function(file) {
    if (file.path.indexOf('.css') === -1) browserSync.reload();
  });
});

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task('styles:lint', function() {
  return gulp.src(src.styles)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter());
});
gulp.task('styles:compile', ['styles:lint'], function(event) {
  return gulp.src(src.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(opts.prefix))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(isDeploy ? plugins.gUtil.noop(): gulp.dest(isDist ? dest.dist: dest.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(opts.rename))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? dest.dist: dest.css))
    .pipe(browserSync.stream());
});
gulp.task('styles:watch', function(event) {
  gulp.watch(src.styles, ['styles:compile']);
});

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task('markup:lint', function() {
  return gulp.src(src.markup)
    .pipe(plugins.jadelint());
});
gulp.task('markup:compile', function() {
  return gulp.src(src.markup)
    .pipe(plugins.plumber())
    .pipe(isDeploy ? plugins.jade(): plugins.jade(opts.jade))
    .pipe(gulp.dest(dest.html));
});
gulp.task('markup:watch', function(event){
  gulp.watch(src.markup, ['markup:compile']);
});

gulp.task('img:publish', function() {
  return gulp.src(src.img)
    .pipe(gulp.dest(dest.img));
});

gulp.task('deploy', ['compile'], function(event) {
  isDeploy = true;
  return gulp.src(src.overwatch)
    .pipe(plugins.deploy());
});

gulp.task('compile', [
  'markup:compile',
  'styles:compile',
  'img:publish'
]);

gulp.task('watch', [
  'markup:watch',
  'styles:watch'
]);

var defaultTasks = isDeploy ? [
  'deploy'
]:[
  'serve',
  'watch'
];

gulp.task('default', defaultTasks);

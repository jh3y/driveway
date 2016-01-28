var env = 'public/',
  pkg   = require('./package.json');
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    browserSync: {
      port   : 1987,
      server : {
        baseDir: env
      }
    },
    gSize: {
      showFiles: true
    },
    jade: {
      pretty: true,
      data  : {
        name       : pkg.name,
        description: pkg.description
      }
    },
    load: {
      rename: {
        'gulp-gh-pages'    : 'deploy',
        'gulp-util'        : 'gUtil',
        'gulp-cssnano'     : 'minify',
        'gulp-autoprefixer': 'prefix'
      }
    },
    prefix: [
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ],
    rename: {
      suffix: '.min'
    },
    stylint: {
      reporter: 'stylint-stylish'
    }
  },
  paths: {
    base: env,
    sources: {
      markup   : 'src/jade/*.jade',
      img      : 'src/img/**/*.*',
      overwatch: env + '**/*.{html,css}',
      styles   : [
        'src/stylus/**/theme.styl',
        'src/stylus/**/driveway.styl'
      ]
    },
    destinations: {
      dist: './dist',
      css : env + 'css/',
      img : env + 'img/',
      html: env
    }
  }
};

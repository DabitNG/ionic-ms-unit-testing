var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var karma = require('karma').server;

var paths = {
  sass: ['./scss/**/*.scss'],
  javascript: [
    '!./www/lib/**',
    '!./www/files/img',
    './www/modules/**/*.js',
    './www/modules/**/js/*.js',
    './www/modules/**/**/*.js',
    './www/modules/**/**/js/*.js',
  ],
  css: [
    '!./www/lib/**',
    '!./www/files/img',
    './www/modules/**/css/*.css',
    './www/modules/**/**/css/*.css',
  ]
};

gulp.task('default', ['sass','index']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/modules/main/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/modules/main/css/'))
    .on('end', done);
});

gulp.task('index', function(){
   return gulp.src('./www/index.html')
       .pipe(inject(
           gulp.src(paths.javascript,
               {read: false}), {relative: true}))
       .pipe(gulp.dest('./www'))
       .pipe(inject(
           gulp.src(paths.css,
           {read: false}), {relative: true}))
       .pipe(gulp.dest('./www'));
});

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, function(){
    done();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch([
     paths.javascript,
     paths.css
     ], ['index']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

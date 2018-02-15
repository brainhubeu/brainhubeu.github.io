const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const headerfooter = require('gulp-headerfooter');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const mustache = require('gulp-mustache');
const { data } = require('./tools/js/data');

gulp.task('assets', function() {
  return gulp.src('./tools/assets/**/*').pipe(gulp.dest('./assets/'));
});

gulp.task('tinypng', function () {
  gulp.src('./tools/assets/img/**/*.{png,jpg,jpeg}')
    .pipe(gulp.dest('./tools/assets/img/'));
});

gulp.task('scriptsLibs', function() {
  gulp
    .src('tools/js/libs/*.js')
    .pipe(gulp.dest('./js/libs'));
});


gulp.task('scripts', function() {
  gulp
    .src('tools/js/app.js')
    .pipe(eslint())
    .on('error', function(err) {
      browserSync.notify(err.message, 3000);
      this.emit('end');
    })
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('mustache', function() {
  gulp
    .src('tools/mustache/index.mustache')
    .pipe(mustache(data, { extension: '.html' }))
    .pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
  return gulp
    .src('./tools/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp
    .src('./tools/content/*.html')
    .pipe(headerfooter.header('./tools/partials/header.html'))
    .pipe(headerfooter.footer('./tools/partials/footer.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', ['sass', 'mustache', 'scripts', 'scriptsLibs', 'assets'], function() {
  browserSync.init({
    server: './',
  });
  gulp.watch('tools/scss/**/*', ['sass']);
  gulp.watch('tools/mustache/*.mustache', ['mustache']);
  gulp.watch('tools/js/*.js', ['scripts']);
  gulp.watch('tools/js/libs/*.js', ['scriptsLibs']);
  gulp.watch('tools/assets/**/*', ['assets']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

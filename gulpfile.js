const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const headerfooter = require('gulp-headerfooter');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const tinypng = require('gulp-tinypng-compress');


gulp.task('assets', function() {
  return gulp.src('./tools/assets/**/*').pipe(gulp.dest('./assets/'));
});

gulp.task('tinypng', function () {
  gulp.src('./tools/assets/img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'APIKEY',
      sigFile: './tools/assets/img/.tinypng-sigs',
      log: true,
    }))
    .pipe(gulp.dest('./tools/assets/img/'));
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

gulp.task('serve', ['sass', 'html', 'scripts', 'assets'], function() {
  browserSync.init({
    server: './',
  });
  gulp.watch('tools/scss/**/*', ['sass']);
  gulp.watch('tools/content/*.html', ['html']);
  gulp.watch('tools/partials/*.html', ['html']);
  gulp.watch('tools/js/*.js', ['scripts']);
  gulp.watch('tools/assets/**/*', ['assets']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

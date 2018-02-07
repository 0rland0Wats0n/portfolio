const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src('./public/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', () => {
  gulp.watch('sass');
});

gulp.task('default', ['watch'], () => {
  return nodemon({
    script: './bin/start.js',
    ext: 'js scss'
  }).on('restart', () => {
    console.log('restarted');
  });
});

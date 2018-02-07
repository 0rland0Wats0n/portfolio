const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', () => {
  nodemon({
    script: './bin/start.js',
    ext: 'js scss'
  }).on('restart', () => {
    console.log('Restarting....');
  });
});

gulp.task('sass', () => {
  gulp.src('./public/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.watch('default', ['sass']);

const postcss = require('gulp-postcss');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');

gulp.task('default', () => {
  livereload.listen();

  nodemon({
    script: './bin/start.js',
    ext: 'js scss'
  }).on('restart', () => {
    gulp.src('./public/stylesheets/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/stylesheets'))
      .pipe(postcss())
      .pipe(gulp.dest('./public/stylesheets'));

    gulp.src('./bin/start.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  });
});

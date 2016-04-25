'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var runSequence = require('run-sequence');
var del = require('del');


//gulp.task('sass', function () {
  //return gulp.src('./vendor/sass/**/*.scss')
  //  .pipe(sass().on('error', sass.logError))
  //  .pipe(gulp.dest('./views/css'));

//});

gulp.task('sass', () =>
    sass('./vendor/sass/**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('./views/css'))
);

gulp.task('css', function(){
	return gulp.src("./vendor/sass/**/*.css").pipe(gulp.dest("./views/css"));
});

gulp.task('watch', function () {
  gulp.watch('./vendor/sass/**/*.scss', ['build']);
  gulp.watch('./vendor/sass/**/*.css', ['build']);
});

gulp.task('clean', function(){
    return del('./views/css');
});

gulp.task('build', function(callback){
    runSequence('clean', 'sass', 'css',  callback);
});

gulp.task('default', ['build']);
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var path = require('path');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var TEST_FILES = process.env.TEST_FILES || 'test/**/*.bdd.js';
var SRC_FILES = process.env.SRC_FILES || 'src/**/*.js';

gulp.task('default', function() {
    runSequence('jshint', 'test');
});

gulp.task('test', function() {
    return gulp.src(TEST_FILES, {
            read: false
        })
        .pipe(mocha())
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('jshint', function() {
    return gulp.src(SRC_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
    return gulp.watch([SRC_FILES, TEST_FILES], ['default']);
});
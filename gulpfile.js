'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var del = require('del');

function bundleShare(b) {
	console.log('bundling...');
	return b.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
	// Add transformation tasks to the pipeline here.
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/scripts/'));
}

gulp.task('clean', function(){
	console.log('cleaning...');
	return del(['./dist/**/*', './dist/*']);
});

gulp.task('copy', ['clean'], function() {
	console.log('copying...');
	gulp.src('app/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('watchify', ['copy'], function () {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: 'app/scripts/main.js',
		debug: true
	});

	b = watchify(b);
	b.on('update', function(){
		bundleShare(b);
	});
	//b.add('./main.js');

	return bundleShare(b);
});

gulp.task('browser-sync', ['watchify'], function() {
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch('./dist/scripts/main.js').on('change', browserSync.reload);
});

gulp.task('build', ['copy'], function() {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: 'app/scripts/main.js',
		debug: true
	});

	return bundleShare(b);
});

gulp.task( 'default', ['browser-sync']);

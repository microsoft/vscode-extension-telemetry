var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cp = require('child_process');
var tsb = require('gulp-tsb');


// run mocha tests in the ./tests folder
gulp.task('test', function () {

    return gulp.src('./tests/test*.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha());
});

// TypeScript build for /lib folder, pipes in .d.ts files from typings folder 
var tsConfigSrc = tsb.create('lib/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['typings/**/*.ts', 'lib/**/*.ts'])
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest('lib'));
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
var tsConfigTests = tsb.create('tests/tsconfig.json');
gulp.task('buildTests', function () {
    // pipe in all necessary files
    return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'lib/tsd.d.ts'])
        .pipe(tsConfigTests()) 
        .pipe(gulp.dest('tests'));
});

// watch for any TypeScript file changes
gulp.task('watch', function () {
    gulp.watch('lib/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
}); 

gulp.task('buildAll', ['build', 'buildTests']);
gulp.task('default', ['buildAll']);

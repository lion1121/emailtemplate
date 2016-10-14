var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlineSource = require('gulp-inline-source'),
    browserSync = require('browser-sync');


// BROWSER SYNC
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './dist/'
        },
        notify: false
    });
});

//STYLES
gulp.task('styles', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./templates/'));
});

//CONVERTE INKY, WRITE INLINE SOURCE, WRITE INLINE CSS (option 'preserveMediaQueries' allows defining media queries
// correctly)
gulp.task('inky', ['styles'], function() {
    return gulp.src('./templates/**/*.html')
        .pipe(inlineSource())
        .pipe(inky())
        .pipe(inlineCss({
            preserveMediaQueries: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserSync'], function() {
    gulp.watch(['./scss/*.scss', './templates/**/*.html'],['inky'], browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/*.css', browserSync.reload);
});
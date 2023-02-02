const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');

gulp.task('watch', function () {
    gulp.watch('js/*.js', gulp.series('js'));
});

gulp.task('js', function(){
    return gulp.src('js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', gulp.series('js'));
var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('cat', () => 
gulp.src("src/prefresh/**/*.js").pipe(concat("prefresh-core.js")).pipe(gulp.dest("temp"))
)
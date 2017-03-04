const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const less        	= require('gulp-less');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const path 		    = require('path');

const lessPaths = [path.join(__dirname, 'assets/**/*.less'), path.join(__dirname, 'assets/*.less')]

gulp.task('less', () => {
    return gulp.src(lessPaths, { base: './' })
    	.pipe(sourcemaps.init())
        .pipe(less()).on('error', err => { console.error(err); })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 9']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({ server: './' });

    gulp.watch(lessPaths, gulp.series('less'));
    gulp.watch('./*.js').on('change',   browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
});


gulp.task('default', gulp.series('serve'));
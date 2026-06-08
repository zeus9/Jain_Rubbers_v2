import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';

// CSS — all files, no replace needed
gulp.task('css', () => {
  return gulp.src([
    'css/bootstrap.min.css',
    'css/slicknav.css',
    'css/slick.css',
    'css/magnific-popup.css',
    'css/style.css',
  ])
  .pipe(cleanCSS({ level: 1 }))
  .pipe(gulp.dest('dist/css'));
});

// JS — bundle all
gulp.task('js', () => {
  return gulp.src([
    'js/vendor/jquery-1.12.4.min.js',
    'js/vendor/modernizr-3.5.0.min.js',
    'js/bootstrap.bundle.min.js',
    'js/slick.min.js',
    'js/jquery.slicknav.min.js',
    'js/wow.min.js',
    'js/jquery.magnific-popup.js',
    'js/jquery.nice-select.min.js',
    'js/jquery.counterup.min.js',
    'js/waypoints.min.js',
    'js/jquery.form.js',
    'js/jquery.validate.min.js',
    'js/contact.js',
    'js/mail-script.js',
    'js/jquery.ajaxchimp.min.js',
    'js/plugins.js',
    'js/main.js',
  ])
  .pipe(concat('bundle.min.js'))
  .pipe(uglify({ mangle: false }))
  .pipe(gulp.dest('js'))  // for source root
  .pipe(gulp.dest('dist/js'));  // for deployment root
});

// Images
gulp.task('img', () => {
  return gulp.src('img/**/*', { encoding: false })
  .pipe(gulp.dest('dist/img'));
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src('fonts/**/*', { encoding: false })
  .pipe(gulp.dest('dist/fonts'));
});

// HTML
gulp.task('html', () => {
  return gulp.src('*.html')
  .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', () => {
  gulp.watch('css/*.css', gulp.series('css'));
  gulp.watch('js/**/*.js', gulp.series('js'));
  gulp.watch('img/**/*', gulp.series('img'));
  gulp.watch('fonts/**/*', gulp.series('fonts'));
  gulp.watch('*.html', gulp.series('html'));
});

// Default
gulp.task('default', gulp.parallel('js', 'css', 'fonts', 'img', 'html'));
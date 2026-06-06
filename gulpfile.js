import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-clean-css';
import uglify from 'gulp-purgecss';
import uglify from 'gulp-uglify';

// render blocking — above the fold *currently doesnt work
// gulp.task('css-critical', () => {
//   return gulp.src([
//     '/assets/css/bootstrap.min.css',
//     // 'assets/css/owl.carousel.min.css',
//     // '/assets/css/slicknav.css',
//     // 'assets/css/animate.min.css',
//     '/assets/css/magnific-popup.css',
//     // 'assets/css/slick.css',
//     // 'assets/css/nice-select.css',
//     '/assets/css/style.css',
//   ])
//     .pipe(purgecss({
//     content: ['**/*.html', 'assets/js/**/*.js'],
//     safelist: {
//       standard: [
//         // Bootstrap
//         /^col-/,
//         /^row/,
//         /^container/,
//         /^modal/,
//         /^collapse/,
//         /^collapsing/,
//         /^show/,
//         /^fade/,
//         /^active/,
//         /^disabled/,
//         /^navbar/,
//         /^nav-/,
//         /^dropdown/,
//         /^btn/,
//         /^d-/,
//         /^flex/,
//         /^justify/,
//         /^align/,
//         /^text-/,
//         /^bg-/,
//         /^p-/,
//         /^m-/,
//         /^is-/,
//         /^has-/,

//         // Slicknav
//         /^slicknav/,
//         /^slick/,
//         /^slider/,
//         /^slick-/,     
//         /^draggable/,        // slick draggable
//         /^slick-initialized/,
//         /^slick-current/,
//         /^slick-active/,
//         /^slick-track/,
//         /^slick-list/,
//         /^slick-slider/,
//         /^slider-/,          // slider-area, slider-active, slider-height, slider-bg1
//         /^hero-/,            // hero-overly, hero-caption, hero-btn, hero-certification
//         /^single-slider/,
//         /^dot-style/,
//         /^btn_/, 
//       ]
//     }
//   }
// ))
//   .pipe(concat('critical.min.css'))
// //   .pipe(cleanCSS())
// //   .pipe(cleanCSS({ level: 1 }))
//   .pipe(gulp.dest('dist/css'));
// });

/* //  // deferred — below the fold
// gulp.task('css-deferred', () => { */
//   return gulp.src([
//     'assets/css/animate.min.css',          // ← animations
//     'assets/css/magnific-popup.css',       // ← popups, triggered by click
//     'assets/css/slick.css',     
//   ])
//   .pipe(purgecss({
//     content: ['**/*.html', 'assets/js/**/*.js'],
//     safelist: {
//       standard: [
//         // Slick slider
//         /^slick-/,
//         /^slider-/,

//         // Animate.css / WOW.js
//         /^animate__/,
//         /^animated/,
//         /^wow/,
//         /^animate/,

//         // Magnific popup
//         /^mfp-/,

//         // Nice-select
//         /^nice-select/,
//         /^open/,
//         /^current/,
//         /^option/,

//         // Waypoints / Counterup
//         /^waypoint/,

//         /^slick-/,           // already there ✅
//         /^draggable/,        // slick draggable
//         /^slick-initialized/,
//         /^slick-current/,
//         /^slick-active/,
//         /^slick-track/,
//         /^slick-list/,
//         /^slick-slide/,
//       ]
//     }
//   }))
//   .pipe(concat('deferred.min.css'))
//   .pipe(cleanCSS())
//   .pipe(gulp.dest('dist/css'));
// });

// JS task
gulp.task('js', () => {
  return gulp.src([
     // 1. jQuery absolutely first
    'assets/js/vendor/jquery-1.12.4.min.js',

    // 2. then modernizr
    'assets/js/vendor/modernizr-3.5.0.min.js',

    // 3. bootstrap bundle 5.3.8 (includes Popper)
    'assets/js/bootstrap.bundle.min.js',

    // 4. then all jQuery plugins
    'assets/js/slick.min.js',
    'assets/js/jquery.slicknav.min.js',
    'assets/js/wow.min.js',
    'assets/js/jquery.magnific-popup.js',
    'assets/js/jquery.nice-select.min.js',
    'assets/js/jquery.counterup.min.js',
    'assets/js/waypoints.min.js',

    // 5. contact scripts
    'assets/js/contact.js',
    'assets/js/jquery.form.js',
    'assets/js/jquery.validate.min.js',
    'assets/js/mail-script.js',
    'assets/js/jquery.ajaxchimp.min.js',

    // 6. always last
    'assets/js/plugins.js',
    'assets/js/main.js',
  ])
  .pipe(concat('bundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', () => {
  gulp.watch('assets/js/*.js', gulp.series('js'));
});

// Default task
gulp.task('default', gulp.series('js'));
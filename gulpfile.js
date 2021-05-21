// global
const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
// scripts
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
// styles
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

gulp.task('clean', () => {
  return del([
    'bs5starter/dist',
  ]);
});

gulp.task('scripts', () => {
  return gulp.src([
    'bs5starter/src/js/jquery.js',
    'bs5starter/src/js/bootstrap.js',
  ])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('bs5starter/dist/js'));
});

gulp.task('styles', function () {
  return gulp.src('bs5starter/src/sass/styles.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS('level: 2'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('bs5starter/dist/css'))
});

gulp.task('watch', function () {
  gulp.watch(
    ['bs5starter/src/**/*'],
    { ignoreInitial: false },
    gulp.series('clean', gulp.parallel('scripts', 'styles'))
  );
})

gulp.task('default', gulp.series('watch'));
// global imports
const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
// styles imports
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
// scripts imports
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
// styles tasks
function cleanStyles() {
  return del([
    'bs5starter/dist/css',
  ]);
};
function buildStyles() {
  return gulp.src('bs5starter/src/sass/styles.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(purgecss({ content: ['bs5starter/**/*.php', 'bs5starter/src/js/*.js'], variables: true }))
    .pipe(cleanCSS('level: 2'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('bs5starter/dist/css'))
};
// scripts tasks
function cleanScripts() {
  return del([
    'bs5starter/dist/js',
  ]);
};
function buildScripts() {
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
};
// watch tasks
function buildAndWatch() {
  gulp.watch(['bs5starter/src/sass/*'], { ignoreInitial: false }, gulp.series(cleanStyles, buildStyles));
  gulp.watch(['bs5starter/src/js/*'], { ignoreInitial: false }, gulp.series(cleanScripts, buildScripts));
};
// export tasks
exports.build = gulp.parallel(gulp.series(cleanStyles, buildStyles), gulp.series(cleanScripts, buildScripts));
exports.default = buildAndWatch;
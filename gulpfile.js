// paths
const baseFolder = 'bs5starter/';
const sourceFolder = baseFolder + 'src/';
const distFolder = baseFolder + 'dist/';
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
  return del([distFolder + 'css']);
};
function buildStyles() {
  return gulp.src(sourceFolder + 'sass/styles.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(purgecss({
      content: [baseFolder + '**/*.php', sourceFolder + 'js/*.js'],
      variables: true
    }))
    .pipe(gulp.dest(distFolder + 'css'))
    .pipe(cleanCSS('level: 2'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distFolder + 'css'))
};
// scripts tasks
function cleanScripts() {
  return del([distFolder + 'js']);
};
function buildScripts() {
  return gulp.src([
    sourceFolder + 'js/jquery.js',
    sourceFolder + 'js/bootstrap.js',
  ])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(distFolder + 'js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distFolder + 'js'));
};
// watch tasks
function buildAndWatch() {
  gulp.watch([sourceFolder + 'sass/*'], { ignoreInitial: false }, gulp.series(cleanStyles, buildStyles));
  gulp.watch([sourceFolder + 'js/*'], { ignoreInitial: false }, gulp.series(cleanScripts, buildScripts));
};
// export tasks
exports.build = gulp.parallel(
  gulp.series(cleanStyles, buildStyles),
  gulp.series(cleanScripts, buildScripts)
);
exports.default = buildAndWatch;
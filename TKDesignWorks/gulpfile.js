var gulp         = require('gulp'),
    watch        = require('gulp-watch'),
    sass         = require('gulp-sass'),
    headerfooter = require('gulp-headerfooter'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    cleanCSS     = require('gulp-clean-css'),
    connect      = require('gulp-connect');


// Compilling SCSS files to 1 CSS file
// copy it to dev version
gulp.task('sass', function(){
  console.log('sass!');
  return gulp.src('site/scss/style.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload());
});

// Compilling html files by adding the header and footer files
// copy it to dev version
gulp.task('html', function() {
  console.log('HTML!');
  gulp.src('site/views/*.html')
    .pipe(headerfooter.header('site/views/partials/header.html'))
    .pipe(headerfooter.footer('site/views/partials/footer.html'))
    .pipe(gulp.dest('builds/development'))
    .pipe(connect.reload());
});

// copy data to dev version
gulp.task('data', function() {
  console.log('data!');
  gulp.src('site/data/*')
  .pipe(gulp.dest('builds/development/data'))
  .pipe(connect.reload());
});

// Compilling js files to 1 js file
// make it 1 line
// copy it to dev version
gulp.task('js', function() {
  console.log('js!');
  gulp.src(['site/js/libs/transparancy.js', 'site/js/**/*.js', 'site/js/*.js'])
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('builds/development/js'))
  .pipe(connect.reload());
});

// copy images to dev version
gulp.task('imgs', function() {
  console.log('imgs!');
  gulp.src(['site/images/*', 'site/images/**/*'])
  .pipe(gulp.dest('builds/development/images'))
  .pipe(connect.reload());
});

// copy fonts to dev version
gulp.task('fonts', function() {
  console.log('fonts!');
  gulp.src('site/fonts/*')
  .pipe(gulp.dest('builds/development/fonts'))
  .pipe(connect.reload());
});

// start a server for live reload function
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

// check if files change to activate specific tasks
gulp.task('watch', function() {
  gulp.watch(['site/scss/*.scss','site/scss/**/*.scss'], ['sass']); 
  gulp.watch(['site/views/*.html', 'site/views/*.html'], ['html']); 
  gulp.watch('site/data/*.js', ['data']); 
  gulp.watch(['site/js/*.js', 'site/js/**/*.js'], ['js']); 
  gulp.watch(['site/images/*', 'site/images/**/*'], ['imgs']); 
  gulp.watch(['site/fonts/*', 'site/fonts/**/*'], ['fonts']); 
});

// start whatching and server for livereload
gulp.task('default', ['watch', 'connect']);

//function for complete 'dev' build
gulp.task('build-dev', ['sass', 'html', 'data', 'js', 'imgs', 'fonts'], function(){
  console.log('build-dev');
});

// function for production build
gulp.task('build-production', ['build-dev'], function() {
  console.log('build-production');
  gulp.src('builds/development/*')
  .pipe(gulp.dest('builds/production'));
});

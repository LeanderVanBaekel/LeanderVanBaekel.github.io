var gulp  		 = require('gulp'),
    watch 		 = require('gulp-watch'),
    sass  		 = require('gulp-sass'),
    fs    		 = require('fs'),
    headerfooter = require('gulp-headerfooter');

// gulp.task('stream', function () {
//     // Endless stream mode 
//     return watch('css/**/*.css', { ignoreInitial: false })
//         .pipe(gulp.dest('build'));
// });
 
// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
//     return watch('css/**/*.css', function () {
//         gulp.src('css/**/*.css')
//             .pipe(gulp.dest('build'));
//     });
// });



gulp.task('sass', function(){
	console.log('sass!');
  return gulp.src('site/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('builds/development/css'))
});

gulp.task('html', function() {
  console.log('HTML!');
  gulp.src('site/views/*.html')
    .pipe(headerfooter.header('site/partials/header.html'))
    .pipe(headerfooter.footer('site/partials/footer.html'))
    .pipe(gulp.dest('builds/development'));
});

gulp.task('data', function() {
  console.log('data!');
  gulp.src('site/data/*')
  .pipe(gulp.dest('builds/development/data'));
});

gulp.task('js', function() {
  console.log('js!');
  gulp.src('site/js/*')
  .pipe(gulp.dest('builds/development/js'));
});

gulp.task('imgs', function() {
  console.log('imgs!');
  gulp.src('site/images/*')
  .pipe(gulp.dest('builds/development/images'));
});

gulp.task('fonts', function() {
  console.log('fonts!');
  gulp.src('site/fonts/*')
  .pipe(gulp.dest('builds/development/fonts'));
});

gulp.task('watch', function(){
  gulp.watch(['site/scss/*.scss','site/scss/**/*.scss'], ['sass']); 
  gulp.watch(['site/views/*.html', 'site/views/*.html'], ['html']); 
  gulp.watch('site/data/*.js', ['data']); 
  gulp.watch('site/js/*.js', ['js']); 
  gulp.watch(['site/images/*', 'site/images/**/*'], ['imgs']); 
  gulp.watch(['site/fonts/*', 'site/fonts/**/*'], ['fonts']); 
})

gulp.task('build-dev', ['sass', 'html', 'data', 'js', 'imgs', 'fonts'], function(){
  console.log('build-dev');
})

gulp.task('build-production', ['build-dev'], function(){
  console.log('build-production');
  gulp.src('builds/development/*')
  .pipe(gulp.dest('builds/production'));
})







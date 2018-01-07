const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// firat task is to Compile our SASS
// Sass cannot be run in our regular browser, therefore we need to compile sass to regular css
// scss is the extension for SASS files

// first parameter name the task , second we run a function that will return the require sass packages
gulp.task('sass', function(){
  // first parameter is the location of the bootstap Sass file in node packages
  // Second parameter where we want the compiled sass to go (firt scss and then pipe it to css)
  // We use a star, beacause we want to get any scss Files
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])

  // Then we call the sass. Thats coming from the sass pluging, thats what tells it to compile
    .pipe(sass())
    // then we tell where we want our compiled stuff to go
    .pipe(gulp.dest("src/css"))

    // We also want to tell it to stream it to the browser
    .pipe(browserSync.stream());
});

// Move JS Files to SRC
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Watch SASS & Serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Font Awesome Fonts folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move font awesome css file
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);

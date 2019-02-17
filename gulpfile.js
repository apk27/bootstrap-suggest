// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(cb) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // hljs
  gulp.src([
      './node_modules/highlight.js/lib/highlight.js',
      './node_modules/highlight.js/styles/github.css',
    ])
    .pipe(gulp.dest('./vendor/highlight.js'))

  // bootstrap-suggest
  gulp.src([
      './node_modules/bootstrap-suggest/dist/bootstrap-suggest.js',
      './node_modules/bootstrap-suggest/dist/bootstrap-suggest.css',
    ])
    .pipe(gulp.dest('./vendor/bootstrap-suggest'))

  cb();

});

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.html", browserSyncReload);
}

gulp.task("default", gulp.parallel('vendor'));

// dev task
gulp.task("dev", gulp.parallel(watchFiles, browserSync));
/* Configuration References:
   ========================================================================== */
/**
 * Gulp: https://gulpjs.com/
 * Gulp v4 - Sass and BrowserSync setup: https://www.youtube.com/watch?v=QgMQeLymAdU
 */

/* Setup on a new system:
   ========================================================================== */
/**
 * 1. Check you have both Node and NPM Installed with "node -v" & "npm -v"
 *
 * 2. Check if you have Gulp installed with "gulp -v"
 *    If not then use the command: "npm install gulp-cli -g"
 *    to install it globally.
 *
 * 3. Run "npm install --save-dev".
 *
 * 4. Run "gulp watch" and edit/save a file to see the changes update.
 */

const gulp = require("gulp");
const sass = require("gulp-sass");
// const purify = require("gulp-purify-css");
const purgecss = require("gulp-purgecss");
const cssnano = require("gulp-cssnano");
const browserSync = require("browser-sync").create();

/* ==========================================================================
   STYLES
   ========================================================================== */

// Compile SCSS info CSS
function style() {
    return (
        gulp
            // 1. Find my CSS file(s):
            .src("./src/scss/**/*.scss")
            // 2. Pass file(s) through the SCSS compiler:
            .pipe(sass().on("error", sass.logError))
            // 3. Saving the complied CSS:
            .pipe(gulp.dest("./dist/css"))
            // 4. Stream changes to all browsers:
            .pipe(browserSync.stream())
    );
}

function build() {
    return (
        gulp
            // 1. Find my CSS file(s) to optimise:
            .src("./dist/css/**/*.css")
            // 2. Remove unused CSS:
            .pipe(
                purgecss({
                    content: ["./**/*.html"]
                })
            )

            // .pipe(purify(["./src/js/**/*.js", "./**/*.html"]))

            // 3. Minify files:
            .pipe(cssnano())
            // 4. Replace original files with minified:
            .pipe(gulp.dest("./dist/css"))
    );
}

// Watch for changes and update automatically
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./src/scss/**/*.scss", style);
    gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
    gulp.watch("./**/*.html").on("change", browserSync.reload);
}

exports.style = style;
exports.build = build;
exports.watch = watch;

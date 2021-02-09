import gulp from "gulp";
import less from "gulp-less";
import concat from "gulp-less";
import imagemin from "gulp-imagemin";


var minifycss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var htmlclean = require("gulp-htmlclean");

gulp.task("minify-css", function() {
    return gulp
        .src("./css/*.css")
        .pipe(
            minifycss({
                compatibility: "ie8",
            })
        )
        .pipe(gulp.dest("./css/*.css"));
});

gulp.task("minify-html", function() {
    return gulp
        .src("./public/**/*.html")
        .pipe(htmlclean())
        .pipe(
            htmlmin({
                removeComments: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            })
        )
        .pipe(gulp.dest("./build/js"));
});

gulp.task("minify-js", function() {
    return gulp.src("./app/**/*.js").pipe(uglify()).pipe(gulp.dest("./build"));
});

gulp.task('build-img', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'));
});

gulp.task('compilar-less', function() {
    return gulp.src(['*.less', 'less/*.less'])
        .pipe(less().on('error', function(err) {
            console.log(err);
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
});

gulp.task("monitorar", function() {
    gulp.watch([".less", "less/*.less"], gulp.series("compilar-less"));
});

gulp.task("default", gulp.series("monitorar"));

gulp.task("build", function(cb) {
    runSequence("minify-html", "minify-css", "minify-js", cb);
});
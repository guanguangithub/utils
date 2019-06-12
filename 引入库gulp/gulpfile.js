var gulp = require("gulp");
var url = require("url");
var fs = require("fs");
var path = require("path");
var webserver = require("gulp-webserver")
var sass = require("gulp-sass")
var uglify = require("gulp-uglify")
var imagemin = require("gulp-imagemin")
var htmlmin = require("gulp-htmlmin")
var autoprefixer = require("gulp-autoprefixer")


var cleanCss = require("gulp-clean-css")
    //编译sass
gulp.task("sass", function() {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css/"))
    })
    //编译压缩css
gulp.task("css", function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browers: ["last 2 versions"]
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest("./dist/css/"))
})

// 压缩js
gulp.task("js", function() {
    return gulp.src(['src/js/**/*.js', '!src/js/libs/'])
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/module"))
})
gulp.task("copy", function() {
    return gulp.src("./src/js/libs/*")
        .pipe(gulp.dest("./dist/js/libs"))
})

// 压缩img

gulp.task("img", function() {
        return gulp.src("./src/img/**/*.{png,jpg,jpeg,gif,icon,psd}")
            .pipe(imagemin())
            .pipe(gulp.dest("./dist/img/"))
    })
    // 压缩html
gulp.task("html", function() {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true, //清除HTML注释
            minfyJS: true, //压缩JS
            minfyCss: true, //压缩CSS

        }))
        .pipe(gulp.dest("./dist/"))
})
gulp.task("page", function() {
    return gulp.src("./src/page/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true, //清除HTML注释
            minfyJS: true, //压缩JS
            minfyCss: true, //压缩CSS
        }))

    .pipe(gulp.dest("./dist/page"))
})

gulp.task("webserver", function() {
    return gulp.src("./dist/")
        .pipe(webserver({
            open: true,
            port: 8082,
            livereload: true,
            proxies: [{
                source: "/api/list",
                target: "http://localhost:3000/api/list"
            }, {
                source: "/api/getMore",
                target: "http://localhost:3000/api/getMore"
            }]
        }))
})
gulp.task("watch", function() {
    return gulp.watch("./src/scss/**/*.scss", gulp.series("sass"))
})
gulp.task("dev", gulp.series("sass", "webserver", "watch"))
gulp.task("build", gulp.parallel("css", "js", "img", "html", "page", "copy"))
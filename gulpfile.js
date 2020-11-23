const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task("clean", function() {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", function () {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({
            stream: true
        }))
});
task("copy:images", function () {
    return src(`${SRC_PATH}/img/**/*`)
        .pipe(dest(`${DIST_PATH}/img`))
        .pipe(reload({
            stream: true
        }))
});
task("copy:video", function () {
    return src(`${SRC_PATH}/video/**/*`)
        .pipe(dest(`${DIST_PATH}/video`))
        .pipe(reload({
            stream: true
        }))
});
task("copy:svg", function () {
    return src(`${SRC_PATH}/svg/**/*`)
        .pipe(dest(`${DIST_PATH}/svg`))
        .pipe(reload({
            stream: true
        }))
});

/* Таск из урока */
// task("styles", function () {
//     return src(stylesLibs)
//         .pipe(sourcemaps.init())
//         .pipe(concat('main.scss'))
//         .pipe(sassGlob())
//         .pipe(sass().on('error', sass.logError))
//         // .pipe(px2rem())
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(gcmq())
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(sourcemaps.write())
//         .pipe(dest('dist/styles'))
//         .pipe(reload({stream: true}));
// });
/* Таск из урока */

/** Не по уроку ))) */
/** Тут мы компилируем sass стили и кладём готовый css файл */
task("sass", function () {
    return src('src/styles/main.scss')
        .pipe(gulpif(env == "dev", sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${SRC_PATH}/styles`))
        .pipe(reload({
            stream: true
        }));
});
/** Тут мы берем  */
task("styles", function () {
    return src([...STYLES_LIBS, 'src/styles/main.css'])
        .pipe(gulpif(env == "dev", sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulpif(env == "prod", gcmq()))
        .pipe(gulpif(env == "prod", cleanCSS({
            compatibility: 'ie8'
        })))
        .pipe(gulpif(env == "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/styles`))
        .pipe(reload({
            stream: true
        }));
});
/** Не по уроку ))) */

task("scripts", () => {
    return src([...JS_LIBS, "src/js/*.js"])
        .pipe(gulpif(env == "dev", sourcemaps.init()))
        .pipe(concat('main.min.js', {newLine: ";"}))
        .pipe(gulpif(env == "prod",
            babel({
                presets: ['@babel/env']
            })
        ))
        .pipe(gulpif(env == "prod", uglify()))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
});

task("icons", () => {
    return src(`${SRC_PATH}/svg/*.svg`)
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {  attrs:  "(stroke|style|width|height|data.*)" }
            }
        ]
    }))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "sprite.svg"
            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/svg/`));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        open: false
    });
});

task('watch', () => {
    watch('src/styles/**/*.scss', series('sass', 'styles'));
    watch('src/*.html', series('copy:html'));
    watch('src/js/*.js', series('scripts'));
    watch('src/video/*.mp4', series('copy:video'));
    watch('src/svg/*.svg', series('icons'));
});


task("default", series(
    "clean", "sass", "styles",
    parallel("copy:html", "copy:images","copy:svg","scripts","icons","copy:video"),
    parallel("watch", "server")
 ));

task("build", series("clean", parallel("copy:html", "copy:images", "copy:svg", "sass",
"styles", "scripts", "icons", "copy:video")));
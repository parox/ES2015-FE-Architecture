var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');


const distPath = 'dist';
const srcPath = 'src';
const testPath = 'test';
const paths = {
    
    fonts: `${srcPath}/fonts/**/*`,
    i18n: `${srcPath}/i18n/**/*`,
    images: `${srcPath}/images/**/*`,
    scripts: [
        `${srcPath}/**/*.js`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    styles: [`${srcPath}/**/*.scss`],
    views: `${srcPath}/**/*.html`,
    
    test: [`${testPath}/{app,components}/**/*.{spec,mock}.js`],

    bower: `${srcPath}/bower_components/`
    
};




//	---------------------------------------------------------------
//				Task to clean the dist folder
//	---------------------------------------------------------------
gulp.task('cleanDist', function () {
  return del([`${distPath}/*`]);
});



//jsHint
//babeljs
//jsMinified
//jsConcat
//includeJs

//cssHint
//sassCompile
//cssMinified
//cssConcat
//includeCss

//buildDev
//buildDeploy
//runTests

//default => buildDev



gulp.task("default", function () {
  return gulp.src("src/scripts/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
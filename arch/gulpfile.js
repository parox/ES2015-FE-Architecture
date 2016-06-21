var gulp = require("gulp");

var del = require('del');
var eslint = require('gulp-eslint');
var babel = require("gulp-babel");

const srcPath  = 'src';
const distPath = 'dist';
const tempPath = 'temp';
const testPath = 'test';

const paths = {
    
    fonts: `${srcPath}/fonts/**/*`,
    i18n: `${srcPath}/i18n/**/*`,
    images: `${srcPath}/images/**/*`,
    scripts: [
        `${srcPath}/scripts/**/*.js`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    styles: [`${srcPath}/**/*.scss`],
    views: `${srcPath}/**/*.html`,
    
    test: [`${testPath}/{app,components}/**/*.{spec,mock}.js`],

    bower: `${srcPath}/bower_components/`
    
};




//	----------------------------------------------------------------------------------
//	Task to clean the dist folder
//	----------------------------------------------------------------------------------
gulp.task('clean', function () {
  return del([`${distPath}/*`, `${tempPath}/*`]);
});


//	----------------------------------------------------------------------------------
//	Task to identifying and reporting on patterns found in ECMAScript/JavaScript code.
//	----------------------------------------------------------------------------------
gulp.task('esLint', function () {
    return gulp
	    .src(`${paths.scripts}`)
	    .pipe(eslint())
	    .pipe(eslint.format());
});



//	----------------------------------------------------------------------------------
//	Task to transpile the js files to ES2015 babeljs task
//	----------------------------------------------------------------------------------
gulp.task('babelTranspile', () => {
	return gulp
		.src(`${paths.scripts}`)
		.pipe(babel({
			plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest(`${tempPath}`));
});









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
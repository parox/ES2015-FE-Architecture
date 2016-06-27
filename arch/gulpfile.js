var gulp = require("gulp");

var del = require('del');
var eslint = require('gulp-eslint');
var babel = require("gulp-babel");
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var sassLint = require('gulp-sass-lint');
var sass = require('gulp-sass');

const srcPath  = 'src';
const distPath = 'dist';
const tempPath = 'temp';
const testPath = 'test';

const scriptPath = 'scripts';
const indexPagePath = 'index.html';

const concatenatedJs = 'all-in-one.js';

const paths = {
    
    fonts: `${srcPath}/fonts/**/*`,
    i18n: `${srcPath}/i18n/**/*`,
    images: `${srcPath}/images/**/*`,
    scripts: [
        `${srcPath}/scripts/**/*.js`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    scriptsTemp: [
        `${tempPath}/${scriptPath}/**/*.js`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    
    styles: [`${srcPath}/**/*.s+(a|c)ss`],
    
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
gulp.task('babeljs', () => {
	return gulp
		.src(`${paths.scripts}`)
		.pipe(babel({
			plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to minify the js files from temp folder
//	---------------------------------------------------------------------------------- 
gulp.task('minifyjs', function() {
  return gulp
  	.src(`${paths.scriptsTemp}`)
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }//,
        //exclude: ['tasks'],
        //ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to concat the js files from temp folder
//	----------------------------------------------------------------------------------  
gulp.task('concatjs', function() {
  return gulp
  	.src(`${paths.scriptsTemp}`)
    .pipe(concat(`${concatenatedJs}`))
    .pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to include the js files into html
//	----------------------------------------------------------------------------------  


gulp.task('includejs:deploy', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${scriptPath}/${concatenatedJs}`], {read: false});

  return target
  	.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(`${tempPath}`));
});

gulp.task('includejs:dev', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${scriptPath}/**/*.js`], {read: false});

  return target
  	.pipe(inject(sources, {relative: true, ignorePath: `./${tempPath}/${scriptPath}/${concatenatedJs}`}))
    .pipe(gulp.dest(`${tempPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to check sass files standards
//	----------------------------------------------------------------------------------  


gulp.task('sassLint', function () {
  return gulp.src(`${paths.styles}`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});



//	----------------------------------------------------------------------------------
//	Task to check sass files standards
//	----------------------------------------------------------------------------------  


gulp.task('sassCompile', function () {
  return gulp.src(`${paths.styles}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${tempPath}`));
});



//cssMinified
//cssConcat
//includeCss

//buildDev
//buildDeploy
//runTests

//default => buildDev


//hotdeploy



gulp.task("default", function () {
  return gulp.src("src/scripts/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
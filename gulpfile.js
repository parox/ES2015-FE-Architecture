var gulp = require("gulp");

var del = require('del');
var eslint = require('gulp-eslint');
var babel = require("gulp-babel");
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var sassLint = require('gulp-sass-lint');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var gulpsync = require('gulp-sync')(gulp);
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;

const mainPath = '';
const srcPath  = 'src';
const distPath = 'dist';
const tempPath = 'temp';
const testPath = 'test';

const scriptPath = 'scripts';
const stylesPath = 'styles';
const fontsPath = 'fonts';
const i18nPath = 'i18n';
const imagesPath = 'images';
const thirdPartyPath = 'thirdparty';
const viewsPath = 'views';

const bowerJsonPath = './bower.json';
const bowerComponentsPath = 'bower_components';

const indexPagePath = 'index.html';
const viewsExtension = 'html';
const fontsExtensions = '{ttf,woff,eof,svg}';
const scriptsExtension = 'js';
const es6Extension = 'es6.js';

const concatenatedJs = 'all-in-one.js';
const concatenatedCss = 'all-in-one.css';


const paths = {
    
    fonts: `${srcPath}/fonts/**/*`,
    i18n: `${srcPath}/i18n/**/*`,
    images: `${srcPath}/images/**/*`,
    scripts: [
        `${srcPath}/scripts/**/*.js`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    babelscripts: [
        `${srcPath}/scripts/**/*.${es6Extension}`//,
        //`!${srcPath}/bower_components/**/*`
    ],
    scriptsTemp: [
        `${tempPath}/${scriptPath}/**/*.js`,
        `!${tempPath}/${scriptPath}/**/*.${es6Extension}`
    ],
    scriptsConcat: [
    	`${tempPath}/${scriptPath}/**/*min.js`,
    ],
    scriptsConcatExclude: [
    	`${tempPath}/${scriptPath}/**/*min.js`,
    ],
    
    styles: [`${srcPath}/${stylesPath}/**/*.s+(a|c)ss`],
    stylesDist: [`${distPath}/styles`],
    stylesTemp: [`${tempPath}/${stylesPath}/**/*.css`],
    
    views: `${srcPath}/**/*.html`,
    
    test: [`${testPath}/{app,components}/**/*.{spec,mock}.js`],

    bower: `${srcPath}/bower_components/`
    
};



//	----------------------------------------------------------------------------------
//	Task to clean the dist folder
//	----------------------------------------------------------------------------------
gulp.task('clean:dist', function () {
  return del([`${distPath}/*`]);
});

gulp.task('clean:temp', function () {
  return del([`${tempPath}`]);
});

gulp.task('clean:bowerComponent', function () {
  return del([`${bowerComponentsPath}*`]);
});

gulp.task('clean', gulpsync.sync([
	'clean:dist',
	'clean:temp'
]));

//	----------------------------------------------------------------------------------
//	Task to identifying and reporting on patterns found in ECMAScript/JavaScript code.
//	----------------------------------------------------------------------------------
gulp.task('esLint', function () {
    return gulp
	    .src(`${paths.babelscripts}`)
	    .pipe(eslint())
	    .pipe(eslint.format());
});


//	----------------------------------------------------------------------------------
//	Task to transpile the js files to ES2015 babelJs task
//	----------------------------------------------------------------------------------
gulp.task('babelJs', () => {
	return gulp
		.src(`${paths.babelscripts}`)
		.pipe(babel({
			plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to minify the js files from temp folder
//	---------------------------------------------------------------------------------- 
gulp.task('minifyJs', function() {
	
  return gulp
  	.src(`${tempPath}/${scriptPath}/**/*.${scriptsExtension}`)
    .pipe(minify({
        ext:{
            src:'.js',
            min:`.min.${scriptsExtension}`
        },
        exclude: [`.min.js$`, `${concatenatedJs}`]
    }))
    .pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});

//	----------------------------------------------------------------------------------
//	Task to remove the js files that are not minified
//	---------------------------------------------------------------------------------- 
gulp.task('removeUnminifiedFiles', function() {
	
	return del([
		`${tempPath}/${scriptPath}/**/*.js`,
		`!${tempPath}/${scriptPath}/**/*min.js`
	]);
});


//	----------------------------------------------------------------------------------
//	Task to remove the js files that are not minified
//	---------------------------------------------------------------------------------- 
gulp.task('removeUnconcatenatedFiles', function() {
	
	return del([
		//	Scripts
		`${tempPath}/${scriptPath}/**/*min.js`,
		`${tempPath}/${scriptPath}/**/*/`,
		`!${tempPath}/${scriptPath}/${concatenatedJs}`,

		//	Styles
		`${tempPath}/${stylesPath}/**/*.css`,
		`${tempPath}/${stylesPath}/**/*/`,
		`!${tempPath}/${stylesPath}/${concatenatedCss}`
	]);
});



//	----------------------------------------------------------------------------------
//	Task to concat the js files from temp folder
//	----------------------------------------------------------------------------------  
gulp.task('concatJs', function() {
  return gulp
  	.src([`${paths.scriptsConcatExclude}`])
    .pipe(concat(`${concatenatedJs}`))
    .pipe(gulp.dest(`${tempPath}/${scriptPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to include the js files into html
//	----------------------------------------------------------------------------------  


gulp.task('includeJs:deploy', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${scriptPath}/${concatenatedJs}`], {read: false});

  return target
  	.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(`${tempPath}`));
});

gulp.task('includeJs:dev', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${scriptPath}/**/*.js`], {read: false});

  return target
  	.pipe(inject(sources, {
  		relative: true, 
  		ignorePath: `./${tempPath}/${scriptPath}/${concatenatedJs}`
  	}))
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
    .pipe(gulp.dest(`${tempPath}/${stylesPath}`));
});



//	----------------------------------------------------------------------------------
//	Task to minify css files
//	----------------------------------------------------------------------------------  


gulp.task('minifyCss', function() {
  return gulp.src(`${tempPath}/${stylesPath}/**/*.css`)
    .pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest(`${tempPath}/${stylesPath}`));
});


//	----------------------------------------------------------------------------------
//	Task to concat the js files from temp folder
//	----------------------------------------------------------------------------------  
gulp.task('concatCss', function() {
  return gulp
  	.src(`${paths.stylesTemp}`)
    .pipe(concat(`${concatenatedCss}`))
    .pipe(gulp.dest(`${tempPath}/${stylesPath}`));
});


//	----------------------------------------------------------------------------------
//	Task to include the js files into html
//	----------------------------------------------------------------------------------  


gulp.task('includeCss:deploy', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${stylesPath}/${concatenatedCss}`], {read: false});

  return target
	
  	.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(`${tempPath}`));
});

gulp.task('includeCss:dev', function () {
  var target = gulp
  	.src(`${tempPath}/${indexPagePath}`);

  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([`./${tempPath}/${stylesPath}/**/*.css`], {read: false});

  return target
	
  	.pipe(inject(sources, {
  		relative: true, 
  		ignorePath: `./${tempPath}/${stylesPath}/${concatenatedCss}`
  	}))
    .pipe(gulp.dest(`${tempPath}`));
});



gulp.task('bower', function() {
  return bower({ 
  	cmd: 'install',
  	cwd: (`${mainPath}`), 
  	directory: `${bowerComponentsPath}`,
  	interactive: true
  });
});

gulp.task('bower:deploy', function() {
  return bower({ 
  	cmd: 'install',
  	cwd: (`${mainPath}`), 
  	directory: `${bowerComponentsPath}`,
  	interactive: true
  });
});


gulp.task('bowerInject', function () {
	
	return gulp
		.src(`${tempPath}/${indexPagePath}`)
		.pipe(wiredep({
    		directory: `${bowerComponentsPath}`,
    		bowerJson: require(`${bowerJsonPath}`)
		}))
		.pipe(gulp.dest(`${tempPath}`));

});

gulp.task('copyBower:temp', function () {
	console.log(`${bowerComponentsPath}`);
	return gulp
		.src(`${bowerComponentsPath}/**/*`)
		.pipe(gulp.dest(`${tempPath}/${bowerComponentsPath}`));

});




//	----------------------------------------------------------------------------------
//	Task to copy files to temp folder
//	----------------------------------------------------------------------------------  
gulp.task('copy:fonts', function() {
  return gulp
    .src(`./${srcPath}/${fontsPath}/**/*.${fontsExtensions}`)
    .pipe(gulp.dest(`./${tempPath}/${fontsPath}`));
});

gulp.task('copy:i18n', function() {
  return gulp
    .src(`./${srcPath}/${i18nPath}/**/*`)
    .pipe(gulp.dest(`./${tempPath}/${i18nPath}`));
});

gulp.task('copy:images', function() {
  return gulp
    .src(`./${srcPath}/${imagesPath}/**/*`)
    .pipe(gulp.dest(`./${tempPath}/${imagesPath}`));
});

gulp.task('copy:thirdparty', function() {
  return gulp
    .src(`./${srcPath}/${thirdPartyPath}/**/*`)
    .pipe(gulp.dest(`./${tempPath}/${thirdPartyPath}`));
});

gulp.task('copy:views', function() {
  return gulp
    .src([`./${srcPath}/**/*.${viewsExtension}`])

    .pipe(gulp.dest(`./${tempPath}`));
});

gulp.task('copy:scripts', function() {
  return gulp
    .src([`./${srcPath}/**/*.${scriptsExtension}`, `!${srcPath}/**/*.${es6Extension}`])
    .pipe(gulp.dest(`./${tempPath}`));
});

gulp.task('copyToDist', function() {
  return gulp
    .src(`./${tempPath}/**/*`)
    .pipe(gulp.dest(`./${distPath}`));
});




//	----------------------------------------------------------------------------------
//	Task to build Development Enviroment files to dist
//	----------------------------------------------------------------------------------  
gulp.task('dev', gulpsync.sync([
	'clean',
	'copy:views',
	'copy:fonts',
	'copy:i18n',
	'copy:images',
	'copy:thirdparty',
	
	'sassLint',
	'sassCompile',
	'includeCss:dev',

	'esLint',
	'babelJs',
	'copy:scripts',
	'includeJs:dev',

	'bower',
	'copyBower:temp',
	'bowerInject',

	'copyToDist',
	'clean:temp'
]));


//	----------------------------------------------------------------------------------
//	Task to build Production Enviroment files to dist
//	----------------------------------------------------------------------------------  
gulp.task('deploy', gulpsync.sync([
	'clean',
	'clean:bowerComponent',
	'copy:views',
	'copy:fonts',
	'copy:i18n',
	'copy:images',
	'copy:thirdparty',
	
	'sassLint',
	'sassCompile',
	'minifyCss',
	'concatCss',
	'includeCss:deploy',
	
	'esLint',
	'babelJs',
	'copy:scripts',
	'minifyJs',
	'removeUnminifiedFiles',
	'concatJs',
	'removeUnconcatenatedFiles',
	'includeJs:deploy',

	'bower:deploy',
	'copyBower:temp',
	'bowerInject',

	'copyToDist',
	'clean:temp'
]));


//runTests
//hotdeploy



gulp.task("default", ['dev']);
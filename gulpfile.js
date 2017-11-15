

	var SrcDir = './src',
		BuildDir = './build',
		gulp = require( 'gulp' ),
		sass = require( 'gulp-sass' ),
		csso = require( 'gulp-csso' ),
		csscomb = require( 'gulp-csscomb' ),
		jade = require( 'gulp-jade' ),
		connect = require( 'gulp-connect' )

	gulp.task( 'server', function() {
		connect.server({
			root: BuildDir,
			livereload: true,
			port: 8080
		});
	});

	gulp.task( 'build-sass', function() {
		gulp.src( SrcDir + '/sass/**/*.sass' )
			.pipe( sass( { includePaths: require( 'node-normalize-scss' ).includePaths } ).on( 'error', sass.logError ) )
			.pipe( csscomb() )
			.pipe( gulp.dest( BuildDir +'/css' ) )
			.pipe( csso( { sourceMap: false } ) )
			.pipe( gulp.dest( BuildDir + '/css/min/' ) )
			.pipe( connect.reload() )
	});
	
	gulp.task( 'build-jade', function() {
		gulp.src( SrcDir + '/templates/*.jade' )
			.pipe( jade( { 
				pretty: true
			}).on( 'error', function( error ) { console.log( error ); } ) )
			.pipe( gulp.dest( BuildDir ) )
			.pipe( connect.reload() )
	});

	gulp.task( 'build', [ 'build-sass', 'build-jade' ] );

	gulp.task( 'watch', function() {
		gulp.watch( SrcDir + '/sass/**/*.sass', [ 'build-sass' ] );
		gulp.watch( SrcDir + '/templates/*.jade', [ 'build-jade' ] );
	});


	gulp.task( 'default', [ 'build', 'server', 'watch' ] );

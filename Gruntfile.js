'use strict';

// # Globbing
// only matching one level down:
// 'test/spec/{,*/}*.js'
// recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		public: require('./bower.json').appPath || 'public',
		app:    (require('./bower.json').appPath || 'public') + '/app',
		assets: (require('./bower.json').appPath || 'public') + '/assets',
		dist:   'dist',
		build:  'public/build'
	};

	var settings = {
		spawn: true
	};

	// Project configuration.
	grunt.initConfig({

		// Project settings
		zz: appConfig,

		watch:  {
			js:  {
				files:   ['<%= zz.app %>/**/*.js'],
				tasks:   ['concat:js'],
				options: {
					spawn: settings.spawn
				}
			},
			css: {
				files: ['<%= zz.assets %>/css/**/*.scss'],
				tasks: ['sass']
			}
		},
		concat: {
			js:  {
				src:  ['<%= zz.app %>/**/*.js'],
				dest: '<%= zz.build %>/js/scripts.js'
			},
			css: {
				src:  ['<%= zz.assets %>/css/*.css'],
				dest: '<%= zz.build %>/css/styles.css'
			}
		},
		sass:   {
			dist: {
				files: {
					'<%= zz.assets %>/css/app.css': '<%= zz.assets %>/css/app.scss'
				}
			}
		},
	});


	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', [
		'concat',
		'sass'
	]);

	// Default task(s).
	grunt.registerTask('default', [
		'build',
		'watch'
	]);

};
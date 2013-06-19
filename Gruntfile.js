module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: '"use strict";(function(window){',
				footer: '}).call(this, window);'
			},
			all: {
				src: [
					'src/mantra.js'
				],
				dest: '<%= pkg.main %>'
			},
			build: {
				src: [
					'.build/mantra.min.js'
				],
				dest: '<%= pkg.main.replace(".js", ".min.js") %>'
			}
		},

		copy: {

		},

		'closure-compiler': {
			build: {
				closurePath: '/usr/local/Cellar/closure-compiler/20130411/libexec/',
				js: '<%= concat.all.dest %>',
				jsOutputFile: '.build/mantra.min.js',
				maxBuffer: 500,
				options: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT',
					formatting: 'PRETTY_PRINT'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-closure-compiler');

	// Default task(s).
	grunt.registerTask('default', ['concat:all', 'closure-compiler', 'concat:build']);

};

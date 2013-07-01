module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			all: {
				options: {
					banner: '"use strict";(function(window){',
					footer: '}).call(this, window);'
				},
				src: [
					'src/Mantra.js',
					'src/gestures/gestures.js',
					'src/gestures/Dispecher.js',
					'src/gestures/Gesture.js',
					'src/gestures/Tap.js',
					'src/core.js'
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

		clean: {
			build: ['.build/*']
		},

		copy: {

		},

		jshint: {
			all: [
				'Gruntfile.js',
				'src/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		'closure-compiler': {
			build: {
				js: '<%= concat.all.dest %>',
				jsOutputFile: '.build/mantra.min.js',
				maxBuffer: 500,
				options: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					//compilation_level: 'SIMPLE_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT',
					formatting: 'PRETTY_PRINT'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-closure-compiler');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['test', 'concat:all', 'clean:build', 'closure-compiler', 'concat:build']);

};

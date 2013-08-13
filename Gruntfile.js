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
					'src/utils/support.js',
					'src/utils/define.js',
					'src/utils/store.js',
					'src/GestureDetector.js',
					'src/GestureDispatcher.js',
					'src/Gesture.js',
					'src/gestures/gestures.js',
					'src/gestures/Tap.js'
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
					formatting: 'PRETTY_PRINT',
					language_in: 'ECMASCRIPT5_STRICT'
				}
			}
		},

		jquery: {
			dist: {
				output: "examples/jquery",
				versions: ['2.0.0']
			}
		},

		modernizr: {
			devFile: 'examples/modernizr/modernizr.js',
			outputFile: 'examples/modernizr/modernizr.js',
			"extra" : {
				"shiv" : false,
				"printshiv" : false,
				"load" : false,
				"mq" : false,
				"cssclasses" : true
			},

			"extensibility" : {
				"addtest" : true,
				"prefixed" : true,
				"teststyles" : true,
				"testprops" : true,
				"testallprops" : true,
				"hasevents" : true,
				"prefixes" : true,
				"domprefixes" : true
			},

			"uglify" : false,

			"tests" : [
				'touch'
			],

			"parseFiles" : true,

			"files" : ['src/**/*.js'],

			"matchCommunityTests" : false,

			"customTests" : []

		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks("grunt-jquery-builder");
	grunt.loadNpmTasks("grunt-modernizr");

	grunt.registerTask('libs', ['jquery', 'modernizr']);

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['test', 'concat:all', 'clean:build', 'closure-compiler', 'concat:build']);

};

/*
 * grunt-rappar
 * https://github.com/netbek/grunt-rappar
 *
 * Copyright (c) 2015 Hein Bekker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		clean: {
			tests: ['tmp', 'test/files/dest']
		},
		rappar: {
			tests: {
				options: {
					prepend: "window.App.library.shape['@@filename'] = ",
					append: ";"
				},
				files: [{cwd: 'test/files/src/', src: ['*.svg'], dest: 'test/files/dest/'}]
			}
		},
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'rappar', 'nodeunit']);

	grunt.registerTask('default', ['jshint', 'rappar']);

};

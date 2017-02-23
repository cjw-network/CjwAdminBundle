/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {
  var angularjs = 'angular-1.6.2';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('../../package.json'),

    // https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    concat: {
      core_js: {
        src: [ angularjs+'/angular.min.js', angularjs+'/angular-route.min.js', angularjs+'/angular-cookies.min.js', angularjs+'/angular-animate.min.js'],
        dest: '../../build/lib/angular.js'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      build: {
        src: '../../build/lib/angular.js',
        dest: '../../../Resources/public/js/angular.test.min.js'
      }
    }
  });

  // Load the plugins that task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};

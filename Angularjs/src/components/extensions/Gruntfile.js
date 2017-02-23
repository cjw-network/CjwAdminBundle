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
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('../../../package.json'),

    // https://npmjs.org/package/grunt-angular-templates
    ngtemplates: {
      ezpAppExtensions: {
        options: {
          htmlmin: {
// ToDo: some options conflicts with modal layout inline css
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
//            keepClosingSlash:               true, // Only if you are using SVG in HTML
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        },
//        cwd:  'src/components/extensions',
        src:  ['**/*.html'],
        dest: '../../../build/extensions/templates.js'
      }
    },

    // https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    concat: {
      extensions_js: {
        src: ['**/*.js', '../../../build/extensions/templates.js', '!Gruntfile.js'],
        dest: '../../../build/extensions/app.js'
      },
      extensions_css: {
        src: ['**/*.css'],
        dest: '../../../build/extensions/app.css'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      build: {
        src: '../../../build/extensions/app.js',
        dest: '../../../../Resources/public/js/extensions.min.js'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      minify: {
        expand: false,
        src: '../../../build/extensions/app.css',
        dest:'../../../../Resources/public/css/extensions.min.css'
      }
    }
  });

  // Load the plugins that task.
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin']);
};

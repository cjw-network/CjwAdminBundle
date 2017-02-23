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
    pkg: grunt.file.readJSON('package.json'),

  // https://github.com/gruntjs/grunt-contrib-htmlmin
/*
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'src/components/core/index.html': '../Resources/views/Default/index.html'
        }
      }
    },
*/
    // https://npmjs.org/package/grunt-angular-templates
    ngtemplates: {
      ezpAppCore: {
        options: {
          htmlmin: {
/* ToDo: some options conflicts with modal layout inline css
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
//            keepClosingSlash:               true, // Only if you are using SVG in HTML
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
*/
          }
        },
        cwd:  'src/components/core',
        src:  ['**/*.html'],
        dest: 'build/core/templates.js'
      }
    },

    // https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    concat: {
      core_js: {
        src: ['src/components/core/app.js', 'build/core/templates.js', 'src/components/core/**/*.js'],
//        dest: '../Resources/public/js/app.min.js'
        dest: 'build/core/app.js'
      },
      core_css: {
        src: ['src/components/core/*.css', 'src/components/core/**/*.css'],
        dest: 'build/core/app.css'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      build: {
        src: 'build/core/app.js',
        dest: '../Resources/public/js/app.min.js'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      minify: {
        expand: false,
        src: 'build/core/app.css',
        dest:'../Resources/public/css/app.min.css'
      }
    }
  });

  // Load the plugins that task.
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
//  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin']);
};

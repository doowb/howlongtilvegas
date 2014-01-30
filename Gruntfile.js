/*
 * Brian Woodward <https://github.com/doowb>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports = function (grunt) {

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Metadata for tests
    pkg: grunt.file.readJSON('package.json'),

    // Metadata for banners
    meta: {
      license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
      copyright: 'Copyright (c) <%= grunt.template.today("yyyy") %>',
      banner: [
        '/* \n',
        ' * <%= pkg.name %> v<%= pkg.version %> \n',
        ' * \n',
        ' * <%= meta.copyright %>, <%= pkg.author.name %> \n',
        ' * Licensed under the <%= meta.license %> License. \n',
        ' * \n',
        ' */ \n\n'
      ].join('\n')
    },

    /**
     * Lint all JavaScript
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'test/**/*.js'
      ]
    },

    /**
     * Run mocha tests.
     */
    mochaTest: {
      tests: {
        options: {
          reporter: 'progress'
        },
        src: ['test/**/*_test.js']
      }
    },

    /**
     * Build the README using metadata from the repos task.
     */
    readme: {
      options: {
        boilerplate: 'node-util'
      }
    },

    /**
     * Before generating any new files,
     * remove files from the previous build
     */
    clean: {
      tests: ['test/actual/**/*']
    },

    /**
     * Watch source files and run tests when changes are made.
     */
    watch: {
      dev: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['dev']
      }
    }

  });

  // Load NPM plugins to provide the necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-sync-pkg');

    // Build
  grunt.registerTask('docs', ['readme', 'sync']);

  // Tests to be run.
  grunt.registerTask('test', ['mochaTest']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'test', 'docs']);

  // Dev task.
  grunt.registerTask('dev', ['jshint', 'test', 'watch']);
};
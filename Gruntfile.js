module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
       all: ['src/js/**/*.js']
    },
    watch:{
      js:{
        files:['src/js/*.js'],
        tasks:['jshint'],
        options:{
          spawn:false
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['src/js/**/*.js'],
        dest: 'dist/built.js'
      },
      css: {
        src: ['src/css/**/*.css'],
        dest: 'dist/built.css'
      }
    },

    connect: {
      dist: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: 'dist'
        }
      }
    },
    protractor: {
      local: {
        options: {
          configFile: "protractor-local.conf.js"
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/built.min.css': ['src/css/**/*.css']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/built.min.js': ['src/js/**/*.js']
        }
      }
  }
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', [
    'build',
    'connect:dist',
    'protractor:local'
  ]);

};
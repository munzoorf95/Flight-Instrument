'use strict';

module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-execute');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/mocha/*.js']
      }
    },
    eslint: {
      // define the files to lint
      target: ['lib/*.js','*.js']
    },
    babel: {
      options: {
        sourceMap:true
      },
      dist: {
        files: {
          'dist/makeAltimeter.js' : 'lib/makeAltimeterES6.js'
        }
      }
    },
    execute: {
      examples: {
        options: {
          args: ['example/gg.template', 'example/gg.html']
        },
        src: ['lib/preprocess.js']
      }
    },
    watch : {
      files: ['!.git/**','!node_modules/**'],
      js: {
        files: ['../Gruntfile.js', '*.js','lib/*.js'],
        tasks: ['eslint']
      }
    }
  });

  grunt.event.on('watch',function(action,filepath,target) {
    grunt.log.writeln(target + ':' + filepath + ':' + action);
  });

  grunt.registerTask('build',['execute:examples']);
  grunt.registerTask('default', ['eslint','babel']);
};

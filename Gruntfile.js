'use strict';

module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');

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
      target: ['lib/*.js','gg.js']
    },
    execute: {
      altimeter: {
        options: {
          args: ['example/static/altimeter.template', 'example/static/altimeter.html']
        },
        src: ['lib/preprocess.js']
      },
      airspeed: {
        options: {
          args: ['example/static/airspeed.template', 'example/static/airspeed.html']
        },
        src: ['lib/preprocess.js']
      },
      heading: {
        options: {
          args: ['example/static/heading.template', 'example/static/heading.html']
        },
        src: ['lib/preprocess.js']
      },
      turn: {
        options: {
          args: ['example/static/turn.template', 'example/static/turn.html']
        },
        src: ['lib/preprocess.js']
      },
      vsi: {
        options: {
          args: ['example/static/vsi.template', 'example/static/vsi.html']
        },
        src: ['lib/preprocess.js']
      },
      attitude: {
        options: {
          args: ['example/static/attitude.template', 'example/static/attitude.html']
        },
        src: ['lib/preprocess.js']
      },
      panel: {
        options: {
          args: ['example/static/panel.template', 'example/static/panel.html']
        },
        src: ['lib/preprocess.js']
      },
      jsdoc: {
        options: {
          args: ['-d','./doc','gg.js']
        },
        src: ['node_modules/jsdoc/jsdoc.js']
      }
    },
    uglify : {
      my_target: {
        files: {
          'gg.min.js': ['gg.js']
        }
      }
    },
    watch : {
      options: {
        livereload: true
      },
      files: ['example/static/*.html','example/client/*.html','!.git/**','!node_modules/**'],
      js: {
        files: ['../Gruntfile.js', '*.js','lib/*.js'],
        tasks: ['eslint','uglify']
      },
      html : {
        files:['example/static/*.template','example/static/*.svg'],
        tasks:['build']
      },
      jsdoc: {
        files: ['gg.js'],
        tasks: ['execute:jsdoc']
      }
    }
  });

  /*
  grunt.event.on('watch',function(action,filepath,target) {
    grunt.log.writeln(target + ':' + filepath + ':' + action);
  });
  */

  grunt.registerTask('build',
    ['execute:altimeter',
     'execute:airspeed',
     'execute:heading',
     'execute:turn',
     'execute:attitude',
     'execute:vsi',
     'execute:panel'
   ]);

  grunt.registerTask('default', ['eslint','build']);
};

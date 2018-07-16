module.exports = function(grunt) {
  var target = grunt.option('env') || 'production';
  /* Whether or not to compile the Japanese locale into it. */
  var include_locale = grunt.option('ja') || false;

  /* Figure out our concat targets... */
  var concat_globs = []

  if (target == 'grunt-build-test') {
    concat_globs.unshift('grunt-build-test/*')
  } else {
    concat_globs.unshift('js/*')
  }

  if (include_locale) {
    concat_globs.unshift('locale/ja_JP.json')
  }

  /* Because of the reliance on numeric keys, we have to do our file globbing
   * outside of the standard `grunt` way of doing things. */
  var glob = require('glob')
  var concat_targets = new Array;
  for (i = 0; i < concat_globs.length; i++) {

    ret = glob(concat_globs[i], {sync: true});

    concat_targets.push.apply(concat_targets, ret)

  }

  /* Sorts by the numeric keys only. Alphabetic keys ignored. If you have
   * 00-one.js and 00-two.js, there is no guarantee that 00-two.js won't come
   * first. Use the numeric key system to reach Nirvana. */
  concat_targets.sort(function(a, b) {
    return(parseInt(a.replace(/\D/g, ""), 10) - 
           parseInt(b.replace(/\D/g, ""), 10))
  });

  grunt.initConfig({
    "merge-json": {
      'locale/ja_JP.json': ['locale/ja_JP/*'],
    },
    concat: {
      my_target: {
        files: {
          'locale/ja_JP.json': ['locale/locale_header', 'locale/ja_JP.json'],
          'main.js': concat_targets,
          'stats-only-dbg.js': ['js/00-sparkline.js', 'js/00-threadinfo.js', 'js/01-stats.js']
        }
      }
    },
    uglify: {
      my_target: {
        options: { 
          mangle: { properties: true },
          /* Very important for Shift-JIS support! */ 
          output: { ascii_only: true }
        },
        files: {
          'main.min.js': ['main.js'],
          'stats-only-dbg.min.js': ['stats-only-dbg.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-merge-json');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var tasks = ['merge-json', 'concat', 'uglify'];
  
  grunt.registerTask('default', tasks);
};


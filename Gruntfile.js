module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/* jQuery Shmack v<%= pkg.version %>\n' +
      ' * By Matt Rose - mattrose.ca\n' +
      ' * Licensed MIT */\n',
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'jquery.shmack.js',
        dest: 'jquery.shmack.min.js'
      }
    }
  });

  // Default task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);

};

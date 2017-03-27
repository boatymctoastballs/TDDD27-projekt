
module.exports = function(grunt){

grunt.registerTask()
	grunt.initConfig({
  		concat: {
    		js: {
	      		src: ['js/main.js'],
	      		dest: 'build/js/scripts.js',
    		},
    		css: {
	      		src: ['css/bootstrap/bootstrap.css','css/main.css'],
	      		dest: 'build/css/fullCss.css',
    		},
  		},
  		watch: {
			js: {
				files: ['js/**/*.js'],
				tasks: ['concat:js'],
			},
			css: {
				files: ['css/**/*.css'],
				tasks: ['concat:css'],
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'watch'])
};
module.exports = function(grunt){

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		less:{
			dev:{
				files:{
					'css/style.css':'less/style.less'
				}
			}
		},

		watch:{
			options:{
				livereload:true
			},
			less:{
				files:['less/*.less'],
				tasks:['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
};
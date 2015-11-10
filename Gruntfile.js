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
		},

		uglify:{
			dev:{
				files:{
					'dev/js/main.js': 'js/main.js'
				}
			}
		},

		cssmin:{
			dev:{
				files:{
					'dev/css/style.css':['bower_components/normalize-css/normalize.css','css/style.css']
				}
			}
		},
		copy:{
			images:{
				expand:true,
				src:['**'],
				cwd:'images/',
				dest:'dev/images/',
				filter:'isFile'
			},
			index:{
				expand:true,
				src:['index.html'],
				cwd:'./',
				dest:'dev/',
				flatten:true,
				filter:'isFile'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('build',['less','cssmin','uglify','copy']);
};
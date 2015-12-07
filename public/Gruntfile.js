'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');

	var commonFiles = {
		styles: {
			vendors: [
				'components/bootstrap/bootstrap.css',
				'components/bootstrap/freelancer.css',
				'bower_components/jquery-ui/themes/overcast/jquery-ui.min.css',
				'bower_components/fontawesome/css/font-awesome.min.css',
				'bower_components/select2/select2.css',
				'bower_components/ngprogress/ngProgress.css',
				'bower_components/angular-ui-select/dist/select.min.css',
				'bower_components/angular-ui-grid/ui-grid.min.css"',
				'bower_components/ihover/src/ihover.min.css'
			],
			custom: [
				'assets/animations.css',
				'assets/style.css',
				'components/directives/createGame/createGame.css',
				'components/UIProgress/component.css'
			]
		},
		scripts: {
			vendors: [
				'bower_components/jquery/dist/jquery.js',
				'bower_components/jquery-ui/jquery-ui.js',
				'bower_components/jquery-placeholder/jquery.placeholder.js',
				'bower_components/select2/select2.js',
				'bower_components/angular/angular.js',
				'bower_components/angular-bootstrap/ui-bootstrap.js',
				'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
				'bower_components/angular-mocks/angular-mocks.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/angular-animate/angular-animate.js',
				'bower_components/ngprogress/build/ngProgress.js',
				'bower_components/angular-ui-select2/src/select2.js',
				'bower_components/angular-ui-select/dist/select.js',
				'bower_components/bootstrap/dist/js/bootstrap.js',
				'bower_components/angular-ui-utils/ui-utils.js',
				'bower_components/angular-ui-sortable/sortable.js',
				'bower_components/angular-ui-grid/ui-grid.js',
				'components/phaser/phaser.min.js',
				'components/UIProgress/modernizr.custom.js',
				'components/UIProgress/classie.js',
				'components/UIProgress/uiProgressButton.js'
			],
			custom: [
				'components/**/*.js',
				'!components/phaser/phaser.min.js',
				'!components/UIProgress/modernizr.custom.js',
				'!components/UIProgress/classie.js',
				'!components/UIProgress/uiProgressButton.js'
			]
		}
	};

	function scriptsSorter(pattern) {
		console.log(pattern);
		var scriptsPaths = grunt.file.expand(pattern);
		console.log(scriptsPaths);
		var result = scriptsPaths.sort(function (a, b) {
			var am = a.match(/-/g) || [],
				bm = b.match(/-/g) || [];
			return am.length - bm.length;
		});

		console.log(result);
		return result;
	}

	grunt.initConfig({
		copy: {
			build: {
				files: [
					{
						expand: true,
						flatten: true,
						src: 'bower_components/fontawesome/fonts/*',
						dest: 'teacher/assets/fonts'
					},
					{
						expand: true,
						flatten: true,
						src: 'bower_components/fontawesome/fonts/*',
						dest: 'pupil/assets/fonts'
					},
					{
						src: 'teacher/index2.html',
						dest: 'teacher/indexCopy.html'
					},
					{
						src: 'pupil/index2.html',
						dest: 'pupil/indexCopy.html'
					},
					{
						expand: true,
						src: 'assets/images/**',
						dest: 'teacher/'
					},
					{
						expand: true,
						src: 'assets/images/**',
						dest: 'pupil/'
					}
				]
			}
		},
		concat: {
			styles: {
				files: {
					'pupil/assets/styles/vendors.css': commonFiles.styles.vendors,
					'pupil/assets/styles/styles.css': commonFiles.styles.custom.concat([
						'pupil/**/*.css'
					]),

					'teacher/assets/styles/vendors.css': commonFiles.styles.vendors,
					'teacher/assets/styles/style.css': commonFiles.styles.custom.concat([
						'teacher/**/*.css'
					])
				}
			},
			scriptsPupil: {
				src: scriptsSorter(commonFiles.scripts.custom.concat([
					'pupil/**/*.js'
				])),
				dest: 'pupil/assets/scripts/scripts.js'
			},
			scriptsTeacher: {
				src: scriptsSorter(commonFiles.scripts.custom.concat([
					'teacher/**/*.js'
				])),
				dest: 'teacher/assets/scripts/scripts.js'
			},
			vendorsScriptsPupil: {

				src: commonFiles.scripts.vendors,
				dest: 'pupil/assets/scripts/vendors.js'
			},
			vendorsScriptsTeacher: {
				src: commonFiles.scripts.vendors,
				dest: 'teacher/assets/scripts/vendors.js'
			}
		},
		uglify: {
			'pupil/assets/scripts/scripts.min.js': ['pupil/assets/scripts/scripts.js'],
			'teacher/assets/scripts/scripts.min.js': ['teacher/assets/scripts/scripts.js'],
			'pupil/assets/scripts/vendors.min.js': ['pupil/assets/scripts/vendors.js'],
			'teacher/assets/scripts/vendors.min.js': ['teacher/assets/scripts/vendors.js']
		},
		usemin: {
			html: [
				'pupil/index2.html',
				'teacher/index2.html'
			]
		}
	});

	grunt.registerTask('build', [
		'copy:build',
		'concat',
		'usemin',
		'uglify'
	]);

	grunt.registerTask('default', ['build']);

	//grunt.registerTask('copy', ['copy:build']);

};
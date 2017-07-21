var oConfig = {
	copy: 'src/site/**',
	dest: 'build',
	deps: [
		{src: ['bower_components/kohana-core/**', '!bower_components/ohana-core/.*', '!bower_components/kohana-core/guide/**', '!bower_components/kohana-core/tests/**'], dest: 'build/system'},
		{src: ['bower_components/asset-merger/**', '!bower_components/asset-merger/.*', '!bower_components/asset-merger/tests/**', '!bower_components/asset-merger/vendor/**'], dest: 'build/modules/asset-merger'},
		{src: 'bower_components/asset-merger/vendor/cssmin/**', dest: 'build/modules/asset-merger/vendor/cssmin'},
		{src: 'bower_components/asset-merger/vendor/jsmin/**', dest: 'build/modules/asset-merger/vendor/jsmin'},
		{src: ['deps/amplesdk-builds/work/ample-0.9.4/**','!deps/amplesdk-builds/work/ample-0.9.4/examples/**', '!deps/amplesdk-builds/work/ample-0.9.4/reference/**'], dest: 'build/amplesdk-mainta-0.9.4'},
		{src: 'deps/jul-javascript/source/jul.js', dest: 'build/source/js'}
	],
	concat: ['src/designer/JUL.Designer.js', 'src/designer/JUL.Designer.app.js', 'src/designer/JUL.Designer.designer.js',
		'src/designer/JUL.Designer.framework.js', 'src/designer/JUL.Designer.help.js', 'src/designer/JUL.Designer.about.js'],
	concatHeader: 'src/assets/header.js',
	concatName: 'designer.js',
	concatDest: 'build/source/js',
	node: 'src/node/**',
	copyNode: ['build/**', '!build/Readme', '!build/Kohana-License', '!build/index.php', '!build/modules/**', '!build/system/**',
		'!build/application/classes/**', '!build/application/config/**', '!build/application/views/**', '!build/application/bootstrap.php',
		'!build/application/classes', '!build/application/config', '!build/application/views', '!build/application/i18n', '!build/application/messages',
		 '!build/modules', '!build/system', 'README.md'],
	destNode: 'build_node'
};
var oGulp = require('gulp');
var oPlugins = require('gulp-load-plugins')();
var oMerged = require('merge-stream')();
require('pump');

oGulp.task('site', function() {
	return oGulp.src(oConfig.copy)
	.pipe(oGulp.dest(oConfig.dest));
});

oGulp.task('copydeps', function() {
	for (var i = 0; i < oConfig.deps.length; i++) {
		oMerged.add(oGulp.src(oConfig.deps[i].src).pipe(oPlugins.rename(function(oPath) {
			if (oPath.dirname.indexOf('classes') > -1) {
				oPath.dirname = oPath.dirname.toLowerCase();
				oPath.basename = oPath.basename.toLowerCase();
			}
			if (oPath.extname === '.md') {
				oPath.basename = oPath.basename[0].toUpperCase() + oPath.basename.substr(1).toLowerCase();
				oPath.extname = '';
			}
		})).pipe(oGulp.dest(oConfig.deps[i].dest)));
	}
	return oMerged;
});

oGulp.task('scripts', function() {
	return oGulp.src(oConfig.concat)
	.pipe(oPlugins.jshint())
	.pipe(oPlugins.stripComments())
	.pipe(oPlugins.addSrc.prepend(oConfig.concatHeader))
	.pipe(oPlugins.concat(oConfig.concatName, {newLine: ''}))
	.pipe(oGulp.dest(oConfig.concatDest));
});

oGulp.task('node', function() {
	return oGulp.src(oConfig.node)
	.pipe(oPlugins.jshint())
	.pipe(oGulp.dest(oConfig.dest));
});

oGulp.task('clean', function() {
	return oGulp.src(oConfig.dest + '/*', {read: false})
	.pipe(oPlugins.clean());
});

oGulp.task('build', ['site', 'copydeps', 'scripts', 'node']);

oGulp.task('clean_node', function() {
	return oGulp.src(oConfig.destNode + '/*', {read: false})
	.pipe(oPlugins.clean());
});

oGulp.task('build_node', ['build'], function() {
	return oGulp.src(oConfig.copyNode)
	.pipe(oGulp.dest(oConfig.destNode));
});

oGulp.task('default', ['clean', 'clean_node'], function() {
	oGulp.start('build_node');
});

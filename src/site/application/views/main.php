<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><?php echo $title; ?></title>
<link rel='shortcut icon' href='media/favicon.ico' />
<?php
	echo Assets::factory('designer')
		->css('https://fonts.googleapis.com/css?family=Roboto+Condensed|Varela')
		->css($ample_root.'languages/xhtml/themes/default/style-prod.css')
		->css($ample_root.'languages/xul/themes/default/style-prod.css')
		->css('main.css')
		->css('skin.css')
		->js($ample_root.'runtime.js')
		->js($ample_root.'languages/xhtml/xhtml.js')
		->js($ample_root.'languages/xul/xul.js')
		->js($ample_root.'plugins/cookie/cookie.js')
		->js($jul_root.'jul.js')
		->js_block('JUL.Designer = '.json_encode($app).';')
		->js('designer.js')
		->js('defaults.js')
?>
</head>
<body>
<script type="text/javascript">
ample.$init();
JUL.Designer.init();
</script>
</body>
</html>

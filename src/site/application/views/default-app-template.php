<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>{app_title}</title>
	{polyfill_script}
	<!-- Custom includes -->
	{jul_script}
	{app_script}
	{modules_scripts}
	<script type="text/javascript">
	// change as needed
	window.onload = function() {
		// create UI
		{app_ns}.init();
	};
	</script>
</head>
<body>
	<!-- Custom body -->
</body>
</html>

<script type="text/javascript">
(function() {
var oParent = window.opener || window.parent;
if (!oParent.JUL || !oParent.JUL.Designer) {
	alert('Not available outside the designer');
	window.error11();
}
document.write('<' + 'script type="text/javascript">//<![CDATA[\n' + oParent.JUL.Designer.state.code + '\n//]]><' + '/script>');
})();
</script>
 
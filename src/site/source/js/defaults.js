/* use this file to override some configurations in the main script */

/* app's default entry point */
JUL.Designer.app.fields.init.defaultValue = function() {
	for (var sItem in this.modules) {
		if (this.modules.hasOwnProperty(sItem)) {
			var sNS = this.modules[sItem].ns;
			if (sNS.substr(0, 1) === '.') { sNS = this.ns + sNS; }
			var oModule = JUL.get(sNS);
			if (oModule) {
				var oParser = new JUL.UI.Parser(oModule.parserConfig);
				oParser.create(oModule.ui, oModule.logic);
			}
		}
	}
};
/* project's default entry point */
JUL.Designer.designer.fields.init.defaultValue = function() {
	var oParser = new JUL.UI.Parser(this.parserConfig);
	oParser.create(this.ui, this.logic);
};

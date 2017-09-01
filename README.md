<p align="center">
<img alt="Designer" src="https://zonebuilder.github.io/media/jul224.png" width="240" height="224" />
</p>

JUL Designer - a RAD tool for JavaScript
========================================

About
-----

JUL Designer is a RAD tool used to visually build a JavaScript application.
Given a component based application running in an event-driven environment, 
JUL Designer helps you to generate the component tree with the attached event listeners. 
It also generates the JavaScript code for the current component tree.

License
-------

 Licensed under GNU GPLv2 or later and under GNU LGPLv3 or later. See enclosed 'licenses' folder.

Features
--------

* visually building and live testing a JavaScript application 
* working with your preferred JavaScript component framework 
* can be used with tag based languages (HTML, XUL, SVG etc.) 
* generates the JavaScript code with option to separate UI layout and logic 
* copy, paste and undo operations for the components and their members
* downloading generated code, exporting XML layout

System requirements
-------------------

* a CSS2 compliant web browser with JavaScript 1.5 or later engine 
* Node.js 0.10.0 or later installed 
* OR a web server with PHP 5.2.0 or later extension 
* 1024x768 minimum resolution 

Install & usage in Node
-----------------------

Install JUL Designer globally:

`npm install -g jul-designer`

Run server application: `jul-designer`. Use `-h` switch to see more options.

Use a browser to work with the app at `http://localhost:7770/`.

Import a project in a Node script:
```javascript
var path = require('path');
var workdir = path.resolve(__dirname, 'assets'); // change as needed
// apply the project configuration to a local object
var localVar = {};
require(path.resolve(workdir, 'projects', 'project1.js'))(localVar);
console.log(localVar);
```

Build & install from source
---------------------------

Install [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) command line in your system.
Run the following shell commands in order:

``` bash
	npm install
	npm run deps
	npm run make
```

The release will be in the 'build' folder. The Node module will be in the 'build_node' folder.

Downloads & user support
------------------------

[jul-designer project on SourceForge](http://sourceforge.net/projects/jul-designer/)

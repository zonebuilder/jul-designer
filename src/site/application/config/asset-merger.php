<?php defined('SYSPATH') OR die('No direct script access.');

return array(
	'merge'      => array(Kohana::PRODUCTION, Kohana::STAGING),
	'folder'     => 'assets',
	'load_paths' => array(
		Assets::STYLESHEET => DOCROOT.'source'.DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR,
		Assets::JAVASCRIPT => DOCROOT.'source'.DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR,
	),
	'processor'  => array(
		Assets::STYLESHEET => 'cssmin',
		Assets::JAVASCRIPT => 'jsmin',
	),
);

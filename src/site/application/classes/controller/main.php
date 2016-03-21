<?php defined('SYSPATH') or die('No direct script access.');
/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPL2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
 * A REST server for JUL.Designer
 * @class
 */
class Controller_Main extends Controller {

	/**
	 * Delivers Designer's main page
	 */
	public function action_index()
	{
		$aConfig = kohana::$config->load('main');
		$this->response->body(View::factory('main', array_merge($aConfig->as_array(), array(
			'app' => array(
				'version' => $aConfig->get('version'),
				'title' => $aConfig->get('title'),
				'config' => array(
					'defaultTemplate' => View::factory('default-template')->render(),
					'defaultAppTemplate' => View::factory('default-app-template')->render(),
					'zb_link' => $aConfig->get('zb_link'),
				),
			),
		))));
		if ($this->request->query()) { return; }
		$sWork = $aConfig->get('work_dir');
		foreach (array('_apps', '_projects', '_frameworks', '_examples') as $sName) {
			if (is_file(APPPATH.$sName.'.zip')) {
				$this->unzip(APPPATH.$sName.'.zip', $sWork);
				@unlink(APPPATH.$sName.'.zip');
			}
		}
	}
	
	/**
	 * Manages the HTTP REST requests. PUT and DELETE are implemented via POST.
	 */
	public function action_manage()
	{
		$aResponse = array();
		$sRequestType = $this->request->method();
		if ($sRequestType === Request::POST) {
			$sConfigFolder = $this->request->post('type').'s';
			$sPath = Kohana::$config->load('main.work_dir').DIRECTORY_SEPARATOR.$sConfigFolder.DIRECTORY_SEPARATOR.
				str_replace('.', DIRECTORY_SEPARATOR, $this->request->post('ns'));
			$sDir = pathinfo($sPath, PATHINFO_DIRNAME);
			$sType = $this->request->post('type');
			switch ($this->request->post('operation')) {
			case 'delete':
			if (file_exists($sPath.'.json') && is_file($sPath.'.json')) {
				$bReturn = @unlink($sPath.'.json');
				if ($bReturn === false) {
					$aResponse['error'] = 'Access denied';
					break;
				}
				if ($sType === 'project') {
					@unlink($sPath.'.tpl.json');
					@unlink($sPath.'.js');
				}
				if ($sType === 'app') {
					@unlink($sPath.'.js');
				}
				@rmdir($sDir);
				$aResponse['result'] = ucwords($sType).' deleted';
			}
			else {
				$aResponse['error'] = 'File not found';
			}
			break;
			case 'new':
			case 'edit':
			if (file_exists($sPath.'.json') && is_file($sPath.'.json') &&
				($this->request->post('operation') === 'new' || $this->request->post('old_ns') !== $this->request->post('ns'))) {
				$aResponse['error'] = str_replace('A app ', 'An application ', 'A '.$sType.' with the same namespace already exists');
				break;
			}
			case 'save':
			case 'save_js':
				if (!file_exists($sDir) || !is_dir($sDir)) {
					@mkdir($sDir, 0777, true);
				}
				if ($this->request->post('json')) {
					$bReturn = @file_put_contents($sPath.'.json', $this->request->post('json'));
					if ($bReturn === false) {
						$aResponse['error'] = 'Access denied';
						break;
					}
				}
				if ($this->request->post('js')) {
					@file_put_contents($sPath.'.js', $this->request->post('js'));
				}
				if ($sType === 'project' && $this->request->post('template')) {
					@file_put_contents($sPath.'.tpl.json', $this->request->post('template'));
				}
				$aResponse['result'] = 'New file saved';
			break;
			default:
				$aResponse['error'] = 'Invalid operation.';
			}
		}
		if ($sRequestType === Request::GET) {
			$sConfigFolder = $this->request->query('type').'s';
			$sPath = Kohana::$config->load('main.work_dir').DIRECTORY_SEPARATOR.$sConfigFolder;
			$sType = $this->request->query('type');
			switch ($this->request->query('operation')) {
			case 'browse':
				$aResponse['result'] = array();
				$aList = $this->scanDir($sPath, 'json');
				asort($aList);
				foreach ($aList as $sFile) {
					$sTitle = '';
					$oFile = @fopen($sFile, 'rb');
					if ($oFile) {
						$sTitle = fread($oFile, 512);
						fclose($oFile);
						$iStart = strpos($sTitle, 'title":"') + 8;
						$iEnd = strpos($sTitle, '",', $iStart);
						$sTitle = stripslashes(substr($sTitle,$iStart, $iEnd - $iStart));
					}
					$aResponse['result'][] = array(
						pathinfo(str_replace(DIRECTORY_SEPARATOR, '.', substr($sFile, strlen($sPath) + 1)), PATHINFO_FILENAME),
						$sTitle
				);
				}
			break;
			case 'open':
				$sPath = $sPath.DIRECTORY_SEPARATOR.str_replace('.', DIRECTORY_SEPARATOR, $this->request->query('ns'));
				if (file_exists($sPath.'.json')) {
					$this->response->body('{"result":'.@file_get_contents($sPath.'.json').'}');
					return;
				}
				else {
					$aResponse['error'] = ucwords($sType).' not found';
				}
			break;
			case 'test':
				$sPath = $sPath.DIRECTORY_SEPARATOR.str_replace('.', DIRECTORY_SEPARATOR, $this->request->query('ns'));
				$sTemplate = $sType === 'project' ? $sPath.'.tpl.json' : $sPath.'.json';
				if (in_array($sType, array('app', 'project')) && file_exists($sTemplate)) {
					$this->response->body($this->generateTestPage(@file_get_contents($sTemplate), $this->request->query('version'), $sType, $this->request->query('current')));
					$this->response->headers('cache-control', 'publc; max-age=3600');
				}
				else {
					$this->response->body('Template '.$this->request->query('ns').' not found.');
				}
			return;
			case 'download':
				$sPath = $sPath.DIRECTORY_SEPARATOR.str_replace('.', DIRECTORY_SEPARATOR, $this->request->query('ns'));
				$sTemplate = $sType === 'project' ? $sPath.'.tpl.json' : $sPath.'.json';
				if (!file_exists($sTemplate)) {
					$this->response->body('Not found');
					$this->response->status(404);
					return;
				}
				$aEntires = array();
				$aEntries['index.html'] = $this->generateTestPage(@file_get_contents($sTemplate), $this->request->query('version'), $sType, false, true);
				$aEntries['js'] = 'dir://';
				$aEntries['js/'.$this->request->query('ns').'.js'] = 'file://'.$sPath.'.js';
				$sAssets = Kohana::$config->load('main.work_dir');
				if ($sType === 'app') {
					$aInfo = @json_decode(@file_get_contents($sPath.'.json'), true);
					$aModules = array();
					if (is_array($aInfo)) { $aModules = $aInfo['modules']; }
					if (count($aModules)) {
						$sDir = $sAssets.DIRECTORY_SEPARATOR.'projects';
						$aEntries['js/projects'] = 'dir://';
						foreach ($aModules as &$aItem) {
							if (substr($aItem['ns'], 0, 1) === '.') { $aItem['ns'] = $aInfo['ns'].$aItem['ns']; }
							$aEntries['js/projects/'.$aItem['ns'].'.js'] = 'file://'.$sDir.DIRECTORY_SEPARATOR.str_replace('.', DIRECTORY_SEPARATOR, $aItem['ns']).'.js';
						}
					}
				}
				$sPath = $sAssets.DIRECTORY_SEPARATOR.uniqid();
				$this->zip($sPath, $aEntries);
				$this->response->body(@file_get_contents($sPath.'.zip'));
				@unlink($sPath.'.zip');
				$this->response->headers('content-length', strlen($this->response->body()));
				$this->response->headers('content-type', 'application/octet-stream');
				$sName = strtolower(str_replace('.', '-', $this->request->query('ns')));
				$this->response->headers('content-disposition', 'attachment; filename="'.$sName.'.zip"');
				$this->response->headers('cache-control', 'max-age=28800, must-revalidate');
			return;
			default:
				$aResponse['error'] = 'Invalid operation.';
			}
		}
		$this->response->body(json_encode($aResponse));
	}
	
	/**
	 * Retrieves a list of files starting from a folder and matching a search file extension
	 * @protected
	 * @param	{String}	sPath	Start folder
	 * @param	{String}	[sExt]	Fie extension glob
	 * @returns	{Array}	The list of matching file paths
	 */
	protected function scanDir($sPath, $sExt = '*')
	{
		$aScan = array();
		$aList = @scandir($sPath);
		if (empty($aList)) {
			return $aScan;
		}
		foreach($aList as $sItem) { 
			if($sItem !== '.' && $sItem !== '..') {
				$sFile = $sPath.DIRECTORY_SEPARATOR.$sItem;
				if (is_dir($sFile)) {
					$aScan = array_merge($aScan, $this->scanDir($sFile, $sExt));
				}
				elseif ($sExt === '*' || substr($sItem, strpos($sItem.'.', '.') + 1) === $sExt) {
					$aScan[] = $sFile;
				}
			}
		}
		return $aScan;
	}

	/**
	 * Generates the project test page or the app test page
	 * @protected
	 * @param	{String}	sJson	The JSON page template
	 * @param	{String}	[sVersion]	Version number. It will also be appended as a query string.
	 * @param	{sType}	[sType]	The type of page: project or app
	 * @param	{String}	[sCurrent]	The namespace of the current project
	 * @param	{Boolean}	[bExport]	True to generate the page for downloading
	 * @returns	The HTML test page
	 */
	protected function generateTestPage($sJson, $sVersion = null, $sType = 'project', $sCurrent = false, $bExport = false)
	{
		$aInfo = @json_decode($sJson, true);
		if (!is_array($aInfo)) { return 'Invalid template'; }
		$aModules = isset($aInfo['modules']) ? $aInfo['modules'] : null;
		foreach ($aInfo as $sKey => &$oValue) {
			if (is_array($oValue)) { unset($aInfo[$sKey]); }
		}
		if ($sVersion) { $aInfo['version'] = $sVersion; }
		$sTemplate = $aInfo['template'];
		unset($aInfo['template']);
		$aInfo = array_map('htmlspecialchars', $aInfo);
		if ($sType === 'project' && !$bExport) {
			$aInfo['project_script'] = (string)View::factory('project-script');
		}
		else {
			$sPrefix = $bExport ? 'js/' : str_replace(DIRECTORY_SEPARATOR, '/', substr(Kohana::$config->load('main.work_dir').DIRECTORY_SEPARATOR.$sType.'s', strlen(getenv('DOCUMENT_ROOT')))).'/';
			$aInfo[$sType.'_script'] = '<'.'script type="text/javascript" src="'.htmlspecialchars($sPrefix).str_replace('.', $bExport ? '.' : '/', $aInfo['ns']).'.js?v='.$aInfo['version'].'"><'.'/script>';
		}
		$aInfo['jul_script'] = (string)Assets::factory('jul')->js(Kohana::$config->load('main.jul_root').'jul.js');
		if ($aModules) {
			$aScripts = array();
			$sDir = Kohana::$config->load('main.work_dir').DIRECTORY_SEPARATOR.'projects';
			$sPrefix = $bExport ? 'js/projects/' : str_replace(DIRECTORY_SEPARATOR, '/', substr($sDir, strlen(getenv('DOCUMENT_ROOT')))).'/';
			foreach ($aModules as &$aItem) {
				if (substr($aItem['ns'], 0, 1) === '.') { $aItem['ns'] = $aInfo['ns'].$aItem['ns']; }
				if ($aItem['ns'] === $sCurrent) {
					$aScripts[] = (string)View::factory('project-script');
				}
				else {
					$sPath = $sDir.DIRECTORY_SEPARATOR.str_replace('.', DIRECTORY_SEPARATOR, $aItem['ns']);
					$sItemVersion = $aInfo['version'];
					if (is_file($sPath.'.tpl.json') && ($oFile = @fopen($sPath.'.tpl.json', 'rb'))) {
						$sItemVersion = fread($oFile, 512);
						fclose($oFile);
						$iStart = strpos($sItemVersion, 'version":"') + 10;
						$iEnd = strpos($sItemVersion, '"', $iStart);
						$sItemVersion = htmlspecialchars(substr($sItemVersion, $iStart, $iEnd - $iStart));
					}
					$aItem['ns'] = htmlspecialchars($aItem['ns']);
					$aScripts[] = '<'.'script type="text/javascript" src="'.htmlspecialchars($sPrefix).str_replace('.', $bExport ? '.' : '/', $aItem['ns']).'.js?v='.$sItemVersion.'"><'.'/script>';
				}
			}
			$aInfo['modules_scripts'] = implode("\n\t", $aScripts);
		}
		$aKeys = array_keys($aInfo);
		foreach ($aKeys as &$sKey) {
			$sKey = strpos($sKey, '_') === false ? '{'.$sType.'_'.$sKey.'}' : '{'.$sKey.'}';
		}
		return str_replace($aKeys, array_values($aInfo), $sTemplate);
	}
	/**
	 * Unpacks a ZIP file
	 * @protected
	 * @param	{String}	File path
	 * @param	{String}	sWhere	Destination folder
	 * @param	{Boolean}	[bOverwrite]	True to overwrite files
	 * @returns	{Boolean}	True on success, false on failure
	 */
	protected function unzip($sZip, $sWhere, $bOverwrite = false)
	{
		$oZip = @zip_open($sZip);
		if (!is_resource($oZip)) { return false; }
		while (($oZipEntry = zip_read($oZip)) !== false) {
			$sFile = DIRECTORY_SEPARATOR.str_replace('/', DIRECTORY_SEPARATOR, zip_entry_name($oZipEntry));
			if (substr($sFile, -1) === DIRECTORY_SEPARATOR) { $sDir = substr($sFile, 0, -1); }
			else { $sDir = dirname($sFile); }
			if (strlen($sDir) && $sDir !== '.' && !is_dir($sWhere.$sDir)) {
				@mkdir($sWhere.$sDir, 0755, true);
			}
			if (substr($sFile, -1) !== DIRECTORY_SEPARATOR && ($bOverwrite || !is_file($sWhere.$sFile))) {
				@file_put_contents($sWhere.$sFile, zip_entry_read($oZipEntry, zip_entry_filesize($oZipEntry)));
			}
		}
		zip_close($oZip);
		return true;
	}

	/** Creates a ZIP file from a list of paths
	 *p@protected
	 * @param	{String}	sName	File path without extension
	 * @param	{Array}	aEntries	List of file paths
	 * @returns	True on success, false on failure
	 */
	protected function zip($sName, $aEntries)
	{
		if (!is_array($aEntries)) { return false; }
		$oZip = new ZipArchive();
		if ($oZip->open($sName.'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) { return false; }
		@set_time_limit(0);
		foreach ($aEntries as $sPath => &$sContent) {
			if (substr($sContent, 0, 7) === 'file://') {
				$sFile = substr($sContent, 7);
				if (file_exists($sFile)) { @$oZip->addFile($sFile, $sPath); }
			}
			elseif (substr($sContent, 0, 6) === 'dir://') { $oZip->addEmptyDir($sPath); }
			else { $oZip->addFromString($sPath, $sContent); }
		}
		$oZip->close();
		return true;
	}

} // End Main

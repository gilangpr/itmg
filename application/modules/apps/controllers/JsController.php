<?php 

class Apps_JsController extends Zend_Controller_Action
{
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->getResponse()->setHeader('Content-type', 'application/x-javascript');
	}
	
	public function modelsAction()
	{
		$models = new MyIndo_Ext_Models();
		$data = $models->getList();
		
		foreach($data as $k=>$d) {
			$parsed = $models->parser($d);
			echo "Ext.define(\"" . $parsed['modelName'] . "\", { extend: \"Ext.data.Model\", fields: " . Zend_Json::encode($parsed['fields']) . " });\n";
		}
	}
	
	public function storesAction()
	{
		$stores = new MyIndo_Ext_Stores();
		$data = $stores->getList();
		
		foreach($data as $k=>$d) {
			$parsed = $stores->parser($d);
			$model = substr($parsed['storeName'], 0, strlen($parsed['storeName'])-1);
			echo "Ext.create(\"Ext.data.Store\", {\n\tmodel: \"" . $model . "\",\n\tstoreId: \"" . $parsed['storeName'] . "\",\n\tproxy:" . Zend_Json::encode($parsed['proxy']) . ",\n\tsorter: " . Zend_Json::encode($parsed['sorters']) . "});\n";
		}
	}
	public function fixerAction()
	{
		$db = Zend_Db::factory('Pdo_Mysql', array(
				'host'     => 'localhost',
				'username' => 'root',
				'password' => 'root',
				'dbname'   => 'INFORMATION_SCHEMA'
		));
		$name = 'privileges';
		if($name != 'tree_store_content' && $name != 'users' && $name != 'group_members') {
			$list_cols = $db->fetchAll('SELECT DISTINCT COLUMN_NAME FROM COLUMNS WHERE ORDINAL_POSITION > 1 AND TABLE_NAME = ?', $name);
		} else {
			$list_cols = $db->fetchAll('SELECT DISTINCT COLUMN_NAME FROM COLUMNS WHERE TABLE_NAME = ?', $name);
		}
		$model = new MyIndo_Ext_Privileges();
		$q = $model->select();
		$list = $q->query()->fetchAll();
		$cols = '';
		foreach($list_cols as $k=>$d) {
			if($k>0) {
				$cols .= ',';
			}
			if($d['COLUMN_NAME'] != 'tipe' && $d['COLUMN_NAME'] != 'status') {
			$cols .= '[' . $d['COLUMN_NAME'] . ']';
			}
		}
		$n_ = explode('_', $name);
		$n_temp = '';
		foreach($n_ as $k=>$d) {
			$n_temp .= ucfirst($d);
		}
		echo "/*-----------------------------------\n";
		echo ":: " . $name . "\n";
		echo "-----------------------------------*/\n";
		foreach($list as $k=>$d) {
			$val = '';
			foreach($list_cols as $_k=>$_d) {
				if($_k > 0) {
					$val .= ',';
				}
				if($_d['COLUMN_NAME'] != 'tipe' && $_d['COLUMN_NAME'] != 'status') {
				$val .= "'" . $d[$_d['COLUMN_NAME']] . "'";
				}
			}
			echo "INSERT INTO [INV].[dbo].[" . $name . "](" . $cols . ") VALUES(" .$val . ");\n";
		}
		echo "/*-----------------------------------\n";
		echo ":: " . $name . "\n";
		echo "-----------------------------------*/\n";
	}
	public function transAction()
	{
		$names = array(
				'contents',
				'content_tbars',
				'content_tbar_listeners',
				'content_columns',
				'tree_stores',
				'tree_store_content',
				'stores',
				'models',
				'model_fields',
				'menus',
				'sub_menus',
				'sub_menu_actions'
				);
		
		$db = Zend_Db::factory('Pdo_Mysql', array(
				'host'     => 'localhost',
				'username' => 'root',
				'password' => 'root',
				'dbname'   => 'INFORMATION_SCHEMA'
		));
		foreach($names as $__k=>$__d) {
			$name = $__d;
			if($name != 'tree_store_content') {
				$list_cols = $db->fetchAll('SELECT DISTINCT COLUMN_NAME FROM COLUMNS WHERE ORDINAL_POSITION > 1 AND TABLE_NAME = ?', $name);
			} else {
				$list_cols = $db->fetchAll('SELECT DISTINCT COLUMN_NAME FROM COLUMNS WHERE TABLE_NAME = ?', $name);
			}
			$cols = '';
			foreach($list_cols as $k=>$d) {
				if($k>0) {
					$cols .= ',';
				}
				$cols .= '[' . $d['COLUMN_NAME'] . ']';
			}
			$n_ = explode('_', $name);
			$n_temp = '';
			foreach($n_ as $k=>$d) {
				$n_temp .= ucfirst($d);
			}
			$model = new MyIndo_Ext_Abstract();
			try {
				eval('$model = new MyIndo_Ext_' . $n_temp . '();');
			} catch(Exception $e) {
				eval('$model = new Application_Model_' . $n_temp . '();');
			}
			$list = $model->getList();
			echo "/*-----------------------------------\n";
			echo ":: " . $name . "\n";
			echo "-----------------------------------*/\n";
			foreach($list as $k=>$d) {
				$val = '';
				foreach($list_cols as $_k=>$_d) {
					if($_k > 0) {
						$val .= ',';
					}
					$val .= "'" . $d[$_d['COLUMN_NAME']] . "'";
				}
				echo "INSERT INTO [INV].[dbo].[" . $name . "](" . $cols . ") VALUES(" .$val . ");\n";
			}
			echo "/*-----------------------------------\n";
			echo ":: " . $name . "\n";
			echo "-----------------------------------*/\n";
		}
// 		
// 		$model = new MyIndo_Ext_ContentTbars();
// 		$cols = "[CONTENT_ID],[XTYPE],[ID],[TEXT],[ICONCLS],[INDEX],[CREATED_DATE],[MODIFIED_DATE]";
// 		$list = $model->getList();
// 		foreach($list as $k=>$d) {
// 			echo "INSERT INTO [INV].[dbo]." . $name . "(" . $cols . ") VALUES( " .
// 					"'" . $d['CONTENT_ID'] . "'," .
// 					"'" . $d['XTYPE'] . "','" . 
// 					"'" . $d['ID'] . "','" . 
// 					"'" . $d['TEXT'] . "','" .
// 					"'" . $d['ICONCLS'] . "','" .
// 					"'" . $d['INDEX'] . "','" .
// 					"'" . $d['CREATED_DATE'] . "','" . 
// 					"'" . $d['MODIFIED_DATE'] . "');\n";
// 		}
	}
}
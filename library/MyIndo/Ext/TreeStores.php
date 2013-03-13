<?php 

class MyIndo_Ext_TreeStores extends MyIndo_Ext_Abstract
{
	protected $_name = 'TREE_STORES';
	protected $_id = 'TREE_STORE_ID';
	
	public function parser($data)
	{
		$model = new MyIndo_Ext_Models();
		$store = new MyIndo_Ext_Stores();
		$content = new MyIndo_Ext_Contents();
		$tsc = new MyIndo_Ext_TreeStoreContent();
		
		$json = array(
				'root' => array(
						'children' => array()
						)
				);
		foreach($data as $k=>$d) {
			$json['root']['children'][$k]['text'] = $d['TEXT'];
			$json['root']['children'][$k]['id'] = $d['NAME'] . '-' . strtolower(str_replace(" ","-", $d['TEXT']));
			$json['root']['children'][$k]['models'] = $model->parser($model->getDetailByKey('NAME', $d['MODEL']));
			$json['root']['children'][$k]['stores'] = $store->parser($store->getDetailByKey('NAME', $d['STORE']));
			$json['root']['children'][$k]['leaf'] = true;
			
			// Get contents :
			$tscDetail = $tsc->getDetailByKey('TREE_STORE_ID', $d['TREE_STORE_ID']);
			$content_id = (isset($tscDetail['CONTENT_ID'])) ? $tscDetail['CONTENT_ID'] : 0;
			
			$json['root']['children'][$k]['contents'] = $content->parser($content->getDetailByKey($content->getPK(), $content_id));
		}
		
		return $json;
	}
}
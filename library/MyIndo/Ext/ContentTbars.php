<?php 

class MyIndo_Ext_ContentTbars extends MyIndo_Ext_Abstract
{
	protected $_name = 'CONTENT_TBARS';
	protected $_id = 'CONTENT_TBAR_ID';
	
	public function parser($data)
	{
		$json = array();
		foreach($data as $k=>$d) {
			$json[$k] = array(
					'xtype' => $d['XTYPE'],
					'id' => $d['ID'],
					'text' => $d['TEXT']
					);
			if($d['ICONCLS'] != '' && !empty($d['ICONCLS'])) {
				$json[$k]['iconCls'] = $d['ICONCLS'];
			}
		}
		return $json;
	}
}
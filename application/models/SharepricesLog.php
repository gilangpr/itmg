<?php

class Application_Model_SharepricesLog extends MyIndo_Ext_Abstract
{
	protected $_name = 'SHAREPRICES_LOG';
	protected $_id = 'SHAREPRICES_LOG_ID';
	
	public function getCount($name,$date)
	{
		$select = $this->select();
		$select->from("SHAREPRICES_LOG", ('count(*) as count'));
		$select->where('SHAREPRICES_NAME = ? ',$name);
		$select->where('DATE = ? ',$date);
		return $select->query()->fetch();
	}
}
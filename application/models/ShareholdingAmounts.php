<?php
class Application_Model_ShareholdingAmounts extends MyIndo_Ext_Abstract
{
	protected $_name = 'SHAREHOLDING_AMOUNTS';
	protected $_id = 'SHAREHOLDING_AMOUNT_ID';

	public function getListLimit($limit, $offset, $order = null)
	{
		try {
			$q = $this->select()
			->limit($limit, $offset);
				
			if($order != null) {
				$q->order($order);
			}
				
			return $q->query()->fetchAll();
		} catch ( Exception $e ) {
				
			return array();
				
		}
	}
	
	public function getId($id)
	{
		try {
			$wherenya = $this->select()->where('SHAREHOLDING_AMOUNT_ID = ?', $id);
				//$wherenya = $this->_name->getAdapter()->quoteInto('SHAREHOLDING_AMOUNT_ID = ? ',$id);
				$this->_name->delete($wherenya);
				//'CREATED_DATE' => date('Y-m-d H:i:s')
				
				} catch ( Exception $e ) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
					return array();
				
				}
	
	}
	
	public function getAmount($shareholding_id)
	{
		if($this->isExistByKey('SHAREHOLDING_ID', $shareholding_id)) {
			$list = $this->select()->where('SHAREHOLDING_ID = ?', $shareholding_id);
			$list = $list->query()->fetchAll();
			$amount = 0;
			foreach($list as $k=>$d) {
				$amount += $d['AMOUNT'];
			}
			return $amount;
		} else {
			return 0;
		}
	}
	
	public function getCount($date)
	{
		$select = $this->select();
		$select->from('SHAREHOLDING_AMOUNTS',('count(SHAREHOLDING_AMOUNT_ID) as count'));
		$select->where('DATE = ? ',$date);
		return $select->query()->fetch();
	}
	
	public function updateAmountDate($data,$where) {
	
		try {
			$table = new Application_Model_ShareholdingAmounts();
			$wherenya = $table->getAdapter()->quoteInto('DATE = ? ',$where['DATE']);
			$table->update($data,$wherenya);

		} catch (Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		die;
	}
	
	public function getNamaById($sid) 
	{
		$select = $this->select()
		->where('SHAREHOLDING_AMOUNT_ID = ?', $sid);
		return $select->query()->fetch();
	}
}
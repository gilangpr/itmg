<?php 

class Application_Model_Shareholdings extends MyIndo_Ext_Abstract
{
	protected $_name = 'SHAREHOLDINGS';
	protected $_id = 'SHAREHOLDING_ID';
	
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
	
	public function joinHolding($limit, $offset, $order = null)
	{
		try {
			//$_name = 'SHAREHOLDINGS';
			$q = $this->select();
			$q->setIntegrityCheck(false);
			$q->from($this->_name, array('*'));
			$q->join('SHAREHOLDING_AMOUNTS', 'SHAREHOLDING_AMOUNTS.SHAREHOLDING_ID = SHAREHOLDINGS.SHAREHOLDING_ID', array('*'));
			$q->limit($limit, $offset);
			
			if($order != null) {
				$q->order($order);
			}
			return $q->query()->fetchAll();
			
		} catch ( Exception $e ) {
			
			$this->_error_code = $e->getCode();
 			$this->_error_message = $e->getMessage();
 			$this->_success = false;
		}
	
	}
	
	public function getCount($name)
	{
		
			$select = $this->select();
			$select->from('SHAREHOLDINGS',('count(SHAREHOLDING_ID) as count'));
			$select->where('INVESTOR_NAME = ? ',$name);
			return $select->query()->fetch();
            /*$search = $this->_name->quoteIndentifier('$name');
            $where = $this->_name->quoteInto("$search LIKE ?", '$name%');
            $this->select->where($where);*/
            return $select->query()->fetchAll();
		    /*$table = new Application_Model_Shareholdings();
            $select = $table->select();
            $select->where('INVESTOR_NAME LIKE ?', $name.'%');
            $rows = $table->fetchAll($select);*/
				
			 //echo $select->__toString();
	}
	public function getId($name)
	{
		//$uid = mysql_query("SELECT SHAREHOLDING_ID FROM 'SHAREHOLDINGS' WHERE INVESTOR_NAME='$name'");
		//echo uid;
		$select = $this->select('SHAREHOLDING_ID')
		->from('SHAREHOLDINGS')
	    ->where('INVESTOR_NAME =? ', $name);
		return $select->query()->fetch();

	}
	
	
	public function updateInvestorName($data,$where) {
		
		try {
		$table = new Application_Model_Shareholdings();
		$wherenya = $table->getAdapter()->quoteInto('INVESTOR_NAME = ? ',$where['INVESTOR_NAME']);
		//$x = $data['AMOUNT'];
		//$y = $data['AMOUNT'];
		//$data['AMOUNT'] = $x + $y; 
		$table->update($data,$wherenya);
		exit();
		} catch (Exception $e) {
			$this->_error_code = $e->getCode();
 						$this->_error_message = $e->getMessage();
 						$this->_success = false;
		}
		die;
	}
	
	
	public function getUpdate($data,$where) {
	
	try {
		$table = new Application_Model_Shareholdings();
		$wherenya = $table->getAdapter()->quoteInto('SHAREHOLDING_ID = ? ',$where['INVESTOR_NAME']);
		$table->update($data,$wherenya);
		} catch (Exception $err) {
			echo $err->getMessage();
		}
		die;
	
	}
	
	
}
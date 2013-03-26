<?php

class Application_Model_Shareprices extends MyIndo_Ext_Abstract
{
	protected $_name = 'SHAREPRICES';
	protected $_id = 'SHAREPRICES_ID';
	
	public function getListAll()
	{
		$select = $this->select();
		$select->from(array($this->_name), array());
		return $select->query()->fetchAll();
	}
	
	public function getCount($name,$date)
	{		
		$select = $this->select();
		$select->from("SHAREPRICES", ('count(*) as count'));
		$select->where('SHAREPRICES_NAME = ? ',$name);
		$select->where('DATE = ? ',$date);
		return $select->query()->fetch();
	}
	
	public function getPksp($date, $k)
	{
	$q = $this->select()
		->where('DATE = ?', $date)
		->where('SHAREPRICES_NAME = ?', $k);
		if($q->query()->rowCount() > 0) {
			$x = $q->query()->fetch();
			return $x[$this->_id];
		} else {
			//return $this->getLastId() + 1;
			return -1;
		}
	}
	
	public function getId($date, $k)
	{
		$q = $this->select()
		->where('DATE = ?', $date)
		->where('SHAREPRICES_NAME = ?', $k);
		if($q->query()->rowCount() > 0) {
			$x = $q->query()->fetch();
			return $x[$this->_id];
		} else {
			//return $this->getLastId() + 1;
			return -1;
		}
	}
	
	public function distinctDate()
	{
		$q = $this->select()
		->distinct()
		->from($this->_name, 'DATE');
		$rowset = $q->query()->fetchAll();
		return count($rowset);
	}
	
	public function limitShareprices($limit, $offset)
	{
		$q = $this->select()
		->from($this->_name, array('*'))
		->group(array('DATE'))
		->limit($limit, $offset);
		return $q->query()->fetchAll();
	}
	
	public function listShareprices($limit, $offset)
	{
		$q = $this->select()
		->from($this->_name, array('*'))
		->limit($limit, $offset);
		return $q->query()->fetchAll();
	}
	
	public function listSharepricesbydate($date)
	{
		$q = $this->select()
		->from('DATE = ?', $date);
		return $q->query()->fetchAll();
	}
}
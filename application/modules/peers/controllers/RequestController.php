<?php

class Peers_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;

	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Peers();
		if($this->getRequest()->isPost()) {
			$this->_posts = $this->getRequest()->getPost();
		} else {
			$this->_posts = array();
		}

		$this->_start = (isset($this->_posts['start'])) ? $this->_posts['start'] : 0;
		$this->_limit = (isset($this->_posts['limit'])) ? $this->_posts['limit'] : 25;

		$this->_error_code = 0;
		$this->_error_message = '';
		$this->_success = true;
	}
	
	public function readAction()
	{
		if(!isset($this->_posts['type'])) {
		$data = array(
				'data' => array(
						'items' => $this->_model->getListLimit($this->_limit, $this->_start),
						'totalCount' => $this->_model->count()
				)
		);
		} else {
			$list = $this->_model->getListByKey('PEER_NAME', $this->_posts['name']);
			$data = array('data'=>array(
					'items' => $list,
					'totalCount' => count($list)
					));
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function createAction()
	{
		$data = array(
				'data' => array()
		);
			
		try {
			$ID = $this->_model->insert(array(
					'PEER_NAME' => $this->_posts['COMPANY_NAME'],
					'BRIEF_HISTORY' => $this->_posts['BRIEF_HISTORY'],
					'BUSINESS_ACTIVITY' => $this->_posts['BUSINESS_ACTIVITY'],
					'CREATED_DATE' => date('Y-m-d H:i:s')	
			));
			
			$data = array(
					'data' => array(
							'ID' => $ID
					)
			);
			
		}catch (Exception $e){
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function destroyAction()
	{
		$data = array(
				'data' => array()
		);
		
		try {
			//delete
			$this->_model->delete(
					$this->_model->getAdapter()->quoteInto(
							'PEER_ID = ?', $this->_posts['PEER_ID']
					));
			
		}catch (Exception $e){
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function updateAction()
	{
		$data = array(
				'data' => array()
		);
		
		try {
			$posts = $this->getRequest()->getRawBody();
			$posts = Zend_Json::decode($posts);
				
			$this->_model->update(array(
					'PEER_NAME' => $posts['data']['PEER_NAME']
			),
					$this->_model->getAdapter()->quoteInto('PEER_ID = ?', $posts['data']['PEER_ID']));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function updateDetailAction()
	{
		$data = array();
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()&& isset($this->_posts['id']) && isset($this->_posts['type'])) {
			if($this->_model->isExistByKey('PEER_ID', $this->_posts['id'])) {
				try {
					if(isset($this->_posts['batch']) && $this->_posts['batch'] == 1) {
					
						$this->_model->update($_dt, $this->_model->getAdapter()->quoteInto('PEER_ID = ?', $this->_posts['id']));
					} else {
						$this->_model->update(array(
								$this->_posts['type'] => $this->_posts[$this->_posts['type']]
						),$this->_model->getAdapter()->quoteInto('PEER_ID = ?', $this->_posts['id']));
					}
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				$this->_error_code = 101;
				$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
				$this->_success = false;
			}
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function searchAction()
	{
		$data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
				)
		);
		$modelPeers = new Application_Model_Peers();
		/* INVESTOR_NAME BY DATE AMOUNT IN TABLE SHAREHOLDING AMOUNTS
		 	
		if($this->_posts['search'] == 1) {
		
		$where = array();*/
		
		/* Title
		 if(isset($this->_posts['INVESTOR_NAME'])) {
		$where[] = $modelAmount->getAdapter()->quoteInto('INVESTOR_NAME LIKE ?', '%' . $this->_posts['INVESTOR_NAME'] . '%');
		} else {
		$where[] = $modelAmount->getAdapter()->quoteInto('INVESTOR_NAME LIKE ?', '%%');
		}
		}
		$query = $modelAmount->select()
		->where($where[0])
		->limit($modelAmount->count(), $this->_start);
		$list = $query->query()->fetchAll();*/
		
		$start_date = $this->_posts['START_DATE'];
		$end_date = $this->_posts['END_DATE'];
		$id = $this->_model->getPkByKey('INVESTOR_NAME', $this->_posts['INVESTOR_NAME']);
		$modelSearch = new Application_Model_ShareholdingAmounts();
				if(isset($this->_posts['INVESTOR_NAME'])) {
				$listSearch = $modelSearch->select()
				->from('SHAREHOLDING_AMOUNTS', array('SHAREHOLDING_AMOUNT_ID','SHAREHOLDING_ID','AMOUNT','DATE'))
				->where('SHAREHOLDING_ID = ?', $id)
				->where('DATE > ?',  $start_date)
						->where('DATE < ?',  $end_date);
						$list = $listSearch->query()->fetchAll();
				} else {
				 
				$listSearch = $modelSearch->select()
				->from('SHAREHOLDING_AMOUNTS', array('*'))
				->where('DATE > ?', $start_date)
				->where('DATE ?', $end_date);
				 
				$list = $listSearch->query()->fetchAll();
				}
		
				$data = array(
						'data' => array(
								'items' => $list,
		    				'totalCount' => $modelSearch->count()
						)
				);
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
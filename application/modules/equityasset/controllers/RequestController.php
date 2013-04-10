<?php 

class Equityasset_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_Equityasset();
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
	
	public function createAction()
	{
		$data = array(
			'data' => array()
		);
		
		try {
			// Insert Data :
 			$this->_model->insert(array(
 					'EQUITY_TYPE'=> $this->_posts['EQUITY_TYPE'],
					'MIN_VALUE'=> $this->_posts['MIN_VALUE'],
 					'MAX_VALUE'=>$this->_posts['MAX_VALUE']
 					));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function readAction()
	{
		try{
		$data = array(
				'data' => array(
						'items' => $this->_model->getListLimit($this->_limit, $this->_start, 'MIN_VALUE ASC'),
						'totalCount' => $this->_model->count()
				)
		);
		}catch(Exception $e){
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
					'MIN_VALUE' => $posts['data']['MIN_VALUE'],
					'MAX_VALUE' => $posts['data']['MAX_VALUE']
					),
					$this->_model->getAdapter()->quoteInto('EQUITY_ID = ?', $posts['data']['EQUITY_ID']));
		}catch(Exception $e) {
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
			//Delete
			
			$this->_model->delete(
 					$this->_model->getAdapter()->quoteInto(
 				'EQUITY_ID = ?', $this->_posts['EQUITY_ID']
 							));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}

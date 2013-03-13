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
		$data = array(
				'data' => array(
						'items' => $this->_model->getListLimit($this->_limit, $this->_start),
						'totalCount' => $this->_model->count()
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function createAction()
	{
		$data = array(
				'data' => array()
		);
			
		try {
			$this->_model->insert(array(
					'PEER_NAME' => $this->_posts['COMPANY_NAME'],
					'BRIEF_HISTORY' => $this->_posts['BRIEF_HISTORY'],
					'BUSINESS_ACTIVITY' => $this->_posts['BUSINESS_ACTIVITY'],
					'CREATED_DATE' => date('Y-m-d H:i:s')	
			));
			
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

	// public function addresourceAction()
	// {
	// 	$data = array(
	// 			'data' => array()
	// 	);

	// 	try {

	// 	}catch (Exception $e){
	// 		$this->_error_code = $e->getCode();
	// 		$this->_error_message = $e->getMessage();
	// 		$this->_success = false;
	// 	}

	// 	MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	// }
}
<?php 

class Investortype_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_InvestorType();
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
		
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()) {
			try {
				
				if(!$this->_model->isExistByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE'])) {
					//Insert Data :
					$this->_model->insert(array(
							'INVESTOR_TYPE'=> $this->_posts['INVESTOR_TYPE'],
							'CREATED_DATE' => date('Y-m-d H:i:s')
							));
				
				} else {
					$this->_error_code = 201;
					$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
					$this->_success = false;
				}
				
			}catch(Exception $e) {
				$this->_error_code = $e->getCode();
				$this->_error_message = $e->getMessage();
				$this->_success = false;
			}
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
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
	
	public function updateAction()
	{
		$data = array(
				'data' => array()
		);
		
		try {
			$posts = $this->getRequest()->getRawBody();
			$posts = Zend_Json::decode($posts);
			
			$this->_model->update(array(
					'INVESTOR_TYPE' => $posts['data']['INVESTOR_TYPE']
					),
					$this->_model->getAdapter()->quoteInto('INVESTOR_TYPE_ID = ?', $posts['data']['INVESTOR_TYPE_ID']));
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
 			$this->_model->delete(
 					$this->_model->getAdapter()->quoteInto(
 							'INVESTOR_TYPE_ID = ?', $this->_posts['INVESTOR_TYPE_ID']
 							));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}

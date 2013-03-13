<?php 

class Shareholdings_ExecutiveController extends Zend_Controller_Action
{
	protected $_model;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	
	public function init()
	{
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->layout()->disableLayout();
		$this->_model = new Application_Model_Shareholdings();
		if($this->getRequest()->isPost()) {
			$this->_posts = $this->getRequest()->getPost();
		} else {
			$this->_posts = array();
		}
		$this->_error_code = 0;
		$this->_error_message = '';
		$this->_success = true;
	}
	
	public function searchAction()
	{
		$data = array(
				'data' => array(
						'items' => array()
						)
				);
		
		if($this->getRequest()->isPost()) {
			$start_date = $this->_posts['START_DATE'];
			$end_date = $this->_posts['END_DATE'];
			$sort = $this->_POSTS['SORT'];
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
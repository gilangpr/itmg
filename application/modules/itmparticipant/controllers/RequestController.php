<?php 

class Itmparticipant_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	protected $_data;
	
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Itmparticipants();
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
			// Insert Data :
			$this->_model->insert(array(
					'NAME_PART'=>$this->_posts['NAME_PART'],
					'PHONE_PART1'=>$this->_posts['PHONE_PART1'],
					'PHONE_PART2'=>$this->_posts['PHONE_PART2'],
					'EMAIL_PART'=>$this->_posts['EMAIL_PART'],
					'ADDRESS_PART'=>$this->_posts['ADDRESS_PART'],
					'SEX_PART'=>$this->_posts['SEX_PART'],
					'POSITION_PART'=>$this->_posts['POSITION_PART'],
 					'CREATED_DATE' => date('Y-m-d H:i:s')
			));
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
 							'PARTICIPANT_ID = ?', $this->_posts['PARTICIPANT_ID']
 							));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function updateAction(){
		//update shareholding amount table
		$data = array(
				'data' => array()
		);

	    //$models = new Application_Model_ShareholdingAmounts();
		$data = $this->getRequest()->getRawBody();//mengambil data json
		$data = Zend_Json::decode($data);//merubah data json menjadi array
		//$id = $data['data']['CONTACT_ID'];
	
		try {
			
			$this->_model->update(array(
					'NAME_PART' => $data['data']['NAME_PART'],
					'POSITION_PART' => $data['data']['POSITION_PART'],
					'EMAIL_PART'=>$data['data']['EMAIL_PART'],
					'PHONE_PART1'=>$data['data']['PHONE_PART1']
			),$this->_model->getAdapter()->quoteInto('PARTICIPANT_ID = ?', $data['data']['PARTICIPANT_ID']));
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
	
	MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
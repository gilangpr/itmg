<?php 

class Meetingactivitie_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_Meetingactivitie();
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
 					'MEETING_EVENT' => $this->_posts['MEETING_EVENT'],
					'MEETING_DATE' => $this->_posts['MEETING_DATE'],
					'START_TIME' => $this->_posts['START_TIME'],
					'END_TIME' => $this->_posts['END_TIME'],
					'NOTES' => '',
 					'CREATED_DATE' => date('Y-m-d H:i:s')
 					));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function crAction(){
		
		$data = array(
			'data' => array()
		);
		try{
			$inModel = new Application_Model_Investors();
			$miModel = new Application_Model_Meetinginvestor();
			$in_id = $this->_getParam('id',0);
			$this->_model->insert(array(
				'MEETING_EVENT' => $this->_posts['MEETING_EVENT'],
				'MEETING_DATE' => $this->_posts['MEETING_DATE'],
				'START_TIME' => $this->_posts['START_TIME'],
				'END_TIME' => $this->_posts['END_TIME'],
				'NOTES' => '',
				'CREATED_DATE' => date('Y-m-d H:i:s')
			));
			$inModel->update(array(
 					'MODIFIED_DATE' => date('Y-m-d H:i:s')
 				),$inModel->getAdapter()->quoteInto('INVESTOR_ID = ?', $in_id));
			if($this->_model->isExistByKey('MEETING_EVENT',$this->_posts['MEETING_EVENT'])){
				$ma_id = $this->_model->getPkByKey('MEETING_EVENT',$this->_posts['MEETING_EVENT']);
				$miModel->insert(array(
					'MEETING_ACTIVITIE_ID' => $ma_id,
					'INVESTOR_ID' => $in_id,
				));
			}
			else{
				$this->_success = false;
				$this->_error_message = "MEETING EVENT Not Found";
			}

		}catch(Exception $e){
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
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
		$data = $this->getRequest()->getRawBody();
		$data = Zend_Json::decode($data);
		$id = $data['data']['MEETING_ACTIVITIE_ID'];
		try {
			
			
			$this->_model->update(array(
					'MEETING_EVENT' => $data['data']['MEETING_EVENT'],
					'MEETING_DATE'=>$data['data']['MEETING_DATE'],
					'START_TIME'=>$data['data']['START_TIME'],
					'END_TIME'=>$data['data']['END_TIME']
					),
					$this->_model->getAdapter()->quoteInto('MEETING_ACTIVITIE_ID = ?', $id));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function updatenotesAction(){
		
		$data = array(
			'data' => array()
		);
		//Call Model Investor
		$modelInvestors = new Application_Model_Investors();
		$maModel = new Application_Model_Meetingactivitie();
		try {
			// Insert Data :
			//get id params
			$ma_id = $this->_posts['id'];
			$in_id = $this->_posts['INVESTOR_ID'];
			if($maModel->isExistByKey('MEETING_ACTIVITIE_ID', $ma_id)) {
 				$this->_model->update(array(
					'NOTES' => $this->_posts['NOTES']),
 				$this->_model->getAdapter()->quoteInto('MEETING_ACTIVITIE_ID = ?', $ma_id));
 				$modelInvestors->update(array(
 					'MODIFIED_DATE' => date('Y-m-d H:i:s')
 				),$modelInvestors->getAdapter()->quoteInto('INVESTOR_ID = ?', $in_id));
			}
			else {
				$this->_error_code = 404;
				$this->_error_message = 'MEETING_ACTIVITIE_ID NOT FOUND';
				$this->_success = false;
			}
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function destroyAction()
	{	
		//$meetingAc_id = (isset($this->_posts['id'])) ? $this->_posts['id'] : 0;
		$data = array(
				'data' => array()
				);
		try {
			 //Delete
			$this->_model->delete(
 					$this->_model->getAdapter()->quoteInto(
 				'MEETING_ACTIVITIE_ID = ?', $this->_posts['MEETING_ACTIVITIE_ID']
 							));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}

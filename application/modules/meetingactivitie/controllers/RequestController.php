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
	protected $_data;
	
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
		$full = $this->_model->getListLimit($this->_limit, $this->_start, 'MEETING_DATE ASC');
		$_temp = '';
		$_temp2 = '';
		$_i = 0;
		foreach ($full as $k=>$d) {
			if($_temp == '') {
				$_temp = $d['MEETING_ACTIVITIE_ID'];
				$this->_data['data']['items'][$_i]['COMPANY_NAME'] = '';
				$this->_data['data']['items'][$_i]['NAME'] = '';
				$this->_data['data']['items'][$_i]['INITIAL_PART'] = '';
			}
			if($_temp != $d['MEETING_ACTIVITIE_ID']) {
				$_i++;
				$_temp = $d['MEETING_ACTIVITIE_ID'];
				$this->_data['data']['items'][$_i]['COMPANY_NAME'] = '';
				$this->_data['data']['items'][$_i]['NAME'] = '';
				$this->_data['data']['items'][$_i]['INITIAL_PART'] = '';
			}
			if(!isset($this->_data['data']['items'][$_i]['MEETING_ACTIVITIE_ID'])) {
				$originalDate = $d['MEETING_DATE'];
				$newDate = date("d-m-Y", strtotime($originalDate));
				$this->_data['data']['items'][$_i]['MEETING_ACTIVITIE_ID'] = $d['MEETING_ACTIVITIE_ID'];				
				$this->_data['data']['items'][$_i]['MEETING_DATE'] = $newDate;
				$this->_data['data']['items'][$_i]['MEETING_EVENT'] = $d['MEETING_EVENT'];
			}
			$meetingInvestor = new Application_Model_Meetinginvestor();
			$metId = $d['MEETING_ACTIVITIE_ID'];
			$companyName = $meetingInvestor->getCompanyName($metId);
			foreach ($companyName as $_k=>$_d) {		
				// Set Company Name :
				if($this->_data['data']['items'][$_i]['COMPANY_NAME'] != '' && $this->_data['data']['items'][$_i]['NAME'] != '') {
					$this->_data['data']['items'][$_i]['COMPANY_NAME'] .= ', ';
					$this->_data['data']['items'][$_i]['NAME'] .= ', ';
				} 
				$this->_data['data']['items'][$_i]['COMPANY_NAME'] .= $_d['COMPANY_NAME'];
				$this->_data['data']['items'][$_i]['NAME'] .= $_d['NAME'];
			}
			$participant = new Application_Model_Participant();
			$partName = $participant->getName($metId);
			//print_r($partName);
			foreach ($partName as $n=>$m) {
				if ($this->_data['data']['items'][$_i]['NAME'] != '') {
					$this->_data['data']['items'][$_i]['NAME'] .= ', ';
				}
				$this->_data['data']['items'][$_i]['NAME'] .= $m['NAME'];
			}
			
			$meetingParticipant = new Application_Model_Meetingparticipant();
			$initialPart = $meetingParticipant->getInitial($metId);
			foreach ($initialPart as $_x=>$_y) {
				// Set Company Name :
				if($this->_data['data']['items'][$_i]['INITIAL_PART'] != '') {
					$this->_data['data']['items'][$_i]['INITIAL_PART'] .= ', ';
				}
				$this->_data['data']['items'][$_i]['INITIAL_PART'] .= $_y['INITIAL_PART'];
			}
			
		}
		
		$this->_data['data']['totalCount'] = $this->_model->count();
		
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function updateAction()
	{
		$data = array(
				'data' => array()
		);
		$data = $this->getRequest()->getRawBody();
		$data = Zend_Json::decode($data);
		$id = $data['data']['MEETING_ACTIVITIE_ID'];
		$date = $data['data']['MEETING_DATE'];
		$newDate = date("Y-m-d", strtotime($date));
		try {
			
			
			$this->_model->update(array(
					'MEETING_EVENT' => $data['data']['MEETING_EVENT'],
					'MEETING_DATE'=>$newDate
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

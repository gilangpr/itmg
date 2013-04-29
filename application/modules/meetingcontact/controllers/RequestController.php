<?php 

class Meetingcontact_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_Meetingcontact();
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
		//Call Model Investor
		$maModel = new Application_Model_Meetingactivitie();
		$inModel = new Application_Model_Investors();
		try {
			// Insert Data :
			//get id params
			$ma_id = $this->_getParam('id',0);
			if($maModel->isExistByKey('MEETING_ACTIVITIE_ID', $ma_id)) {
 			$this->_model->insert(array(
					'MEETING_ACTIVITIE_ID'=>$ma_id,
					'CONTACT_ID'=>$this->_posts['CONTACT_ID']
 					));
 			$inModel->update(array(
 					'MODIFIED_DATE' => date('Y-m-d H:i:s')
 				),$inModel->getAdapter()->quoteInto('INVESTOR_ID = ?', $this->_posts['INVESTOR_ID']));
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
	public function readAction()
	{
		$ma_id = (isset($this->_posts['id'])) ? $this->_posts['id'] : 0;
		$data = array(
				'data' => array(
				'items' => $this->_model->getListMeetingcontactLimit($this->_limit, $this->_start,$ma_id),
						'totalCount' => $this->_model->count()
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
<<<<<<< HEAD
=======
	}
	public function readAction()
	{
		$name = $this->_model->getName($this->_posts['id']);
		$modPart = new Application_Model_Participant();
		$namePart = $modPart->getName($this->_posts['id']);
		$_i = 0;
		$_temp = '';
		foreach ($name as $k=>$d) {
			//print_r($d);
			if($_temp == '') {
				$_temp = $d['CONTACT_ID'];
				$this->_data['data']['items'][$_i]['NAME'] = '';
			}
			if($_temp != $d['CONTACT_ID']) {
				$_i++;
				$_temp = $d['CONTACT_ID'];
				$this->_data['data']['items'][$_i]['NAME'] = '';
			}
			if(!isset($this->_data['data']['items'][$_i]['CONTACT_ID'])) {
				$this->_data['data']['items'][$_i]['CONTACT_ID'] = $d['CONTACT_ID'];
				$this->_data['data']['items'][$_i]['MEETING_ACTIVITIE_ID'] = $d['MEETING_ACTIVITIE_ID'];
				$this->_data['data']['items'][$_i]['NAME'] = $d['NAME'];
				$this->_data['data']['items'][$_i]['EMAIL'] = $d['EMAIL'];
				$this->_data['data']['items'][$_i]['POSITION'] = $d['POSITION'];
				$this->_data['data']['items'][$_i]['COMPANY_NAME'] = $d['COMPANY_NAME']; 	
								
			}
// 			print_r($_i);
			//print_r(count($_i));
			//$_j=$_i+2;
			$_j = $_i+1;
			$_temp2 = '';
			foreach ($namePart as $_k=>$_d) {
				if($_temp2 == '') {
					$_temp2 = $_d['PART_ID'];
				}
				if($_temp2 != $_d['PART_ID']) {
					$_j++;
					$_temp2 = $_d['PART_ID'];
					//$this->_data['data']['items'][$_j]['PART_ID'] = $_temp2;
				}
				if(!isset($this->_data['data']['items'][$_j]['PART_ID'])) {
					//$this->_data['data']['items'][$_j]['PART_ID'] = $_d['PART_ID'];
					$this->_data['data']['items'][$_j]['NAME'] = $_d['NAME'];
					$this->_data['data']['items'][$_j]['EMAIL'] = $_d['EMAIL_PARTICIPANT'];
					$this->_data['data']['items'][$_j]['POSITION'] = $_d['POSITION_PARTICIPANT'];
				}
// 				print_r($_temp2);
// 				/print_r($_d);
			}
		}
>>>>>>> edb15dd748db5c2998278a6f50adef439ed28a82
		

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
	
	public function destroyAction()
	{	
		$in_id = (isset($this->_posts['INVESTOR_ID'])) ? $this->_posts['INVESTOR_ID'] : 0;
		$co_id = (isset($this->_posts['CONTACT_ID'])) ? $this->_posts['CONTACT_ID'] : 0;
		$ma_id = (isset($this->_posts['MEETING_ACTIVITIE_ID'])) ? $this->_posts['MEETING_ACTIVITIE_ID'] : 0;
		$data = array(
				'data' => array()
				);
		$modelInvestors = new Application_Model_Investors();
		try {
			$idPart = $modelParticipant->getPkByKey('NAME', $this->_posts['NAME']);
			 //Delete
			$where=array();
			$where[]= $this->_model->getAdapter()->quoteInto('CONTACT_ID = ?', $co_id);
			$where[]= $this->_model->getAdapter()->quoteInto('MEETING_ACTIVITIE_ID = ?', $ma_id);
			$this->_model->delete($where);
<<<<<<< HEAD
=======
			$modelParticipant->delete(
					$modelParticipant->getAdapter()->quoteInto('PART_ID = ?', $idPart));
>>>>>>> edb15dd748db5c2998278a6f50adef439ed28a82
			$modelInvestors->update(array(
 					'MODIFIED_DATE' => date('Y-m-d H:i:s')
 				),$modelInvestors->getAdapter()->quoteInto('INVESTOR_ID = ?', $in_id));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}

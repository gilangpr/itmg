<?php 

class Investors_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_Investors();
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
					'INVESTOR_TYPE_ID'=>$this->_posts['INVESTOR_TYPE_ID'],
					'LOCATION_ID'=>$this->_posts['LOCATION_ID'],
 					'COMPANY_NAME'=> $this->_posts['COMPANY_NAME'],
					'STYLE'=> $this->_posts['STYLE'],
					'EQUITY_ASSETS'=>$this->_posts['EQUITY_ASSETS'],
					'PHONE_1'=>$this->_posts['PHONE_1'],
					'PHONE_2'=>$this->_posts['PHONE_2'],
					'FAX'=>$this->_posts['FAX'],
					'EMAIL_1'=>$this->_posts['EMAIL_1'],
					'EMAIL_2'=>$this->_posts['EMAIL_2'],
					'WEBSITE'=>$this->_posts['WEBSITE'],
					'ADDRESS'=>$this->_posts['ADDRESS'],
					'COMPANY_OVERVIEW'=>$this->_posts['COMPANY_OVERVIEW'],
					'INVESTMENT_STRATEGY'=>$this->_posts['INVESTMENT_STRATEGY'],
 					'CREATED_DATE' => date('Y-m-d H:i:s')
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
		$data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
						)
				);
		
		if(!isset($this->_posts['TYPE'])) {
			$data = array(
				'data' => array(
					'items' => $this->_model->getListInvestorsLimit($this->_limit, $this->_start),
					'totalCount' => $this->_model->count()
				)
			);
		} else {
			
			// Search :
			$TYPE = 'List';
			
			$q = $this->_model->select()->setIntegrityCheck(false)
			->from('INVESTORS', array('*'));
			
			if(isset($this->_posts['COMPANY_NAME'])) {
				$q->where('COMPANY_NAME LIKE ?', '%' . $this->_posts['COMPANY_NAME'] . '%');
			}
			
			if(isset($this->_posts['CONTACT_PERSON'])) {
				$modelCT = new Application_Model_Contacts();
				
				if($this->_posts['CONTACT_PERSON'] != '') {
					$q->join('CONTACTS', 'CONTACTS.INVESTOR_ID = INVESTORS.INVESTOR_ID', array('*'));
					$q->where('CONTACTS.NAME LIKE ?', '%' . $this->_posts['CONTACT_PERSON'] . '%');
				}
			}
			
			if(isset($this->_posts['EQUITY_ASSETS'])) {
				$EQUITY_ASSETS = $this->_posts['EQUITY_ASSETS'];
				if(strtolower($EQUITY_ASSETS) == 'small') {
					$q->where('EQUITY_ASSETS >= 0 AND EQUITY_ASSETS <= 20');
				}else if(strtolower($EQUITY_ASSETS) == 'medium') {
					$q->where('EQUITY_ASSETS >= 21 AND EQUITY_ASSETS <= 40');
				} else if(strtolower($EQUITY_ASSETS) == 'large'){
					$q->where('EQUITY_ASSETS >= 41');
				} else {
					$q->where('EQUITY_ASSETS >= 0');
				}
			}
			
			if(isset($this->_posts['INVESTOR_TYPE'])) {
				$modelIT = new Application_Model_InvestorType();
				if($modelIT->isExistByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE'])) {
					$id = $modelIT->getPkByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE']);
					$q->where('INVESTORS.INVESTOR_TYPE_ID = ?', $id);
					$q->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('*'));
				} else {
					$q->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('*'));
				}
			}
			
			if(isset($this->_posts['LOCATION'])) {
				$modelLC = new Application_Model_Locations();
				if($modelLC->isExistByKey('LOCATION', $this->_posts['LOCATION'])) {
					$id = $modelLC->getPkByKey('LOCATION', $this->_posts['LOCATION']);
					$q->where('INVESTORS.LOCATION_ID = ?', $id);
					$q->join('LOCATIONS', 'INVESTORS.LOCATION_ID = LOCATIONS.LOCATION_ID', array('*'));
				} else {
					$q->join('LOCATIONS', 'INVESTORS.LOCATION_ID = LOCATIONS.LOCATION_ID', array('*'));
				}
			}
			
			/* Model */
			
			/* End of : Models */
			//die($q);
			$x = $q->query()->fetchAll();
			
			$data['data']['items'] = $x;
			$data['data']['totalCount'] = count($x);
			$data['data']['CONTACT_PERSON'] = $this->_posts['CONTACT_PERSON'];
			
		}
	
		MyIndo_Tools_Return::JSON($data);
	}
	
	public function destroyAction(){
		$data = array(
				'data' => array()
				);
		try {
 			$this->_model->delete(
 					$this->_model->getAdapter()->quoteInto(
 							'INVESTOR_ID = ?', $this->_posts['INVESTOR_ID']
 							));
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
			if($this->_model->isExistByKey('INVESTOR_ID', $this->_posts['id'])) {
				try {
					if(isset($this->_posts['batch']) && $this->_posts['batch'] == 1) {
						if($this->_posts['btype'] == 'detail-investor') {
							$modelInvestorType = new Application_Model_InvestorType();
							$_dt = array(
									'INVESTOR_TYPE_ID' => $modelInvestorType->getPkByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE']),
									'EQUITY_ASSETS' => $this->_posts['EQUITY_ASSETS'],
									'STYLE' => $this->_posts['STYLE']
							);
						} else if($this->_posts['btype'] == 'company-address') {
							$modelLocation = new Application_Model_Locations();
							$_dt = array(
									'ADDRESS' => $this->_posts['ADDRESS'],
									'FAX' => $this->_posts['FAX'],
									'LOCATION_ID' => $modelLocation->getPkByKey('LOCATION', $this->_posts['LOCATION']),
									'PHONE_1' => $this->_posts['PHONE_1'],
									'PHONE_2' => $this->_posts['PHONE_2'],
									'EMAIL_1' => $this->_posts['EMAIL_1'],
									'EMAIL_2' => $this->_posts['EMAIL_2'],
									'WEBSITE' => $this->_posts['WEBSITE']
									);
						}
						$this->_model->update($_dt, $this->_model->getAdapter()->quoteInto('INVESTOR_ID = ?', $this->_posts['id']));
					} else {
						$this->_model->update(array(
								$this->_posts['type'] => $this->_posts[$this->_posts['type']]
						),$this->_model->getAdapter()->quoteInto('INVESTOR_ID = ?', $this->_posts['id']));
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
}
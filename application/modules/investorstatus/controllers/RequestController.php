<?php 

class Investorstatus_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_InvestorStatus();
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
		
		$this->_data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
				)
		);
	}
	
	public function  readAction() 
	{
		$data = array(
				'data' => array(
						'items' => $this->_model->getListLimit($this->_limit, $this->_start, 'INVESTOR_STATUS ASC'),
						'totalCount' => $this->_model->count()
				)
		);
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
		}	
		
		public function createAction() {
		
			$data = array(
					'data' => array()
			);

			if($this->_model->isExistByKey('INVESTOR_STATUS', $this->_posts['INVESTOR_STATUS'])) {
					
				$this->_success = false;
				$this->_error_message = 'Investor Status already exist.';
			} else {
				try {
					// Do insert query :
					$this->_model->insert(array(
							'INVESTOR_STATUS'=> $this->_posts['INVESTOR_STATUS'],
							'CREATED_DATE' => date('Y-m-d H:i:s')
					));
				
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			}
			
			MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
		}
		
		public function destroyAction()
		{
			$data = array(
					'data' => array()
			);
			try {
				// Delete
				$share = new Application_Model_Shareholdings();
				$val = $this->_model->getValueByKey('INVESTOR_STATUS_ID', $this->_posts['INVESTOR_STATUS_ID'], 'INVESTOR_STATUS');
				$query = $share->select()
				->where('INVESTOR_STATUS_ID = ?', $this->_posts['INVESTOR_STATUS_ID']);

                	if ($query->query()->rowCount() > 0) {
                		
                		
			            $this->_success = false;
                		

                } else {
                	
                	$this->_model->delete(
                			$this->_model->getAdapter()->quoteInto(
                					'INVESTOR_STATUS_ID = ?', $this->_posts['INVESTOR_STATUS_ID']
                			));
               
				
			}
			}
			catch(Exception $e) {
				
				$this->_error_code = $e->getCode();
				$this->_error_message = $e->getMessage();
				$this->_success = false;
			}
			MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
		}
		
		public function  autocomAction() 
		{
			if ($this->_posts['query'] == '') {
 			
 			$data = array(
 					'data' => array(
 							'items' => $this->_model->getListLimit($this->_limit, $this->_start, 'INVESTOR_STATUS ASC'),
 							'totalCount' => $this->_model->count()
 							)
 					);
 		} else {
				$data = array(
						'data' => array(
								'items' => $this->_model->getAllLike($this->_posts['query'], $this->_limit, $this->_start),
								'totalCount' => $this->_model->count()
						)
				);
			}
			MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
		}
}
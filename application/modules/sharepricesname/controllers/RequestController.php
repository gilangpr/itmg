<?php

class Sharepricesname_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	protected $_name;
	
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_SharepricesName();
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
						'items' => $this->_model->getAll($this->_limit, $this->_start),
						'totalCount' => $this->_model->count()
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function createAction()
	{
		$this->_model2 = new MyIndo_Ext_ContentColumns();
		$this->_model3 = new MyIndo_Ext_ModelFields();
		
		$data = array(
				'data' => array()
		);
		
		if ($this->_model->isExistByKey('SHAREPRICES_NAME', $this->_posts['SHAREPRICES_NAME']))
		{
			
			$this->_success = false;
			$this->_error_message = 'Shareprices name already exist';
		}
		else 
		{
			try {
				// Insert Data :
				$this->_model->insert(array(
						'SHAREPRICES_NAME'=> $this->_posts['SHAREPRICES_NAME'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
				$this->_model2->insert(array(
						'CONTENT_ID' => 6,
						'TEXT' => $this->_posts['SHAREPRICES_NAME'],
						'DATAINDEX' => $this->_posts['SHAREPRICES_NAME'],
						'DATATYPE' => 'float',
						'ALIGN' => 'center',
						'WIDTH' => '100',
						'EDITABLE' => 1,
						'FLEX' => 1,
						'INDEX' => 0,
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
				$this->_model3->insert(array(
						'MODEL_ID' => 6,
						'NAME' => $this->_posts['SHAREPRICES_NAME'],
						'TYPE' => 'float',
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

	public function updateAction()
	{
		$this->_model2 = new MyIndo_Ext_ContentColumns();
		$this->_model3 = new MyIndo_Ext_ModelFields();
		$data = array(
				'data' => array()
		);

		try {
			$posts = $this->getRequest()->getRawBody();
			$posts = Zend_Json::decode($posts);
				
			$this->_model2->update(array(
					'TEXT' => $posts['data']['SHAREPRICES_NAME'],
					'DATAINDEX' => $posts['data']['SHAREPRICES_NAME']
			),
					$this->_model2
					->getAdapter()->quoteInto('CREATED_DATE = ?', $posts['data']['CREATED_DATE']));

			$this->_model->update(array(
					'SHAREPRICES_NAME' => $posts['data']['SHAREPRICES_NAME']
			),
					$this->_model->getAdapter()->quoteInto('SHAREPRICES_NAME_ID = ?', $posts['data']['SHAREPRICES_NAME_ID']));
			
			$this->_model3->update(array(
					'NAME' => $posts['data']['SHAREPRICES_NAME']
			),
					$this->_model3->getAdapter()->quoteInto('MODEL_FIELD_ID = ?', $posts['data']['SHAREPRICES_NAME_ID']));
			
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
	
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function destroyAction()
	{
		$this->_model = new MyIndo_Ext_ContentColumns();
		$this->_model2 = new MyIndo_Ext_ModelFields();
		$this->_model3 = new Application_Model_SharepricesName();
		
		$data = array(
				'data' => array()
		);
		try {
			// Delete
			$this->_model3->delete(
					$this->_model3->getAdapter()->quoteInto(
							'SHAREPRICES_NAME_ID = ?', $this->_posts['SHAREPRICES_NAME_ID']
					));
			$this->_model2->delete(
					$this->_model2->getAdapter()->quoteInto(
							'NAME = ?',$this->_posts['SHAREPRICES_NAME']
					));
			$this->_model->delete(
					$this->_model->getAdapter()->quoteInto(
							'DATAINDEX = ?',$this->_posts['SHAREPRICES_NAME']
					));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
<?php

class Shareprices_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_Shareprices();
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
	
	public function readAction()
	{
		$spNameModel = new Application_Model_SharepricesName();
		$spRes = $spNameModel->getList();
		$spList = array();
		$i = 0;
		foreach($spRes as $k=>$d) {
			if(!isset($spRes[$d['SHAREPRICES_NAME']])) {
				$spRes[$i] = $d['SHAREPRICES_NAME'];
				$i++;
			}
		}
		$lastId = $this->_model->getLastId();
		
		$list = $this->_model->getListLimit($this->_limit, $this->_start, 'DATE ASC');
		
		$t = array();
		$t2 = array();
		$i = 0;
		$temp = '';
		$temp2 = '';
		$temp3 = '';
		foreach($list as $k=>$d) {
			if($temp == '') {
				$temp = $d['DATE'];
			}
			if($temp != $d['DATE']) {
				$i++;
				$temp = $d['DATE'];
				$t2 = array();
			}
			if(!isset($t[$i]['DATE'])) {
				$t[$i]['DATE'] = $d['DATE'];
			}
			$t[$i][$d['SHAREPRICES_NAME']] = $d['VALUE'];
		}
		foreach($t as $k=>$d) {
			foreach($spRes as $_k=>$_d) {
				if(!isset($t[$k][$_d])) {
					$t[$k][$_d] = 0;
				}
				if($_k > 0) {
					$temp2 .= '|';
				}
				if($t[$k][$_d] > 0) {
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d, $d[$_d]);//$d['DATE'] . '__' . $_d . '__' . (isset($d[$_d])) ? $d[$_d] : $lastId;
				} else {
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d, 0);
				}
			}
			$t[$k]['IDS'] = $temp2;
			$temp2 = '';
		}

		
		$this->_data['data']['items'] = $t;
		$this->_data['data']['totalCount'] = $i;
		
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function updateAction()
	{
		
		$data = array(
				'data' => array()
		);
				
		try{
			$posts = $this->getRequest()->getRawBody();
			$posts = Zend_Json::decode($posts);

			$getId = explode('|',$posts['data']['IDS']);
			$ids = array();
			foreach($getId as $k=>$d) {
				$temp = explode('_', $d);
				if($temp[1] > 0) {
					$this->_model->update(array(
							'VALUE' => $posts['data'][$temp[0]]
							), $this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $temp[1]));
				} else {
					$this->_model->insert(array(
							'DATE'=> $posts['data']['DATE'],
							'SHAREPRICES_NAME' => $temp[0],
							'VALUE' => $posts['data'][$temp[0]],
							'CREATED_DATE' => date('Y-m-d H:i:s')
					));
				}
			}
			
			
		}catch(Exception $e){
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	
	}
	
	public function createAction()
	{		
		$this->_model2 = new Application_Model_SharepricesLog();
		$data = array(
				'data' => array()
		);		
		
		$name = $this->_posts['SHAREPRICES_NAME'];
		$date = $this->_posts['DATE'];
		$rows = $this->_model->getCount($name,$date);
		
		//CHECK EXIST OR NOT
		if ($rows['count'] > 0) {
			$name = $this->_posts['SHAREPRICES_NAME'];
			$date = $this->_posts['DATE'];

			$data = array(
			    'VALUE_AFTER'      => $this->_posts['VALUE']
			);
			$where[] = $this->_model2->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $name);
			$where[] = $this->_model2->getAdapter()->quoteInto('DATE = ?', $date);
			$this->_model2->update($data, $where);

			$this->_model2->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE_BEFORE' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
			
			$data = array(
			    'VALUE'      => $this->_posts['VALUE']
			);
			 
			$where[] = $this->_model->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $name);
			$where[] = $this->_model->getAdapter()->quoteInto('DATE = ?', $date);
			$this->_model->update($data, $where);

			$this->_success = false;
			$this->_error_message = 'Success adding new Shareprices';
		}		
		else {
			try{
				$this->_model2->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE_BEFORE' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
				$this->_model->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
			}catch(Exception $e)
			{
				$this->_error_code = $e->getCode();
				$this->_error_message = $e->getMessage();
				$this->_success = false;
			}
		}
					
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}	
}
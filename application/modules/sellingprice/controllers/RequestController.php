<?php

class Sellingprice_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_SellingPrice();
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

		$this->_data = array();
	}
	public function indexAction()
	{

	}

	public function getTitleAction()
	{
		$titleList = $this->_model->select();
		$titleList = $titleList->query()->fetchAll();
		$title = array(array('flex'=>1,'text'=>'','dataIndex'=>'NAME'));
		foreach($titleList as $k=>$d) {
			$title[$k+1]['text'] = $d['TITLE'];
			$title[$k+1]['dataIndex'] = 'VALUE_' . $d['TITLE'];
			$title[$k+1]['align'] = 'center';
		}
		$data = array(
				'data' => array(
						'items' => $title
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function createAction()
	{
		$data = array(
				'data' => array()
		);
		$modelPeer = new Application_Model_Peers();
		try {
			/* INSERT AVERAGE SELLING PRICE DATA */
			$peer_id = $this->_getParam('id',0);
			if($modelPeer->isExistByKey('PEER_ID', $peer_id)) {
			
				$_q = $this->_model->select()
				->where('TITLE = ?', $this->_posts['TITLE'])
				->where('TYPE = ?', $this->_posts['TYPE'])
				->where('PEER_ID = ?', $peer_id);
				
				$_res = $_q->query()->fetchAll();

				if(count($_res) == 0) {
					$this->_model->insert(array(
							'PEER_ID' => $peer_id,
							'TITLE' => $this->_posts['TITLE'],
							'TYPE' => $this->_posts['TYPE'],
							'VALUE_IDR' => $this->_posts['VALUE_IDR'],
							'VALUE_USD' => $this->_posts['VALUE_USD'],
							'CREATED_DATE' => date('Y-m-d H:i:s')
					));
				} else {
					/* UPDATE IF TITLE IS EXIST */
					
					$this->_model->update(array(
							'TITLE' => $this->_posts['TITLE'],
							'TYPE' => $this->_posts['TYPE'],
							'VALUE_IDR' => $this->_posts['VALUE_IDR'],
							'VALUE_USD' => $this->_posts['VALUE_USD']
					), $this->_model->getAdapter()->quoteInto('SELLING_PRICE_ID = ?',
							$this->_model->getPkByKey('TITLE', $this->_posts['TITLE'])
					));
				}
		
			} else {
				$this->_error_code = 404;
				$this->_error_message = 'PEER_ID NOT FOUND';
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
		$modelPeer = new Application_Model_SellingPrice();
		$peer_id = (isset($this->_posts['id'])) ? $this->_posts['id'] : 0;
		
		if($modelPeer->isExistByKey('PEER_ID', $peer_id)) {
			$list = $this->_model->select()->where('PEER_ID = ?', $peer_id)
			->order('SELLING_PRICE_ID DESC')
			->limit(3, 0);
			$list = $list->query()->fetchAll();

			$content = array();
			$i = 0;
			$j = 0;
			
			foreach($list as $k=>$d){
				if($j != $k) {
					$i = 0;
					$j = $k;
				}
				foreach($list as $k=>$d) {
					for($i=0;$i<2;$i++) {
						$content[$i]['NAME'] = ($i==0) ? 'Export (USD)' : 'Domestic (IDR)';
						//$content[$i]['NAME'] = ($i==0) ? 'IDR' : 'USD';
						$content[$i]['VALUE_' . $list[$k]['TITLE']] = ($i==0) ? $list[$k]['VALUE_USD'] : $list[$k]['VALUE_IDR'];
					}
					//$content[$k]['TITLE'] = $d['TITLE'];
				}
				$list[$k]['TITLE'] = $d['TITLE'];
			}

			$data = array(
					'data' => array(
							'items' => $content,
							'totalCount' => count($list)
					)
			);
		} else {
			$data = array(
					'data' => array(
							'items' => array(),
							'totalCount' => 0
					)
			);
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function updateAction()
	{
		/* UPDATE AVERAGE SELLING PRICE DATA */
		$data = array(
				'data' => array()
		);
		
		/* GET JSON DATA */
		$data = $this->getRequest()->getRawBody();
		
		/* CHANGE JSON DATA TO ARRAY */
		$data = Zend_Json::decode($data);
		
		foreach($data['data'] as $k=>$d) {
			$t = explode('_', $k);
			if(isset($t[0])) {
				if($t[0] == 'VALUE_' . $d['TITLE']) {
					if($this->_model->isExistByKey('TITLE', $t[1])) {
						$id = $this->_model->getPkByKey('TITLE', $t[1]);
						// 						$data['ids'][] = $id;
						// 						$data['vals'][] = $d;
						$this->_model->update(array(
								'SALES_VOLUME' => $d,
								'PRODUCTION_VOLUME' => $d,
								'COAL_TRANSPORT' => $d
						), $this->_model->getAdapter()->quoteInto('STRIPPING_RATIO_ID = ?', $id));
					}
				}
			}
		}

		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}

	/* New function - Dev ( Gilang ) */

	public function readDevAction()
	{
		$modelPeer = new Application_Model_Peers();
		$id = (isset($this->_posts['id'])) ? $this->_posts['id'] : 0;
		if($modelPeer->isExistByKey('PEER_ID', $id)) {
				
				$q = $this->_model->select()
				->from('SELLING_PRICES', array('SELLING_PRICE_ID','TITLE','TYPE','VALUE_IDR','VALUE_USD'))
				->where('PEER_ID = ?', $id)
				->order('TITLE DESC')
				->order('TYPE ASC')
				->limit($this->_posts['limit'], $this->_posts['start']);
				$list = $q->query()->fetchAll();
				
				$q = $this->_model->select()
				->where('PEER_ID = ?', $id);
				$listAll = $q->query()->fetchAll();
				
				$this->_data = array(
					'data' => array(
						'items' => $list,
						'totalCount' => count($listAll)
						)
					);

		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function updateDevAction()
	{
		$data = Zend_Json::decode($this->getRequest()->getRawBody());
		if(isset($data['data']['SELLING_PRICE_ID'])) {
			$id = $data['data']['SELLING_PRICE_ID'];
			if($this->_model->isExistByKey('SELLING_PRICE_ID', $id)) {
				try {
					$this->_model->update(array(
						'TITLE' => $data['data']['TITLE'],
						'TYPE' => $data['data']['TYPE'],
						'VALUE_IDR' => $data['data']['VALUE_IDR'],
						'VALUE_USD' => $data['data']['VALUE_USD']
						), $this->_model->getAdapter()->quoteInto('SELLING_PRICE_ID = ?', $id));
					$this->_data = $data;
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
			$this->_error_code = '901';
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function destroyDevAction()
	{
		if(isset($this->_posts['id'])) {
			$id = $this->_posts['id'];
			if($this->_model->isExistByKey('SELLING_PRICE_ID', $id)) {
				try {
					$this->_model->delete($this->_model->getAdapter()->quoteInto('SELLING_PRICE_ID = ?', $id));
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
			$this->_error_code = '901';
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
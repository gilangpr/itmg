<?php

class Coalsales_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_post;
	protected $_error_code;
	protected $_error_message;
	protected $_success;

	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Coalsales();
		if($this->getRequest()->isPost()) {
			$this->_post = $this->getRequest()->getPost();
		} else {
			$this->_post = array();
		}

		$this->_start = (isset($this->_post['start'])) ? $this->_post['start'] : 0;
		$this->_limit = (isset($this->_post['limit'])) ? $this->_post['limit'] : 25;

		$this->_error_code = 0;
		$this->_error_message = '';
		$this->_success = true;
	}

	public function indexAction()
	{

	}

	public function getTitleAction()
	{
		$titleList = $this->_model->select();
		$titleList = $titleList->query()->fetchAll();
		$title = array(array('flex'=>1,'text'=>'', 'dataIndex'=>'NAME'));
		foreach ($titleList as $k => $d) {
			$title [$k+1]['text'] = $d['TITLE'];
			$title [$k+1]['dataIndex'] = $d['TITLE'];
			$title [$k+1]['align'] = 'center';
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
		$modelCoalsales = new Application_Model_Coalsales();
		try {
			$peer_id = $this->_getParam('id',0);
			if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
				$this->_model->insert(array(
					'PEER_ID' => $peer_id,
					'TITLE' => $this->_post['TITLE'],
					'TYPE' => $this->_post['TYPE'],
					'COUNTRY' => $this->_post['COUNTRY'],
					'VOLUME' => $this->_post['VOLUME'],
					'CREATED_DATE' => date('Y-m-d H:i:s')
				));
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
		
		$modelCoalsales = new Application_Model_Coalsales();
		$peer_id = (isset($this->_post['id'])) ? $this->_post['id'] : 0;
		if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
			$list = $this->_model->select()->where('PEER_ID = ?', $peer_id);
			$list = $list->query()->fetchAll();
			
// 			/* Add total */
// 			$sum2 = array(
// 					'VOLUME'=> 0,
// 					'PERCENTAGE' => 0
// 			);
// 			foreach($list as $k=>$d) {
// 				$sum2['VOLUME'] += $d['VOLUME'];
// 				$sum2['PERCENTAGE'] += $d['PERCENTAGE'];
// 			}
				
// 			$c = count($list);
// 			$list[$c]['TYPE'] = 'TOTAL';
// 			$list[$c]['VOLUME'] = $sum2['VOLUME'];
// 			$list[$c]['PERCENTAGE'] = $sum2['PERCENTAGE'];
// 			/* End of : Add Total */
			
			$data = array(
				'data' => array(
					'items' => $list,
					'totalCount' => $this->_model->count()
					)
				);

			$domestic = 0;
			$export = 0;
			foreach($list as $k=>$d) {
				if(strtolower($d['TYPE']) == 'domestic') {
					$domestic += $d['VOLUME'];
				} else {
					$export += $d['VOLUME'];
				}
			}
			$sum = $domestic + $export;
			$data = array(
					'data' => array(
					'items' => array(
							array(
									'NAME' => 'Domestic',
									'VOLUME' => $domestic,
									'PERCENTAGE' => number_format(($domestic / $sum) * 100, 2) . '%'
									),
							array(
									'NAME' => 'Export',
									'VOLUME' => $export,
									'PERCENTAGE' => number_format(($export / $sum) * 100, 2) . '%'
									)
							)
					));

		}

		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	//ACTION READ FOR COAL SALES DISTRIBUTION BY COUNTRY
	public function read2Action()
	{
		$modelCoalsales = new Application_Model_Coalsales();
		$peer_id = (isset($this->_post['id'])) ? $this->_post['id'] : 0;
		if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
			
			$list = $this->_model->getListCS($peer_id);
			
// 			$list = $this->_model->select()->where('PEER_ID = ?', $peer_id);
// 			$list = $list->query()->fetchAll();
		
			$data = array(
					'data' => array(
							'items' => $list,
							'totalCount' => count($list)
					)
				);
// 			$sum = 0;
// 			foreach($list as $k=>$d) {
// 				$sum += $d['VOLUME'];
// 			}
			
// 			$data = array(
// 					'data' => array(
// 						'items' => array(
// 							'NAME' => $d['COUNTRY'],
// 							'VOLUME' => $d['VOLUME'],
// 							'PERCENTAGE' => number_format(($d['VOLUME'] / $sum) * 100,2) . '%'
// 						)
// 					)	
// 				);
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
}
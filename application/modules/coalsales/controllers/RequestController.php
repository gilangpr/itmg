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
		$modelCoalSalesTitle = new Application_Model_CoalSalesTitle();
		try {
			$peer_id = $this->_getParam('id',0);
			$PID = $modelCoalsales->getValueByKey('TITLE', $this->_post['TITLE'], 'PEER_ID');
			PRINT_R($PID);die;
			if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
				$this->_model->insert(array(
					'PEER_ID' => $peer_id,
					'TITLE' => $this->_post['TITLE'],
					'TYPE' => $this->_post['TYPE'],
					'COUNTRY' => $this->_post['COUNTRY'],
					'VOLUME' => $this->_post['VOLUME'],
					'CREATED_DATE' => date('Y-m-d H:i:s')
				));
				if(!$modelCoalSalesTitle->isExistByKey('TITLE', $this->_posts['TITLE'])) {
					$modelCoalSalesTitle->insert(array(
							'TITLE' => $this->_posts['TITLE'],
							'CREATED_DATE' => date('Y-m-d H:i:s')
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
		
		$modelCoalsales = new Application_Model_Coalsales();
		$modelCoalSalesTitle = new Application_Model_CoalSalesTitle();
		$peer_id = (isset($this->_post['id'])) ? $this->_post['id'] : 0;
		if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
			$q = $this->_model->select()
			->setIntegrityCheck(false)
			->from('COAL_SALES_DISTRIBUTION', array('*'))
			->where('PEER_ID = ?', $peer_id)
			->join('COAL_SALES_DISTRIBUTION_TITLE','COAL_SALES_DISTRIBUTION.TITLE = COAL_SALES_DISTRIBUTION_TITLE.TITLE', array('*'))
			->order('COAL_SALES_DISTRIBUTION_TITLE.CREATED_DATE DESC');
			
			if($q->query()->rowCount() > 0) {
				$list = $q->query()->fetchAll();
				$lastTitle = $list[0]['TITLE'];
				
				$list = $this->_model->select()
				->where('PEER_ID = ?', $peer_id)
				->where('TITLE = ?', $lastTitle);
				
				$list = $list->query()->fetchAll();
				
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

		}

		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	/* ACTION READ FOR COAL SALES DISTRIBUTION BY COUNTRY */
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
	
	public function read3Action()
	{
		$modelCS = new Application_Model_Coalsales();
		$modelCST = new Application_Model_CoalSalesTitle();
		$data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
						)
				);
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()) {
			if(isset($this->_post['id'])) {
				if($modelCS->isExistByKey('PEER_ID', $this->_post['id'])) {
					
					$peer_id = $this->_post['id'];
					$q = $this->_model->select()
					->setIntegrityCheck(false)
					->from('COAL_SALES_DISTRIBUTION', array('*'))
					->where('PEER_ID = ?', $peer_id)
					->join('COAL_SALES_DISTRIBUTION_TITLE','COAL_SALES_DISTRIBUTION.TITLE = COAL_SALES_DISTRIBUTION_TITLE.TITLE', array('*'))
					->order('COAL_SALES_DISTRIBUTION_TITLE.CREATED_DATE DESC');
					
					if($q->query()->rowCount() > 0) {
						$list = $q->query()->fetch();
						$lastTitle = $list['TITLE'];
						
						$list = $modelCS->select()
						//->from('COAL_SALES_DISTRIBUTION', array('COUNTRY','VOLUME','sum(VOLUME) as TOTAL'))
						->where('PEER_ID = ?', $peer_id)
						->where('TITLE = ?', $lastTitle);
						//->group(array('COUNTRY'));
						
						$list = $list->query()->fetchAll();
						$total = 0;
						foreach($list as $k=>$d) {
							$total += $d['VOLUME'];
						}
						foreach($list as $k=>$d) {
							$list[$k]['PERCENTAGE'] = number_format(($d['VOLUME'] / $total) * 100,2) . '%';
						}
						
						$data = array(
								'data' => array(
										'items' => $list,
										'totalCount' => count($list)
								)
						);
					}
					
				}
			}
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
}
<?php 

class Compositioncompany_RequestController extends Zend_Controller_Action
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
		$this->_model = new Application_Model_CompositionCompany();
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
		$modelPeer = new Application_Model_CompositionCompany();
		try {
			//Insert Data :
			$peer_id = $this->_getParam('id',0);
			if($modelPeer->isExistByKey('PEER_ID', $peer_id)) {
				$this->_model->insert(array(
						'PEER_ID' => $peer_id,
						'TITLE' => $this->_posts['TITLE'],
						
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
		$modelPeer = new Application_Model_CompositionCompany();
		$peer_id = (isset($this->_posts['id'])) ? $this->_posts['id'] : 0;
		if($modelPeer->isExistByKey('PEER_ID', $peer_id)) {
			$list = $this->_model->select()->where('PEER_ID = ?', $peer_id);
			$list = $list->query()->fetchAll();
			
			$attr = array(
					'REPUBLIC_OF_INDONESIA' => array('title' => 'Republic Of Indonesia'),
					'DOMESTIC_INVESTOR' => array('title' => 'Domestic Investor'),
					'FOREIGN_INVESTOR' => array('title' => 'Foreign Investor')
					);
			$content = array();
			$i = 0;
			$j = 0;
			$sum = array();
			foreach($list as $k=>$d) {
				if($j!=$k) {
					$i=0;
					$j=$k;
				}
				foreach($attr as $_k=>$_d) {
						$content[$i]['NAME'] = $_d['title'];
						$content[$i]['VALUE_' . $d['TITLE']] = $d[$_k];
						$i++;
						if(!isset($sum[$d['TITLE']])) {
							$sum[$d['TITLE']] = $d[$_k];
						} else {
							$sum[$d['TITLE']]+= $d[$_k];
						}
				}
			}
			$i = 0;
			$j = 0;
			$temp = array();
			foreach($content as $k=>$d) {
				$temp[$k] = array_keys($content[$k]);
				foreach($temp[$k] as $_k=>$_d) {
					$t = explode("_", $_d);
					if(count($t) > 0 && $t[0] == 'VALUE') {
						$content[$k]['PERCENTAGE_' . $t[1]] = number_format(( $d['VALUE_' . $t[1]] / $sum[$t[1]]) * 100,2) . '%';
					}
				}
			}
			$data = array(
				'data' => array(
					'items' => $content,
					'totalCount' => count($list),
					'sums' => $sum
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
		$data = array(
				'data' => array()
		);
		
		try {
			// $posts = $this->getRequest()->getRawBody();
			// $posts = Zend_Json::decode($posts);
			
			// $this->_model->update(array(
			// 		'INVESTOR_TYPE' => $posts['data']['INVESTOR_TYPE']
			// 		),
			// 		$this->_model->getAdapter()->quoteInto('INVESTOR_TYPE_ID = ?', $posts['data']['INVESTOR_TYPE_ID']));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
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
 			// $this->_model->delete(
 			// 		$this->_model->getAdapter()->quoteInto(
 			// 				'INVESTOR_TYPE_ID = ?', $this->_posts['INVESTOR_TYPE_ID']
 			// 				));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
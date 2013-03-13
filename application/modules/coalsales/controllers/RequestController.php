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
					'VOLUME' => $this->_post['VOLUME'],
					'PERCENTAGE' => $this->_post['PERCENTAGE'],
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
	}

	public function readAction()
	{
		$modelCoalsales = new Application_Model_Coalsales();
		$peer_id = (isset($this->_post['id'])) ? $this->_post['id'] : 0;
		if ($modelCoalsales->isExistByKey('PEER_ID', $peer_id)) {
			$list = $this->_model->select()->where('PEER_ID = ?', $peer_id);
			$list = $list->query()->fetchAll();

			$data = array(
				'data' => array(
					'items' => $list,
					'totalCount' => $this->_model->count()
					)
				);

			$type = 'Domestic';
			$i = 0;
			$count = 0;
			$t = array();

			foreach($list as $k=>$d) {

			}

		}

		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
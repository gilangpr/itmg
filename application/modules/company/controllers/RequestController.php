<?php 

class Company_RequestController extends MyIndo_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	protected $_data;
	protected $_pk;
	protected $_name;
	
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Company();
		
		if($this->getRequest()->isPost()) {
			$this->_posts = $this->getRequest()->getPost();
		} else {
			$this->_posts = array();
		}
		
		$this->_start = (isset($this->_posts['start'])) ? $this->_posts['start'] : 0;
		$this->_limit = (isset($this->_posts['limit'])) ? $this->_posts['limit'] : $this->view->default_limit;
		
		$this->_error_code = 0;
		$this->_error_message = '';
		$this->_success = true;
		
		$this->_data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
						)
				);
		
		$this->_pk = 'COMPANY_ID';
		$this->_name = 'COMPANY_NAME';
	}
	
	public function readAction()
	{
		if($this->isPost() && $this->isAjax()) {
			if(isset($this->_posts['sort']) || isset($this->_posts['query'])) {
				try {
					if(isset($this->_posts['sort'])) {
						// Decode sort JSON :
						$sort = Zend_Json::decode($this->_posts['sort']);
					}
					// Query data
					$q = $this->_model->select();
		
					if(isset($this->_posts['sort'])) {
						$q->order($sort[0]['property'] . ' ' . $sort[0]['direction']);
					}
		
					if(isset($this->_posts['query'])) {
						if(!empty($this->_posts['query']) && $this->_posts['query'] != '') {
							$q->where('COMPANY_NAME LIKE ?', '%' . $this->_posts['query'] . '%');
						}
					}
		
					// Count all data
					$rTotal = $q->query()->fetchAll();
					$totalCount = count($rTotal);
		
					// Fetch sorted & limit data
					$q->limit($this->_limit, $this->_start);
					$result = $q->query()->fetchAll();
		
					$this->_data['data']['items'] = $result;
					$this->_data['data']['totalCount'] = $totalCount;
				} catch (Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				try {
					if(isset($this->_posts['all']) && $this->_posts['all'] == 1) {
						$this->_limit = $this->_model->count();
					}
					if(!isset($this->_posts['query']) || $this->_posts['query'] == '' || empty($this->_posts['query'])) {
						$list = $this->_model->getListLimit($this->_limit, $this->_start, $this->_name . ' ASC');
					} else {
						$where = $this->_model->getAdapter()->quoteInto($this->_name . ' LIKE ?', '%' . $this->_posts['query'] . '%');
						$list = $this->_model->getListLimit($this->_limit, $this->_start, $this->_name . ' ASC', $where);
					}
					
					$this->_data['data']['items'] = $list;
					$this->_data['data']['totalCount'] = $this->_model->count();
					
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			}
		} else {
			$this->error(901);
		}
		$this->json();
	}
	
	public function updateAction()
	{
		if($this->isPost() && $this->isAjax()) {
			try {
				$data = $this->getRequest()->getRawBody();
				$data = Zend_Json::decode($data);
				if(isset($data['data'][$this->_pk])) {
					if($this->_model->isExistByKey($this->_pk, $data['data'][$this->_pk])) {
						$this->_model->update(array(
								$this->_name => $data['data'][$this->_name]
						),$this->_model->getAdapter()->quoteInto($this->_pk . ' = ?', $data['data'][$this->_pk]));
						$this->_data['data']['items'] = $this->_model->getDetailByKey($this->_pk, $data['data'][$this->_pk]);
					} else {
						$this->error(101);
					}
				} else {
					$this->error(901);
				}
			}catch (Exception $e) {
				$this->_error_code = $e->getCode();
				$this->_error_message = $e->getMessage();
				$this->_success = false;
			}
		} else {
			$this->error(901);
		}
		$this->json();
	}
	
	public function createAction()
	{
		if($this->isPost() && $this->isAjax() && isset($this->_posts[$this->_name])) {
			if(!$this->_model->isExistByKey($this->_name, $this->_posts[$this->_name])) {
				try {
					$this->_model->insert(array(
							$this->_name => $this->_posts[$this->_name],
							'CREATED_DATE' => date('Y-m-d H:i:s')
							));
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				$this->error(201);
			}
		} else {
			$this->error(901);
		}
		$this->json();
	}
	
	public function destroyAction()
	{
		if($this->isPost() && $this->isAjax() && isset($this->_posts[$this->_name])) {
			if($this->_model->isExistByKey($this->_name, $this->_posts[$this->_name])) {
				try {
					$this->_model->delete($this->_model->getAdapter()->quoteInto($this->_name . ' = ?', $this->_posts[$this->_name]));
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				$this->error(101);
			}
		} else {
			$this->error(901);
		}
		$this->json();
	}
}
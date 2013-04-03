<?php 

class Peers_ExecutiveController extends MyIndo_Controller_Action
{
	public function init()
	{
		$this->getInit(new Application_Model_Peers());
		$this->_model = new Application_Model_Peers();
	}
	
	public function getListPeersAction()
	{
		if($this->isPost() && $this->isAjax()) {
			if(!isset($this->_posts['TYPE'])) {
				$data = $this->_model->getList();
				$this->_data['data']['items'] = $data;
			} else {
				// Search :
				if(isset($this->_posts['COMPANY_NAME'])) {
					$q = $this->_model->select()
					->where('PEER_NAME LIKE ?', '%' . $this->_posts['COMPANY_NAME'] . '%');
					$this->_data['data']['items'] = $q->query()->fetchAll();
					$this->_data['data']['totalCount'] = $q->query()->rowCount();
				} else {
					$this->_data['data']['items'] = $this->_model->getListLimit($this->_posts['limit'], $this->_posts['start']);
					$this->_data['data']['totalCount'] = $this->_model->count();
				}
			}
		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
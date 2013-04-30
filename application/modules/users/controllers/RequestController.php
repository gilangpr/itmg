<?php 

class Users_RequestController extends MyIndo_Controller_Action
{
	public function init()
	{
		$this->getInit(new Application_Model_Users());
	}
	
	public function readAction()
	{
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()) {
			if(isset($this->_posts['all']) && $this->_posts['all'] == 1) {
				$this->_list = $this->_model->getListLimit($this->_model->count(), $this->_start, 'USERNAME ASC');
			} else {
				$this->_list = $this->_model->getListLimit($this->_limit, $this->_start, 'USERNAME ASC');
			}
			
			//foreach($this->_list as $k=>$d) {
				//$this->_list[$k]['ACTIVE'] = ($d['ACTIVE'] == 1) ? 'YES' : 'NO';
				//$this->_list[$k]['status'] = $d['ACTIVE'];
			//}
			
			//$this->_list = $this->_model->getListLimit($this->_limit, $this->_start, 'USERNAME ASC');
			$this->_data['data']['items'] = $this->_list;
			$this->_data['data']['totalCount'] = $this->_model->count();
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
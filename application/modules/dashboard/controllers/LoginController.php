<?php 

class Dashboard_LoginController extends Zend_Controller_Action
{
	public function init()
	{
		$layout = $this->_helper->layout();
		$layout->setLayout('login');
	}
	
	protected function _getAuthAdapter() {
		
		$dbAdapter = Zend_Db_Table::getDefaultAdapter();
		$authAdapter = new Zend_Auth_Adapter_DbTable($dbAdapter);
		
		$authAdapter->setTableName('USERS')
		->setIdentityColumn('USERNAME')
		->setCredentialColumn('PASSWORD');
		return $authAdapter;
	}
	
	protected function _loginProcess($data)
	{
		try {
			$adapter = $this->_getAuthAdapter();
			$adapter->setIdentity($data['USERNAME']);
			$adapter->setCredential(MyIndo_Tools_Return::makePassword($data['PASSWORD']));

			$select = $adapter->getDbSelect();
			$select->where('ACTIVE = 1');
			
			$auth = Zend_Auth::getInstance();
			
			$result = $auth->authenticate($adapter);
			 
			if($result->isValid()) {
				return array(
						'message' => 'Welcome back, ' . $data['USERNAME'] . '.',
						'status' => true
				);
			} else {
				return array(
						'message' => 'Invalid Username or Password',
						'status' => false
				);
			}
		}catch(Exception $e) {
			return array(
					'message' => $e->getMessage(),
					'status' => false
			);
		}
	}
	
	public function indexAction()
	{
		if($this->getRequest()->isPost()) {
			
			$this->_helper->layout()->disableLayout();
			$this->_helper->viewRenderer->setNoRender(true);
			
			$posts = $this->getRequest()->getPost();
			
			$data['USERNAME'] = (isset($posts['USERNAME'])) ? $posts['USERNAME'] : '';
			$data['PASSWORD'] = (isset($posts['PASSWORD'])) ? $posts['PASSWORD'] : '';
			
			$result = $this->_loginProcess($data);
			
			$success = $result['status'];
			 
			$return = array(
					'data' => array(
							'message' => $result['message']
					),
					'success' => $success
			);
			echo Zend_Json::encode($return);
		}
	}
	
	public function redirectorAction()
	{
		//if($this->view->active_user == 'admin') {
			$this->_redirect('/dashboard');
// 		} else {
// 			$this->_redirect('/desktop');
// 		}
	}
	
	public function logoutAction()
	{
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->layout()->disableLayout();
		$objAuth = Zend_Auth::getInstance();
		if ($objAuth->hasIdentity()) {
			$objAuth->clearIdentity();
		}
		$this->_redirect('/dashboard/login');
	}
}
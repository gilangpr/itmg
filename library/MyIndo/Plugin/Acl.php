<?php 

class MyIndo_Plugin_Acl extends Zend_Controller_Plugin_Abstract
{
	protected $_objAuth;
	
	public function preDispatch(Zend_Controller_Request_Abstract $request)
	{
		$this->_objAuth = Zend_Auth::getInstance();
		$layout = Zend_Layout::getMvcInstance ();
		$view = $layout->getView();
		
		$view->default_limit = 25;
		
		if(!$this->_objAuth->hasIdentity()) {
			$request->setModuleName('dashboard');
			$request->setControllerName('login');
			$request->setActionName('index');
		} else {
			$view->active_user = $this->_objAuth->getIdentity();   
		}
	}
}
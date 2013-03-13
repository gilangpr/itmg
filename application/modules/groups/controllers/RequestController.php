<?php 

class Groups_RequestController extends MyIndo_Controller_Action
{
	public function init()
	{	
		$this->getInit(new Application_Model_Groups());
	}
	
	public function readAction()
	{
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()) {
			$gmModel = new Application_Model_GroupMembers();
			$list = $this->_model->getListLimit($this->_limit, $this->_start, 'GROUP_ID ASC');
			
			foreach($list as $k=>$d) {
				$list[$k]['TOTAL_MEMBER'] = $gmModel->countWhere('GROUP_ID','GROUP_ID', $d['GROUP_ID']);
			}
			
			$this->_list = $list;
			$this->_count = $this->_model->count();
		}
		
		$this->_data['data']['items'] = $this->_list;
		$this->_data['data']['totalCount'] = $this->_count;
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function createAction()
	{
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest() && isset($this->_posts['GROUP_NAME'])) {
			if(!$this->_model->isExistByKey('GROUP_NAME',$this->_posts['GROUP_NAME'])) {
				try {
					$this->_model->insert(array(
							'GROUP_NAME' => $this->_posts['GROUP_NAME'],
							'CREATED_DATE' => $this->_date
							));
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				$this->_error_code = 201;
				$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
				$this->_success = false;
			}
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}

	public function updateAction()
	{
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function privilegesAction()
	{
		$data = array();
		$modelPrivileges = new Application_Model_Privileges();
		
		if($this->getRequest()->isPost() && 
				$this->getRequest()->isXmlHttpRequest() && 
				isset($this->_posts['data']) && 
				!empty($this->_posts['data']) && 
				isset($this->_posts['id']) && !empty($this->_posts['id'])) {
			
			
			
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	/* Group Privilege */
	/* ===================================================================================================== */
	
	public function readTreeAction()
	{
		$menuModel = new MyIndo_Ext_Menus();
		$subMenuModel = new MyIndo_Ext_SubMenus();
		$subMenuActionModel = new MyIndo_Ext_SubMenuActions();
		
		$data = $menuModel->getList();
		$tree = array();
		
		foreach($data as $k=>$d) {
			$tree[$k] = array(
					'text' => $d['NAME'],
					'cls' => 'folder',
					'checked' => false,
					'expanded' => false,
					'type' => 'menus',
					'ids' => $d['MENU_ID']
					);
			$data2 = $subMenuModel->getListByKey('MENU_ID', $d['MENU_ID']);
			foreach($data2 as $_k=>$_d) {
				$tree[$k]['children'][] = array(
						'text' => $_d['NAME'],
						'checked' => false,
						'expanded' => false,
						'type' => 'submenus',
						'ids' => $_d['SUB_MENU_ID']
						);
				$data3 = $subMenuActionModel->getListByKey('SUB_MENU_ID', $_d['SUB_MENU_ID']);
				foreach($data3 as $__k=>$__d) {
					$tree[$k]['children'][$_k]['children'][] = array(
							'text' => $__d['NAME'],
							'leaf' => true,
							'checked' => false,
							'type' => 'actions',
							'ids' => $__d['SUB_MENU_ACTION_ID']
							);
				}
			}
		}
		
		echo Zend_Json::encode($tree);
	}
}
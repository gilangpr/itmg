<?php
class Shareprices_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_modelLog;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	protected $_data;
	
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Shareprices();
		$this->_modelLog = new Application_Model_SharepricesLog();
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
		
		$this->_data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
				)
		);
	}
	protected function isPost()
	{
		return $this->getRequest()->isPost();
	}
	
	protected function isAjax()
	{
		return $this->getRequest()->isXmlHttpRequest();
	}
	
	public function readAction()
	{
		
		$spNameModel = new Application_Model_SharepricesName();
		$spRes = $spNameModel->getList();
		$spList = array();
		$i = 0;
		foreach($spRes as $k=>$d) {
			if(!isset($spRes[$d['SHAREPRICES_NAME']])) {
				$spRes[$i] = $d['SHAREPRICES_NAME'];
				$i++;
			}
		}
		$lastId = $this->_model->getLastId();
		$list = $this->_model->limitShareprices($this->_limit, $this->_start, 'DATE ASC');
		
		
		$t = array();
		$t2 = array();
		$i = 0;
		$temp = '';
		$temp2 = '';
		
		foreach($list as $k=>$d) {
			if($temp == '') {
				$temp = $d['DATE'];
			}
			if($temp != $d['DATE']) {
				$i++;
				$temp = $d['DATE'];
				$t2 = array();
			}
			if(!isset($t[$i]['DATE'])) {
				$t[$i]['DATE'] = $d['DATE'];
			}
			$nameSp = $this->_model->getName($d['DATE']);
			foreach ($nameSp as $_k=>$_d)
			{
				$number = $_d['VALUE'];
				setlocale(LC_MONETARY, 'en_US');
				$var = money_format('%i', $number);
				$num = explode('USD ', $var);
				$t[$i][$_d['SHAREPRICES_NAME']] = $num[1];
				//$t[$i][$_d['SHAREPRICES_NAME']] = $_d['VALUE'];
			}
		}
		foreach($t as $k=>$d) {
			foreach($spRes as $_k=>$_d) {
				if(!isset($t[$k][$_d])) {
					$t[$k][$_d] = 0;
				}
				if($_k > 0) {
					$temp2 .= '|';
				}
				if($t[$k][$_d] > 0) {
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d);
				} else {
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d);
				}
			}
			$t[$k]['IDS'] = $temp2;
			$temp2 = '';
		}
		
		$this->_data['data']['items'] = $t;
		$this->_data['data']['totalCount'] = $this->_model->distinctDate();
		
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function createAction()
	{
		// check shareprices name $ date exist
		$name = $this->_posts['SHAREPRICES_NAME'];
		$date = $this->_posts['DATE'];
		$rows = $this->_model->getCount($name,$date);

		try {
			if ($rows['count'] == 0) {
				$snId = new Application_Model_SharepricesName();
				$getSNid = $snId->getPkByKey('SHAREPRICES_NAME', $name);
				
				//insert shareprices
				$this->_model->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s'),
						'SHAREPRICES_NAME_ID' => $getSNid
				));
				
				//insert shareprices log
				$this->_modelLog->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE_BEFORE' => $this->_posts['VALUE'],
						'VALUE_AFTER' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s'),
						'SHAREPRICES_NAME_ID' => $getSNid
				));
			} else {
				// get value before log
				$valbef = $this->_modelLog->getValueLog($date, $name, 'VALUE_AFTER');					
				// get id log
				$splogid = $this->_modelLog->getPksp($date, $name);
				
				// update value before log
				$this->_modelLog->update(array(
						'VALUE_BEFORE' => $valbef,
				),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
				
				// update value after log
				$this->_modelLog->update(array(
						'VALUE_AFTER' => $this->_posts['VALUE'],
				),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
					
				// update value
				$spid = $this->_model->getPksp($date, $name);
				$this->_model->update(array(
						'VALUE' => $this->_posts['VALUE'],
				),$this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $spid));
			}
		}
		catch (Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function updateAction()
	{
		$data = array(
				'data' => array()
		);
		
		try {
			$posts = $this->getRequest()->getRawBody();
			$posts = Zend_Json::decode($posts);
			
			$getId = explode('|',$posts['data']['IDS']);
			$ids = array();
			foreach($getId as $k=>$d) {
				$temp = explode('_', $d);				
				
				if($temp[1] > 0) {
					
					$this->_model->update(array(
							'VALUE' => $posts['data'][$temp[0]]
					), $this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $temp[1]));
					
					$valbef = $this->_modelLog->getValueLog($posts['data']['DATE'], $temp[0], 'VALUE_AFTER');
					$splogid = $this->_modelLog->getPksp($posts['data']['DATE'], $temp[0]);
					
					$this->_modelLog->update(array(
							'VALUE_BEFORE' => $valbef,
					),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
					
					$this->_modelLog->update(array(
							'VALUE_AFTER' => $posts['data'][$temp[0]],
					),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
				} else {

					$snId = new Application_Model_SharepricesName();
					$getSNid = $snId->getPkByKey('SHAREPRICES_NAME', $temp[0]);
					
					//insert shareprices
					$this->_model->insert(array(
							'DATE'=> $posts['data']['DATE'],
							'SHAREPRICES_NAME' => $temp[0],
							'VALUE' => $posts['data'][$temp[0]],
							'CREATED_DATE' => date('Y-m-d H:i:s'),
							'SHAREPRICES_NAME_ID' => $getSNid
					));
					
					//insert shareprices log
					$this->_modelLog->insert(array(
							'DATE'=> $posts['data']['DATE'],
							'SHAREPRICES_NAME' => $temp[0],
							'VALUE_BEFORE' => $posts['data'][$temp[0]],
							'VALUE_AFTER' => $posts['data'][$temp[0]],
							'CREATED_DATE' => date('Y-m-d H:i:s'),
							'SHAREPRICES_NAME_ID' => $getSNid
					));
				}
			}
		}
		catch (Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function detailAction ()
	{
		
		$searchModel = new Application_Model_Shareprices();
		$getSdate = explode('T', $this->_posts['START_DATE']);
		$getEdate = explode('T', $this->_posts['END_DATE']);
		
		if ($searchModel->isExistByKey('SHAREPRICES_NAME', $this->_posts['SHAREPRICES_NAME'])){
			$listSearch = $searchModel->select()
			->where('SHAREPRICES_NAME = ?' ,$this->_posts['SHAREPRICES_NAME'])
			->where('DATE >= ?' ,$getSdate[0])
			->where('DATE <= ?' ,$getEdate[0]);
			
			$list = $listSearch->query()->fetchall();
		} 
		
		$data = array(
				'data' => array(
						'items' => $list,
						'totalCount' => count($list)
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function uploadAction ()
	{
		$data = array(
				'data' => array()
		);
		
		try {
			/* File upload process: */
			$upload = new Zend_File_Transfer_Adapter_Http();	
			$upload->setDestination(APPLICATION_PATH. '/../public/upload/shareprices');
			$upload->addValidator('Extension',false,'xls,xlsx');
			
			try {
				if ($upload->isValid()) {
					$upload->receive();
					$fileInfo = $upload->getFileInfo();
					
					/* Get file extension */
					$filExt = explode('.',$fileInfo['FILE']['name']);
					$filExt = '.' . strtolower($filExt[count($filExt)-1]);
					/* End of : Get file extension */
					
					/* Rename file */
					$new_name = microtime() . $filExt ;
					rename($upload->getDestination() . '/' . $fileInfo['FILE']['name'], $upload->getDestination() . '/' . $new_name);
					/* End of : Rename file */			
					
					// read file
					try {
						$inputFileName = $upload->getDestination() . '/' . $new_name;
						$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
						$objReader = PHPExcel_IOFactory::createReader($inputFileType);
						$objReader->setReadDataOnly(true);
						$objPHPExcel = $objReader->load($inputFileName);
						foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
							$worksheetTitle     = $worksheet->getTitle();
							$highestRow         = $worksheet->getHighestRow();
							$highestColumn      = $worksheet->getHighestColumn();
							$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);
							$nrColumns = ord($highestColumn) - 64;
							
							$headingsArray = $worksheet->rangeToArray('A1:'.$highestColumn.'1',null, true, true, true);
							$headingsArray = $headingsArray[1];
							
							for ($row = 2; $row <= $highestRow; ++ $row) {
								$val=array();
								for ($col = 0; $col < $highestColumnIndex; ++ $col) {
									$cell = $worksheet->getCellByColumnAndRow($col, $row);
									$val[] = $cell->getValue();
								}
								$ts = mktime(0,0,0,1,$val[0]-1,1900);
								$dt = date("y-m-d",$ts);
								
								$rowNames = 1;
								for ($colValue = 1; $colValue < $highestColumnIndex; ++ $colValue) {
									$cellValue = $worksheet->getCellByColumnAndRow($colValue, $row);
									$valValue = $cellValue->getValue();
									
									$cellNames = $worksheet->getCellByColumnAndRow($colValue, $rowNames);
									$valNames = $cellNames->getValue();									
									
									$count = $this->_model->getCount($valNames, $dt);
 									if ($count['count'] == 0) {

 										$snId = new Application_Model_SharepricesName();
 										if($snId->isExistByKey('SHAREPRICES_NAME', $valNames)) {
 											$getSNid = $snId->getPkByKey('SHAREPRICES_NAME', $valNames);
 										} else {
 											$getSNid = $snId->insert(array(
 													'SHAREPRICES_NAME' => $valNames,
 													'CREATED_DATE' => date('Y-m-d H:i:s')
 													));
 										}
 										$this->_model2 = new MyIndo_Ext_ContentColumns();
 										$this->_model3 = new MyIndo_Ext_ModelFields();
 										
 										if ($snId->isExistByKey('SHAREPRICES_NAME', $valNames)) {
 											$getSNid = $snId->getPkByKey('SHAREPRICES_NAME', $valNames);
 										} else {
 											$this->_model3->insert(array(
 													'MODEL_ID' => 6,
 													'NAME' => $valNames,
 													'TYPE' => 'float',
 													'CREATED_DATE' => date('Y-m-d H:i:s')
 											));
 											$id = $this->_model3->getPkByKey('NAME', $valNames);
 											$sName = $snId->insert(array(
 												'SHAREPRICES_NAME_ID'=> $id,
 												'SHAREPRICES_NAME'=> $valNames,
												'CREATED_DATE' => date('Y-m-d H:i:s')
 											));
 											$this->_model2->insert(array(
 													'CONTENT_ID' => 6,
 													'TEXT' => $valNames,
 													'DATAINDEX' => $valNames,
 													'DATATYPE' => 'float',
 													'ALIGN' => 'center',
 													'WIDTH' => '100',
 													'EDITABLE' => 1,
 													'FLEX' => 1,
 													'INDEX' => 0,
 													'CREATED_DATE' => date('Y-m-d H:i:s')
 											));
 											
 										}
 										$getSNid = $snId->getPkByKey('SHAREPRICES_NAME', $valNames);
 										
 										// insert shareprices
 										$sp = $this->_model->insert(array(
 												'DATE' => $dt,
 												'SHAREPRICES_NAME' => $valNames,
 												'VALUE' => $valValue,
 												'CREATED_DATE' => date('Y-m-d H:i:s'),
												'SHAREPRICES_NAME_ID' => $getSNid
 										));
 										
 										// insert shareprices log
 										$splog = $this->_modelLog->insert(array(
 												'DATE' => $dt,
 												'SHAREPRICES_NAME' => $valNames,
 												'VALUE_BEFORE' => $valValue,
 												'VALUE_AFTER' => $valValue,
 												'CREATED_DATE' => date('Y-m-d H:i:s'),
												'SHAREPRICES_NAME_ID' => $getSNid
 										));
 									} else {
 										// get value before log
 										$valbef = $this->_modelLog->getValueLog($dt, $valNames, 'VALUE_AFTER');
								
 										// get id log
 										$splogid = $this->_modelLog->getPksp($dt, $valNames);
										
 										// update value before log
 										$this->_modelLog->update(array(
 												'VALUE_BEFORE' => $valbef,
 										),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
											
 										// update value after log
 										$this->_modelLog->update(array(
 												'VALUE_AFTER' => $valValue,
 										),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
								
 										// update value
 										$spid = $this->_model->getPksp($dt, $valNames);
 										$this->_model->update(array(
 												'VALUE' => $valValue,
 										),$this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $spid));
 									}
								}			
							}													
						}
					}
					catch (Exception $e) {
							
					}
					
				} else {
					$this->_error_code = 902;
					$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
					$this->_success = false;
				}				
			}
			catch (Exception $e) {
							
			}
			
		}
		catch (Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		if(file_exists($upload->getDestination() . '/' . $new_name)) {
			unlink($upload->getDestination() . '/' . $new_name);
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function searchAction ()
	{		
		if($this->isAjax() && $this->isPost()) {
			if(isset($this->_posts['SP_START_DATE']) && isset($this->_posts['SP_END_DATE']) && isset($this->_posts['SP_NAMES'])) {
				$s_date = $this->_posts['SP_START_DATE'];
				$e_date = $this->_posts['SP_END_DATE'];
				$names = Zend_Json::decode($this->_posts['SP_NAMES']);
				
				$q = $this->_model->select()
				->where('DATE >= ?', $s_date)
				->where('DATE <= ?', $e_date);
				
				$data = $q->query()->fetchAll();
				
				$list = array();
				$t = '';
				$i = -1;
				foreach($data as $k=>$d) {
					if($t != $d['DATE']) {
						$i++;
						$t = $d['DATE'];
					}
					$list[$i]['DATE'] = $d['DATE'];
					foreach($names as $_k=>$_d) {
						if($d['SHAREPRICES_NAME'] == $_d) {
							$list[$i][$d['SHAREPRICES_NAME']] = $d['VALUE'];
						}
					}
					foreach($names as $_k=>$_d) {
						if(!isset($list[$i][$_d])) {
							$list[$i][$_d] = 0;
						}
					}
				}
				$this->_data['data']['items'] = $list;
				$this->_data['data']['names'] = $names;
				$this->_data['data']['totalCount'] = $i+1;
			}
		}
		MyIndo_Tools_Return::JSON($this->_data, $this->_error_code, $this->_error_message, $this->_success);
	}
}
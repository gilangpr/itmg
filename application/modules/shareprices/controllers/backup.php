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
		
		$list = $this->_model->getListLimit($this->_limit, $this->_start, 'DATE ASC');
		
		$t = array();
		$t2 = array();
		$i = 0;
		$temp = '';
		$temp2 = '';
		$temp3 = '';
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
			$t[$i][$d['SHAREPRICES_NAME']] = $d['VALUE'];
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
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d, $d[$_d]);//$d['DATE'] . '__' . $_d . '__' . (isset($d[$_d])) ? $d[$_d] : $lastId;
				} else {
					$temp2 .= $_d . '_' . $this->_model->getId($d['DATE'], $_d, 0);
				}
			}
			$t[$k]['IDS'] = $temp2;
			$temp2 = '';
		}
		
		$this->_data['data']['items'] = $t;
		$this->_data['data']['totalCount'] = $i;
		
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
				//insert shareprices
				$this->_model->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
				));
				
				//insert shareprices log
				$this->_modelLog->insert(array(
						'DATE'=> $this->_posts['DATE'],
						'SHAREPRICES_NAME' => $this->_posts['SHAREPRICES_NAME'],
						'VALUE_BEFORE' => $this->_posts['VALUE'],
						'VALUE_AFTER' => $this->_posts['VALUE'],
						'CREATED_DATE' => date('Y-m-d H:i:s')
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
					$name = $temp[0];
					$date = $posts['data']['DATE'];
					
					//update shareprices log
					//check value before shareprices and put on value before log
					$where[] = $this->_model->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $name);
					$where[] = $this->_model->getAdapter()->quoteInto('DATE = ?', $date);
					if ($this->_model->isExistByKey('DATE', $posts['data']['DATE'])){
						$sd = $this->_model->getValueByKey('SHAREPRICES_NAME', $temp[0], 'VALUE');
							
						$d = array(
								'VALUE_BEFORE' => $sd);
						$this->_modelLog->update($d, $where);
					}
					
					//update value after log
					$data = array(
							'VALUE_AFTER'      => $posts['data'][$temp[0]]
					);
					$wherelog = array(
							$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $name),
							$this->_modelLog->getAdapter()->quoteInto('DATE = ?', $date)
					);
					$this->_modelLog->update($data, $wherelog);
					
					
					//update shareprices
					$this->_model->update(array(
							'VALUE' => $posts['data'][$temp[0]]
					), $this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $temp[1]));
										
				} else {
					$this->_model->insert(array(
							'DATE'=> $posts['data']['DATE'],
							'SHAREPRICES_NAME' => $temp[0],
							'VALUE' => $posts['data'][$temp[0]],
							'CREATED_DATE' => date('Y-m-d H:i:s')
					), $this->_model->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $temp[0]));
					
					$this->_modelLog->insert(array(
							'DATE'=> $posts['data']['DATE'],
							'SHAREPRICES_NAME' => $temp[0],
							'VALUE_BEFORE' => $posts['data'][$temp[0]],
							'CREATED_DATE' => date('Y-m-d H:i:s')
					), $this->_model->getAdapter()->quoteInto('SHAREPRICES_NAME = ?', $temp[0]));
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
		$data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
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
							for ($row = 2; $row <= $highestRow; ++ $row) {
								$val=array();
								for ($col = 0; $col < $highestColumnIndex; ++ $col) {
									$cell = $worksheet->getCellByColumnAndRow($col, $row);
									$val[] = $cell->getValue();
								}
								$ts = mktime(0,0,0,1,$val[0]-1,1900);
								$dt = date("y-m-d",$ts);
								
								$count = $this->_model->getCount($val[1], $dt);
								if ($count['count'] == 0) {
									// insert shareprices
									$sp = $this->_model->insert(array(
											'DATE' => $dt,
											'SHAREPRICES_NAME' => $val[1],
											'VALUE' => $val[2],
											'CREATED_DATE' => date('Y-m-d H:i:s')
									));
									
									// insert shareprices log
									$splog = $this->_modelLog->insert(array(
											'DATE' => $dt,
											'SHAREPRICES_NAME' => $val[1],
											'VALUE_BEFORE' => $val[2],
											'VALUE_AFTER' => $val[2],
											'CREATED_DATE' => date('Y-m-d H:i:s')
									));
																		
								} else {
									// get value before log
									$valbef = $this->_modelLog->getValueLog($dt, $val[1], 'VALUE_AFTER');									
									
									// get id log
									$splogid = $this->_modelLog->getPksp($dt, $val[1]);
									
									// update value before log
									$this->_modelLog->update(array(
											'VALUE_BEFORE' => $valbef,
									),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
									
									// update value after log
									$this->_modelLog->update(array(
											'VALUE_AFTER' => $val[2],
									),$this->_modelLog->getAdapter()->quoteInto('SHAREPRICES_LOG_ID = ?', $splogid));
									
									// update value
									$spid = $this->_model->getPksp($dt, $val[1]);
									$this->_model->update(array(
											'VALUE' => $val[2],
									),$this->_model->getAdapter()->quoteInto('SHAREPRICES_ID = ?', $spid));
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
}
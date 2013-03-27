<?php 

class Shareholdings_RequestController extends Zend_Controller_Action
{
	protected $_model;
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
		$this->_model = new Application_Model_Shareholdings();
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
	
	public function createAction() {
		
		$data = array(
				'data' => array()
				);
		//CHECK INVESTOR NAME EXIST OR NOT
		if($this->_model->isExistByKey('INVESTOR_NAME', $this->_posts['INVESTOR_NAME'])) {
			
			$this->_success = false;
			$this->_error_message = 'Investor Name already exist.';
		} else {
			try {
				 					// Do insert query :
				$this->_model->insert(array(
 					'INVESTOR_NAME'=> $this->_posts['INVESTOR_NAME'],
 					'INVESTOR_STATUS'=> $this->_posts['INVESTOR_STATUS'],
 					'ACCOUNT_HOLDER'=> $this->_posts['ACCOUNT_HOLDER'],
 					//'AMOUNT'=> $this->_posts['AMOUNT'],
 					'CREATED_DATE' => date('Y-m-d H:i:s')
 				));
				/*
				$id = $this->_model->getAdapter()->lastInsertId();
				$table = new Application_Model_ShareholdingAmounts();
				$table->insert(array(	
						'SHAREHOLDING_ID' => $id,
						'CREATED_DATE' => date('Y-m-d H:i:s')
						))
						->setIntegrity(false);*/
 			}catch(Exception $e) {
 				$this->_error_code = $e->getCode();
 				$this->_error_message = $e->getMessage();
 				$this->_success = false;
 			}
		}
// 		$name = $this->_posts['INVESTOR_NAME'];
// 	    $num_rows = $this->_model->getCount($name);
	
// 		if ($num_rows['count'] > 0) {  		
// 			$data = array(); 
// 			$data['INVESTOR_NAME'] = $this->_getParam('INVESTOR_NAME');
// 			$data['INVESTOR_STATUS'] = $this->_getParam('INVESTOR_STATUS');
// 			$data['ACCOUNT_HOLDER'] = $this->_getParam('ACCOUNT_HOLDER');
// 			//$data['AMOUNT'] = $this->_getParam('AMOUNT');
// 			$where['INVESTOR_NAME'] =  $this->_getParam('INVESTOR_NAME');
// 			$updateInvestorName = $this->_model->updateInvestorName($data,$where);
// 			$this->_success = false;
// 			$this->_error_message = 'Investor name already exist.';
// 		}else { 
// 				try {  
//  					// Do insert query :
// 				$this->_model->insert(array(
//  					'INVESTOR_NAME'=> $this->_posts['INVESTOR_NAME'],
//  					'INVESTOR_STATUS'=> $this->_posts['INVESTOR_STATUS'],
//  					'ACCOUNT_HOLDER'=> $this->_posts['ACCOUNT_HOLDER'],
//  					'AMOUNT'=> $this->_posts['AMOUNT'],
//  					'CREATED_DATE' => date('Y-m-d H:i:s')
//  					));
				
//  					}catch(Exception $e) {
//  						$this->_error_code = $e->getCode();
//  						$this->_error_message = $e->getMessage();
//  						$this->_success = false;
//  					}
//  		//END BRACKET IF
//  		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function amountAction() {
	    
		//imsert to shareholding amount table
		$data = array(
				'data' => array()
		);
		
		try {
			// Do insert query :
// 			$table = new Application_Model_ShareholdingAmounts();
// 			$name = $this->_posts['INVESTOR_NAME'];
// 			$id = $this->_model->getId($name);
			
// 			$table->insert(array(
// 					'SHAREHOLDING_ID'=> $this->_posts($id),
// 					'AMOUNT'=> $this->_posts['AMOUNT'],
// 					'CREATED_DATE' => date('Y-m-d H:i:s')
// 			));
			
			$shareholder_id = $this->_model->getValueByKey('INVESTOR_NAME', $this->_posts['INVESTOR_NAME'], 'SHAREHOLDING_ID');

			$table = new Application_Model_ShareholdingAmounts();
		
			$table->insert(array(
					'SHAREHOLDING_ID' => $shareholder_id,
					'AMOUNT' => $this->_posts['AMOUNT'],
					'CREATED_DATE' => date('Y-m-d H:i:s'),
					'DATE' => $this->_posts['DATE']
					));
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function updateAction()
	{
		//update list shareholding
		$data = array(
				'data' => array()
		);

		$data = $this->getRequest()->getRawBody();//mengambil data json
		$data = Zend_Json::decode($data);//merubah data json menjadi array
		$id = $data['data']['SHAREHOLDING_ID'];
		
		try {
			$this->_model->update(array(
					'INVESTOR_NAME' => $data['data']['INVESTOR_NAME'],
					'INVESTOR_STATUS' => $data['data']['INVESTOR_STATUS'],
					'ACCOUNT_HOLDER' => $data['data']['ACCOUNT_HOLDER'],
					),$this->_model->getAdapter()->quoteInto('SHAREHOLDING_ID = ?', $id));
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function readAction()
	{
		//tampil dari 2 join tabel shareholdings and shareholding amounts
		$modelSA = new Application_Model_ShareholdingAmounts();
		$list = $this->_model->getListLimit($this->_limit, $this->_start, 'INVESTOR_NAME ASC');

		foreach($list as $k=>$d) {
			$list[$k]['AMOUNT'] = $modelSA->getAmount($d['SHAREHOLDING_ID']);
		}
		$sum = 0;
		$max_id = 0;
		foreach($list as $k=>$d) {
			$sum += $d['AMOUNT'];

		}
		
		foreach($list as $k=>$d) {
			if($sum > 0) {
				$list[$k]['PERCENTAGE'] = number_format(($d['AMOUNT'] / $sum) * 100,2);
			}
			if($max_id >= (int)$d['SHAREHOLDING_ID']) {
				$max_id = (int)$d['SHAREHOLDING_ID'];
			}
		}
		$max_id++;
		//$sum += $d['AMOUNT'];
		/* Add total */
		
		$c = count($list);
		//$list[$c]['SHAREHOLDING_ID'] = $max_id;
		//$list[$c]['AMOUNT'] = $modelSA->getSum();
		//$list[$c]['AMOUNT'] = $sum['AMOUNT'];
		
		/* End of : Add Total */
		
		 $data = array(
				'data' => array(
						'items' => $list,
						'totalCount' => $this->_model->count(),
				)
		);
		 
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function destroyAction()
	{
		$data = array(
				'data' => array()
		);
		try {
			// Delete
			$delAmount = new Application_Model_ShareholdingAmounts();
			
			$id = $this->_posts['SHAREHOLDING_ID'];
			$where = $delAmount->getAdapter()->quoteInto('SHAREHOLDING_ID = ?', $id);
			$delAmount->delete($where);
			 			$this->_model->delete(
			 					$this->_model->getAdapter()->quoteInto(
			 							'SHAREHOLDING_ID = ?', $this->_posts['SHAREHOLDING_ID']
		 							));
			}
			catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function getListAmountAction()
	{
		//read amount from shareholding amounts table
		$modelSA = new Application_Model_ShareholdingAmounts();
		$list = $modelSA->getListByKey('SHAREHOLDING_ID', $this->_posts['id']);
		
		$data = array(
				'data' => array(
						'items' => $list,
						'totalCount' => $this->_model->count()
				)
		);
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function desAction()
	{
		$data = array(
				'data' => array()
		);
		
		try {				
			//delete by shareholding amount id
			$modelSA = new Application_Model_ShareholdingAmounts();
		    $id = $this->_posts['id'];
			$where = $modelSA->getAdapter()->quoteInto(
							'SHAREHOLDING_AMOUNT_ID = ?', $id
					);
			$modelSA->delete($where);
			
		} catch (Exception $e) {
			
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function upamountAction()
	{
		//update shareholding amount table
		$data = array(
				'data' => array()
		);

	    $models = new Application_Model_ShareholdingAmounts();
		$data = $this->getRequest()->getRawBody();//mengambil data json
		$data = Zend_Json::decode($data);//merubah data json menjadi array
		$id = $data['data']['SHAREHOLDING_AMOUNT_ID'];
	
		try {
			
			$models->update(array(
					'AMOUNT' => $data['data']['AMOUNT'],
					'MODIFIED_DATE' => $data['data'][date('Y-m-d H:i:s')]
			),$models->getAdapter()->quoteInto('SHAREHOLDING_AMOUNT_ID = ?', $id));
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
	
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
   public function uploadAction()
	{
			
		$data = array(
				'data' => array()
		);
		// membaca file excel yang diupload
		$upload = new Zend_File_Transfer_Adapter_Http();
	
		$upload->setDestination(APPLICATION_PATH . '/../public/uploads');
		$upload->addValidator('Extension',false,'xls,xlsx');
		
		if ($upload->isValid()) {
	
			$upload->receive();
			$fileInfo = $upload->getFileInfo();
			$filExt = explode('.', $fileInfo['FILE']['name']);
			$filExt = explode('_', $fileInfo['FILE']['name']);
			$date = explode('.', $filExt[2]);

			/* Get file extension */
			$filExt = explode('.',$fileInfo['FILE']['name']);
			$filExt = '.' . strtolower($filExt[count($filExt)-1]);
			/* End of : Get file extension */
	
			/* Rename file */
			$new_name = microtime() . $filExt ;
			rename($upload->getDestination() . '/' . $fileInfo['FILE']['name'], $upload->getDestination() . '/' . $new_name);
			/* End of : Rename file */
		} 
		try
		{
	
			$inputFileName = $upload->getDestination() . '/' . $new_name;
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader = PHPExcel_IOFactory::createReader($inputFileType);
			$objReader->setReadDataOnly(true);
			$objPHPExcel = $objReader->load($inputFileName);
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
		    $objWriter->setPreCalculateFormulas(false);
		    //$objPHPExcel->setActiveSheetIndex(0);
		    //$sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
		    
		    // get number of last Row


			foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
				$worksheetTitle     =  $worksheet->getTitle();
				$highestRow         =  $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();  
				$highestColumn      =  $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
				//$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);
				$nrColumns = ord($highestColumn) - 64;
				
                $highestColumn++;
				for ($row = 2; $row < $highestRow + 1; $row++) {
					
					$val=array();
					for ($col = 'B'; $col != $highestColumn; $col++) {
// 						 $val1 = $objPHPExcel->getActiveSheet()->getCell('B'. $row)->getValue();
// 						 $val2 = $objPHPExcel->getActiveSheet()->getCell('C'. $row)->getValue();
// 						 $val3 = $objPHPExcel->getActiveSheet()->getCell('D'. $row)->getValue();
// 						 $val4 = $objPHPExcel->getActiveSheet()->getCell('E'. $row)->getValue();
						$val[] = $objPHPExcel->setActiveSheetIndex(0)->getCell($col . $row)->getValue();
					};

			 if(!is_null($val[0])){
					if(!$this->_model->isExistByKey('INVESTOR_NAME', strtoupper($val[0]))) {
						$id = $this->_model->insert(array(
								'INVESTOR_NAME' => $val[0],
								'INVESTOR_STATUS' => $val[1],
								'ACCOUNT_HOLDER' => $val[2],
								'CREATED_DATE' => date('Y-m-d H:i:s')
						));
					} else {
						$id = $this->_model->getPkByKey('INVESTOR_NAME', $val[0]);
						$this->_model->update(array(
								'INVESTOR_STATUS' => $val[1],
								'ACCOUNT_HOLDER' => $val[2],
						),$this->_model->getAdapter()->quoteInto('SHAREHOLDING_ID = ?', $id));
					}
                    }

	
					$modelAmount = new Application_Model_ShareholdingAmounts();
					//$ts = mktime(0,0,0,1,$val[4]-1,1900);
					//$dt = date("y-m-d",$ts);
					$data['data']['INVESTOR_NAME'][$row-2] = $val[0];
					/*--Search And Update from Two Table--*/
					$query = $modelAmount->select()
					->where('SHAREHOLDING_ID = ?', $id)//id from table id
					->where('DATE = ?', $date[0]);
					//->where('DATE = ?', $dt);//date from table shareholding amounts
					
					if(!is_null($val[0])){
					if ($query->query()->rowCount() > 0) { //record amount sudah ada
						$replace = ',';
						$with = '';
						$amount = str_replace($replace, $with, $val[3]);
						$modelAmount->update(array(
								'AMOUNT' => $val[3]
								), array(
								$modelAmount->getAdapter()->quoteInto('SHAREHOLDING_ID = ?', $id),
								$modelAmount->getAdapter()->quoteInto('DATE = ?', $date[0])
								//$modelAmount->getAdapter()->quoteInto('DATE = ?', $dt)
								));
						
					} else {
						
						$modelAmount->insert(array(
								'SHAREHOLDING_ID' => $id,
								'AMOUNT' => $val[3],
								'CREATED_DATE' => date('Y-m-d H:i:s'),
								'DATE' => $date[0]
						));
					}
				}
				}
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
	
 	public function searchAction()
 	{
 		
 		
 		$modelSearch = new Application_Model_ShareholdingAmounts();
 		$start_date = explode('T',$this->_posts['START_DATE']);
 		$end_date = explode('T',$this->_posts['END_DATE']);
        
        
 		if(isset($this->_posts['INVESTOR_NAME'])) {
 			if($this->_model->isExistByKey('INVESTOR_NAME', $this->_posts['INVESTOR_NAME'])) {
 				$ID = $this->_model->getPkByKey('INVESTOR_NAME', $this->_posts['INVESTOR_NAME']);
 				
 		         $list = $modelSearch->select()
 		         ->from('SHAREHOLDING_AMOUNTS', array('*'))		         
 		         ->where('SHAREHOLDING_ID = ?', $ID)
 		         ->where('DATE >= ?',  $start_date[0])
 		         ->where('DATE <= ?',  $end_date[0]);
 		         
 			} else {
 				$list = $modelSearch->select()
 				->setIntegrityCheck(false)
 				->from('SHAREHOLDING_AMOUNTS', array('*'))
 				//->join('SHAREHOLDINGS', 'SHAREHOLDINGS.SHAREHOLDING_ID = SHAREHOLDING_AMOUNTS.SHAREHOLDING_ID', array('*'))
 				->where('DATE >= ?',  $start_date[0])
 				->where('DATE <= ?',  $end_date[0])
 				
 		         ->join('SHAREHOLDINGS','SHAREHOLDINGS.SHAREHOLDING_ID = SHAREHOLDING_AMOUNTS.SHAREHOLDING_ID', array('*'));
 			}
 		}
 		         $list = $list->query()->fetchAll();

 		         
 		         $data = array(
 		         		'data' => array(
 		         				'items' => $list,
 		         				'totalCount' => count($list)
 		         		)
 		         );
 		         
 		         MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
 		       
		
 	}
}
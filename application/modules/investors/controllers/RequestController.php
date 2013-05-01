<?php 

class Investors_RequestController extends Zend_Controller_Action
{
	protected $_model;
	protected $_limit;
	protected $_start;
	protected $_posts;
	protected $_error_code;
	protected $_error_message;
	protected $_success;
	
	public function init()
	{
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_model = new Application_Model_Investors();
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
	public function createAction()
	{
		$data = array(
			'data' => array()
		);
		
		try {
			// Insert Data :
 			$this->_model->insert(array(
					'INVESTOR_TYPE_ID'=>$this->_posts['INVESTOR_TYPE_ID'],
					'LOCATION_ID'=>$this->_posts['LOCATION_ID'],
 					'COMPANY_NAME'=> $this->_posts['COMPANY_NAME'],
					'STYLE'=> $this->_posts['STYLE'],
					'EQUITY_ASSETS'=>$this->_posts['EQUITY_ASSETS'],
					'PHONE_1'=>$this->_posts['PHONE_1'],
					'PHONE_2'=>$this->_posts['PHONE_2'],
					'FAX'=>$this->_posts['FAX'],
					'EMAIL_1'=>$this->_posts['EMAIL_1'],
					'EMAIL_2'=>$this->_posts['EMAIL_2'],
					'WEBSITE'=>$this->_posts['WEBSITE'],
					'ADDRESS'=>$this->_posts['ADDRESS'],
					'COMPANY_OVERVIEW'=>$this->_posts['COMPANY_OVERVIEW'],
					'INVESTMENT_STRATEGY'=>$this->_posts['INVESTMENT_STRATEGY'],
 					'CREATED_DATE' => date('Y-m-d H:i:s')
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
		$data = array(
				'data' => array()
		);
		
		$data = $this->getRequest()->getRawBody();//mengambil data json
		$data = Zend_Json::decode($data);//merubah data json menjadi array
		$id = $data['data']['INVESTOR_ID'];
		
		try {
			$ITmodel = new Application_Model_InvestorType();//memanggil model Investor type
			$LOmodel = new Application_Model_Locations();//memanggil model Locations
			$IT_id = $ITmodel->getPkByKey('INVESTOR_TYPE', $data['data']['INVESTOR_TYPE']);//mengambi PK Investor Type
			$LO_id = $LOmodel->getPkByKey('LOCATION', $data['data']['LOCATION']);//mengambil PK Locations
			$this->_model->update(array(
					'COMPANY_NAME' => $data['data']['COMPANY_NAME'],
					'INVESTOR_TYPE_ID' => $IT_id,
					'LOCATION_ID' => $LO_id,
					'EQUITY_ASSETS' => $data['data']['EQUITY_ASSETS'],
					'STYLE' => $data['data']['STYLE'],
					'MODIFIED_DATE' => date('Y-m-d H:i:s')
					),$this->_model->getAdapter()->quoteInto('INVESTOR_ID = ?', $id));
			//$this->_model->update(array(
			//		'MODIFIED_DATE' =>date('Y-m-d H:i:s')
			//	));
			
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function readAction()
	{
		$data = array(
				'data' => array(
						'items' => array(),
						'totalCount' => 0
						)
				);
		
		if(!isset($this->_posts['TYPE'])) {
			if(!isset($this->_posts['sort'])) {
				if(!isset($this->_posts['query'])) {
					$list = $this->_model->getListInvestorsLimit($this->_limit, $this->_start);
					$count = $this->_model->count();
				} else {
					$q = $this->_model->select()
					->from('INVESTORS', array('INVESTOR_ID','COMPANY_NAME'))
					->where('COMPANY_NAME LIKE ?', '%' . $this->_posts['query'] . '%');
					$count = count($q->query()->fetchAll());

					$q->limit($this->_limit, $this->_start);
					$list = $q->query()->fetchAll();
				}
				$data = array(
					'data' => array(
						'items' => $list,
						'totalCount' => $count
					)
				);
			} else {
				try {
					$sort = Zend_Json::decode($this->_posts['sort']);
					$q = $this->_model->select()
					->setIntegrityCheck(false)
					->from('INVESTORS', array('*'))
					->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('INVESTOR_TYPE'))
					->join('LOCATIONS', 'LOCATIONS.LOCATION_ID = INVESTORS.LOCATION_ID', array('LOCATION'))
					->limit($this->_limit, $this->_start);
					if($sort[0]['property'] == 'INVESTOR_TYPE') {
						$q->order('INVESTOR_TYPE.' . $sort[0]['property'] . ' ' . $sort[0]['direction']);
					} else if($sort[0]['property'] == 'LOCATION') {
						$q->order('LOCATIONS.' . $sort[0]['property'] . ' ' . $sort[0]['direction']);
					} else {
						$q->order('INVESTORS.' . $sort[0]['property'] . ' ' .$sort[0]['direction']);
					}
					//echo $q;die;
					$data['data']['items'] = $q->query()->fetchAll();
					$data['data']['totalCount'] = count($data['data']['items']);
				}catch(Exception $e) {
					echo $e->getMessage();
				}
			}
		} else {
			
			// Search :
			$TYPE = 'List';
			
			$q = $this->_model->select()->setIntegrityCheck(false)
			->from('INVESTORS', array('*'));
			
			if(isset($this->_posts['COMPANY_NAME'])) {
				$q->where('COMPANY_NAME LIKE ?', '%' . $this->_posts['COMPANY_NAME'] . '%');
			}
			
			if(isset($this->_posts['CONTACT_PERSON'])) {
				$modelCT = new Application_Model_Contacts();
				
				if($this->_posts['CONTACT_PERSON'] != '') {
					$q->join('CONTACTS', 'CONTACTS.INVESTOR_ID = INVESTORS.INVESTOR_ID', array('*'));
					$q->where('CONTACTS.NAME LIKE ?', '%' . $this->_posts['CONTACT_PERSON'] . '%');
				}
			}
			
			if(isset($this->_posts['EQUITY_ASSETS'])) {
				$EQUITY_ASSETS = $this->_posts['EQUITY_ASSETS'];
				$EQmodel = new Application_Model_Equityasset();
				if($EQUITY_ASSETS != '' && !empty($EQUITY_ASSETS) && $EQUITY_ASSETS != 'All') {
					$min = $EQmodel->getValueByKey('EQUITY_TYPE', $EQUITY_ASSETS, 'MIN_VALUE');
					$max = $EQmodel->getValueByKey('EQUITY_TYPE', $EQUITY_ASSETS, 'MAX_VALUE');
				} else {
					$min = 0;
					// max cari dari investor yang equity asset paling gede brapa;
					$max = 999999999;
				}
				if(strtolower($EQUITY_ASSETS) == 'small') {
					$q->where("EQUITY_ASSETS >= $min AND EQUITY_ASSETS <= $max");
				}else if(strtolower($EQUITY_ASSETS) == 'medium') {
					$q->where("EQUITY_ASSETS >= $min AND EQUITY_ASSETS <= $max");
				} else if(strtolower($EQUITY_ASSETS) == 'large'){
					$q->where("EQUITY_ASSETS >= $min AND EQUITY_ASSETS <= $max");
				} else {
					$q->where('EQUITY_ASSETS >= 0');
				}
				
			}
			
			if(isset($this->_posts['INVESTOR_TYPE'])) {
				$modelIT = new Application_Model_InvestorType();
				if($modelIT->isExistByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE'])) {
					$id = $modelIT->getPkByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE']);
					$q->where('INVESTORS.INVESTOR_TYPE_ID = ?', $id);
					$q->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('*'));
				} else {
					$q->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('*'));
				}
			}
			
			if(isset($this->_posts['LOCATION'])) {
				$modelLC = new Application_Model_Locations();
				if($modelLC->isExistByKey('LOCATION', $this->_posts['LOCATION'])) {
					$id = $modelLC->getPkByKey('LOCATION', $this->_posts['LOCATION']);
					$q->where('INVESTORS.LOCATION_ID = ?', $id);
					$q->join('LOCATIONS', 'INVESTORS.LOCATION_ID = LOCATIONS.LOCATION_ID', array('*'));
				} else {
					$q->join('LOCATIONS', 'INVESTORS.LOCATION_ID = LOCATIONS.LOCATION_ID', array('*'));
				}
			}
			
			/* Model */
			
			/* End of : Models */
			$x = $q->query()->fetchAll();
			
			$data['data']['items'] = $x;
			$data['data']['totalCount'] = count($x);
			$data['data']['CONTACT_PERSON'] = $this->_posts['CONTACT_PERSON'];
			
		}
	
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	
	public function destroyAction(){
		$data = array(
				'data' => array()
				);
		try {
 			$this->_model->delete(
 					$this->_model->getAdapter()->quoteInto(
 							'INVESTOR_ID = ?', $this->_posts['INVESTOR_ID']
 							));
		}catch(Exception $e) {
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function updateDetailAction()
	{
		$data = array();
		if($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()&& isset($this->_posts['id']) && isset($this->_posts['type'])) {
			if($this->_model->isExistByKey('INVESTOR_ID', $this->_posts['id'])) {
				try {
					if(isset($this->_posts['batch']) && $this->_posts['batch'] == 1) {
						if($this->_posts['btype'] == 'detail-investor') {
							$modelInvestorType = new Application_Model_InvestorType();
							$_dt = array(
									'INVESTOR_TYPE_ID' => $modelInvestorType->getPkByKey('INVESTOR_TYPE', $this->_posts['INVESTOR_TYPE']),
									'EQUITY_ASSETS' => $this->_posts['EQUITY_ASSETS'],
									'STYLE' => $this->_posts['STYLE'],
									'MODIFIED_DATE' => date('Y-m-d H:i:s')
							);
						} else if($this->_posts['btype'] == 'company-address') {
							$modelLocation = new Application_Model_Locations();
							$_dt = array(
									'ADDRESS' => $this->_posts['ADDRESS'],
									'FAX' => $this->_posts['FAX'],
									'LOCATION_ID' => $modelLocation->getPkByKey('LOCATION', $this->_posts['LOCATION']),
									'PHONE_1' => $this->_posts['PHONE_1'],
									'PHONE_2' => $this->_posts['PHONE_2'],
									'EMAIL_1' => $this->_posts['EMAIL_1'],
									'EMAIL_2' => $this->_posts['EMAIL_2'],
									'WEBSITE' => $this->_posts['WEBSITE'],
									'MODIFIED_DATE' => date('Y-m-d H:i:s')
									);
						}
						$this->_model->update($_dt, $this->_model->getAdapter()->quoteInto('INVESTOR_ID = ?', $this->_posts['id']));
					} else {
						$this->_model->update(array(
								$this->_posts['type'] => $this->_posts[$this->_posts['type']],
								'MODIFIED_DATE' => date('Y-m-d H:i:s')
						),$this->_model->getAdapter()->quoteInto('INVESTOR_ID = ?', $this->_posts['id']));
					}
				}catch(Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
				}
			} else {
				$this->_error_code = 101;
				$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
				$this->_success = false;
			}
		} else {
			$this->_error_code = 901;
			$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
			$this->_success = false;
		}
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	}
	public function printAction()
	{	
		$id = $this->_getParam('id',0);
		if($this->_model->isExistByKey('INVESTOR_ID', $id)) {
			$this->_helper->viewRenderer->setNoRender(false);
			//$details = $this->_model->getDetailByKey('INVESTOR_ID', $id);
			$conModel = new Application_Model_Contacts();
			$miModel = new Application_Model_Meetinginvestor();
			$q = $this->_model->select()
				->from('INVESTORS',array('*'))
				->setIntegrityCheck(false)
				->where('INVESTORS.INVESTOR_ID = ?', $id)
				->join('INVESTOR_TYPE', 'INVESTOR_TYPE.INVESTOR_TYPE_ID = INVESTORS.INVESTOR_TYPE_ID', array('INVESTOR_TYPE'))
				->join('LOCATIONS', 'LOCATIONS.LOCATION_ID = INVESTORS.LOCATION_ID', array('LOCATION'));
				//->join('SECTOR_HOLDINGS','SECTOR_HOLDINGS.INVESTOR_ID = INVESTORS.INVESTOR_ID',array('*'));
			$details = $q->query()->fetch();
			$d = $conModel->select()
				->from('CONTACTS',array('*'))
				->setIntegrityCheck(false)
				->where('INVESTOR_ID = ?',$id);
			$con = $d->query()->fetchAll();

			$a = $miModel->select()
				->from('MEETING_ACTIVITIE_INVESTOR',array('*'))
				->setIntegrityCheck(false)
				//->join('INVESTORS','MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID = INVESTORS.INVESTOR_ID',array('*'))
				->join('MEETING_ACTIVITIE', 'MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID',array('*'))
				->join('MEETING_ACTIVITIE_CONTACT','MEETING_ACTIVITIE_CONTACT.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID',array('*'))
				->join('CONTACTS','MEETING_ACTIVITIE_CONTACT.CONTACT_ID = CONTACTS.CONTACT_ID',array('*'))
				->join('MEETING_ACTIVITIE_ITM','MEETING_ACTIVITIE_ITM.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID',array('*'))
				->join('ITM_PARTICIPANTS','MEETING_ACTIVITIE_ITM.PARTICIPANT_ID = ITM_PARTICIPANTS.PARTICIPANT_ID',array('*'))
				->where('MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID= ?', $id)
				->where('CONTACTS.INVESTOR_ID= ?',$id);
			$ma = $a->query()->fetchAll();	


			$this->view->ma = $ma;
			$this->view->con = $con;
			$this->view->details = $details;
			
		} else {
			$this->_helper->viewRenderer->setNoRender(true);
			echo "no data found";
		}
	
		
	}

	public function uploadAction (){
			
		$data = array(
				'data' => array()
		);
		$ITmodel = new Application_Model_InvestorType();
		$LOmodel = new Application_Model_Locations();
		try{
		// membaca file excel yang diupload
		$upload = new Zend_File_Transfer_Adapter_Http();
	
		$upload->setDestination(APPLICATION_PATH ."/../public/upload/investors/");
		//$upload->addValidator('Extension',false,'xls,xlsx');
		$upload->addValidator('Extension',false, array('xls','xlsx','case'=>true));
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
				try{
		
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

			    $total = 0;
				foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
					$worksheetTitle     =  $worksheet->getTitle();
					$highestRow         =  $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();  
					$highestColumn      =  $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
					//$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);
					$nrColumns = ord($highestColumn) - 64;
					
	                $highestColumn++;
					for ($row = 2; $row < $highestRow + 1; $row++) {
						
						$val=array();
						for ($col = 'A'; $col < $highestColumn; $col++) {

							$val[] = $objPHPExcel->setActiveSheetIndex(0)->getCell($col . $row)->getValue();
						};
						
						if(!is_null($val[0])){
							if(!$this->_model->isExistByKey('COMPANY_NAME',$val[0])){
								if (!$ITmodel->isExistByKey('INVESTOR_TYPE',$val[1])) {
									$id_it = $ITmodel->insert(array(
										'INVESTOR_TYPE' => $val[1],
										'CREATED_DATE' => date('Y-m-d H:i:s')
										));
									$IT_id = $ITmodel->getPkByKey('INVESTOR_TYPE',$val[1]);
								}
								else{
									$IT_id = $ITmodel->getPkByKey('INVESTOR_TYPE',$val[1]);
								}
								if (!$LOmodel->isExistByKey('LOCATION',$val[11])) {
									$id_lo = $LOmodel->insert(array(
										'LOCATION' => $val[11],
										'CREATED_DATE' => date('Y-m-d H:i:s')
										));
									$LO_id = $LOmodel->getPkByKey('LOCATION',$val[11]);
								}
								else{
									$LO_id = $LOmodel->getPkByKey('LOCATION',$val[11]);
								}
								//$IT_id = $ITmodel->getPkByKey('INVESTOR_TYPE',$val[1]);
								//$LO_id = $LOmodel->getPkByKey('LOCATION',$val[11]);
								$jum = $this->_model->insert(array(									
										'INVESTOR_TYPE_ID' => $IT_id,
										'LOCATION_ID' => $LO_id,
										'COMPANY_NAME' => $val[0],
										'STYLE'=> $val[2],
										'EQUITY_ASSETS'=>$val[3] ,
										'PHONE_1'=>$val[4],
										'PHONE_2'=>$val[5],
										'FAX'=>$val[6],
										'EMAIL_1'=>$val[7],
										'EMAIL_2'=>$val[8],
										'WEBSITE'=>$val[9],
										'ADDRESS'=>$val[10],
										'COMPANY_OVERVIEW'=>$val[12],
										'INVESTMENT_STRATEGY'=>$val[13],
					 					'CREATED_DATE' => date('Y-m-d H:i:s')
									));
								$total = $total + count($jum);
								/*
								$data = array(
									'data' => array(
										'items' => $total,
										'totalCount' => $total
										)
									);
								*/
							}
							
							else{
								/*
								if($total == 0){
									//$total=1;
									$this->_success = false;
									$this->_error_message = '0 Data Insert';	
								}
								else{
									$jumlah=$total+1;
									$this->_success = false;
									$this->_error_message = $jumlah.' Data Insert';	
								}
								*/
								$this->_success = false;
								$this->_error_message = 'Any data Already Exist';	
							}
							//$jumlah = $total+1;
						}
						
					}
	 			}
			}catch (Exception $e) {
			 
			$this->_error_code = $e->getCode();
			$this->_error_message = $e->getMessage();
			$this->_success = false;
			}
			}
			else{
				$this->_error_code = 902;
				$this->_error_message = MyIndo_Tools_Error::getErrorMessage($this->_error_code);
				$this->_success = false;
			} 
			
		} 
		catch(Zend_File_Transfer_Exception $e) {
					$this->_error_code = $e->getCode();
					$this->_error_message = $e->getMessage();
					$this->_success = false;
		} 
	    /*
		if(file_exists($upload->getDestination() . '/' . $new_name)) {
			unlink($upload->getDestination() . '/' . $new_name);
		}
		*/
		MyIndo_Tools_Return::JSON($data, $this->_error_code, $this->_error_message, $this->_success);
	
	}

}

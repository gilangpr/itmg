<?php 

class Application_Model_Meetingactivitie extends MyIndo_Ext_Abstract
{
	protected $_name = 'MEETING_ACTIVITIE';
	protected $_id = 'MEETING_ACTIVITIE_ID';

	/*	
	public function getListMeetingactivitiesLimit(){
	$q = $this->select()
	->setIntegrityCheck(false)
	->from($this->_name, array(*))
	->Limit($limit , $offset);
	
	return $q->query()->fetchAll();
	}
	*/
}
// 	public function getListLimitMeetingActivities($limit, $offset, $order) {
// 		$q = $this->select()
// 		->setIntegrityCheck(false)
// 		->from('MEETING_ACTIVITIE_INVESTOR', array('*'))
// 		->joinLeft('MEETING_ACTIVITIE', 'MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID', array('MEETING_EVENT', 'MEETING_DATE'))
// 		->joinLeft('INVESTORS', 'INVESTORS.INVESTOR_ID = MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID', array('COMPANY_NAME'))
// 		->order($order)
// 		->limit($limit, $offset);
// 		return $q->query()->fetchAll();
// 	}
	
	public function getListLimitMeetingActivities($limit, $offset, $order) {
		$q = $this->select()
		->setIntegrityCheck(false)
		->from($this->_name, array('*'))
		->joinLeft('MEETING_ACTIVITIE_INVESTOR', 'MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID', array('MEETING_ACTIVITIE_ID'))
		->joinLeft('INVESTORS', 'INVESTORS.INVESTOR_ID = MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID', array('COMPANY_NAME'))
		->joinLeft('MEETING_ACTIVITIE_ITM', 'MEETING_ACTIVITIE_ITM.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID', array('PARTICIPANT_ID'))
		->joinLeft('ITM_PARTICIPANTS', 'ITM_PARTICIPANTS.PARTICIPANT_ID = MEETING_ACTIVITIE_ITM.PARTICIPANT_ID', array('INITIAL_PART'))
		->order($order)
		->limit($limit, $offset);
		return $q->query()->fetchAll();
	}
// 	public function getInitial() {
// 		$q = $this->select()
// 		->setIntegrityCheck(false)
// 		->from('MEETING_ACTIVITIE_ITM', array('*'))
// 		->join('ITM_PARTICIPANTS', 'ITM_PARTICIPANTS.PARTICIPANT_ID = MEETING_ACTIVITIE_ITM.PARTICIPANT_ID', array('INITIAL_PART'))
// 		->join('MEETING_ACTIVITIE', 'MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_ITM.MEETING_ACTIVITIE_ID', array('MEETING_ACTIVITIE_ID'))
// 		//->join('INVESTORS', 'INVESTORS.INVESTOR_ID = MEETING_ACTIVITIE_ITM.INVESTOR_ID', array('PARTICIPANT_ID'))
// 		;
// 		return $q->query()->fetchAll();
// 	}
	/*	
	public function getListMeetingactivitiesLimit(){
	$q = $this->select()
	->setIntegrityCheck(false)
	->from($this->_name, array(*))
	->Limit($limit , $offset);
	
	return $q->query()->fetchAll();
	}
	*/
}

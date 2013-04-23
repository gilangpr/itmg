<?php 

class Application_Model_Meetingactivitie extends MyIndo_Ext_Abstract
{
	protected $_name = 'MEETING_ACTIVITIE';
	protected $_id = 'MEETING_ACTIVITIE_ID';

	/*
	public function getListMeetingactivitieLimit($limit,$offset){
	$q = $this->select()
		->setIntegrityCheck(false)
		->from($this->_name, array('*'))
		->join('MEETING_ACTIVITIE_INVESTOR','MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID',array('*'))
		->join('INVESTORS', 'MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID = INVESTORS.INVESTOR_ID', array('*'))
		->join('MEETING_ACTIVITIE_ITM', 'MEETING_ACTIVITIE_ITM.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID', array('*'))
		->join('ITM_PARTICIPANTS','MEETING_ACTIVITIE_ITM.PARTICIPANT_ID = ITM_PARTICIPANTS.PARTICIPANT_ID',array('*'))
		->limit($limit, $offset);
		
		return $q->query()->fetchAll();
	}
	*/
	
}

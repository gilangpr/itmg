<?php 

class Application_Model_Meetingcontact extends MyIndo_Ext_Abstract
{
	protected $_name = 'MEETING_ACTIVITIE_CONTACT';
	protected $_id = 'MEETING_CONTACT';
	
	public function getListMeetingContactLimit($limit, $offset, $ma_id)
	{
		$q = $this->select()
		->setIntegrityCheck(false)
		->from($this->_name, array('*'))
		->join('MEETING_ACTIVITIE', 'MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_CONTACT.MEETING_ACTIVITIE_ID', array('*'))
		->join('CONTACTS','CONTACTS.CONTACT_ID = MEETING_ACTIVITIE_CONTACT.CONTACT_ID',array('*'))
		->join('INVESTORS','INVESTORS.INVESTOR_ID=CONTACTS.INVESTOR_ID',array('*'))
		->where('MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = ?', $ma_id)
		->limit($limit, $offset);
		
		return $q->query()->fetchAll();
	}
}

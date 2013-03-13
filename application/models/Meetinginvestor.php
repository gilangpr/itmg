<?php 

class Application_Model_Meetinginvestor extends MyIndo_Ext_Abstract
{
	protected $_name = 'MEETING_ACTIVITIE_INVESTOR';
	protected $_id = 'MEETING_INVESTOR';
	
	public function getListMeetinginvestorLimit($limit, $offset, $in_id)
	{
		$q = $this->select()
		->setIntegrityCheck(false)
		->from($this->_name, array('*'))
		->join('MEETING_ACTIVITIE', 'MEETING_ACTIVITIE.MEETING_ACTIVITIE_ID = MEETING_ACTIVITIE_INVESTOR.MEETING_ACTIVITIE_ID', array('*'))
		->join('INVESTORS','INVESTORS.INVESTOR_ID = MEETING_ACTIVITIE_INVESTOR.INVESTOR_ID',array('*'))
		->where('INVESTORS.INVESTOR_ID = ?', $in_id)
		->limit($limit, $offset);
		
		return $q->query()->fetchAll();
	}
}
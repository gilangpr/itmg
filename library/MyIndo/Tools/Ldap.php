<?php 

class MyIndo_Tools_Ldap
{
	public static function ldapConnect($username, $password)
	{
		$options = array(
			'host'                   => 'dc-jkt-02.banpuindo.co.id',
			'accountCanonicalForm'   => 3,
			'accountDomainNameShort' => 'BANPUINDO',
			'baseDn'                 => 'DC=banpuindo,DC=co,DC=id',
		);
		$ldap = new Zend_Ldap();
		$ldap->setOptions($options);
		try {
			return $ldap->bind($username,$password);
		}catch(Zend_Ldap_Exception $e) {
			return false;
		}
	}
}
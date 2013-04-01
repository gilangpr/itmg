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
		
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/ldap.ini',
				'production');
		$options2 = $config->toArray();
		
		$adapter = new Zend_Auth_Adapter_Ldap($ldap, $username, $password);
		$adapter->authenticate($adapter);
		try {
			return $ldap->bind($username,$password);
		}catch(Zend_Ldap_Exception $e) {
			return false;
		}
	}
}
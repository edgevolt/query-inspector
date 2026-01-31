/**
 * Log Formats Registry
 * Central registry for all supported log formats
 * Similar to languages.js but for log parsers
 */

export const logFormats = {
    fortinet: {
        id: 'fortinet',
        name: 'FortiGate (FortiOS 7.x)',
        emoji: '🔥',
        description: 'Fortinet FortiGate firewall logs (FortiOS 7.x)',
        examples: [
            {
                title: 'Traffic Allow',
                log: 'date=2024-01-23 time=14:30:15 devname="FG-01" devid="FG100E4Q17001234" logid="0000000013" type="traffic" subtype="forward" level="notice" vd="root" eventtime=1706024415 srcip=192.168.1.100 srcport=54321 srcintf="port1" srcintfrole="lan" dstip=8.8.8.8 dstport=53 dstintf="port2" dstintfrole="wan" sessionid=12345 proto=17 action="accept" policyid=1 policytype="policy" service="DNS" dstcountry="United States" srccountry="Reserved" trandisp="snat" transip=203.0.113.10 transport=54321 duration=120 sentbyte=256 rcvdbyte=512 sentpkt=4 rcvdpkt=4'
            },
            {
                title: 'Traffic Deny',
                log: 'date=2024-01-23 time=14:35:22 devname="FG-01" devid="FG100E4Q17001234" logid="0000000013" type="traffic" subtype="forward" level="warning" vd="root" eventtime=1706024722 srcip=10.0.0.50 srcport=12345 srcintf="port1" srcintfrole="lan" dstip=192.168.100.1 dstport=445 dstintf="port2" dstintfrole="wan" sessionid=12346 proto=6 action="deny" policyid=0 policytype="policy" service="MS-DS" dstcountry="Reserved" srccountry="Reserved" duration=0 sentbyte=0 rcvdbyte=0 sentpkt=1 rcvdpkt=0'
            },
            {
                title: 'UTM Virus Detection',
                log: 'date=2024-01-23 time=14:40:10 devname="FG-01" devid="FG100E4Q17001234" logid="0211008192" type="utm" subtype="virus" eventtype="infected" level="warning" vd="root" eventtime=1706025010 srcip=192.168.1.105 srcport=49152 srcintf="port1" srcintfrole="lan" dstip=203.0.113.50 dstport=80 dstintf="port2" dstintfrole="wan" sessionid=12347 proto=6 action="blocked" policyid=5 service="HTTP" hostname="malicious.example.com" url="/malware.exe" virus="EICAR_TEST_FILE" virusid=2172 dtype="Virus" ref="http://www.fortinet.com/ve?vn=EICAR_TEST_FILE"'
            },
            {
                title: 'IPS Detection',
                log: 'date=2024-01-23 time=14:45:33 devname="FG-01" devid="FG100E4Q17001234" logid="0419016384" type="utm" subtype="ips" eventtype="signature" level="alert" vd="root" eventtime=1706025333 severity="critical" srcip=203.0.113.100 srccountry="Reserved" dstip=192.168.1.10 dstcountry="Reserved" srcintf="port2" srcintfrole="wan" dstintf="port1" dstintfrole="lan" sessionid=12348 action="dropped" proto=6 service="HTTP" policyid=3 attack="SQL.Injection" srcport=54321 dstport=80 hostname="webapp.example.com" url="/login.php?id=1\' OR \'1\'=\'1" direction="incoming" attackid=12345 ref="http://www.fortinet.com/ids/VID12345"'
            },
            {
                title: 'VPN Connection',
                log: 'date=2024-01-23 time=15:00:00 devname="FG-01" devid="FG100E4Q17001234" logid="0101037127" type="event" subtype="vpn" level="information" vd="root" eventtime=1706026200 logdesc="SSL VPN tunnel up" action="tunnel-up" tunneltype="ssl-tunnel" tunnelid=1234567890 remip=203.0.113.200 user="john.doe" group="VPN-Users" dst_host="N/A" reason="N/A" msg="SSL tunnel established"'
            }
        ]
    },
    paloalto: {
        id: 'paloalto',
        name: 'Palo Alto (PAN-OS 11.x)',
        emoji: '🔶',
        description: 'Palo Alto Networks firewall logs (PAN-OS 11.x)',
        examples: [
            {
                title: 'Traffic Allow',
                log: ',2024/01/29 14:30:15,007951000012345,TRAFFIC,end,,2024/01/29 14:30:14,192.168.1.100,8.8.8.8,0.0.0.0,0.0.0.0,Allow-Internet,,,web-browsing,vsys1,trust,untrust,ethernet1/1,ethernet1/2,Log-Forwarding,,54321,1,54321,53,0,0,0x0,udp,allow,1024,512,512,10,2024/01/29 14:29:00,120,general-internet,,12345,0x8000000000000000,United States,United States,,5,5,aged-out,0,0,0,0,,PA-5220,from-policy,,,0,,0,,,,,,,,,,,00:11:22:33:44:55,00:50:56:ab:cd:ef,,,,,,,,,,,,,,,,,,,,,0,2024/01/29 14:30:15.123456,,,internet-utility,general-internet,browser-based'
            },
            {
                title: 'Traffic Deny',
                log: ',2024/01/29 14:35:22,007951000012345,TRAFFIC,drop,,2024/01/29 14:35:21,10.0.0.50,192.168.100.1,0.0.0.0,0.0.0.0,Block-Malicious,,,ms-rdp,vsys1,trust,untrust,ethernet1/1,ethernet1/2,Log-Forwarding,,12345,1,49152,3389,0,0,0x0,tcp,deny,0,0,0,1,2024/01/29 14:35:21,0,business-systems,,12346,0x0,Reserved,Reserved,,0,0,policy-deny,0,0,0,0,,PA-5220,from-policy,,,0,,0,,,,,,,,,,,aa:bb:cc:dd:ee:ff,ff:ee:dd:cc:bb:aa,,,,,,,,,,,,,,,,,,,,,0,2024/01/29 14:35:22.456789,,,remote-access,business-systems,client-server'
            },
            {
                title: 'Threat - Spyware',
                log: ',2024/01/29 14:40:10,007951000012345,THREAT,spyware,,2024/01/29 14:40:09,192.168.1.105,203.0.113.50,0.0.0.0,0.0.0.0,Security-Policy,domain\\user1,,web-browsing,vsys1,trust,untrust,ethernet1/1,ethernet1/2,Log-Forwarding,,12347,1,49152,80,0,0,0x0,tcp,alert,http://malicious.example.com/c2,Zeus Trojan C2 Traffic,spyware,critical,client-to-server,12348,0x8000000000000000,United States,Reserved,,any,0,1234567890abcdef,,,Mozilla/5.0 (Windows NT 10.0; Win64; x64),PE,192.168.1.105,,,,,0,0,0,0,,PA-5220,,,,GET,0,,0,0,,30000,command-and-control,8675-7890,,0,0,,malware,0,0x0,,Computer,Windows-Workstation,Dell Latitude 5420,Dell,Windows,Windows 10,DESKTOP-ABC123,00:11:22:33:44:55,Server,Linux-Server,Dell PowerEdge R740,Dell,Linux,CentOS 8,webserver01,00:50:56:ab:cd:ef,,,,,,,,,0,2024/01/29 14:40:10.789012,,'
            },
            {
                title: 'Threat - Virus',
                log: ',2024/01/29 14:45:33,007951000012345,THREAT,virus,,2024/01/29 14:45:32,192.168.1.110,203.0.113.75,0.0.0.0,0.0.0.0,Security-Policy,domain\\user2,,ssl,vsys1,trust,untrust,ethernet1/1,ethernet1/2,Log-Forwarding,,12349,1,54321,443,0,0,0x0,tcp,alert,https://download.example.com/file.exe,Ransomware.Generic,virus,high,client-to-server,12350,0x8000000000000000,United States,Reserved,,PE,0,a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890,,,Mozilla/5.0 (Windows NT 10.0; Win64; x64),PE,192.168.1.110,https://google.com,,,,,0,0,0,0,,PA-5220,,,,GET,0,,0,0,,52020,malware,8675-7890,,0,0,,malware,0,0x0,,Computer,Windows-Workstation,HP EliteBook 840,HP,Windows,Windows 11,LAPTOP-XYZ789,aa:bb:cc:dd:ee:ff,Server,Windows Server,Dell PowerEdge R640,Dell,Windows Server,Windows Server 2019,fileserver01,ff:ee:dd:cc:bb:aa,,,,,,,,,0,2024/01/29 14:45:33.234567,,'
            },
            {
                title: 'Threat - URL Filtering',
                log: ',2024/01/29 14:50:00,007951000012345,THREAT,url,,2024/01/29 14:49:59,192.168.1.115,203.0.113.100,0.0.0.0,0.0.0.0,Security-Policy,domain\\user3,,web-browsing,vsys1,trust,untrust,ethernet1/1,ethernet1/2,Log-Forwarding,,12351,1,49200,80,0,0,0x0,tcp,alert,http://phishing.example.com/login,Phishing URL,url,medium,client-to-server,12352,0x8000000000000000,United States,Reserved,,text/html,0,,,0,Mozilla/5.0 (Windows NT 10.0; Win64; x64),HTML,192.168.1.115,https://email.example.com,,,,,0,0,0,0,,PA-5220,,,,GET,0,,0,0,,86001,phishing,8675-7890,,0,0,,phishing,0,0x0,,Computer,Windows-Workstation,Lenovo ThinkPad X1,Lenovo,Windows,Windows 10,WORKSTATION-001,11:22:33:44:55:66,Server,Linux-Server,Apache Web Server,Apache,Linux,Ubuntu 20.04,phishing-site,66:55:44:33:22:11,,,,,,,,,0,2024/01/29 14:50:00.567890,,'
            },
            {
                title: 'Threat - Vulnerability',
                log: ',2024/01/29 14:55:15,007951000012345,THREAT,vulnerability,,2024/01/29 14:55:14,203.0.113.200,192.168.1.50,0.0.0.0,0.0.0.0,Security-Policy,,,web-browsing,vsys1,untrust,dmz,ethernet1/2,ethernet1/3,Log-Forwarding,,12353,1,12345,8080,0,0,0x0,tcp,alert,http://webapp.example.com/admin,SQL Injection Attempt,vulnerability,critical,client-to-server,12354,0x8000000000000000,Reserved,United States,,text/html,0,,,0,sqlmap/1.5,HTML,203.0.113.200,,,,,,,0,0,0,0,,PA-5220,,,,POST,0,,0,0,,40000,code-execution,8675-7890,,0,0,,sql-injection,0,0x0,,,,,,,,,,,Server,Linux-Server,Nginx Web Server,Nginx,Linux,Ubuntu 22.04,webapp01,77:88:99:aa:bb:cc,,,,,,,,,0,2024/01/29 14:55:15.890123,,'
            }
        ]
    },
    checkpoint: {
        id: 'checkpoint',
        name: 'Check Point (R81.x)',
        emoji: '🔷',
        description: 'Check Point firewall logs (R81.x)',
        examples: [
            {
                title: 'Traffic Accept',
                log: 'time=1706544615; action=Accept; origin=CP-GW-01; src=192.168.1.100; s_port=54321; dst=8.8.8.8; service=53; proto=17; rule_name="Allow DNS"; rule=5; layer_name=Network; product="VPN-1 & FireWall-1"; service_id=domain-udp; src_user_name=john.doe; src_machine_name=DESKTOP-ABC123; dst_machine_name=dns.google; xlatesrc=203.0.113.10; xlatesport=54321; sent_bytes=256; received_bytes=512; sent_packets=4; received_packets=4; duration=2; conn_direction=Outgoing; version=R81.10'
            },
            {
                title: 'Traffic Drop',
                log: 'time=1706544722; action=Drop; origin=CP-GW-01; src=10.0.0.50; s_port=12345; dst=192.168.100.1; service=445; proto=6; rule_name="Block SMB"; rule=12; layer_name=Network; product="VPN-1 & FireWall-1"; service_id=microsoft-ds; src_location=Internal; dst_location=Internal; conn_direction=Internal; version=R81.10; tcp_flags=SYN'
            },
            {
                title: 'IPS Prevention',
                log: 'time=1706545010; action=Prevent; origin=CP-GW-01; src=203.0.113.100; s_port=54321; dst=192.168.1.10; service=80; proto=6; product=SmartDefense; threat_prevention_type=IPS; protection_name="SQL Injection"; protection_id=12345; severity=Critical; confidence_level=High; attack_info="SQL injection attempt detected in HTTP request"; rule_name="Strict IPS"; layer_name="Threat Prevention"; src_country=CN; dst_country=US; resource="http://webapp.example.com/login.php?id=1\' OR \'1\'=\'1"; methods=GET; user_agent="sqlmap/1.5"; cveid=CVE-2023-12345; version=R81.20'
            },
            {
                title: 'URL Filtering',
                log: 'time=1706545200; action=Drop; origin=CP-GW-01; src=192.168.1.105; s_port=49152; dst=203.0.113.50; service=80; proto=6; product=SmartDefense; threat_prevention_type="URL Filtering"; resource="http://malicious.example.com/payload.exe"; categories="Malware;Command and Control"; severity=High; rule_name="Block Malicious URLs"; layer_name="Threat Prevention"; src_user_name=jane.smith; src_machine_name=LAPTOP-XYZ789; methods=GET; user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"; version=R81.10'
            },
            {
                title: 'VPN Connection',
                log: 'time=1706545400; action=Accept; origin=CP-GW-01; src=203.0.113.200; dst=192.168.1.1; product="VPN-1 & FireWall-1"; vpn_feature_name="Remote Access"; peer_gateway=203.0.113.200; community=RemoteAccess; encryption_method=AES-256; ike_version=IKEv2; src_user_name=remote.user; message_info="VPN tunnel established successfully"; rule_name="VPN Access"; layer_name=Network; version=R81.10'
            },
            {
                title: 'Anti-Virus Detection',
                log: 'time=1706545600; action=Prevent; origin=CP-GW-01; src=192.168.1.110; s_port=54321; dst=203.0.113.75; service=443; proto=6; product=SmartDefense; threat_prevention_type="Anti-Virus"; malware_action=Prevent; malware_family=Ransomware; file_name=malware.exe; file_hash=d41d8cd98f00b204e9800998ecf8427e; severity=Critical; confidence_level=High; rule_name="Strict AV Protection"; layer_name="Threat Prevention"; src_user_name=victim.user; src_machine_name=WORKSTATION-001; resource="https://download.example.com/malware.exe"; methods=GET; version=R81.20'
            }
        ]
    }
};

/**
 * Get all log format IDs
 * @returns {string[]} Array of log format IDs
 */
export function getLogFormatIds() {
    return Object.keys(logFormats);
}

/**
 * Get log format by ID
 * @param {string} id - Log format ID
 * @returns {object|null} Log format object or null if not found
 */
export function getLogFormat(id) {
    return logFormats[id] || null;
}

/**
 * Get all log formats as array
 * @returns {Array} Array of log format objects with id property
 */
export function getAllLogFormats() {
    return Object.entries(logFormats).map(([id, format]) => ({
        id,
        ...format
    }));
}

/**
 * Auto-detect log format from log text
 * @param {string} logText - Raw log text
 * @returns {string|null} Detected format ID or null
 */
export function autoDetectLogFormat(logText) {
    if (!logText || typeof logText !== 'string') {
        return null;
    }

    const text = logText.trim();

    // FortiGate detection - looks for key=value pairs with specific FortiGate fields
    if (text.includes('devname=') && text.includes('logid=') &&
        (text.includes('type="traffic"') || text.includes('type="utm"') || text.includes('type="event"'))) {
        return 'fortinet';
    }

    // Check Point detection - looks for LEA format with Check Point-specific fields
    if ((text.includes('product=') || text.includes('origin=')) &&
        (text.includes('rule_name=') || text.includes('rule_uid=') || text.includes('action='))) {
        // Additional validation - Check Point logs typically have semicolon separators
        if (text.includes(';') && /\w+=/.test(text)) {
            return 'checkpoint';
        }
    }

    // Palo Alto detection - CSV format with specific field patterns
    if (text.startsWith(',') && text.includes('TRAFFIC') || text.includes('THREAT')) {
        const fields = text.split(',');
        if (fields.length > 20 && fields[3] && (fields[3] === 'TRAFFIC' || fields[3] === 'THREAT')) {
            return 'paloalto';
        }
    }

    // Future: Add detection for other log formats
    // Cisco ASA: %ASA-<severity>-<message-id>: <message>
    // pfSense: <timestamp> <hostname> filterlog: <csv-fields>
    // Apache: <ip> - - [<timestamp>] "<method> <uri> <protocol>" <status> <size>
    // Nginx: <ip> - <user> [<timestamp>] "<request>" <status> <bytes> "<referrer>" "<user-agent>"

    return null;
}

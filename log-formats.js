/**
 * Log Formats Registry
 * Central registry for all supported log formats
 * Similar to languages.js but for log parsers
 */

export const logFormats = {
    barracuda: {
        id: 'barracuda',
        name: 'Barracuda CloudGen Firewall (8.x/9.x)',
        emoji: '🐟',
        description: 'Barracuda Networks CloudGen/NG Firewall logs (Firmware 8.x/9.x)',
        examples: [
            {
                title: 'Forwarding Firewall Allow',
                log: '<14>Jan 29 14:30:15 cuda-fw-01 box_Firewall_Activity: type=FWD|proto=TCP|srcIF=eth0|srcIP=192.168.1.100|srcPort=54321|dstIP=203.0.113.50|dstPort=443|dstIF=eth1|rule=Allow-Web|action=Allow|info=Connection accepted|srcMAC=00:11:22:33:44:55|dstMAC=AA:BB:CC:DD:EE:FF'
            },
            {
                title: 'Forwarding Firewall Block',
                log: '<14>Jan 29 14:35:00 cuda-fw-01 box_Firewall_Activity: type=FWD|proto=UDP|srcIF=eth1|srcIP=10.0.0.50|srcPort=12345|dstIP=8.8.8.8|dstPort=53|rule=Block-DNS|action=Block|info=Policy Violation|reason=Traffic Denied|count=1'
            },
            {
                title: 'Audit Log (Auth Success)',
                log: '<14>Jan 29 14:40:10 cuda-fw-01 box_Auth_Service: type=AUD|user=john.doe|srcIP=192.168.1.100|service=VPN|server=Local|info=Authentication successful|group=VPN-Users|station=192.168.1.100'
            },
            {
                title: 'Web Log (URL Filter)',
                log: '<134>Jan 29 14:45:33 cuda-fw-01 httpproxy[1234]: type=WEBLOG|action=Block|srcIP=192.168.5.10|user=jane.smith|url=http://malicious-site.com/loader.exe|urlcat=Malware|reason=URL Category Block|method=GET|size=0|duration=0|agent=Mozilla/5.0'
            },
            {
                title: 'System Event',
                log: '<14>Jan 29 15:00:00 cuda-fw-01 Control[556]: type=System|cat=Config|info=Configuration change activated|user=admin|srcIP=10.0.0.5|tool=GUI'
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
    },
    firepower: {
        id: 'firepower',
        name: 'Cisco Firepower (FTD 6.x/7.x)',
        emoji: '🛡️',
        description: 'Cisco Firepower Threat Defense syslog logs (FTD 6.x/7.x)',
        examples: [
            {
                title: 'Connection Allow',
                log: '<166>2024-01-29T14:30:15Z firewall01 SFIMS: %FTD-5-430003: Protocol: tcp, SrcIP: 192.168.1.100, DstIP: 203.0.113.50, SrcPort: 54321, DstPort: 443, IngressInterface: inside, EgressInterface: outside, IngressZone: Inside-Zone, EgressZone: Outside-Zone, ACPolicy: Corporate-ACP, AccessControlRuleName: Allow-Web, AccessControlRuleAction: Allow, Prefilter Policy: Default Prefilter Policy, User: ACME\\john.doe, Client: Chrome, ApplicationProtocol: HTTPS, WebApplication: Google, ConnectionDuration: 120, InitiatorPackets: 50, ResponderPackets: 45, InitiatorBytes: 5120, ResponderBytes: 102400, NAPPolicy: Balanced Security and Connectivity, DNSQuery: www.google.com, URLCategory: Search Engines, URLReputation: Well Known, ConnectionID: 34774, DeviceUUID: e8566508-eaa9-11e5-860f-de3e305d8269, FirstPacketSecond: 2024-01-29T14:28:15Z, SSLServerName: www.google.com, SSLVersion: TLSv1.3, SSLCipherSuite: TLS_AES_256_GCM_SHA384, SSLActualAction: Do not decrypt, SourceCountry: Reserved, DestinationCountry: United States'
            },
            {
                title: 'Connection Block',
                log: '<166>2024-01-29T14:35:22Z firewall01 SFIMS: %FTD-4-430003: Protocol: tcp, SrcIP: 10.0.0.50, DstIP: 198.51.100.75, SrcPort: 12345, DstPort: 80, IngressInterface: inside, EgressInterface: outside, IngressZone: Inside-Zone, EgressZone: Outside-Zone, ACPolicy: Corporate-ACP, AccessControlRuleName: Block-Malicious, AccessControlRuleAction: Block, AccessControlRuleReason: URL Block, Prefilter Policy: Default Prefilter Policy, User: ACME\\jane.smith, Client: Firefox, ApplicationProtocol: HTTP, ConnectionDuration: 0, InitiatorPackets: 1, ResponderPackets: 0, InitiatorBytes: 54, ResponderBytes: 0, NAPPolicy: Balanced Security and Connectivity, URL: http://malicious.example.com/payload.exe, URLCategory: Malware Sites, URLReputation: High Risk, EventPriority: High, ConnectionID: 34780, DeviceUUID: e8566508-eaa9-11e5-860f-de3e305d8269, FirstPacketSecond: 2024-01-29T14:35:22Z'
            },
            {
                title: 'Intrusion Event',
                log: 'Jan 29 14:40:10 192.168.0.7 SFIMS: %FTD-1-430001: Protocol: tcp, SrcIP: 203.0.113.100, DstIP: 10.1.1.10, SrcPort: 54321, DstPort: 80, IngressInterface: outside, EgressInterface: dmz, IngressZone: Outside-Zone, EgressZone: DMZ-Zone, ACPolicy: Corporate-ACP, AccessControlRuleName: IPS-Inspect, NAPPolicy: Maximum Detection, IntrusionPolicy: Maximum Detection, GID: 1, SID: 648, Revision: 18, Message: "INDICATOR-SHELLCODE x86 NOOP", Classification: Executable Code was Detected, Priority: 1, EventPriority: High, InlineResult: Blocked, Impact: 2, ConnectionID: 34785, DeviceUUID: e8566508-eaa9-11e5-860f-de3e305d8269, InstanceID: 3, FirstPacketSecond: 2024-01-29T14:40:10Z, User: No Authentication Required, SourceCountry: China, DestinationCountry: Reserved'
            },
            {
                title: 'File Malware Event',
                log: '<166>2024-01-29T14:45:33Z firewall01 SFIMS: %FTD-1-430005: Protocol: tcp, SrcIP: 192.168.1.110, DstIP: 203.0.113.75, SrcPort: 49200, DstPort: 80, IngressInterface: inside, EgressInterface: outside, ACPolicy: Corporate-ACP, AccessControlRuleName: Allow-Web, ApplicationProtocol: HTTP, WebApplication: Chrome, FileDirection: Download, FileType: EXE, FileName: update.exe, FileSize: 524288, FileSHA256: a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890, AMPDisposition: Malware, ThreatName: W32.GenericKD:Malware.26iy.1201, ThreatScore: 95, MalwareAction: Block, SperoDisposition: Malware, FileAction: Block Malware, User: ACME\\victim.user, ConnectionID: 34790, DeviceUUID: e8566508-eaa9-11e5-860f-de3e305d8269, FirstPacketSecond: 2024-01-29T14:45:30Z, URL: http://download.example.com/update.exe'
            },
            {
                title: 'Connection with SSL Details',
                log: '<166>2024-01-29T15:00:00Z firewall01 SFIMS: %FTD-5-430003: Protocol: tcp, SrcIP: 10.1.1.50, DstIP: 13.107.42.14, SrcPort: 60123, DstPort: 443, IngressInterface: inside, EgressInterface: outside, IngressZone: Inside-Zone, EgressZone: Outside-Zone, ACPolicy: Corporate-ACP, AccessControlRuleName: Decrypt-and-Inspect, AccessControlRuleAction: Allow, Prefilter Policy: Default Prefilter Policy, User: ACME\\admin, Client: Edge, ApplicationProtocol: HTTPS, WebApplication: Office 365, ConnectionDuration: 300, InitiatorPackets: 200, ResponderPackets: 180, InitiatorBytes: 51200, ResponderBytes: 2097152, NAPPolicy: Balanced Security and Connectivity, SSLPolicy: Decrypt-Inspect, SSLActualAction: Decrypt - Resign, SSLExpectedAction: Decrypt - Resign, SSLServerName: outlook.office365.com, SSLVersion: TLSv1.2, SSLCipherSuite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, SSLFlowStatus: Success, SSLServerCertStatus: Valid, ConnectionID: 34800, DeviceUUID: e8566508-eaa9-11e5-860f-de3e305d8269, FirstPacketSecond: 2024-01-29T14:55:00Z, SourceCountry: Reserved, DestinationCountry: United States'
            }
        ]
    },
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
    juniper: {
        id: 'juniper',
        name: 'Juniper SRX (Junos OS 12.x/15.x+)',
        emoji: '🌲',
        description: 'Juniper Networks SRX firewall structured syslog (Junos OS 12.x/15.x+)',
        examples: [
            {
                title: 'Session Create',
                log: '<14>1 2024-01-29T14:30:15.000+00:00 SRX-01 RT_FLOW - RT_FLOW_SESSION_CREATE [junos@2636.1.1.1.2.36 source-address="192.168.1.100" source-port="54321" destination-address="203.0.113.50" destination-port="443" connection-tag="0" service-name="junos-https" nat-source-address="198.51.100.10" nat-source-port="54321" nat-destination-address="203.0.113.50" nat-destination-port="443" nat-connection-tag="0" src-nat-rule-type="source rule" src-nat-rule-name="SNAT-Internet" dst-nat-rule-type="N/A" dst-nat-rule-name="N/A" protocol-id="6" policy-name="Allow-Internet" source-zone-name="trust" destination-zone-name="untrust" session-id-32="12345" username="john.doe" roles="Employees" source-interface-name="reth0.0" destination-interface-name="reth1.0" application="UNKNOWN" nested-application="UNKNOWN"]'
            },
            {
                title: 'Session Close',
                log: '<14>1 2024-01-29T14:35:00.000+00:00 SRX-01 RT_FLOW - RT_FLOW_SESSION_CLOSE [junos@2636.1.1.1.2.36 reason="TCP FIN" source-address="192.168.1.100" source-port="54321" destination-address="203.0.113.50" destination-port="443" connection-tag="0" service-name="junos-https" nat-source-address="198.51.100.10" nat-source-port="54321" nat-destination-address="203.0.113.50" nat-destination-port="443" nat-connection-tag="0" src-nat-rule-type="source rule" src-nat-rule-name="SNAT-Internet" dst-nat-rule-type="N/A" dst-nat-rule-name="N/A" protocol-id="6" policy-name="Allow-Internet" source-zone-name="trust" destination-zone-name="untrust" session-id-32="12345" packets-from-client="50" bytes-from-client="5120" packets-from-server="45" bytes-from-server="102400" elapsed-time="120" application="SSL" nested-application="UNKNOWN" username="john.doe" roles="Employees" routing-instance="default" destination-interface-name="reth1.0" encryption="Yes"]'
            },
            {
                title: 'Session Deny',
                log: '<14>1 2024-01-29T14:40:00.000+00:00 SRX-01 RT_FLOW - RT_FLOW_SESSION_DENY [junos@2636.1.1.1.2.36 source-address="10.0.0.50" source-port="12345" destination-address="198.51.100.75" destination-port="3389" connection-tag="0" service-name="junos-ms-rpc" protocol-id="6" policy-name="default-deny" source-zone-name="trust" destination-zone-name="untrust" session-id-32="12346" application="UNKNOWN" nested-application="UNKNOWN" username="N/A" roles="N/A" source-interface-name="ge-0/0/0.0" destination-interface-name="ge-0/0/1.0"]'
            },
            {
                title: 'UTM Web Filter Block',
                log: 'Jan 29 14:45:10 SRX-01 RT_UTM: WEBFILTER_URL_BLOCKED: WebFilter: ACTION="URL Blocked" 10.0.0.50(50227)->74.125.239.155(80) CATEGORY="Enhanced_Malware" REASON="BY_PRE_DEFINED" PROFILE="junos-wf-enhanced-default" URL=malicious-site.example.com OBJ=/payload.exe USERNAME=jane.smith ROLES=Employees'
            },
            {
                title: 'IDP Attack Event',
                log: 'Jan 29 14:50:30 SRX-01 RT_IDP: IDP_ATTACK_LOG_EVENT: IDP: at 1706540000, ANOMALY Attack log <93.157.158.93/13723->10.1.1.10/80> for TCP protocol and service HTTP application NONE by rule 1 of rulebase IPS in policy recommended. attack: repeat=2, action=drop, threat-severity=CRITICAL, name=HTTP:SQL:INJ-1'
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
    sonicwall: {
        id: 'sonicwall',
        name: 'SonicWall (SonicOS 6.5/7.x)',
        emoji: '🔶',
        description: 'SonicWall firewall Enhanced Syslog format (SonicOS 6.5/7.x)',
        examples: [
            {
                title: 'Connection Opened',
                log: 'id=firewall sn=C0EAE4ABCDEF time="2024-01-29 14:30:15" fw=10.0.0.1 pri=6 c=1024 m=98 msg="Connection Opened" n=1 src=192.168.1.100:54321:X0 dst=203.0.113.50:443:X1 srcMac=a0:b1:c2:d3:e4:f5 dstMac=00:00:5E:00:53:00 proto=tcp/6 fw_action=allow rule="Allow-Internet" app=184 appName="General HTTPS" dpi=1 catid=6 Category="Network Access" sess=Allow dstname=www.google.com usr=john.doe geoSrc=US geoDst=US'
            },
            {
                title: 'Connection Closed',
                log: 'id=firewall sn=C0EAE4ABCDEF time="2024-01-29 14:35:00" fw=10.0.0.1 pri=6 c=1024 m=537 msg="Connection Closed" n=1 src=192.168.1.100:54321:X0 dst=203.0.113.50:443:X1 srcMac=a0:b1:c2:d3:e4:f5 dstMac=00:00:5E:00:53:00 proto=tcp/6 fw_action=NA rule="Allow-Internet" app=184 appName="General HTTPS" sent=5120 rcvd=102400 spkt=50 rpkt=45 cdur=120 catid=6 Category="Network Access" dstname=www.google.com usr=john.doe geoSrc=US geoDst=US'
            },
            {
                title: 'IPS Detection Alert',
                log: 'id=firewall sn=C0EAE4ABCDEF time="2024-01-29 14:40:10" fw=10.0.0.1 pri=1 c=32 m=1154 msg="IPS Detection Alert" n=1 src=93.157.158.93:13723:X1 dst=10.1.1.10:80:X0 srcMac=00:00:5E:00:53:00 dstMac=a0:b1:c2:d3:e4:f5 proto=tcp/6 fw_action=drop ipscat="WEB-ATTACKS" ipscatid=4 ipspri=1 ipssigname="WEB-ATTACKS SQL Injection Attempt" ipssigid=5001 ipsAction=prevent intrusionType="Intrusion Prevention" Category="Network Detection" catid=82 dpi=1 geoSrc=RU geoDst=US'
            },
            {
                title: 'Content Filter Block',
                log: 'id=firewall sn=C0EAE4ABCDEF time="2024-01-29 14:45:33" fw=10.0.0.1 pri=4 c=256 m=97 msg="Web site access denied" n=1 src=10.0.0.50:50227:X0 dst=198.51.100.75:80:X1 srcMac=b0:c1:d2:e3:f4:05 dstMac=00:00:5E:00:53:00 proto=tcp/6 op.action=blocked cfs.category=72 cfs.categoryName="Adult/Mature Content" cfs.profile="Strict-CFS" cfs.url=blocked-site.example.com fw_action=deny rule="CFS-Block" usr=jane.smith Category="Content Filter" catid=128 geoSrc=US geoDst=US'
            },
            {
                title: 'Port Scan Detected',
                log: 'id=firewall sn=C0EAE4ABCDEF time="2024-01-29 15:00:00" fw=10.0.0.1 pri=1 c=32 m=83 msg="Probable port scan detected" n=2 src=10.0.0.3:443:X1 dst=172.16.194.2:47379:X0 srcMac=00:00:5E:00:53:ff dstMac=00:00:5E:00:53:00 proto=tcp/6 fw_action=drop Category="Network Detection" catid=82 note="TCP scanned port list, 14551, 61968, 53577, 27976, 29050, 25330, 21761, 23903, 7412, 47379" geoSrc=US geoDst=US'
            }
        ]
    },
    ubiquiti: {
        id: 'ubiquiti',
        name: 'Ubiquiti UniFi/EdgeRouter (UniFi OS)',
        emoji: '🔷',
        description: 'Ubiquiti UniFi (USG/UDM) and EdgeRouter logs (UniFi OS)',
        examples: [
            {
                title: 'Firewall Drop (WAN_LOCAL)',
                log: 'Nov 5 06:27:01 USG-Pro-4 kernel: [WAN_LOCAL-4000-D]IN=eth0 OUT= MAC=78:8a:20:43:58:67:00:01:5c:77:58:46:08:00 SRC=80.82.65.231 DST=173.172.1.5 LEN=40 TOS=0x08 PREC=0x20 TTL=237 ID=60913 PROTO=TCP SPT=42186 DPT=3735 WINDOW=1024 RES=0x00 SYN URGP=0 MARK=0x64800000'
            },
            {
                title: 'Firewall Accept (LAN_IN)',
                log: 'Feb 14 10:00:00 UDM-Pro kernel: [LAN_IN-2000-A]IN=br0 OUT=eth4 MAC=00:11:22:33:44:55:66:77:88:99:aa:bb:08:00 SRC=192.168.1.50 DST=8.8.8.8 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=4567 DF PROTO=TCP SPT=54321 DPT=53 WINDOW=65535 RES=0x00 SYN URGP=0'
            },
            {
                title: 'EdgeRouter NAT Masquerade',
                log: 'Dec 23 18:21:55 ubnt kernel: [NAT-5010-MASQ] IN= OUT=eth0 SRC=192.168.2.10 DST=1.1.1.1 LEN=73 TOS=0x00 PREC=0x00 TTL=64 ID=14664 DF PROTO=UDP SPT=21167 DPT=53 LEN=53'
            },
            {
                title: 'UDM Default Drop',
                log: '<4>Feb 24 23:02:22 UDM kernel: [435774.326627] IN=br0 OUT=eth4 MAC=76:83:c2:d5:38:1e:10:a4:be:4b:d6:41:08:00 SRC=192.168.10.20 DST=116.196.80.120 LEN=32 TOS=0x00 PREC=0x00 TTL=63 ID=0 DF PROTO=UDP SPT=40622 DPT=10001 LEN=12'
            },
            {
                title: 'Connection Tracking',
                log: 'kernel: [LAN_LOCAL-default-A]IN=br0 OUT= MAC=ff:ff:ff:ff:ff:ff:00:11:22:33:44:55:08:00 SRC=10.0.0.1 DST=255.255.255.255 LEN=328 TOS=0x00 PREC=0x00 TTL=64 ID=0 DF PROTO=UDP SPT=67 DPT=68 LEN=308'
            }
        ]
    },
    watchguard: {
        id: 'watchguard',
        name: 'WatchGuard Firebox (Fireware OS 12.x)',
        emoji: '🔥',
        description: 'WatchGuard Firebox syslog format (Fireware OS 12.x)',
        examples: [
            {
                title: 'Traffic Allow (HTTPS)',
                log: '<14>2024-04-12T07:46:11Z Firebox-01 https-proxy[1234]: msg_id="2CFF-0000" action="allow" src_ip="200.200.200.2" dst_ip="52.113.194.132" proto="tcp" src_port="61263" dst_port="443" src_intf="Trusted" dst_intf="External" proxy_act="Default-HTTPS-Client" op="CONNECT" dstname="api.example.com" geo_src="BRA" geo_dst="USA" text="HTTPS Request"'
            },
            {
                title: 'Traffic Deny (Unhandled Packet)',
                log: '<14>2025-01-20T06:48:22Z Firebox-01 firewall[100]: msg_id="3000-0148" action="Deny" src_ip="192.168.22.189" dst_ip="23.222.17.170" proto="udp" src_port="59576" dst_port="443" src_intf="Trusted-Bridge" dst_intf="External" geo_dst="CAN" sent_bytes="1278" rcvd_bytes="0" msg="Unhandled Internal Packet-00"'
            },
            {
                title: 'HTTP Proxy Block (WebBlocker)',
                log: '<14>2024-01-29T14:30:00Z Firebox-01 http-proxy[1234]: msg_id="1A04-0002" action="deny" src_ip="10.0.1.50" dst_ip="198.51.100.20" proto="tcp" src_port="55667" dst_port="80" op="GET" arg="/malware.exe" dstname="bad-site.com" category="Malware" reputation="-1" msg="Request denied by WebBlocker"'
            },
            {
                title: 'IPS Threat Detected',
                log: '<11>2024-01-29T14:45:00Z Firebox-01 firewall[100]: msg_id="4000-0001" action="drop" src_ip="203.0.113.88" dst_ip="192.168.1.5" proto="tcp" src_port="44332" dst_port="80" threat_name="SQL Injection" threat_id="12345" threat_level="Critical" msg="IPS Signature Match"'
            },
            {
                title: 'Legacy Traffic Log (Allow)',
                log: '<14>Jan 29 15:00:00 Firebox-01 firewall: Allow 10.0.1.100 8.8.8.8 udp 54321 53 Trusted External'
            }
        ]
    }
};

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

    // Cisco Firepower (FTD/NGIPS) detection - looks for %FTD- or %NGIPS- prefix,
    // or Firepower-specific comma-separated key:value patterns
    if (text.includes('%FTD-') || text.includes('%NGIPS-')) {
        return 'firepower';
    }
    // Fallback: detect Firepower-style "Key: Value, Key: Value" with Firepower-specific fields
    if (text.includes('SrcIP:') && text.includes('ACPolicy:') &&
        (text.includes('AccessControlRuleAction:') || text.includes('Protocol:'))) {
        return 'firepower';
    }
    // Juniper SRX (Junos OS) detection - looks for RT_FLOW, RT_UTM, RT_IDP tags
    // or [junos@...] structured data blocks
    if (text.includes('RT_FLOW') || text.includes('RT_UTM') || text.includes('RT_IDP') ||
        text.includes('RT_AAMW') || text.includes('RT_SCREEN')) {
        return 'juniper';
    }
    if (text.includes('[junos@')) {
        return 'juniper';
    }
    // Fallback: Juniper structured-data with Junos-specific field names
    if (text.includes('source-zone-name=') && text.includes('destination-zone-name=') &&
        text.includes('policy-name=')) {
        return 'juniper';
    }

    // SonicWall (SonicOS 6.5/7.x) detection - looks for id=firewall and sn= patterns
    if (text.includes('id=firewall') && text.includes('sn=')) {
        return 'sonicwall';
    }
    // Fallback: detect SonicWall-specific field combinations
    if (text.includes('fw_action=') && (text.includes('Category=') || text.includes('catid=')) &&
        (text.includes('src=') || text.includes('dst='))) {
        return 'sonicwall';
    }

    // Barracuda CloudGen Firewall detection
    if (text.includes('box_Firewall_Activity') || text.includes('box_Auth_Service')) {
        return 'barracuda';
    }
    // Fallback: detect Barracuda pipe-separated or key-value patterns
    if ((text.includes('type=FWD') || text.includes('type=AUD') || text.includes('type=WEBLOG')) &&
        (text.includes('|proto=') || text.includes('srcIF=') || text.includes('srcIP='))) {
        return 'barracuda';
    }

    // WatchGuard Firebox detection
    if (text.includes('msg_id="') || (text.includes('Firebox') && (text.includes('Allow ') || text.includes('Deny ')))) {
        return 'watchguard';
    }

    // Ubiquiti UniFi/EdgeRouter detection
    // Look for kernel: [RULE-PREFIX] pattern or specific iptables keys
    if (text.includes('kernel:') && (text.includes('IN=') && text.includes('OUT=') && text.includes('MAC=') && text.includes('SRC='))) {
        return 'ubiquiti';
    }
    if (text.match(/\[\w+-\w+-[ADR]\]/)) { // [WAN_LOCAL-4000-D] pattern
        return 'ubiquiti';
    }

    // Future: Add detection for other log formats
    // pfSense: <timestamp> <hostname> filterlog: <csv-fields>
    // Apache: <ip> - - [<timestamp>] "<method> <uri> <protocol>" <status> <size>
    // Nginx: <ip> - <user> [<timestamp>] "<request>" <status> <bytes> "<referrer>" "<user-agent>"

    return null;
}

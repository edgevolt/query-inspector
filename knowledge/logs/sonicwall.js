/**
 * SonicWall Firewall Log Field Knowledge Base (SonicOS 6.5/7.x)
 * Comprehensive definitions for SonicWall Enhanced Syslog fields
 * Supports connection logs, IPS/IDP, GAV (Gateway Anti-Virus), Anti-Spyware,
 * Content Filtering, Application Control, and VPN events
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session, url, action
 */

export default {
    // ===== Syslog Metadata =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity (RFC 5424)',
        category: 'device',
        examples: ['134', '166', '14']
    },
    SyslogFacility: {
        description: 'Syslog facility code derived from PRI value',
        category: 'device',
        examples: ['16', '20']
    },
    SyslogSeverityCode: {
        description: 'Syslog severity code derived from PRI value (0=Emergency to 7=Debug)',
        category: 'device',
        examples: ['1', '4', '6']
    },
    SyslogTimestamp: {
        description: 'Timestamp from the external syslog header (if present)',
        category: 'timestamp',
        examples: ['Jan 29 14:30:15', '2024-01-29T14:30:15Z']
    },
    SyslogHost: {
        description: 'Hostname from the external syslog header',
        category: 'device',
        examples: ['sonicwall01', '10.0.0.1']
    },

    // ===== Device Identification =====
    id: {
        description: 'Syslog source identifier — always "firewall" for SonicWall appliances',
        category: 'device',
        examples: ['firewall']
    },
    sn: {
        description: 'Serial number of the SonicWall appliance',
        category: 'device',
        examples: ['01234567ABCD', 'C0EAE4ABCDEF', '18B1690ABCDE']
    },
    fw: {
        description: 'IP address of the SonicWall firewall management interface',
        category: 'device',
        examples: ['10.0.0.1', '192.168.1.1', '172.16.0.1']
    },
    time: {
        description: 'Timestamp of the event on the SonicWall appliance',
        category: 'timestamp',
        examples: ['2024-01-29 14:30:15', '2024-02-10 08:45:00 UTC']
    },
    uuid: {
        description: 'Unique identifier for this specific log event',
        category: 'device',
        examples: ['5a3b7c21-1234-abcd-ef01-234567890abc']
    },

    // ===== Event Classification =====
    pri: {
        description: 'SonicWall event priority level (1=Alert, 2=Action, 3=Info, 4=Debug, 5=Trace)',
        category: 'device',
        examples: ['1', '2', '4', '5', '6']
    },
    c: {
        description: 'Event category code (e.g., 2=System, 4=VPN, 8=Network, 16=UTM, 32=Firewall, 64=Users, 128=DPI, 256=CFS, 512=AppControl, 1024=GeoIP)',
        category: 'device',
        examples: ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024']
    },
    m: {
        description: 'Message ID number identifying the specific event type',
        category: 'device',
        examples: ['83', '97', '98', '537', '1154', '1198']
    },
    msg: {
        description: 'Human-readable event description text',
        category: 'device',
        examples: ['Connection Opened', 'Connection Closed', 'Probable port scan detected',
            'IPS Detection Alert', 'Web site access denied']
    },
    n: {
        description: 'Repeat count — number of times this event was observed before logging',
        category: 'device',
        examples: ['1', '5', '23', '100']
    },
    Category: {
        description: 'Event category name',
        category: 'device',
        examples: ['Firewall Settings', 'Network Access', 'Network Detection',
            'VPN IKE', 'System Maintenance', 'Content Filter']
    },
    catid: {
        description: 'Numeric event category identifier',
        category: 'device',
        examples: ['6', '14', '32', '82', '128']
    },

    // ===== Source Information =====
    src: {
        description: 'Combined source field (IP:port:zone format)',
        category: 'source',
        examples: ['192.168.1.100:54321:X0', '10.0.0.50:443:X1', '172.16.5.25:12345:X2']
    },
    srcIp: {
        description: 'Source IP address (expanded from src= field)',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.50', '172.16.5.25']
    },
    srcPort: {
        description: 'Source port number (expanded from src= field)',
        category: 'source',
        examples: ['54321', '443', '12345']
    },
    srcZone: {
        description: 'Source security zone (expanded from src= field, e.g., X0=LAN, X1=WAN)',
        category: 'source',
        examples: ['X0', 'X1', 'X2', 'LAN', 'WAN', 'DMZ', 'WLAN']
    },
    srcMac: {
        description: 'MAC address of the source host or gateway',
        category: 'source',
        examples: ['00:00:5E:00:53:ff', 'a0:b1:c2:d3:e4:f5']
    },
    srcname: {
        description: 'Hostname or FQDN of the source host (from DNS reverse lookup or NetBIOS)',
        category: 'source',
        examples: ['workstation01.corp.local', '10.0.0.50']
    },
    srcV6: {
        description: 'Source IPv6 address (when IPv6 traffic is logged)',
        category: 'source',
        examples: ['2001:db8::1', 'fe80::1']
    },

    // ===== Destination Information =====
    dst: {
        description: 'Combined destination field (IP:port:zone format)',
        category: 'destination',
        examples: ['203.0.113.50:443:X1', '8.8.8.8:53:X1', '10.1.1.10:22:X0']
    },
    dstIp: {
        description: 'Destination IP address (expanded from dst= field)',
        category: 'destination',
        examples: ['203.0.113.50', '8.8.8.8', '10.1.1.10']
    },
    dstPort: {
        description: 'Destination port number (expanded from dst= field)',
        category: 'destination',
        examples: ['443', '53', '80', '22']
    },
    dstZone: {
        description: 'Destination security zone (expanded from dst= field)',
        category: 'destination',
        examples: ['X1', 'X0', 'X2', 'WAN', 'LAN', 'DMZ']
    },
    dstMac: {
        description: 'MAC address of the destination host or gateway',
        category: 'destination',
        examples: ['00:00:5E:00:53:00', 'b0:c1:d2:e3:f4:05']
    },
    dstname: {
        description: 'Hostname or FQDN of the destination (from DNS lookup)',
        category: 'destination',
        examples: ['www.google.com', 'mail.example.com', 'update.microsoft.com']
    },
    dstV6: {
        description: 'Destination IPv6 address (when IPv6 traffic is logged)',
        category: 'destination',
        examples: ['2001:db8::2', '2607:f8b0:4004:800::200e']
    },

    // ===== NAT Fields =====
    natSrc: {
        description: 'Translated (NATted) source IP address',
        category: 'source',
        examples: ['203.0.113.10:54321', '198.51.100.5:60000']
    },
    natDst: {
        description: 'Translated (NATted) destination IP address',
        category: 'destination',
        examples: ['10.0.0.100:8080', '192.168.1.50:3306']
    },
    natSrcPort: {
        description: 'Translated source port number',
        category: 'source',
        examples: ['54321', '60000']
    },
    natDstPort: {
        description: 'Translated destination port number',
        category: 'destination',
        examples: ['8080', '3306', '443']
    },

    // ===== Protocol Fields =====
    proto: {
        description: 'Protocol type and number (e.g., tcp/6, udp/17, icmp/1)',
        category: 'protocol',
        examples: ['tcp/6', 'udp/17', 'icmp/1', 'gre/47', '50']
    },
    'ip.proto': {
        description: 'IP protocol number only',
        category: 'protocol',
        examples: ['6', '17', '1', '47']
    },
    ether: {
        description: 'Ethernet frame type',
        category: 'protocol',
        examples: ['0x0800', '0x86DD', '0x0806']
    },

    // ===== Traffic Statistics =====
    rcvd: {
        description: 'Bytes received by the firewall for this connection',
        category: 'traffic',
        examples: ['0', '1024', '524288', '10485760']
    },
    sent: {
        description: 'Bytes sent by the firewall for this connection',
        category: 'traffic',
        examples: ['0', '512', '262144', '5242880']
    },
    rpkt: {
        description: 'Packets received by the firewall',
        category: 'traffic',
        examples: ['1', '50', '5000']
    },
    spkt: {
        description: 'Packets sent by the firewall',
        category: 'traffic',
        examples: ['1', '45', '4500']
    },
    cdur: {
        description: 'Connection duration in seconds',
        category: 'traffic',
        examples: ['0', '30', '120', '3600']
    },

    // ===== Policy / Rule Fields =====
    rule: {
        description: 'Access rule name or ID that matched this traffic',
        category: 'policy',
        examples: ['Allow-Internet', 'Block-Malicious', '2 (LAN->WAN)', 'WAN to LAN']
    },
    fw_action: {
        description: 'Firewall action taken on the traffic',
        category: 'action',
        examples: ['allow', 'drop', 'deny', 'NA', 'forward', 'reset']
    },
    'op.action': {
        description: 'Operational action result (e.g., for CFS or app control)',
        category: 'action',
        examples: ['blocked', 'passthru', 'detected', 'reset']
    },
    result: {
        description: 'Result of the action or operation',
        category: 'action',
        examples: ['0', '1', 'Success', 'Failure']
    },
    dpi: {
        description: 'Deep Packet Inspection policy applied (1=enabled, 0=disabled)',
        category: 'policy',
        examples: ['0', '1']
    },
    'dpi.enabled': {
        description: 'Whether DPI was enabled for this session',
        category: 'policy',
        examples: ['0', '1']
    },
    sess: {
        description: 'Session type or session tracking identifier',
        category: 'session',
        examples: ['Allow', 'Deny', 'Close', 'Open']
    },

    // ===== Application Control Fields =====
    app: {
        description: 'Numeric application identifier from SonicWall AppID',
        category: 'application',
        examples: ['2', '50', '184', '1200', '5000']
    },
    appName: {
        description: 'Name of the identified application',
        category: 'application',
        examples: ['General HTTPS', 'General HTTP', 'DNS', 'SSH', 'YouTube',
            'Facebook', 'Microsoft Teams', 'Zoom', 'Slack']
    },
    appcat: {
        description: 'Application category name',
        category: 'application',
        examples: ['WEB', 'APP', 'MAIL', 'FILE-TRANSFER', 'P2P',
            'SOCIAL-NETWORKING', 'STREAMING-MEDIA', 'BUSINESS']
    },
    appcatid: {
        description: 'Numeric application category identifier',
        category: 'application',
        examples: ['1', '2', '5', '10', '25']
    },
    sid: {
        description: 'Signature ID for application detection',
        category: 'application',
        examples: ['1', '100', '5000']
    },
    appRisk: {
        description: 'Risk level assigned to the detected application (1-5)',
        category: 'application',
        examples: ['1', '2', '3', '4', '5']
    },

    // ===== IPS / IDP Fields =====
    ipscat: {
        description: 'IPS signature category name',
        category: 'security',
        examples: ['EXPLOIT', 'SCAN', 'TROJAN', 'POLICY', 'WEB-ATTACKS',
            'VIRUS', 'SPYWARE', 'SHELLCODE', 'OVERFLOW']
    },
    ipscatid: {
        description: 'Numeric IPS category identifier',
        category: 'security',
        examples: ['2', '4', '8', '16', '32']
    },
    ipspri: {
        description: 'IPS signature priority level (1=High, 2=Medium, 3=Low)',
        category: 'security',
        examples: ['1', '2', '3']
    },
    ipssigname: {
        description: 'Name of the IPS signature that triggered the event',
        category: 'security',
        examples: ['WEB-ATTACKS SQL Injection', 'EXPLOIT Microsoft SMB',
            'TROJAN Android.Banker', 'SCAN Nmap -O']
    },
    ipssigid: {
        description: 'Numeric IPS signature identifier',
        category: 'security',
        examples: ['5000', '12345', '67890']
    },
    ipsAction: {
        description: 'Action taken by the IPS engine',
        category: 'action',
        examples: ['detect', 'prevent', 'drop', 'reset']
    },
    intrusionType: {
        description: 'Type of intrusion event',
        category: 'security',
        examples: ['Intrusion Prevention', 'Intrusion Detection', 'Port Scan']
    },

    // ===== Gateway Anti-Virus (GAV) Fields =====
    av: {
        description: 'Gateway Anti-Virus status flag (indicates virus detected)',
        category: 'security',
        examples: ['1', '0']
    },
    virusName: {
        description: 'Name of the detected virus or malware',
        category: 'security',
        examples: ['EICAR-Test-File', 'Trojan.GenericKD', 'Ransomware.WannaCry']
    },
    gavAction: {
        description: 'Action taken by Gateway Anti-Virus',
        category: 'action',
        examples: ['blocked', 'passthru', 'detected']
    },

    // ===== Anti-Spyware Fields =====
    spyware: {
        description: 'Anti-Spyware detection flag',
        category: 'security',
        examples: ['1', '0']
    },
    spywareName: {
        description: 'Name of the detected spyware or adware',
        category: 'security',
        examples: ['Spyware.Generic', 'Adware.BrowserHelper', 'PUA.Toolbar']
    },
    spywareAction: {
        description: 'Action taken by the Anti-Spyware engine',
        category: 'action',
        examples: ['blocked', 'detected', 'passthru']
    },
    spywareCat: {
        description: 'Category of the detected spyware',
        category: 'security',
        examples: ['Spyware', 'Adware', 'PUA', 'Keylogger']
    },

    // ===== Content Filtering (CFS) Fields =====
    'cfs.category': {
        description: 'Content Filter Service URL category number',
        category: 'url',
        examples: ['1', '5', '25', '72', '118']
    },
    'cfs.categoryName': {
        description: 'Content Filter Service URL category name',
        category: 'url',
        examples: ['Violence/Hate/Racism', 'Adult/Mature Content', 'Gambling',
            'Peer-to-Peer/File Sharing', 'Social Networking']
    },
    'cfs.profile': {
        description: 'Content Filter Service profile applied',
        category: 'url',
        examples: ['CFS Default Profile', 'Strict-CFS', 'Education-CFS']
    },
    'cfs.action': {
        description: 'Action taken by the Content Filter Service',
        category: 'action',
        examples: ['blocked', 'passthru', 'confirmed']
    },
    'cfs.url': {
        description: 'URL that was filtered or allowed',
        category: 'url',
        examples: ['www.example.com', 'malicious-site.com/payload']
    },
    'cfs.rating': {
        description: 'Content filter rating score',
        category: 'url',
        examples: ['1', '32', '64']
    },

    // ===== Botnet / Geo-IP Fields =====
    geoSrc: {
        description: 'Geolocation country code of the source IP address',
        category: 'source',
        examples: ['US', 'CN', 'DE', 'RU', 'BR']
    },
    geoDst: {
        description: 'Geolocation country code of the destination IP address',
        category: 'destination',
        examples: ['US', 'JP', 'GB', 'FR', 'AU']
    },
    botnetSrc: {
        description: 'Source IP identified as part of a botnet',
        category: 'security',
        examples: ['Yes', 'No']
    },
    botnetDst: {
        description: 'Destination IP identified as part of a botnet',
        category: 'security',
        examples: ['Yes', 'No']
    },
    botnetAction: {
        description: 'Action taken on botnet traffic',
        category: 'action',
        examples: ['blocked', 'detected', 'log-only']
    },

    // ===== VPN Fields =====
    vpnpolicy: {
        description: 'VPN policy name associated with the traffic',
        category: 'policy',
        examples: ['Site-to-Site-VPN', 'GlobalVPN', 'SSL-VPN-Policy', 'WAN GroupVPN']
    },
    vpnType: {
        description: 'Type of VPN tunnel',
        category: 'protocol',
        examples: ['IPSec', 'SSL-VPN', 'L2TP', 'GRE']
    },
    vpnTunnel: {
        description: 'VPN tunnel name or identifier',
        category: 'session',
        examples: ['Branch-01', 'Remote-Access', 'Tunnel-1']
    },
    'ike.phase': {
        description: 'IKE negotiation phase (1 or 2)',
        category: 'protocol',
        examples: ['1', '2']
    },
    'ike.proposal': {
        description: 'IKE proposal used for VPN negotiation',
        category: 'protocol',
        examples: ['AES-256-SHA256', '3DES-SHA1', 'AES-128-MD5']
    },
    'ike.dh': {
        description: 'Diffie-Hellman group used in IKE negotiation',
        category: 'protocol',
        examples: ['Group 2', 'Group 5', 'Group 14', 'Group 19']
    },

    // ===== User & Authentication Fields =====
    usr: {
        description: 'User name associated with the event (from SSO, LDAP, or local)',
        category: 'source',
        examples: ['john.doe', 'admin', 'CORP\\jane.smith', 'guest']
    },
    usrgrp: {
        description: 'User group membership',
        category: 'source',
        examples: ['Trusted Users', 'Everyone', 'IT-Admins', 'VPN-Users']
    },
    'auth.type': {
        description: 'Authentication type used',
        category: 'source',
        examples: ['LDAP', 'RADIUS', 'Local', 'SSO']
    },
    'auth.result': {
        description: 'Result of authentication attempt',
        category: 'action',
        examples: ['Success', 'Failure', 'Timeout']
    },

    // ===== TCP / Connection Details =====
    tcpflags: {
        description: 'TCP flags hex value or symbolic representation',
        category: 'protocol',
        examples: ['0x02', '0x12', '0x11', 'SYN', 'ACK', 'FIN']
    },
    note: {
        description: 'Additional context or details about the event (e.g., scanned port list)',
        category: 'device',
        examples: ['TCP scanned port list, 14551, 61968, 53577',
            'Anti-Virus Gateway detection', 'Connection reset by peer']
    },

    // ===== Wireless / WLAN Fields =====
    'wlan.ssid': {
        description: 'SSID of the wireless network',
        category: 'device',
        examples: ['Corp-WiFi', 'Guest-Network', 'IoT-SSID']
    },
    'wlan.bssid': {
        description: 'BSSID (MAC address) of the wireless access point',
        category: 'device',
        examples: ['a0:b1:c2:d3:e4:f5']
    },
    'wlan.signal': {
        description: 'Wireless signal strength (dBm)',
        category: 'device',
        examples: ['-30', '-65', '-80']
    },

    // ===== Cloud / SaaS Visibility =====
    'saas.app': {
        description: 'SaaS application detected by Cloud App Security',
        category: 'application',
        examples: ['Google Drive', 'Dropbox', 'Box', 'OneDrive', 'Salesforce']
    },
    'saas.action': {
        description: 'Action on SaaS application traffic (block, allow, monitor)',
        category: 'action',
        examples: ['blocked', 'allowed', 'monitored']
    },
    'saas.risk': {
        description: 'Risk score for SaaS application',
        category: 'application',
        examples: ['1', '3', '5', '8']
    },

    // ===== Additional Event Fields =====
    ag: {
        description: 'Agent or endpoint identifier',
        category: 'device',
        examples: ['0', '1']
    },
    'op.type': {
        description: 'Operation type for system events',
        category: 'device',
        examples: ['login', 'logout', 'config change', 'firmware update']
    },
    'op.src': {
        description: 'Source of the operation (GUI, CLI, API)',
        category: 'device',
        examples: ['GUI', 'CLI', 'API', 'SNMP']
    },
    cfwAction: {
        description: 'Capture Advanced Threat Protection action',
        category: 'action',
        examples: ['blocked', 'submitted', 'clean']
    },
    cfwScore: {
        description: 'Capture ATP threat confidence score',
        category: 'security',
        examples: ['0', '50', '99']
    },
    cfwVerdict: {
        description: 'Capture ATP sandbox verdict',
        category: 'security',
        examples: ['Good', 'Bad', 'Unknown']
    }
};

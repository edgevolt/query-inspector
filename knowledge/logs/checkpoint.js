/**
 * Check Point Firewall Log Field Knowledge Base (R81.x)
 * Comprehensive definitions for Check Point firewall log fields
 * Supports R81.x Traffic, Threat, VPN, and Authentication log formats
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session
 */

export default {
    // ===== Timestamp Fields =====
    time: {
        description: 'Log generation timestamp',
        category: 'timestamp',
        examples: ['1706544615', '2024-01-29 14:30:15']
    },
    start_time: {
        description: 'Connection start time',
        category: 'timestamp',
        examples: ['1706544000', '2024-01-29 14:20:00']
    },
    last_update_time: {
        description: 'Last update time for the log entry',
        category: 'timestamp',
        examples: ['1706544615', '2024-01-29 14:30:15']
    },
    log_delay: {
        description: 'Delay between event occurrence and log generation (seconds)',
        category: 'timestamp',
        examples: ['0', '5', '30']
    },
    elapsed: {
        description: 'Connection duration in seconds',
        category: 'timestamp',
        examples: ['120', '3600', '0']
    },

    // ===== Device Information =====
    origin: {
        description: 'Hostname or IP of the Check Point gateway that generated the log',
        category: 'device',
        examples: ['CP-GW-01', '192.168.1.1', 'firewall.example.com']
    },
    origin_sic_name: {
        description: 'Secure Internal Communication (SIC) name of the gateway',
        category: 'device',
        examples: ['CN=CP-GW-01,O=company..abcdef', 'CN=fw1,O=domain..xyz123']
    },
    product: {
        description: 'Check Point product name',
        category: 'device',
        examples: ['VPN-1 & FireWall-1', 'SmartDefense', 'Application Control']
    },
    version: {
        description: 'Check Point software version',
        category: 'device',
        examples: ['R81.10', 'R81.20', 'R80.40']
    },
    hostname: {
        description: 'Hostname of the gateway',
        category: 'device',
        examples: ['CP-GW-01', 'firewall-primary', 'checkpoint-ha-1']
    },
    sequencenum: {
        description: 'Unique sequence number for log ordering',
        category: 'device',
        examples: ['1', '12345', '9876543']
    },
    loguid: {
        description: 'Unique log identifier',
        category: 'device',
        examples: ['{0x60a1b2c3,0x0,0x1234abcd,0xc0000000}']
    },
    administrator: {
        description: 'Administrator who performed the action (for audit logs)',
        category: 'device',
        examples: ['admin', 'john.doe', 'security-team']
    },

    // ===== Source Information =====
    src: {
        description: 'Source IP address',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.50', '172.16.5.25']
    },
    s_port: {
        description: 'Source port number',
        category: 'source',
        examples: ['54321', '49152', '12345']
    },
    xlatesrc: {
        description: 'Translated source IP address (after NAT)',
        category: 'source',
        examples: ['203.0.113.10', '198.51.100.5']
    },
    xlatesport: {
        description: 'Translated source port (after NAT)',
        category: 'source',
        examples: ['60000', '55123']
    },
    src_user_name: {
        description: 'Source username from Identity Awareness',
        category: 'source',
        examples: ['john.doe', 'DOMAIN\\user1', 'admin@example.com']
    },
    src_machine_name: {
        description: 'Source machine hostname',
        category: 'source',
        examples: ['DESKTOP-ABC123', 'laptop-user1', 'workstation-01']
    },
    src_user_group: {
        description: 'Source user group from Identity Awareness',
        category: 'source',
        examples: ['Domain Users', 'Administrators', 'VPN-Users']
    },
    src_location: {
        description: 'Geographic location of source IP',
        category: 'source',
        examples: ['United States', 'Internal', 'External']
    },
    src_country: {
        description: 'Source IP country code',
        category: 'source',
        examples: ['US', 'CN', 'DE', 'GB']
    },
    src_machine_group: {
        description: 'Source machine group',
        category: 'source',
        examples: ['Workstations', 'Servers', 'Mobile-Devices']
    },
    originsicname: {
        description: 'SIC name of the source gateway (for gateway-to-gateway traffic)',
        category: 'source',
        examples: ['CN=remote-gw,O=partner..xyz789']
    },
    NAT_rulenum: {
        description: 'NAT rule number that was applied',
        category: 'source',
        examples: ['1', '5', '100']
    },

    // ===== Destination Information =====
    dst: {
        description: 'Destination IP address',
        category: 'destination',
        examples: ['8.8.8.8', '192.168.100.1', '203.0.113.50']
    },
    service: {
        description: 'Service or port number',
        category: 'destination',
        examples: ['80', '443', 'http', 'https', 'ssh']
    },
    xlatedst: {
        description: 'Translated destination IP address (after NAT)',
        category: 'destination',
        examples: ['10.0.0.100', '192.168.1.50']
    },
    xlatedport: {
        description: 'Translated destination port (after NAT)',
        category: 'destination',
        examples: ['8080', '3306']
    },
    dst_user_name: {
        description: 'Destination username',
        category: 'destination',
        examples: ['webserver', 'service-account', 'admin']
    },
    dst_machine_name: {
        description: 'Destination machine hostname',
        category: 'destination',
        examples: ['webserver01', 'db-primary', 'mail.example.com']
    },
    dst_user_group: {
        description: 'Destination user group',
        category: 'destination',
        examples: ['Service Accounts', 'Web Servers', 'Database Admins']
    },
    dst_location: {
        description: 'Geographic location of destination IP',
        category: 'destination',
        examples: ['United States', 'Internal', 'External']
    },
    dst_country: {
        description: 'Destination IP country code',
        category: 'destination',
        examples: ['US', 'JP', 'FR', 'CA']
    },
    dst_machine_group: {
        description: 'Destination machine group',
        category: 'destination',
        examples: ['Web-Servers', 'Database-Servers', 'Mail-Servers']
    },
    service_id: {
        description: 'Service identifier',
        category: 'destination',
        examples: ['http', 'https', 'dns', 'smtp']
    },

    // ===== Policy and Rules =====
    rule_name: {
        description: 'Name of the security rule that matched',
        category: 'policy',
        examples: ['Allow Web Traffic', 'Block Malicious', 'VPN Access']
    },
    rule_uid: {
        description: 'Unique identifier for the security rule',
        category: 'policy',
        examples: ['{12345678-1234-5678-9abc-def012345678}']
    },
    rule: {
        description: 'Rule number',
        category: 'policy',
        examples: ['1', '5', '100', 'Cleanup rule']
    },
    layer_name: {
        description: 'Policy layer name',
        category: 'policy',
        examples: ['Network', 'Application', 'Threat Prevention']
    },
    layer_uuid: {
        description: 'Unique identifier for the policy layer',
        category: 'policy',
        examples: ['{abcdef12-3456-7890-abcd-ef1234567890}']
    },
    action: {
        description: 'Action taken by the firewall',
        category: 'policy',
        examples: ['Accept', 'Drop', 'Reject', 'Encrypt', 'Decrypt']
    },
    conn_direction: {
        description: 'Connection direction relative to the gateway',
        category: 'policy',
        examples: ['Internal', 'Outgoing', 'Incoming']
    },
    match_id: {
        description: 'Match ID for correlated events',
        category: 'policy',
        examples: ['1', '12345']
    },

    // ===== Protocol Information =====
    proto: {
        description: 'IP protocol number or name',
        category: 'protocol',
        examples: ['6', '17', '1', 'tcp', 'udp', 'icmp']
    },
    ICMP: {
        description: 'ICMP type and code',
        category: 'protocol',
        examples: ['8', '0', 'Echo Request']
    },
    ICMP_Type: {
        description: 'ICMP message type',
        category: 'protocol',
        examples: ['8', '0', '3']
    },
    ICMP_Code: {
        description: 'ICMP message code',
        category: 'protocol',
        examples: ['0', '1', '3']
    },
    tcp_flags: {
        description: 'TCP flags in the packet',
        category: 'protocol',
        examples: ['SYN', 'ACK', 'FIN', 'RST', 'SYN-ACK']
    },

    // ===== Traffic Statistics =====
    sent_bytes: {
        description: 'Bytes sent from source to destination',
        category: 'traffic',
        examples: ['1024', '524288', '2621440']
    },
    received_bytes: {
        description: 'Bytes received from destination to source',
        category: 'traffic',
        examples: ['512', '262144', '1310720']
    },
    sent_packets: {
        description: 'Packets sent from source to destination',
        category: 'traffic',
        examples: ['10', '500', '25000']
    },
    received_packets: {
        description: 'Packets received from destination to source',
        category: 'traffic',
        examples: ['8', '450', '24000']
    },
    bytes: {
        description: 'Total bytes transferred',
        category: 'traffic',
        examples: ['1536', '786432', '3932160']
    },
    packets: {
        description: 'Total packets transferred',
        category: 'traffic',
        examples: ['18', '950', '49000']
    },
    duration: {
        description: 'Connection duration in seconds',
        category: 'traffic',
        examples: ['120', '3600', '0']
    },
    session_id: {
        description: 'Unique session identifier',
        category: 'session',
        examples: ['12345', '67890', '1234567']
    },

    // ===== Security / Threat Prevention =====
    malware_action: {
        description: 'Action taken on detected malware',
        category: 'security',
        examples: ['Prevent', 'Detect', 'Quarantine']
    },
    malware_rule_name: {
        description: 'Name of the anti-malware rule that matched',
        category: 'security',
        examples: ['Strict Protection', 'Standard', 'Custom-AV-Rule']
    },
    protection_name: {
        description: 'Name of the IPS protection that triggered',
        category: 'security',
        examples: ['SQL Injection', 'Buffer Overflow', 'Command Injection']
    },
    protection_id: {
        description: 'Unique identifier for the IPS protection',
        category: 'security',
        examples: ['12345', '67890']
    },
    threat_prevention_type: {
        description: 'Type of threat prevention blade',
        category: 'security',
        examples: ['IPS', 'Anti-Virus', 'Anti-Bot', 'URL Filtering']
    },
    severity: {
        description: 'Severity level of the threat',
        category: 'security',
        examples: ['Critical', 'High', 'Medium', 'Low', 'Informational']
    },
    confidence_level: {
        description: 'Confidence level of the threat detection',
        category: 'security',
        examples: ['High', 'Medium', 'Low']
    },
    performance_impact: {
        description: 'Performance impact of the IPS protection',
        category: 'security',
        examples: ['0', '1', '2', '3']
    },
    attack_info: {
        description: 'Additional information about the attack',
        category: 'security',
        examples: ['SQL injection attempt detected', 'Malicious payload found']
    },
    protection_type: {
        description: 'Type of protection (signature, anomaly, etc.)',
        category: 'security',
        examples: ['signature', 'anomaly', 'behavioral']
    },
    cveid: {
        description: 'CVE identifier for the vulnerability',
        category: 'security',
        examples: ['CVE-2021-44228', 'CVE-2023-12345']
    },
    cve: {
        description: 'CVE number',
        category: 'security',
        examples: ['CVE-2021-44228', 'CVE-2023-12345']
    },
    malware_family: {
        description: 'Family of the detected malware',
        category: 'security',
        examples: ['Trojan', 'Ransomware', 'Spyware', 'Worm']
    },
    file_name: {
        description: 'Name of the file involved in the threat',
        category: 'security',
        examples: ['malware.exe', 'suspicious.pdf', 'payload.dll']
    },
    file_hash: {
        description: 'Hash of the file (MD5, SHA-1, or SHA-256)',
        category: 'security',
        examples: ['d41d8cd98f00b204e9800998ecf8427e', 'a1b2c3d4e5f6...']
    },

    // ===== Application Control =====
    appi_name: {
        description: 'Application name identified by Application Control',
        category: 'application',
        examples: ['Facebook', 'Dropbox', 'YouTube', 'Skype']
    },
    app_desc: {
        description: 'Application description',
        category: 'application',
        examples: ['Social Networking', 'File Sharing', 'Video Streaming']
    },
    app_category: {
        description: 'Application category',
        category: 'application',
        examples: ['Social Networking', 'File Sharing', 'Collaboration']
    },
    app_properties: {
        description: 'Application properties or characteristics',
        category: 'application',
        examples: ['Tunneling', 'File Transfer', 'Chat']
    },
    app_risk: {
        description: 'Risk level of the application',
        category: 'application',
        examples: ['Critical', 'High', 'Medium', 'Low']
    },
    app_rule_name: {
        description: 'Application Control rule name',
        category: 'application',
        examples: ['Block Social Media', 'Allow Business Apps']
    },
    matched_category: {
        description: 'Matched application category',
        category: 'application',
        examples: ['Social Networking', 'Instant Messaging']
    },

    // ===== URL Filtering =====
    resource: {
        description: 'URL or resource accessed',
        category: 'default',
        examples: ['http://example.com/page', 'https://malicious.com/payload']
    },
    categories: {
        description: 'URL categories',
        category: 'default',
        examples: ['Social Networking', 'Malware', 'Adult Content']
    },
    methods: {
        description: 'HTTP method',
        category: 'default',
        examples: ['GET', 'POST', 'PUT', 'DELETE']
    },
    referrer: {
        description: 'HTTP referrer',
        category: 'default',
        examples: ['https://google.com', 'https://example.com/page1']
    },
    user_agent: {
        description: 'HTTP user agent string',
        category: 'default',
        examples: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'curl/7.68.0']
    },

    // ===== VPN =====
    peer_gateway: {
        description: 'Remote VPN peer gateway IP or hostname',
        category: 'default',
        examples: ['203.0.113.100', 'remote-office.example.com']
    },
    community: {
        description: 'VPN community name',
        category: 'default',
        examples: ['RemoteAccess', 'Site-to-Site', 'Partner-VPN']
    },
    encryption_method: {
        description: 'VPN encryption method',
        category: 'default',
        examples: ['AES-256', 'AES-128', '3DES']
    },
    ike_version: {
        description: 'IKE protocol version',
        category: 'default',
        examples: ['IKEv1', 'IKEv2']
    },
    vpn_feature_name: {
        description: 'VPN feature or blade name',
        category: 'default',
        examples: ['Mobile Access', 'Site to Site', 'Remote Access']
    },

    // ===== Additional Fields =====
    interface_name: {
        description: 'Network interface name',
        category: 'default',
        examples: ['eth0', 'eth1', 'bond0']
    },
    ifdir: {
        description: 'Interface direction (inbound/outbound)',
        category: 'default',
        examples: ['inbound', 'outbound']
    },
    message_info: {
        description: 'Additional message or information',
        category: 'default',
        examples: ['Connection established', 'Policy violation detected']
    },
    alert: {
        description: 'Alert type or message',
        category: 'default',
        examples: ['Policy violation', 'Threat detected']
    },
    comment: {
        description: 'Additional comments or notes',
        category: 'default',
        examples: ['Blocked by security policy', 'Allowed for testing']
    }
};

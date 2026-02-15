/**
 * Cisco Firepower Threat Defense (FTD) Log Field Knowledge Base
 * Comprehensive definitions for Cisco Firepower FTD syslog fields
 * Supports FTD 6.x/7.x — Connection, Intrusion, File/Malware, and Security Intelligence events
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session, ssl, url, file, geolocation
 */

export default {
    // ===== Syslog Header / Metadata Fields =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity (RFC 5424)',
        category: 'device',
        examples: ['166', '113', '134']
    },
    SyslogFacility: {
        description: 'Syslog facility code derived from PRI value',
        category: 'device',
        examples: ['20', '14']
    },
    SyslogSeverityCode: {
        description: 'Syslog severity code derived from PRI value (0=Emergency to 7=Debug)',
        category: 'device',
        examples: ['1', '4', '6']
    },
    Timestamp: {
        description: 'Timestamp of the syslog message in RFC 5424 or legacy format',
        category: 'timestamp',
        examples: ['2024-01-29T14:30:15Z', 'Jan 29 14:30:15']
    },
    SyslogHost: {
        description: 'Hostname or IP of the Firepower device that sent the syslog',
        category: 'device',
        examples: ['firewall01', '192.168.1.1', 'FTD-Primary']
    },
    LogSource: {
        description: 'Syslog source identifier — FTD (Firepower Threat Defense) or NGIPS (Next-Gen IPS)',
        category: 'device',
        examples: ['FTD', 'NGIPS']
    },
    SyslogSeverity: {
        description: 'Severity level from the %FTD-N-NNNNNN prefix (1=Alert to 7=Debug)',
        category: 'device',
        examples: ['1', '4', '5']
    },
    MessageID: {
        description: 'Syslog message ID identifying the event type (430001=Intrusion, 430002=Conn Start, 430003=Conn End, 430004=File, 430005=Malware)',
        category: 'device',
        examples: ['430001', '430002', '430003', '430004', '430005']
    },

    // ===== Device / Instance Fields =====
    DeviceUUID: {
        description: 'Unique UUID of the Firepower sensor that generated the event',
        category: 'device',
        examples: ['e8566508-eaa9-11e5-860f-de3e305d8269']
    },
    InstanceID: {
        description: 'Snort instance ID that processed the traffic',
        category: 'device',
        examples: ['1', '3', '8']
    },
    ConnectionCounter: {
        description: 'Counter value for the connection on this Snort instance',
        category: 'device',
        examples: ['12345', '67890']
    },

    // ===== Timestamp / Duration Fields =====
    FirstPacketSecond: {
        description: 'Timestamp of the first packet in the connection (ISO 8601)',
        category: 'timestamp',
        examples: ['2024-01-29T14:30:15Z', '2024-02-10T08:45:00Z']
    },
    ConnectionDuration: {
        description: 'Duration of the connection in seconds',
        category: 'timestamp',
        examples: ['0', '30', '120', '3600']
    },

    // ===== Source Information =====
    SrcIP: {
        description: 'Source IP address of the connection initiator',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.50', '203.0.113.25']
    },
    SrcPort: {
        description: 'Source TCP/UDP port number',
        category: 'source',
        examples: ['54321', '49152', '12345']
    },
    InitiatorPackets: {
        description: 'Number of packets sent by the connection initiator (client)',
        category: 'source',
        examples: ['1', '10', '500']
    },
    InitiatorBytes: {
        description: 'Number of bytes sent by the connection initiator (client)',
        category: 'source',
        examples: ['54', '1024', '524288']
    },
    User: {
        description: 'Username associated with the source IP from Identity Policy (may include realm)',
        category: 'source',
        examples: ['ACME\\john.doe', 'jane.smith', 'No Authentication Required', 'Unknown']
    },
    UserAgent: {
        description: 'HTTP User-Agent string from the client',
        category: 'source',
        examples: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'curl/7.68.0']
    },
    Realm: {
        description: 'Identity realm associated with the user',
        category: 'source',
        examples: ['ACME', 'LDAP-Realm', 'ActiveDirectory']
    },
    SourceCountry: {
        description: 'Geolocation country of the source IP address',
        category: 'source',
        examples: ['United States', 'China', 'Germany', 'Reserved']
    },
    SourceSecurityGroup: {
        description: 'TrustSec Security Group Tag (SGT) of the source',
        category: 'source',
        examples: ['Employees', 'Contractors', 'Servers']
    },

    // ===== Destination Information =====
    DstIP: {
        description: 'Destination IP address of the connection responder',
        category: 'destination',
        examples: ['8.8.8.8', '203.0.113.50', '10.1.1.10']
    },
    DstPort: {
        description: 'Destination TCP/UDP port number',
        category: 'destination',
        examples: ['80', '443', '53', '22']
    },
    ResponderPackets: {
        description: 'Number of packets sent by the connection responder (server)',
        category: 'destination',
        examples: ['0', '8', '450']
    },
    ResponderBytes: {
        description: 'Number of bytes sent by the connection responder (server)',
        category: 'destination',
        examples: ['0', '2048', '1048576']
    },
    DestinationCountry: {
        description: 'Geolocation country of the destination IP address',
        category: 'destination',
        examples: ['United States', 'Japan', 'France', 'Reserved']
    },
    DestinationSecurityGroup: {
        description: 'TrustSec Security Group Tag (SGT) of the destination',
        category: 'destination',
        examples: ['Web-Servers', 'DNS-Servers', 'Internet']
    },

    // ===== Network Interface / Zone Fields =====
    IngressInterface: {
        description: 'Network interface through which traffic entered the Firepower device',
        category: 'source',
        examples: ['inside', 'outside', 'GigabitEthernet0/0', 'Port-channel1']
    },
    EgressInterface: {
        description: 'Network interface through which traffic exited the Firepower device',
        category: 'destination',
        examples: ['outside', 'dmz', 'GigabitEthernet0/1', 'Port-channel2']
    },
    IngressZone: {
        description: 'Security zone of the ingress interface',
        category: 'source',
        examples: ['Inside-Zone', 'Outside-Zone', 'DMZ-Zone']
    },
    EgressZone: {
        description: 'Security zone of the egress interface',
        category: 'destination',
        examples: ['Outside-Zone', 'Inside-Zone', 'DMZ-Zone']
    },

    // ===== NAT Fields =====
    NATInitiatorIP: {
        description: 'Translated (NATted) source IP address',
        category: 'source',
        examples: ['203.0.113.10', '198.51.100.5']
    },
    NATInitiatorPort: {
        description: 'Translated (NATted) source port number',
        category: 'source',
        examples: ['54321', '60000']
    },
    NATResponderIP: {
        description: 'Translated (NATted) destination IP address',
        category: 'destination',
        examples: ['10.0.0.100', '192.168.1.50']
    },
    NATResponderPort: {
        description: 'Translated (NATted) destination port number',
        category: 'destination',
        examples: ['8080', '3306']
    },

    // ===== Policy and Rule Fields =====
    ACPolicy: {
        description: 'Name of the Access Control Policy applied to this connection',
        category: 'policy',
        examples: ['Default Policy', 'Corporate-ACP', 'Basic IPS/IDS Policy']
    },
    AccessControlRuleName: {
        description: 'Name of the specific Access Control Rule that matched',
        category: 'policy',
        examples: ['Allow-Web', 'Block-Malicious', 'Default Action', 'GeoBlock Countries']
    },
    AccessControlRuleAction: {
        description: 'Action taken by the matched Access Control Rule',
        category: 'action',
        examples: ['Allow', 'Block', 'Block with reset', 'Trust', 'Monitor']
    },
    AccessControlRuleReason: {
        description: 'Reason the Access Control Rule was applied',
        category: 'policy',
        examples: ['IP Block', 'URL Block', 'DNS Block', 'Intrusion Block']
    },
    'Prefilter Policy': {
        description: 'Name of the Prefilter Policy applied before Access Control processing',
        category: 'policy',
        examples: ['Default Prefilter Policy', 'Custom-Prefilter', 'Unknown']
    },
    NAPPolicy: {
        description: 'Network Analysis Policy (NAP) applied for protocol normalization and preprocessing',
        category: 'policy',
        examples: ['Balanced Security and Connectivity', 'Maximum Detection', 'Connectivity Over Security']
    },
    IntrusionPolicy: {
        description: 'Intrusion Policy applied for deep packet inspection',
        category: 'policy',
        examples: ['Balanced Security and Connectivity', 'Maximum Detection', 'Custom-IPS']
    },
    SSLPolicy: {
        description: 'SSL/TLS decryption policy applied to this connection',
        category: 'policy',
        examples: ['Default SSL Policy', 'Decrypt-Inspect', 'Do Not Decrypt']
    },
    QOSPolicy: {
        description: 'Quality of Service policy applied to the connection',
        category: 'policy',
        examples: ['Default QoS', 'Priority-Traffic']
    },

    // ===== Action / Event Priority =====
    EventPriority: {
        description: 'Priority level of the Firepower event (Low, Medium, High)',
        category: 'action',
        examples: ['Low', 'Medium', 'High']
    },
    InlineResult: {
        description: 'Inline result indicating what action Snort took on the traffic',
        category: 'action',
        examples: ['Blocked', 'Dropped', 'Would have dropped', 'Allowed']
    },
    Impact: {
        description: 'Impact flag indicating the relevance of the event to the target host',
        category: 'action',
        examples: ['0', '1', '2', '3', '4']
    },

    // ===== Protocol and Application Fields =====
    Protocol: {
        description: 'IP protocol name used in the connection',
        category: 'protocol',
        examples: ['tcp', 'udp', 'icmp', 'sctp']
    },
    ApplicationProtocol: {
        description: 'Application-layer protocol detected by Firepower (layer 7)',
        category: 'protocol',
        examples: ['HTTP', 'HTTPS', 'DNS', 'SSH', 'SMTP', 'TLS', 'CLDAP', 'QUIC']
    },
    WebApplication: {
        description: 'Web application detected by Firepower application identification',
        category: 'application',
        examples: ['Office 365', 'Google', 'Facebook', 'YouTube', 'Salesforce', 'Dropbox']
    },
    Client: {
        description: 'Client application detected on the initiator host',
        category: 'application',
        examples: ['Chrome', 'Firefox', 'cURL', 'Edge', 'Outlook', 'wget']
    },
    ApplicationRisk: {
        description: 'Risk level of the detected application',
        category: 'application',
        examples: ['Very Low', 'Low', 'Medium', 'High', 'Very High']
    },
    ApplicationBusinessRelevance: {
        description: 'Business relevance of the detected application',
        category: 'application',
        examples: ['Very High', 'High', 'Medium', 'Low', 'Very Low']
    },
    ApplicationCategory: {
        description: 'Category of the detected application',
        category: 'application',
        examples: ['web browser', 'email', 'file sharing', 'social networking', 'streaming media']
    },
    ApplicationTag: {
        description: 'Tag associated with the detected application',
        category: 'application',
        examples: ['SSL Protocol', 'HTTPS', 'encrypts communications']
    },

    // ===== Connection / Session Fields =====
    ConnectionID: {
        description: 'Unique identifier for the connection tracked by Firepower',
        category: 'session',
        examples: ['34774', '12345', '98765432']
    },
    VLANID: {
        description: 'Innermost VLAN ID associated with the packet that triggered the event',
        category: 'session',
        examples: ['100', '200', '0']
    },
    SecurityIntelligenceCategory: {
        description: 'Security Intelligence feed category that matched (for SI block/monitor events)',
        category: 'security',
        examples: ['Attackers', 'Malware', 'Bogon', 'CnC', 'Tor_exit_node']
    },
    SecurityIntelligenceSource: {
        description: 'Source of the Security Intelligence match (feed or list name)',
        category: 'security',
        examples: ['Cisco-Intelligence-Feed', 'Custom-Blocklist', 'Tor-Blocklist']
    },

    // ===== Intrusion / IPS Fields =====
    GID: {
        description: 'Generator ID of the Snort rule that triggered the intrusion event',
        category: 'security',
        examples: ['1', '3', '116', '129']
    },
    SID: {
        description: 'Snort ID (Signature ID) of the triggered intrusion rule',
        category: 'security',
        examples: ['648', '2003', '31978', '45127']
    },
    Revision: {
        description: 'Revision number of the Snort rule signature',
        category: 'security',
        examples: ['1', '7', '18']
    },
    Message: {
        description: 'Human-readable description of the intrusion rule or event',
        category: 'security',
        examples: ['INDICATOR-SHELLCODE x86 NOOP', 'MALWARE-CNC Win.Trojan.Zeus variant', 'SERVER-WEBAPP SQL injection attempt']
    },
    Classification: {
        description: 'Classification category of the intrusion rule that generated the event',
        category: 'security',
        examples: ['Executable Code was Detected', 'A Network Trojan was Detected', 'Web Application Attack', 'Attempted Information Leak']
    },
    Priority: {
        description: 'Priority level of the intrusion event (1=High, 2=Medium, 3=Low)',
        category: 'security',
        examples: ['1', '2', '3']
    },
    GeneratorID: {
        description: 'Alternative name for GID — Generator ID of the Snort rule',
        category: 'security',
        examples: ['1', '3']
    },
    SignatureID: {
        description: 'Alternative name for SID — Snort Signature ID',
        category: 'security',
        examples: ['648', '31978']
    },

    // ===== URL / DNS Fields =====
    URL: {
        description: 'URL or URI accessed during the connection (up to 2048 bytes)',
        category: 'url',
        examples: ['http://example.com/page', '/malware.exe', 'https://web.example.com/api/v1']
    },
    URLCategory: {
        description: 'URL category assigned by Firepower URL filtering',
        category: 'url',
        examples: ['Search Engines', 'Malware Sites', 'Social Networking', 'Adult and Pornography', 'Uncategorized']
    },
    URLReputation: {
        description: 'Reputation score of the URL (Risk level)',
        category: 'url',
        examples: ['Well Known', 'Benign Sites', 'Untested', 'Suspicious Sites', 'High Risk']
    },
    URLSICategory: {
        description: 'URL Security Intelligence category that matched',
        category: 'url',
        examples: ['Phishing', 'Malware', 'Command and Control']
    },
    DNSQuery: {
        description: 'DNS domain name being queried when the event involves a DNS lookup',
        category: 'url',
        examples: ['www.example.com', 'malicious-domain.com', 'api.service.local']
    },
    DNSRecordType: {
        description: 'DNS query record type',
        category: 'url',
        examples: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV']
    },
    DNSResponseType: {
        description: 'DNS response type',
        category: 'url',
        examples: ['No Error', 'NXDomain', 'Server Failure']
    },
    DNSSICategory: {
        description: 'DNS Security Intelligence category that matched for this domain',
        category: 'url',
        examples: ['CnC', 'Malware', 'Phishing', 'Spam']
    },
    Referrer: {
        description: 'HTTP Referrer header value',
        category: 'url',
        examples: ['https://google.com', 'https://example.com/page']
    },

    // ===== SSL/TLS Fields =====
    SSLServerName: {
        description: 'Server Name Indication (SNI) hostname from the TLS handshake',
        category: 'ssl',
        examples: ['www.example.com', 'api.service.com']
    },
    SSLVersion: {
        description: 'TLS/SSL protocol version negotiated in the connection',
        category: 'ssl',
        examples: ['TLSv1.2', 'TLSv1.3', 'SSLv3.0', 'TLSv1.0', 'TLSv1.1']
    },
    SSLCipherSuite: {
        description: 'Cipher suite negotiated for the encrypted connection (macro value)',
        category: 'ssl',
        examples: ['TLS_AES_256_GCM_SHA384', 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256']
    },
    SSLSessionID: {
        description: 'Hexadecimal Session ID negotiated during the TLS handshake',
        category: 'ssl',
        examples: ['a1b2c3d4e5f6...']
    },
    SSLTicketID: {
        description: 'Hexadecimal hash of the session ticket from the TLS handshake',
        category: 'ssl',
        examples: ['f0e1d2c3b4a5...']
    },
    SSLURLCategory: {
        description: 'URL category for the certificate common name in the encrypted connection',
        category: 'ssl',
        examples: ['Search Engines', 'Business and Economy']
    },
    SSLCertificateFingerprint: {
        description: 'SHA-256 fingerprint of the server TLS certificate',
        category: 'ssl',
        examples: ['a1b2c3d4e5f67890...']
    },
    SSLActualAction: {
        description: 'Actual SSL inspection action applied to the connection',
        category: 'ssl',
        examples: ['Decrypt - Resign', 'Decrypt - Known Key', 'Do not decrypt', 'Block', 'Block with reset']
    },
    SSLExpectedAction: {
        description: 'Expected SSL action from the SSL policy rule match',
        category: 'ssl',
        examples: ['Decrypt - Resign', 'Do not decrypt']
    },
    SSLFlowStatus: {
        description: 'Status of the SSL flow processing',
        category: 'ssl',
        examples: ['Success', 'Unknown']
    },
    SSLServerCertStatus: {
        description: 'Validation status of the server TLS certificate',
        category: 'ssl',
        examples: ['Valid', 'Self-Signed', 'Expired', 'Invalid Issuer', 'Revoked']
    },

    // ===== File / Malware Fields =====
    FileType: {
        description: 'Type or extension of the file detected in the connection',
        category: 'file',
        examples: ['PDF', 'EXE', 'DOC', 'ZIP', 'DLL', 'JAR']
    },
    FileName: {
        description: 'Name of the file detected in the connection',
        category: 'file',
        examples: ['malware.exe', 'invoice.pdf', 'payload.dll']
    },
    FileSize: {
        description: 'Size of the file in bytes',
        category: 'file',
        examples: ['1024', '524288', '10485760']
    },
    FileDirection: {
        description: 'Direction of the file transfer (Upload or Download)',
        category: 'file',
        examples: ['Upload', 'Download']
    },
    FileSHA256: {
        description: 'SHA-256 hash of the file for malware lookup and disposition',
        category: 'file',
        examples: ['a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890']
    },
    FileStorageStatus: {
        description: 'Status of file storage (whether the file was captured)',
        category: 'file',
        examples: ['Stored', 'Not Stored', 'File Size Limit']
    },
    FileAction: {
        description: 'Action taken on the file by the file policy',
        category: 'file',
        examples: ['Detect Files', 'Block Files', 'Malware Cloud Lookup', 'Block Malware']
    },
    FileSandboxStatus: {
        description: 'Status of the file sandbox (Threat Grid) analysis',
        category: 'file',
        examples: ['Sent for Analysis', 'Completed', 'Not Sent']
    },
    MalwareAction: {
        description: 'Action taken by AMP/Malware defense on the file',
        category: 'file',
        examples: ['Block', 'Allow', 'Cloud Lookup Timeout']
    },
    ThreatName: {
        description: 'Name of the detected malware threat from AMP cloud lookup',
        category: 'security',
        examples: ['W32.GenericKD', 'Trojan.GenericKD', 'Win.Ransomware.Locky']
    },
    ThreatScore: {
        description: 'Threat score from Threat Grid dynamic analysis (0-100)',
        category: 'security',
        examples: ['0', '50', '95', '100']
    },
    SperoDisposition: {
        description: 'Disposition from SPERO machine learning engine',
        category: 'file',
        examples: ['Malware', 'Clean', 'Unknown']
    },
    AMPDisposition: {
        description: 'AMP cloud disposition of the file',
        category: 'file',
        examples: ['Malware', 'Clean', 'Unknown', 'Custom Detection']
    },
    AMPThreatScore: {
        description: 'Threat score from AMP cloud analysis',
        category: 'file',
        examples: ['0', '75', '100']
    },

    // ===== Geolocation Fields =====
    SourceCity: {
        description: 'City geolocation of the source IP address',
        category: 'source',
        examples: ['New York', 'London', 'Tokyo']
    },
    DestinationCity: {
        description: 'City geolocation of the destination IP address',
        category: 'destination',
        examples: ['San Francisco', 'Berlin', 'Sydney']
    },
    DeviceCity: {
        description: 'City where the Firepower device is located',
        category: 'device',
        examples: ['Chicago', 'Dallas']
    },
    DeviceCountry: {
        description: 'Country where the Firepower device is located',
        category: 'device',
        examples: ['United States', 'United Kingdom']
    },

    // ===== IOC / Threat Intelligence Fields =====
    IOCCategory: {
        description: 'Indicator of Compromise category from Threat Intelligence',
        category: 'security',
        examples: ['CnC Connected', 'Malware Detected', 'Exploit Kit']
    },
    IOCCount: {
        description: 'Number of Indicators of Compromise associated with this host',
        category: 'security',
        examples: ['1', '5', '10']
    },

    // ===== Endpoint / Host Fields =====
    SourceOS: {
        description: 'Operating system detected on the source host',
        category: 'source',
        examples: ['Windows 10', 'Ubuntu 22.04', 'macOS 14']
    },
    DestinationOS: {
        description: 'Operating system detected on the destination host',
        category: 'destination',
        examples: ['CentOS 8', 'Windows Server 2019', 'FreeBSD 13']
    },
    NetBIOSDomain: {
        description: 'NetBIOS domain name of the source host',
        category: 'source',
        examples: ['WORKGROUP', 'ACME', 'CORP']
    },
    HostType: {
        description: 'Type of endpoint host',
        category: 'device',
        examples: ['Host', 'Router', 'Network Device', 'Mobile']
    },

    // ===== Miscellaneous / Extended Fields =====
    HTTPMethod: {
        description: 'HTTP request method',
        category: 'protocol',
        examples: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD']
    },
    HTTPResponse: {
        description: 'HTTP response status code',
        category: 'protocol',
        examples: ['200', '301', '403', '404', '500']
    },
    ReferencedHost: {
        description: 'Hostname referenced in the connection (e.g., from HTTP Host header)',
        category: 'url',
        examples: ['www.example.com', 'api.service.com']
    },
    ICMPType: {
        description: 'ICMP message type number',
        category: 'protocol',
        examples: ['0', '3', '8', '11']
    },
    ICMPCode: {
        description: 'ICMP message code number',
        category: 'protocol',
        examples: ['0', '1', '3', '13']
    },
    TCPFlags: {
        description: 'TCP flags observed in the connection',
        category: 'protocol',
        examples: ['SYN', 'ACK', 'FIN', 'RST', 'PSH']
    },
    OriginalClientSrcIP: {
        description: 'Original client source IP (from X-Forwarded-For header or proxy context)',
        category: 'source',
        examples: ['10.0.0.100', '172.16.5.25']
    },
    AccountName: {
        description: 'Username or account name that initiated the activty',
        category: 'source',
        examples: ['john.doe', 'admin', 'service-account']
    },
    dst_host: {
        description: 'Destination hostname (used in some VPN/event log contexts)',
        category: 'destination',
        examples: ['webserver.local', 'N/A']
    }
};

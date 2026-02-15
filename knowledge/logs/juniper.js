/**
 * Juniper Networks SRX Firewall Log Field Knowledge Base (Junos OS)
 * Comprehensive definitions for Juniper SRX structured syslog fields
 * Supports RT_FLOW, RT_UTM, RT_IDP, RT_AAMW, and RT_SCREEN event types
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session, url
 */

export default {
    // ===== Syslog Metadata =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity (RFC 5424)',
        category: 'device',
        examples: ['14', '20', '134']
    },
    SyslogFacility: {
        description: 'Syslog facility code derived from PRI value',
        category: 'device',
        examples: ['1', '16', '17']
    },
    SyslogSeverityCode: {
        description: 'Syslog severity code derived from PRI value (0=Emergency to 7=Debug)',
        category: 'device',
        examples: ['4', '5', '6']
    },
    Timestamp: {
        description: 'Timestamp of the syslog message (RFC 5424 or legacy format)',
        category: 'timestamp',
        examples: ['2024-01-29T14:30:15.000+00:00', 'Jan 29 14:30:15']
    },
    SyslogHost: {
        description: 'Hostname of the SRX device that generated the syslog',
        category: 'device',
        examples: ['SRX-01', 'fw-branch-01', 'SRX345']
    },

    // ===== Log Classification =====
    LogCategory: {
        description: 'Top-level log category (RT_FLOW, RT_UTM, RT_IDP, RT_AAMW, RT_SCREEN)',
        category: 'device',
        examples: ['RT_FLOW', 'RT_UTM', 'RT_IDP', 'RT_AAMW', 'RT_SCREEN']
    },
    EventType: {
        description: 'Specific event type within the log category',
        category: 'device',
        examples: [
            'RT_FLOW_SESSION_CREATE', 'RT_FLOW_SESSION_CLOSE', 'RT_FLOW_SESSION_DENY',
            'WEBFILTER_URL_BLOCKED', 'WEBFILTER_URL_PERMITTED',
            'ANTIVIRUS_VIRUS_DETECTED', 'IDP_ATTACK_LOG_EVENT'
        ]
    },
    SubCategory: {
        description: 'Sub-category label from UTM/IDP log formats (e.g., WebFilter, AntiVirus, IDP)',
        category: 'device',
        examples: ['WebFilter', 'AntiVirus', 'IDP', 'ContentFiltering']
    },

    // ===== Source Information =====
    'source-address': {
        description: 'Source IP address of the connection initiator',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.50', '172.16.5.25']
    },
    'source-port': {
        description: 'Source TCP/UDP port number',
        category: 'source',
        examples: ['54321', '49152', '16683']
    },
    'nat-source-address': {
        description: 'Source IP address after NAT translation',
        category: 'source',
        examples: ['203.0.113.10', '198.51.100.5']
    },
    'nat-source-port': {
        description: 'Source port after NAT translation',
        category: 'source',
        examples: ['54321', '60000']
    },
    'src-nat-rule-type': {
        description: 'Type of source NAT rule applied',
        category: 'source',
        examples: ['source rule', 'N/A', 'interface']
    },
    'src-nat-rule-name': {
        description: 'Name of the source NAT rule that matched',
        category: 'source',
        examples: ['SNAT-Internet', 'interface-nat-out', 'N/A']
    },
    'source-zone-name': {
        description: 'Security zone of the source interface',
        category: 'source',
        examples: ['trust', 'untrust', 'dmz', 'internal']
    },
    'source-interface-name': {
        description: 'Physical or logical interface where the traffic originated',
        category: 'source',
        examples: ['ge-0/0/0.0', 'reth0.0', 'ae0.100', 'st0.0']
    },

    // ===== Destination Information =====
    'destination-address': {
        description: 'Destination IP address of the connection responder',
        category: 'destination',
        examples: ['8.8.8.8', '203.0.113.50', '10.1.1.10']
    },
    'destination-port': {
        description: 'Destination TCP/UDP port number',
        category: 'destination',
        examples: ['80', '443', '53', '22']
    },
    'nat-destination-address': {
        description: 'Destination IP address after NAT translation',
        category: 'destination',
        examples: ['10.0.0.100', '192.168.1.50']
    },
    'nat-destination-port': {
        description: 'Destination port after NAT translation',
        category: 'destination',
        examples: ['8080', '3306', '443']
    },
    'dst-nat-rule-type': {
        description: 'Type of destination NAT rule applied',
        category: 'destination',
        examples: ['destination rule', 'N/A', 'static']
    },
    'dst-nat-rule-name': {
        description: 'Name of the destination NAT rule that matched',
        category: 'destination',
        examples: ['DNAT-WebServer', 'static-nat-dmz', 'N/A']
    },
    'destination-zone-name': {
        description: 'Security zone of the destination interface',
        category: 'destination',
        examples: ['untrust', 'trust', 'dmz', 'servers']
    },
    'destination-interface-name': {
        description: 'Physical or logical interface where the traffic was forwarded',
        category: 'destination',
        examples: ['ge-0/0/1.0', 'reth1.0', 'ae1.200', 'st0.0']
    },

    // ===== Protocol =====
    'protocol-id': {
        description: 'IP protocol number (6=TCP, 17=UDP, 1=ICMP, 47=GRE, 50=ESP)',
        category: 'protocol',
        examples: ['6', '17', '1', '47', '50']
    },
    protocol: {
        description: 'Protocol name (used in IDP/UTM log formats)',
        category: 'protocol',
        examples: ['TCP', 'UDP', 'ICMP', 'GRE']
    },
    service: {
        description: 'Service or application-layer protocol name',
        category: 'protocol',
        examples: ['HTTP', 'HTTPS', 'DNS', 'SSH', 'FTP', 'SMTP', 'junos-dns-udp']
    },
    'service-name': {
        description: 'Name of the Junos service object that matched',
        category: 'protocol',
        examples: ['junos-http', 'junos-https', 'junos-dns-udp', 'junos-ssh', 'any']
    },

    // ===== Policy and Rule Fields =====
    'policy-name': {
        description: 'Name of the security policy that matched the traffic',
        category: 'policy',
        examples: ['Allow-Internet', 'Block-Malicious', 'Permit-DNS', 'VPN-Access', 'default-deny']
    },
    'rule-name': {
        description: 'Security policy rule name (alias for policy-name in some contexts)',
        category: 'policy',
        examples: ['Allow-Web', 'Block-All', 'Permit-VPN']
    },
    ACTION: {
        description: 'Action taken on the traffic or event (UTM/IDP format)',
        category: 'action',
        examples: ['URL Permitted', 'URL Blocked', 'Virus Detected', 'NONE', 'drop', 'close']
    },
    action: {
        description: 'Action taken by the IDP or flow policy',
        category: 'action',
        examples: ['NONE', 'drop', 'close', 'recommended', 'ignore']
    },
    reason: {
        description: 'Reason the session was closed, denied, or the action was taken',
        category: 'action',
        examples: ['TCP FIN', 'TCP RST', 'response received', 'aged out', 'policy deny', 'application deny',
            'Authentication failed', 'idle Timeout', 'resource limit']
    },

    // ===== Session / Connection Fields =====
    'session-id-32': {
        description: 'Unique 32-bit session identifier',
        category: 'session',
        examples: ['12345', '67890', '98765432']
    },
    'packets-from-client': {
        description: 'Number of packets sent from the client (initiator)',
        category: 'traffic',
        examples: ['5', '100', '5000']
    },
    'packets-from-server': {
        description: 'Number of packets sent from the server (responder)',
        category: 'traffic',
        examples: ['4', '80', '4500']
    },
    'bytes-from-client': {
        description: 'Number of bytes sent from the client (initiator)',
        category: 'traffic',
        examples: ['512', '10240', '524288']
    },
    'bytes-from-server': {
        description: 'Number of bytes sent from the server (responder)',
        category: 'traffic',
        examples: ['1024', '20480', '1048576']
    },
    elapsed: {
        description: 'Duration of the session in seconds (only in RT_FLOW_SESSION_CLOSE)',
        category: 'traffic',
        examples: ['0', '30', '120', '3600']
    },
    'elapsed-time': {
        description: 'Alternative name for session duration in seconds',
        category: 'traffic',
        examples: ['0', '30', '120']
    },

    // ===== Application Identification =====
    application: {
        description: 'Application identified by Junos AppID/AppTrack (Layer 7)',
        category: 'application',
        examples: ['HTTP', 'SSL', 'DNS', 'FACEBOOK-ACCESS', 'YOUTUBE', 'SSH', 'UNKNOWN']
    },
    'nested-application': {
        description: 'Nested application detected within the parent application (e.g., HTTPS within SSL)',
        category: 'application',
        examples: ['FACEBOOK-CHAT', 'GMAIL', 'YOUTUBE-STREAMING', 'UNKNOWN']
    },
    'application-category': {
        description: 'Category of the identified application',
        category: 'application',
        examples: ['Web', 'Infrastructure', 'Multimedia', 'Social-Networking']
    },
    'application-sub-category': {
        description: 'Sub-category of the identified application',
        category: 'application',
        examples: ['Web-Browsing', 'File-Transfer', 'Video', 'Email']
    },
    'application-risk': {
        description: 'Risk level assigned to the identified application',
        category: 'application',
        examples: ['1', '2', '3', '4', '5']
    },
    'application-characteristics': {
        description: 'Characteristics or tags for the identified application',
        category: 'application',
        examples: ['encrypted', 'tunneling', 'file-transfer', 'supports-streaming']
    },

    // ===== UTM Web Filtering Fields =====
    CATEGORY: {
        description: 'URL category assigned by Enhanced Web Filtering (EWF)',
        category: 'url',
        examples: ['Enhanced_Advertisements', 'Enhanced_Social_Networking', 'Enhanced_Malware', 'N/A']
    },
    REASON: {
        description: 'Reason for the web filter action',
        category: 'url',
        examples: ['BY_PRE_DEFINED', 'BY_OTHER', 'BY_CUSTOM_CATEGORY']
    },
    PROFILE: {
        description: 'Web filtering profile that was applied',
        category: 'url',
        examples: ['junos-wf-enhanced-default', 'custom-wf-profile', 'strict-wf']
    },
    URL: {
        description: 'URL that was accessed or blocked',
        category: 'url',
        examples: ['www.example.com', 'ad.doubleclick.net', 'malicious-site.com']
    },
    OBJ: {
        description: 'URL object/path that was accessed or blocked',
        category: 'url',
        examples: ['/index.html', '/ads/banner.js', '/malware.exe']
    },
    USERNAME: {
        description: 'Username associated with the UTM event (from JIMS or authentication)',
        category: 'source',
        examples: ['john.doe', 'N/A', 'admin']
    },
    ROLES: {
        description: 'User roles associated with the UTM event',
        category: 'source',
        examples: ['N/A', 'Employees', 'Contractors']
    },

    // ===== UTM Antivirus Fields =====
    'virus-name': {
        description: 'Name of the detected virus or malware',
        category: 'security',
        examples: ['EICAR-Test-File', 'Trojan.GenericKD', 'Ransomware.WannaCry']
    },
    'file-name': {
        description: 'Name of the file associated with the virus or malware event',
        category: 'security',
        examples: ['malware.exe', 'invoice.pdf', 'test.zip']
    },
    'file-category': {
        description: 'Category or type of the file',
        category: 'security',
        examples: ['executable', 'document', 'archive']
    },
    'av-profile': {
        description: 'Antivirus UTM profile that was applied',
        category: 'security',
        examples: ['junos-av-defaults', 'custom-av-strict']
    },
    'scan-result': {
        description: 'Result of the antivirus scan',
        category: 'security',
        examples: ['INFECTED', 'CLEAN', 'SCAN_ERROR']
    },

    // ===== IDP (Intrusion Detection/Prevention) Fields =====
    'attack-name': {
        description: 'Name of the detected IDP attack signature',
        category: 'security',
        examples: ['HTTP:XSS:HTML-SCRIPT-IN-URL-VAR', 'HTTP:SQL:INJ-1', 'DNS:OVERFLOW:BIND-TSIG']
    },
    name: {
        description: 'Attack signature name (alternative label in some IDP formats)',
        category: 'security',
        examples: ['HTTP:XSS:HTML-SCRIPT-IN-URL-VAR', 'HTTP:SQL:INJ-1']
    },
    'threat-severity': {
        description: 'Severity level of the detected IDP threat',
        category: 'security',
        examples: ['INFO', 'WARNING', 'MINOR', 'MAJOR', 'CRITICAL']
    },
    rulebase: {
        description: 'IDP rulebase that the matching rule belongs to',
        category: 'policy',
        examples: ['IPS', 'IDS', 'Exempt']
    },
    rule: {
        description: 'IDP rule number that triggered the event',
        category: 'policy',
        examples: ['1', '5', '10']
    },
    policy: {
        description: 'IDP policy name applied to this traffic',
        category: 'policy',
        examples: ['recommended', 'custom-idp-policy', 'strict-idp']
    },
    repeat: {
        description: 'Number of times the IDP event was repeated/aggregated',
        category: 'security',
        examples: ['1', '2', '10']
    },
    'message-type': {
        description: 'Type of IDP message (e.g., SIG for signature, ANOMALY for anomaly)',
        category: 'security',
        examples: ['SIG', 'ANOMALY']
    },

    // ===== Screen / DoS Protection =====
    'attack-type': {
        description: 'Type of screen/DoS attack detected (RT_SCREEN)',
        category: 'security',
        examples: ['SYN flood', 'ICMP flood', 'port scan', 'IP sweep', 'land']
    },
    'interface-name': {
        description: 'Interface on which the screen event was detected',
        category: 'device',
        examples: ['ge-0/0/0.0', 'reth0.0']
    },

    // ===== Encryption / VPN =====
    encryption: {
        description: 'Whether the session traffic was encrypted',
        category: 'protocol',
        examples: ['Yes', 'No']
    },
    'tunnel-type': {
        description: 'Type of VPN or tunnel used',
        category: 'protocol',
        examples: ['IPSec', 'GRE', 'SSL-VPN', 'N/A']
    },
    'tunnel-inspection': {
        description: 'Whether the tunnel was inspected by the firewall',
        category: 'protocol',
        examples: ['Yes', 'No', 'N/A']
    },
    'ike-version': {
        description: 'Internet Key Exchange version used for VPN',
        category: 'protocol',
        examples: ['IKEv1', 'IKEv2']
    },
    'vpn-name': {
        description: 'Name of the VPN tunnel or gateway',
        category: 'default',
        examples: ['Branch-VPN', 'Remote-Access', 'Site-to-Site-01']
    },

    // ===== Routing / Multi-tenancy =====
    'routing-instance': {
        description: 'Routing instance or virtual router associated with the traffic',
        category: 'device',
        examples: ['default', 'VR-Customer-A', 'mgmt_junos']
    },
    'logical-system-name': {
        description: 'Logical system (LSYS) name in multi-tenant deployments',
        category: 'device',
        examples: ['root-logical-system', 'LSYS-Customer-A']
    },
    'tenant-name': {
        description: 'Tenant name in multi-tenant environments',
        category: 'device',
        examples: ['default', 'Customer-A', 'Production']
    },

    // ===== User Identity =====
    username: {
        description: 'Username identified by JIMS or authentication (structured-data format)',
        category: 'source',
        examples: ['john.doe', 'admin', 'N/A']
    },
    roles: {
        description: 'User roles from identity management (structured-data format)',
        category: 'source',
        examples: ['N/A', 'Employees', 'Contractors']
    },
    'source-identity-feed-name': {
        description: 'Name of the Security Intelligence feed that matched the source IP',
        category: 'security',
        examples: ['CC', 'Malware', 'GeoIP-Block']
    },
    'destination-identity-feed-name': {
        description: 'Name of the Security Intelligence feed that matched the destination IP',
        category: 'security',
        examples: ['CC', 'Malware', 'Tor-Exit-Nodes']
    },

    // ===== ICMP =====
    'icmp-type': {
        description: 'ICMP type number (0=Echo Reply, 8=Echo Request, 3=Dest Unreachable)',
        category: 'protocol',
        examples: ['0', '3', '8', '11']
    },

    // ===== Additional Metadata =====
    'packet-log-id': {
        description: 'Identifier for packet capture associated with this event',
        category: 'session',
        examples: ['0', '12345']
    },
    'exported': {
        description: 'Whether the event was exported to an external collector',
        category: 'device',
        examples: ['0', '1']
    },
    'uplink-incoming-interface-name': {
        description: 'Uplink interface through which inbound traffic arrived (chassis cluster)',
        category: 'source',
        examples: ['reth0.0', 'ge-0/0/0.0']
    },
    'uplink-tx-bytes': {
        description: 'Bytes transmitted on the uplink interface',
        category: 'traffic',
        examples: ['1024', '52428800']
    },
    'uplink-rx-bytes': {
        description: 'Bytes received on the uplink interface',
        category: 'traffic',
        examples: ['2048', '104857600']
    },
    'rule-type': {
        description: 'Type of rule that matched (e.g., explicit, implicit default)',
        category: 'policy',
        examples: ['explicit', 'implicit', 'default']
    },
    'profile-name': {
        description: 'UTM or AppFW profile applied to the traffic',
        category: 'policy',
        examples: ['junos-wf-enhanced-default', 'custom-utm-profile']
    },
    'is-nasaddr': {
        description: 'Indicates if the source is a NAS (Network Access Server) address',
        category: 'source',
        examples: ['Yes', 'No']
    },
    'multipath-rule-name': {
        description: 'Name of the multipath (APBR/ADVPN) rule applied',
        category: 'policy',
        examples: ['APBR-Rule-1', 'N/A']
    },

    // ===== Connection Tags / Session Flags =====
    'connection-tag': {
        description: 'Connection tag value used for chassis cluster session synchronization',
        category: 'session',
        examples: ['0', '1']
    },
    'nat-connection-tag': {
        description: 'NAT connection tag for translated session tracking',
        category: 'session',
        examples: ['0', '1']
    },
    'session-flag': {
        description: 'Session flags indicating special session properties',
        category: 'session',
        examples: ['0', '0x10000', '0x20000']
    },
    'tcp-flag': {
        description: 'TCP flags observed during the session',
        category: 'protocol',
        examples: ['SYN', 'ACK', 'FIN', 'RST']
    },

    // ===== Content Filtering =====
    'content-filter-name': {
        description: 'Name of the content filtering profile applied',
        category: 'security',
        examples: ['block-executables', 'default-content-filter']
    },
    'content-type': {
        description: 'MIME content type of the filtered content',
        category: 'security',
        examples: ['application/octet-stream', 'text/html', 'application/pdf']
    },

    // ===== Anti-Spam =====
    'spam-action': {
        description: 'Action taken on spam email (block, tag, allow)',
        category: 'security',
        examples: ['block', 'tag-subject', 'allow']
    },
    'spam-reason': {
        description: 'Reason the email was classified as spam',
        category: 'security',
        examples: ['RBL match', 'sender blacklist', 'heuristic']
    },

    // ===== AppDoS / Rate Limiting =====
    'app-dos-rule-name': {
        description: 'Application-layer DoS rule that triggered',
        category: 'security',
        examples: ['HTTP-Flood', 'DNS-Flood']
    },
    'app-dos-attack-type': {
        description: 'Type of application-layer denial of service attack',
        category: 'security',
        examples: ['HTTP Flood', 'DNS Amplification', 'Slowloris']
    },

    // ===== QoS / DSCP =====
    'dscp-value': {
        description: 'Differentiated Services Code Point value for QoS marking',
        category: 'traffic',
        examples: ['0', '26', '46']
    },
    'forwarding-class': {
        description: 'Junos forwarding class assigned to this traffic',
        category: 'traffic',
        examples: ['best-effort', 'assured-forwarding', 'expedited-forwarding']
    },

    // ===== TCP / IP Details =====
    'tcp-mss': {
        description: 'TCP Maximum Segment Size negotiated in the session',
        category: 'protocol',
        examples: ['1460', '1380', '536']
    },
    'initial-tcp-flags': {
        description: 'TCP flags from the initial SYN packet of the session',
        category: 'protocol',
        examples: ['0x02', '0x12']
    },
    ttl: {
        description: 'IP Time To Live value from the packet',
        category: 'protocol',
        examples: ['64', '128', '255']
    },

    // ===== Threat Intelligence / SecIntel =====
    'secIntel-category': {
        description: 'Security Intelligence (SecIntel) threat category that matched',
        category: 'security',
        examples: ['CC', 'Malware', 'GeoIP']
    },
    'secIntel-profile-name': {
        description: 'SecIntel profile that was applied',
        category: 'security',
        examples: ['default-secintel', 'custom-threat-feed']
    },
    'threat-type': {
        description: 'Type of threat identified by SecIntel',
        category: 'security',
        examples: ['C&C', 'Malware', 'Infected-Host']
    },
    'feed-name': {
        description: 'Name of the threat intelligence feed that triggered the match',
        category: 'security',
        examples: ['Juniper-GeoIP', 'Custom-Blocklist', 'Juniper-CC']
    }
};


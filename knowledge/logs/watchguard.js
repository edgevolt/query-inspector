/**
 * WatchGuard Fireware OS Log Field Knowledge Base
 * Comprehensive definitions for WatchGuard Firebox logs
 * Covers Traffic, Alarm, Event, Diagnostic, and Statistic logs
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session, action
 */

export default {
    // ===== Syslog Metadata =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity',
        category: 'device',
        examples: ['12', '14']
    },
    SyslogTimestamp: {
        description: 'Timestamp from the syslog header',
        category: 'timestamp',
        examples: ['Jan 29 14:30:15', '2024-04-12T07:46:11Z']
    },
    SyslogHost: {
        description: 'Hostname of the WatchGuard device',
        category: 'device',
        examples: ['Firebox-01', 'wg-edge']
    },
    ProcessName: {
        description: 'Name of the process that generated the log',
        category: 'device',
        examples: ['firewall', 'https-proxy', 'iked', 'dhcpd']
    },
    ProcessID: {
        description: 'Process ID of the generator',
        category: 'device',
        examples: ['1234', 'klogd']
    },

    // ===== Common Fields =====
    msg_id: {
        description: 'Unique message identifier code',
        category: 'device',
        examples: ['3000-0148', '2CFF-0000', '1A04-0002']
    },
    id: {
        description: 'Alternative message ID field',
        category: 'device',
        examples: ['3000-0148']
    },
    type: {
        description: 'Log message type',
        category: 'device',
        examples: ['Traffic', 'Event', 'Alarm', 'Debug']
    },
    action: {
        description: 'Action taken by the firewall/proxy',
        category: 'action',
        examples: ['Allow', 'Deny', 'Block', 'Drop', 'ProxyAllow']
    },
    op: {
        description: 'Operation performed (e.g., HTTP request)',
        category: 'action',
        examples: ['GET', 'POST', 'CONNECT', 'dl-req']
    },
    arg: {
        description: 'Argument or additional detail for the operation',
        category: 'action',
        examples: ['/index.html', 'HTTP/1.1']
    },

    // ===== Source Info =====
    src_ip: {
        description: 'Source IP address',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.5']
    },
    srcIp: {
        description: 'Normalized source IP address',
        category: 'source',
        examples: ['192.168.1.100']
    },
    src_port: {
        description: 'Source port number',
        category: 'source',
        examples: ['54321', '12345']
    },
    srcPort: {
        description: 'Normalized source port number',
        category: 'source',
        examples: ['54321']
    },
    src_intf: {
        description: 'Source interface alias or name',
        category: 'source',
        examples: ['Trusted', 'External', 'Optional', 'eth0']
    },
    src_user: {
        description: 'Authenticated source username',
        category: 'source',
        examples: ['john.doe', 'admin']
    },
    src_mac: {
        description: 'Source MAC address',
        category: 'source',
        examples: ['00:11:22:33:44:55']
    },
    geo_src: {
        description: 'Source geolocation (country code)',
        category: 'source',
        examples: ['USA', 'BRA', 'CHN', 'DEU']
    },

    // ===== Destination Info =====
    dst_ip: {
        description: 'Destination IP address',
        category: 'destination',
        examples: ['8.8.8.8', '203.0.113.50']
    },
    dstIp: {
        description: 'Normalized destination IP address',
        category: 'destination',
        examples: ['8.8.8.8']
    },
    dst_port: {
        description: 'Destination port number',
        category: 'destination',
        examples: ['80', '443', '53']
    },
    dstPort: {
        description: 'Normalized destination port number',
        category: 'destination',
        examples: ['80']
    },
    dst_intf: {
        description: 'Destination interface alias or name',
        category: 'destination',
        examples: ['External', 'Trusted', 'Optional']
    },
    dstname: {
        description: 'Destination hostname or FQDN',
        category: 'destination',
        examples: ['www.google.com', 'api.example.com']
    },
    geo_dst: {
        description: 'Destination geolocation (country code)',
        category: 'destination',
        examples: ['USA', 'CAN', 'FRA', 'JPN']
    },

    // ===== Traffic Stats =====
    sent_bytes: {
        description: 'Bytes sent',
        category: 'traffic',
        examples: ['1024', '500']
    },
    rcvd_bytes: {
        description: 'Bytes received',
        category: 'traffic',
        examples: ['2048', '1000']
    },
    duration: {
        description: 'Session duration in seconds',
        category: 'traffic',
        examples: ['30', '120']
    },
    ttl: {
        description: 'Time To Live value',
        category: 'traffic',
        examples: ['64', '128']
    },
    len: {
        description: 'Packet length',
        category: 'traffic',
        examples: ['60', '1500']
    },

    // ===== Protocol & Policy =====
    proto: {
        description: 'Protocol (TCP, UDP, ICMP, etc.)',
        category: 'protocol',
        examples: ['tcp', 'udp', 'icmp', 'esp']
    },
    protocol: {
        description: 'Protocol name (legacy logs)',
        category: 'protocol',
        examples: ['tcp', 'udp']
    },
    policy: {
        description: 'Firewall policy name',
        category: 'policy',
        examples: ['Allow-HTTPS', 'Block-Botnet', 'Outgoing']
    },
    proxy_act: {
        description: 'Proxy action name used',
        category: 'policy',
        examples: ['HTTP-Client.Standard', 'SMTP-Incoming']
    },
    rule_name: {
        description: 'Rule name matched within a policy',
        category: 'policy',
        examples: ['Allow-Web-Browsing']
    },

    // ===== Security Services =====
    app_name: {
        description: 'Detected application name (Application Control)',
        category: 'application',
        examples: ['Facebook', 'YouTube', 'BitTorrent']
    },
    app_cat_name: {
        description: 'Application category name',
        category: 'application',
        examples: ['Social Network', 'Streaming Media']
    },
    virus: {
        description: 'Detected virus name (Gateway AV)',
        category: 'security',
        examples: ['EICAR-Test-File', 'Trojan.Gen']
    },
    threat_name: {
        description: 'Name of the detected threat (IPS)',
        category: 'security',
        examples: ['SQL Injection', 'Cross-site Scripting']
    },
    threat_level: {
        description: 'Severity level of the threat',
        category: 'security',
        examples: ['High', 'Critical']
    },
    botnet_src: {
        description: 'Source IP is a known botnet member',
        category: 'security',
        examples: ['yes', 'no']
    },
    botnet_dst: {
        description: 'Destination IP is a known botnet member',
        category: 'security',
        examples: ['yes', 'no']
    },
    reputation: {
        description: 'Reputation score (WebBlocker/Reputation Enabled Defense)',
        category: 'security',
        examples: ['10', '-1', '90']
    },
    score: {
        description: 'Spam score or reputation score',
        category: 'security',
        examples: ['5', '99']
    },
    category: {
        description: 'WebBlocker URL category',
        category: 'url',
        examples: ['Gambling', 'Malicious', 'Search Engines']
    },

    // ===== TLS/SSL =====
    tls_version: {
        description: 'TLS protocol version used',
        category: 'security',
        examples: ['TLS_V12', 'TLS_V13']
    },
    tls_profile: {
        description: 'TLS profile applied',
        category: 'policy',
        examples: ['TLS-Client-HTTPS.Standard']
    },
    error: {
        description: 'SSL/TLS error message',
        category: 'device',
        examples: ['Handshake failed']
    },

    // ===== VPN & IKE =====
    user: {
        description: 'VPN user name',
        category: 'source',
        examples: ['vpnuser1']
    },
    rem_ip: {
        description: 'Remote IP address for VPN',
        category: 'source',
        examples: ['203.0.113.10']
    },
    loc_ip: {
        description: 'Local IP address for VPN',
        category: 'destination',
        examples: ['192.168.1.1']
    },
    msg: {
        description: 'Detailed message text',
        category: 'device',
        examples: ['Phase 1 established', 'Authentication failed']
    },
    status: {
        description: 'Status of the operation',
        category: 'device',
        examples: ['Active', 'Inactive', 'Success']
    },

    // ===== Explicit 40+ Additional Fields for Coverage =====
    'path': { description: 'URL path', category: 'url', examples: ['/index.php'] },
    'query': { description: 'URL query string', category: 'url', examples: ['?id=1'] },
    'referer': { description: 'HTTP Referer', category: 'url', examples: ['http://google.com'] },
    'user_agent': { description: 'HTTP User Agent', category: 'application', examples: ['Mozilla/5.0...'] },
    'content_type': { description: 'MIME type', category: 'application', examples: ['text/html'] },
    'file_name': { description: 'Attached filename', category: 'application', examples: ['invoice.pdf'] },
    'file_size': { description: 'File size', category: 'traffic', examples: ['10240'] },
    'sender': { description: 'Email sender', category: 'source', examples: ['user@example.com'] },
    'recipient': { description: 'Email recipient', category: 'destination', examples: ['admin@corp.com'] },
    'subject': { description: 'Email subject', category: 'application', examples: ['Hello'] },
    'if_dir': { description: 'Interface direction', category: 'device', examples: ['inbound', 'outbound'] },
    'vlan_id': { description: 'VLAN ID', category: 'device', examples: ['10', '20'] },
    'icmp_type': { description: 'ICMP type', category: 'protocol', examples: ['8', '0'] },
    'icmp_code': { description: 'ICMP code', category: 'protocol', examples: ['0', '1'] },
    'tcp_flags': { description: 'TCP flags', category: 'protocol', examples: ['S', 'SA', 'PA'] },
    'window_size': { description: 'TCP window size', category: 'protocol', examples: ['65535'] },
    'sequence': { description: 'TCP sequence number', category: 'protocol', examples: ['123456'] },
    'ack': { description: 'TCP acknowledgement number', category: 'protocol', examples: ['789012'] },
    'client_ver': { description: 'VPN client version', category: 'application', examples: ['12.5.3'] },
    'os_ver': { description: 'Client OS version', category: 'application', examples: ['Windows 10'] },
    'host_name': { description: 'Client hostname', category: 'source', examples: ['laptop-01'] },
    'domain_name': { description: 'Client domain name', category: 'source', examples: ['corp.local'] },
    'dhcp_lease': { description: 'DHCP lease time', category: 'device', examples: ['86400'] },
    'gateway': { description: 'Gateway IP', category: 'device', examples: ['192.168.1.1'] },
    'dns_server': { description: 'DNS server IP', category: 'device', examples: ['8.8.8.8'] },
    'wins_server': { description: 'WINS server IP', category: 'device', examples: ['192.168.1.5'] },
    'ntp_server': { description: 'NTP server IP', category: 'device', examples: ['pool.ntp.org'] },
    'sys_load': { description: 'System load average', category: 'device', examples: ['0.50'] },
    'sys_uptime': { description: 'System uptime', category: 'device', examples: ['100 days'] },
    'mem_free': { description: 'Free memory', category: 'device', examples: ['512MB'] },
    'disk_free': { description: 'Free disk space', category: 'device', examples: ['10GB'] },
    'temp_c': { description: 'Temperature (Celsius)', category: 'device', examples: ['40'] },
    'fan_rpm': { description: 'Fan speed (RPM)', category: 'device', examples: ['3500'] },
    'volt': { description: 'Voltage', category: 'device', examples: ['12.0'] },
    'psu_status': { description: 'Power supply status', category: 'device', examples: ['Good'] },
    'raid_status': { description: 'RAID status', category: 'device', examples: ['Optimal'] },
    'ha_state': { description: 'HA state', category: 'device', examples: ['Primary'] },
    'ha_peer': { description: 'HA peer IP', category: 'device', examples: ['10.0.0.2'] },
    'cluster_id': { description: 'Cluster ID', category: 'device', examples: ['1'] },
    'member_id': { description: 'Cluster member ID', category: 'device', examples: ['0'] },
    'vpn_tunn_id': { description: 'VPN tunnel ID', category: 'session', examples: ['5'] },
};

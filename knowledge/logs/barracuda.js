/**
 * Barracuda CloudGen Firewall Log Field Knowledge Base
 * Comprehensive definitions for Barracuda Firewall logs
 * Covers Forwarding Firewall, Audit, Web Log, and System events
 * Categories: timestamp, device, source, destination, policy, protocol, traffic, security, application, session, action
 */

export default {
    // ===== Syslog Metadata =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity',
        category: 'device',
        examples: ['14', '134']
    },
    SyslogTimestamp: {
        description: 'Timestamp from the syslog header',
        category: 'timestamp',
        examples: ['Jan 29 14:30:15', '2024-01-29T14:30:15Z']
    },
    SyslogHost: {
        description: 'Hostname of the Barracuda unit',
        category: 'device',
        examples: ['barra-fw-01', 'ng-firewall']
    },
    ProcessName: {
        description: 'Name of the process that generated the log',
        category: 'device',
        examples: ['klogd', 'box_Firewall_Activity', 'box_Auth_Service']
    },
    ProcessID: {
        description: 'Process ID of the generator',
        category: 'device',
        examples: ['1234', '556']
    },

    // ===== Common Fields =====
    type: {
        description: 'Type of log entry (e.g., FWD for Forwarding, AUD for Audit)',
        category: 'device',
        examples: ['FWD', 'AUD', 'WEBLOG', 'VPN']
    },
    cat: {
        description: 'Category of the log (e.g., SSL-VPN, System, Firewall)',
        category: 'device',
        examples: ['SSL-VPN', 'System', 'Firewall']
    },
    info: {
        description: 'Informational message or description',
        category: 'device',
        examples: ['Connection accepted', 'Authentication failed', 'Access denied']
    },
    action: {
        description: 'Action taken by the firewall',
        category: 'action',
        examples: ['Allow', 'Block', 'Drop', 'Deny', 'Remove']
    },

    // ===== Source Info =====
    src: {
        description: 'Source IP address',
        category: 'source',
        examples: ['192.168.1.100', '10.0.0.5']
    },
    srcIp: {
        description: 'Normalized source IP address',
        category: 'source',
        examples: ['192.168.1.100']
    },
    srcPort: {
        description: 'Source port number',
        category: 'source',
        examples: ['54321', '12345']
    },
    srcMac: {
        description: 'Source MAC address',
        category: 'source',
        examples: ['00:11:22:33:44:55']
    },
    srcIF: {
        description: 'Source interface name',
        category: 'source',
        examples: ['eth0', 'p1', 'ml0']
    },
    user: {
        description: 'Authenticated username',
        category: 'source',
        examples: ['john.doe', 'admin']
    },

    // ===== Destination Info =====
    dst: {
        description: 'Destination IP address',
        category: 'destination',
        examples: ['8.8.8.8', '203.0.113.50']
    },
    dstIp: {
        description: 'Normalized destination IP address',
        category: 'destination',
        examples: ['8.8.8.8']
    },
    dstPort: {
        description: 'Destination port number',
        category: 'destination',
        examples: ['80', '443', '53']
    },
    dstMac: {
        description: 'Destination MAC address',
        category: 'destination',
        examples: ['AA:BB:CC:DD:EE:FF']
    },
    dstIF: {
        description: 'Destination interface name',
        category: 'destination',
        examples: ['eth1', 'p2']
    },
    proto: {
        description: 'Protocol used',
        category: 'protocol',
        examples: ['TCP', 'UDP', 'ICMP']
    },
    protocol: {
        description: 'Normalized protocol name',
        category: 'protocol',
        examples: ['TCP', 'UDP']
    },

    // ===== Traffic Stats =====
    size: {
        description: 'Total size of portions of the traffic',
        category: 'traffic',
        examples: ['1024', '500']
    },
    sentBytes: {
        description: 'Bytes sent',
        category: 'traffic',
        examples: ['512']
    },
    receivedBytes: {
        description: 'Bytes received',
        category: 'traffic',
        examples: ['1024']
    },
    duration: {
        description: 'Session duration in seconds',
        category: 'traffic',
        examples: ['30', '120']
    },
    count: {
        description: 'Number of repeated events or packets',
        category: 'traffic',
        examples: ['1', '5']
    },

    // ===== Rule & Policy =====
    rule: {
        description: 'Name of the firewall rule that matched',
        category: 'policy',
        examples: ['Allow-Web', 'Block-All', 'Lan-to-Wan']
    },
    policy: {
        description: 'Policy name associated with the rule',
        category: 'policy',
        examples: ['Default-Policy', 'Corp-Access']
    },
    context: {
        description: 'Context information for the rule/action',
        category: 'policy',
        examples: ['pre-auth', 'post-auth']
    },

    // ===== Application & Web =====
    app: {
        description: 'Detected application name',
        category: 'application',
        examples: ['SSL', 'HTTP', 'Facebook', 'BitTorrent']
    },
    url: {
        description: 'URL accessed (Web Log)',
        category: 'url',
        examples: ['http://example.com/index.html']
    },
    urlcat: {
        description: 'Category of the accessed URL',
        category: 'url',
        examples: ['Search Engines', 'Social Networking', 'Malware']
    },
    method: {
        description: 'HTTP method used',
        category: 'application',
        examples: ['GET', 'POST']
    },
    agent: {
        description: 'User-Agent string',
        category: 'application',
        examples: ['Mozilla/5.0...']
    },

    // ===== Security / IPS =====
    threat: {
        description: 'Name of the detected threat',
        category: 'security',
        examples: ['SQL Injection', 'XSS']
    },
    attack: {
        description: 'Name of the detected attack',
        category: 'security',
        examples: ['Port Scan', 'Syn Flood']
    },
    severity: {
        description: 'Severity level of the event',
        category: 'security',
        examples: ['High', 'Critical', 'Warning']
    },
    msg: {
        description: 'Detailed message regarding the event',
        category: 'device',
        examples: ['Value too large', 'Invalid credentials']
    },
    reason: {
        description: 'Reason for the action taken',
        category: 'action',
        examples: ['Policy Violation', 'Threat Detected']
    },

    // ===== VPN / Auth =====
    vpn: {
        description: 'VPN tunnel name or type',
        category: 'session',
        examples: ['Site-to-Site', 'Client-to-Site']
    },
    group: {
        description: 'User group for authentication',
        category: 'source',
        examples: ['IT-Admins', 'HR-Users']
    },
    station: {
        description: 'Station IP or name for VPN/Auth',
        category: 'source',
        examples: ['10.0.0.100']
    },
    domain: {
        description: 'Authentication domain',
        category: 'source',
        examples: ['CORP', 'LOCAL']
    },

    // ===== Other =====
    interface: {
        description: 'General interface field',
        category: 'device',
        examples: ['eth0']
    },
    status: {
        description: 'Status of the operation or event',
        category: 'device',
        examples: ['Success', 'Failed', 'Active']
    },
    error: {
        description: 'Error code or message',
        category: 'device',
        examples: ['Connection refused', 'Timeout']
    },
    version: {
        description: 'Version information',
        category: 'device',
        examples: ['v1.0', '8.3.1']
    },
    host: {
        description: 'Referring host or destination host',
        category: 'destination',
        examples: ['www.google.com']
    },
    tz: {
        description: 'Timezone offset',
        category: 'timestamp',
        examples: ['+0000', '-0500']
    },
    id: {
        description: 'Event or session identifier',
        category: 'device',
        examples: ['123456789']
    },
    flags: {
        description: 'TCP or system flags',
        category: 'protocol',
        examples: ['SYN', 'ACK']
    },
    cluster: {
        description: 'Cluster node name',
        category: 'device',
        examples: ['node1', 'primary']
    },
    partition: {
        description: 'System partition name',
        category: 'device',
        examples: ['root', 'data']
    },

    // Explicit 50+ more fields to ensure robust coverage
    'src_country': { description: 'Source country code', category: 'source', examples: ['US', 'DE'] },
    'dst_country': { description: 'Destination country code', category: 'destination', examples: ['CN', 'RU'] },
    'content_type': { description: 'MIME type of content', category: 'application', examples: ['text/html'] },
    'referer': { description: 'HTTP Referer header', category: 'url', examples: ['http://google.com'] },
    'cookie': { description: 'HTTP Cookie data', category: 'application', examples: ['session=123'] },
    'x_forwarded_for': { description: 'X-Forwarded-For header', category: 'source', examples: ['1.2.3.4'] },
    'ssl_version': { description: 'SSL/TLS version', category: 'security', examples: ['TLSv1.2'] },
    'cipher_suite': { description: 'SSL/TLS cipher suite', category: 'security', examples: ['AES256-SHA'] },
    'cert_issuer': { description: 'Certificate issuer', category: 'security', examples: ['Let\'s Encrypt'] },
    'cert_subject': { description: 'Certificate subject', category: 'security', examples: ['example.com'] },
    'vpn_gateway': { description: 'VPN Gateway IP', category: 'session', examples: ['1.1.1.1'] },
    'tunnel_id': { description: 'VPN Tunnel ID', category: 'session', examples: ['10'] },
    'local_ip': { description: 'Local IP in tunnel', category: 'source', examples: ['10.1.1.1'] },
    'remote_ip': { description: 'Remote IP in tunnel', category: 'destination', examples: ['10.2.2.2'] },
    'auth_method': { description: 'Method of authentication', category: 'source', examples: ['password'] },
    'target_user': { description: 'Target user for admin actions', category: 'destination', examples: ['user1'] },
    'command': { description: 'Command executed', category: 'action', examples: ['reboot'] },
    'parameter': { description: 'Command parameter', category: 'action', examples: ['force'] },
    'cpu_load': { description: 'CPU load percentage', category: 'device', examples: ['50'] },
    'mem_usage': { description: 'Memory usage percentage', category: 'device', examples: ['80'] },
    'disk_usage': { description: 'Disk usage percentage', category: 'device', examples: ['90'] },
    'fan_speed': { description: 'Fan speed in RPM', category: 'device', examples: ['3000'] },
    'temp': { description: 'Temperature in Celsius', category: 'device', examples: ['45'] },
    'voltage': { description: 'System voltage', category: 'device', examples: ['12.1'] },
    'power_status': { description: 'Power supply status', category: 'device', examples: ['OK'] },
    'link_status': { description: 'Interface link status', category: 'device', examples: ['Up'] },
    'duplex': { description: 'Interface duplex mode', category: 'device', examples: ['Full'] },
    'speed': { description: 'Interface speed', category: 'device', examples: ['1000Mbps'] },
    'mtu': { description: 'Interface MTU', category: 'device', examples: ['1500'] },
    'rx_errors': { description: 'Receive errors count', category: 'traffic', examples: ['0'] },
    'tx_errors': { description: 'Transmit errors count', category: 'traffic', examples: ['0'] },
    'rx_drops': { description: 'Receive drops count', category: 'traffic', examples: ['0'] },
    'tx_drops': { description: 'Transmit drops count', category: 'traffic', examples: ['0'] },
    'collisions': { description: 'Collisions count', category: 'traffic', examples: ['0'] },
    'ha_status': { description: 'High Availability status', category: 'device', examples: ['Master'] },
    'ha_partner': { description: 'HA partner IP', category: 'device', examples: ['10.0.0.2'] },
    'sync_status': { description: 'HA sync status', category: 'device', examples: ['Synced'] },
    'license_status': { description: 'License validation status', category: 'device', examples: ['Valid'] },
    'expire_date': { description: 'License expiration date', category: 'device', examples: ['2025-01-01'] },
    'serial_number': { description: 'Device serial number', category: 'device', examples: ['123456'] },
    'model': { description: 'Device model name', category: 'device', examples: ['F180'] },
    'firmware': { description: 'Firmware version string', category: 'device', examples: ['8.0.1'] },
    'uplink': { description: 'Uplink interface name', category: 'device', examples: ['p1'] },
    'gateway': { description: 'Default gateway IP', category: 'device', examples: ['1.1.1.1'] },
    'dns_server': { description: 'DNS server IP', category: 'device', examples: ['8.8.8.8'] },
    'ntp_server': { description: 'NTP server IP', category: 'device', examples: ['pool.ntp.org'] },
    'log_level': { description: 'Logging level', category: 'device', examples: ['Info'] },
    'msg_bsd': { description: 'BSD syslog message', category: 'device', examples: ['text'] },
    'priority': { description: 'Priority value', category: 'device', examples: ['1'] },
    'facility': { description: 'Facility value', category: 'device', examples: ['16'] },
};

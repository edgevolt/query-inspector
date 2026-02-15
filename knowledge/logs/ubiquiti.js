/**
 * Ubiquiti UniFi/EdgeRouter Log Field Knowledge Base
 * Comprehensive definitions for Ubiquiti firewall logs (based on iptables/kernel logging)
 * Covers USG, UDM, and EdgeRouter devices
 * Categories: timestamp, device, source, destination, protocol, traffic, action, security
 */

export default {
    // ===== Syslog Metadata =====
    SyslogPriority: {
        description: 'Syslog PRI value encoding facility and severity',
        category: 'device',
        examples: ['4', '12']
    },
    SyslogTimestamp: {
        description: 'Timestamp from the syslog header',
        category: 'timestamp',
        examples: ['Nov 5 06:27:01', '2024-02-14T10:00:00Z']
    },
    SyslogHost: {
        description: 'Hostname of the Ubiquiti device',
        category: 'device',
        examples: ['USG-Pro-4', 'UDM-Pro', 'EdgeRouter']
    },
    ProcessName: {
        description: 'Name of the process or kernel facility',
        category: 'device',
        examples: ['kernel', 'ubnt-util']
    },

    // ===== Rule Information =====
    RulePrefix: {
        description: 'Firewall rule identifier prefix',
        category: 'policy',
        examples: ['WAN_LOCAL-4000-D', 'NAT-5010-MASQ']
    },
    RuleName: {
        description: 'Name of the firewall rule',
        category: 'policy',
        examples: ['WAN_LOCAL-Default-D']
    },
    action: {
        description: 'Action taken (implied from rule suffix)',
        category: 'action',
        examples: ['drop', 'accept', 'reject']
    },

    // ===== Interface Info =====
    IN: {
        description: 'Input/ingress interface',
        category: 'device',
        examples: ['eth0', 'br0', 'vlan10']
    },
    srcIntf: {
        description: 'Normalized input interface',
        category: 'device',
        examples: ['eth0']
    },
    OUT: {
        description: 'Output/egress interface',
        category: 'device',
        examples: ['eth1', 'pppoe0']
    },
    dstIntf: {
        description: 'Normalized output interface',
        category: 'device',
        examples: ['eth1']
    },
    MAC: {
        description: 'MAC address header information (Dst:Src:Type)',
        category: 'device',
        examples: ['78:8a:20:43:58:67:00:01:5c:77:58:46:08:00']
    },
    srcMac: {
        description: 'Normalized source MAC address',
        category: 'source',
        examples: ['00:01:5c:77:58:46']
    },
    dstMac: {
        description: 'Normalized destination MAC address',
        category: 'destination',
        examples: ['78:8a:20:43:58:67']
    },

    // ===== IP Layer =====
    SRC: {
        description: 'Source IP address',
        category: 'source',
        examples: ['192.168.1.100', '80.82.65.231']
    },
    srcIp: {
        description: 'Normalized source IP address',
        category: 'source',
        examples: ['192.168.1.100']
    },
    DST: {
        description: 'Destination IP address',
        category: 'destination',
        examples: ['8.8.8.8', '173.172.1.1']
    },
    dstIp: {
        description: 'Normalized destination IP address',
        category: 'destination',
        examples: ['8.8.8.8']
    },
    LEN: {
        description: 'Total packet length',
        category: 'traffic',
        examples: ['40', '60', '1500']
    },
    TOS: {
        description: 'Type of Service (DSCP)',
        category: 'traffic',
        examples: ['0x00', '0x10']
    },
    PREC: {
        description: 'IP Precedence',
        category: 'traffic',
        examples: ['0x00', '0x20']
    },
    TTL: {
        description: 'Time To Live',
        category: 'traffic',
        examples: ['64', '128', '255']
    },
    ID: {
        description: 'IP Identification field',
        category: 'traffic',
        examples: ['60913', '0']
    },
    proto: {
        description: 'Normalized protocol name',
        category: 'protocol',
        examples: ['TCP', 'UDP']
    },
    PROTO: {
        description: 'Protocol (TCP, UDP, ICMP)',
        category: 'protocol',
        examples: ['TCP', 'UDP', 'ICMP', '2']
    },

    // ===== Transport Layer (TCP/UDP/ICMP) =====
    SPT: {
        description: 'Source port number',
        category: 'source',
        examples: ['42186', '443']
    },
    srcPort: {
        description: 'Normalized source port number',
        category: 'source',
        examples: ['42186']
    },
    DPT: {
        description: 'Destination port number',
        category: 'destination',
        examples: ['80', '443', '53']
    },
    dstPort: {
        description: 'Normalized destination port number',
        category: 'destination',
        examples: ['80']
    },
    WINDOW: {
        description: 'TCP window size',
        category: 'protocol',
        examples: ['1024', '65535']
    },
    RES: {
        description: 'Reserved bits',
        category: 'protocol',
        examples: ['0x00']
    },
    URGP: {
        description: 'TCP Urgent Pointer',
        category: 'protocol',
        examples: ['0']
    },
    Check: {
        description: 'Checksum value',
        category: 'protocol',
        examples: ['12345']
    },
    Type: {
        description: 'ICMP Type',
        category: 'protocol',
        examples: ['8', '3']
    },
    Code: {
        description: 'ICMP Code',
        category: 'protocol',
        examples: ['0', '1']
    },

    // ===== Flags =====
    SYN: {
        description: 'TCP SYN flag set',
        category: 'protocol',
        examples: ['true']
    },
    ACK: {
        description: 'TCP ACK flag set',
        category: 'protocol',
        examples: ['true']
    },
    FIN: {
        description: 'TCP FIN flag set',
        category: 'protocol',
        examples: ['true']
    },
    RST: {
        description: 'TCP RST flag set',
        category: 'protocol',
        examples: ['true']
    },
    PSH: {
        description: 'TCP PSH flag set',
        category: 'protocol',
        examples: ['true']
    },
    DF: {
        description: 'Don\'t Fragment flag set',
        category: 'protocol',
        examples: ['true']
    },

    // ===== Explicit 40+ Additional Fields =====
    'PHYSIN': { description: 'Physical input interface', category: 'device', examples: ['eth0'] },
    'PHYSOUT': { description: 'Physical output interface', category: 'device', examples: ['eth1'] },
    'MARK': { description: 'Netfilter mark value', category: 'policy', examples: ['0x64800000'] },
    'CWR': { description: 'TCP Congestion Window Reduced flag', category: 'protocol', examples: ['true'] },
    'ECE': { description: 'TCP ECN-Echo flag', category: 'protocol', examples: ['true'] },
    'SEQ': { description: 'TCP Sequence number', category: 'protocol', examples: ['123456789'] },
    'CT': { description: 'Connection Tracking state', category: 'session', examples: ['NEW', 'ESTABLISHED'] },
    'related_ip': { description: 'Related IP address', category: 'session', examples: ['1.2.3.4'] },
    'gre_key': { description: 'GRE Key', category: 'protocol', examples: ['100'] },
    'spi': { description: 'IPSec SPI', category: 'session', examples: ['0x12345678'] },
    'icmp_id': { description: 'ICMP ID', category: 'protocol', examples: ['123'] },
    'icmp_seq': { description: 'ICMP Sequence', category: 'protocol', examples: ['1'] },
    'flow_id': { description: 'Flow Identifier', category: 'session', examples: ['1001'] },
    'packet_type': { description: 'Packet type (unicast/multicast)', category: 'traffic', examples: ['unicast'] },
    'arp_op': { description: 'ARP Operation', category: 'protocol', examples: ['Request'] },
    'arp_src_mac': { description: 'ARP Source MAC', category: 'source', examples: ['00:11:22:33:44:55'] },
    'arp_dst_mac': { description: 'ARP Destination MAC', category: 'destination', examples: ['ff:ff:ff:ff:ff:ff'] },
    'vlan_id': { description: 'VLAN ID', category: 'device', examples: ['10'] },
    'vlan_proto': { description: 'VLAN Protocol', category: 'protocol', examples: ['802.1Q'] },
    'mpls_label': { description: 'MPLS Label', category: 'protocol', examples: ['100'] },
    'pppoe_sess': { description: 'PPPoE Session ID', category: 'session', examples: ['1234'] },
    'tunnel_id': { description: 'Tunnel ID', category: 'session', examples: ['5'] },
    'frag_offset': { description: 'Fragment Offset', category: 'protocol', examples: ['0'] },
    'ip_options': { description: 'IP Options present', category: 'protocol', examples: ['true'] },
    'tcp_options': { description: 'TCP Options present', category: 'protocol', examples: ['true'] },
    'log_level': { description: 'Logging level', category: 'device', examples: ['4 (Warning)'] },
    'sys_uptime': { description: 'System uptime', category: 'device', examples: ['12345.67'] },
    'cpu_id': { description: 'CPU core ID', category: 'device', examples: ['0'] },
    'mem_addr': { description: 'Memory Address', category: 'device', examples: ['0xffff...'] },
    'reg_dump': { description: 'Register Dump', category: 'device', examples: ['...'] },
    'stack_trace': { description: 'Kernel Stack Trace', category: 'device', examples: ['...'] },
    'oops_msg': { description: 'Kernel Oops message', category: 'device', examples: ['...'] },
    'country_src': { description: 'Source Country', category: 'source', examples: ['US'] },
    'country_dst': { description: 'Destination Country', category: 'destination', examples: ['CN'] },
    'threat_id': { description: 'Threat ID (IPS)', category: 'security', examples: ['123'] },
    'threat_cat': { description: 'Threat Category', category: 'security', examples: ['Malware'] },
    'app_proto': { description: 'Application Protocol', category: 'application', examples: ['http'] },
    'dpi_app': { description: 'DPI Detected Application', category: 'application', examples: ['Facebook'] },
    'dpi_cat': { description: 'DPI Category', category: 'application', examples: ['Social'] }
};

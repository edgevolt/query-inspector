/**
 * Ubiquiti UniFi/EdgeRouter Log Parser
 * Parses Ubiquiti UniFi (USG/UDM) and EdgeRouter logs
 * Supports standard syslog formats with kernel/iptables key-value pairs
 *
 * Typical format:
 * <PRI>Timestamp Hostname kernel: [Rule-Action] IN=eth0 OUT=eth1 MAC=... SRC=...
 */

/**
 * Parse a Ubiquiti log line
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed log object
 */
export function parseLog(logLine) {
    if (!logLine || typeof logLine !== 'string') {
        return {};
    }

    const fields = {};
    let remaining = logLine.trim();

    // 1. Parse Syslog Header
    // <PRI>Timestamp Hostname Process: [Rule] ...
    const syslogRegex = /^<(\d{1,3})>([\w:.-]+\s+\d+\s+\d+:\d+:\d+|\d{4}-\d{2}-\d{2}T[\d:.]+(?:[+-]\d{2}:\d{2}|Z)?)\s+(\S+)\s+([^:]+):\s*/;
    const headerMatch = remaining.match(syslogRegex);

    if (headerMatch) {
        fields.SyslogPriority = parseInt(headerMatch[1], 10);
        fields.SyslogFacility = Math.floor(fields.SyslogPriority / 8);
        fields.SyslogSeverityCode = fields.SyslogPriority % 8;
        fields.SyslogTimestamp = headerMatch[2];
        fields.SyslogHost = headerMatch[3];
        fields.ProcessName = headerMatch[4];
        remaining = remaining.substring(headerMatch[0].length);
    }

    // 2. Parse Kernel/Firewall Rule Prefix
    // [WAN_LOCAL-4000-D] or [NAT-5010-MASQ]
    const ruleMatch = remaining.match(/^\[([\w-]+)\]\s*/);
    if (ruleMatch) {
        fields.RulePrefix = ruleMatch[1];
        fields.RuleName = ruleMatch[1];
        remaining = remaining.substring(ruleMatch[0].length);

        // Try to deduce action from suffix (D=Drop, A=Accept, R=Reject)
        if (fields.RuleName.endsWith('-D')) fields.action = 'drop';
        else if (fields.RuleName.endsWith('-A')) fields.action = 'accept';
        else if (fields.RuleName.endsWith('-R')) fields.action = 'reject';
    }

    // 3. Parse Key=Value Pairs (Space separated, values may not be quoted)
    // IN=eth0 OUT= MAC=... SRC=1.2.3.4
    const kvRegex = /(\w+)=([^\s]*)/g;
    let match;
    while ((match = kvRegex.exec(remaining)) !== null) {
        const key = match[1];
        const value = match[2];
        fields[key] = value;
    }

    // 4. Parse specific flags that don't have values (e.g., DF, SYN, ACK)
    ['DF', 'SYN', 'ACK', 'FIN', 'RST', 'URGP', 'PSH'].forEach(flag => {
        if (new RegExp(`\\b${flag}\\b`).test(remaining)) {
            fields[flag] = true;
        }
    });

    // 5. Field Normalization & Type Conversion
    if (fields.SRC) fields.srcIp = fields.SRC;
    if (fields.DST) fields.dstIp = fields.DST;
    if (fields.SPT) fields.srcPort = parseInt(fields.SPT, 10);
    if (fields.DPT) fields.dstPort = parseInt(fields.DPT, 10);
    if (fields.PROTO) fields.protocol = fields.PROTO;
    if (fields.IN) fields.srcIntf = fields.IN;
    if (fields.OUT) fields.dstIntf = fields.OUT;
    if (fields.MAC) {
        fields.srcMac = fields.MAC.substring(6, 23); // Standard MAC string extraction
        fields.dstMac = fields.MAC.substring(0, 17); // might need adjustment based on format
        // Ubiquiti MAC field often contains dstMac:srcMac:type concatenated
        // e.g. 78:8a:20:43:58:67:00:01:5c:77:58:46:08:00
        const macParts = fields.MAC.split(':');
        if (macParts.length >= 12) {
            // Heuristic: first 6 bytes often dst, next 6 src
            // But raw string has colon sep? 
            // Logic: standard ethernet header is DST SRC TYPE.
        }
    }

    // Convert numeric fields
    ['LEN', 'Check', 'TOS', 'PREC', 'TTL', 'ID', 'WINDOW', 'RES', 'URGP', 'MARK'].forEach(field => {
        if (fields[field]) {
            // Handle hex (0x...) or decimal
            if (fields[field].startsWith('0x')) {
                fields[field] = parseInt(fields[field], 16);
            } else if (/^\d+$/.test(fields[field])) {
                fields[field] = parseInt(fields[field], 10);
            }
        }
    });

    fields._log_source = 'Ubiquiti';
    return fields;
}

/**
 * Parse multiple logs
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') return [];
    return logText.split('\n').filter(line => line.trim()).map(parseLog);
}

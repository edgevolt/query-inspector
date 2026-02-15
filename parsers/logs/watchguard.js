/**
 * WatchGuard Fireware OS Log Parser
 * Parses WatchGuard Firebox logs (Fireware OS)
 * Supports standard syslog formats with key-value pairs
 *
 * Typical format:
 * <PRI>Timestamp Hostname Process[PID]: msg_id="ID" type="TYPE" key="value" ...
 * or
 * <PRI>Timestamp Hostname Process[PID]: Allow src_ip dst_ip ... (Legacy/Traffic)
 */

/**
 * Parse a WatchGuard log line
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
    // <PRI>Timestamp Hostname Process[PID]: ...
    const syslogRegex = /^<(\d{1,3})>([\w:.-]+\s+\d+\s+\d+:\d+:\d+|\d{4}-\d{2}-\d{2}T[\d:.]+(?:[+-]\d{2}:\d{2}|Z)?)\s+(\S+)\s+([^:\[]+)(?:\[(\d+)\])?:\s*/;
    const headerMatch = remaining.match(syslogRegex);

    if (headerMatch) {
        fields.SyslogPriority = parseInt(headerMatch[1], 10);
        fields.SyslogFacility = Math.floor(fields.SyslogPriority / 8);
        fields.SyslogSeverityCode = fields.SyslogPriority % 8;
        fields.SyslogTimestamp = headerMatch[2];
        fields.SyslogHost = headerMatch[3];
        fields.ProcessName = headerMatch[4];
        if (headerMatch[5]) {
            fields.ProcessID = headerMatch[5];
        }
        remaining = remaining.substring(headerMatch[0].length);
    }

    // 2. Parse Key-Value Pairs
    // Handles: key="value" and key=value
    const kvRegex = /(\w[\w.-]*)=(?:"([^"]*)"|((?:[^\s]|(?<=\\)\s)*))/g;
    let match;
    while ((match = kvRegex.exec(remaining)) !== null) {
        const key = match[1];
        const value = match[2] !== undefined ? match[2] : match[3];
        fields[key] = value;
    }

    // 3. Fallback/Legacy Traffic Log Parsing (if no KVs found or specific format)
    // If the message starts with "Allow" or "Deny" and looks like a traffic log
    if (Object.keys(fields).length <= 3 && /^(Allow|Deny|Block|Drop)/.test(remaining)) {
        const parts = remaining.split(/\s+/);
        if (parts.length >= 8) {
            fields.action = parts[0];
            fields.src_ip = parts[1];
            fields.dst_ip = parts[2];
            fields.protocol = parts[3];
            fields.src_port = parts[4];
            fields.dst_port = parts[5];
            fields.src_intf = parts[6];
            fields.dst_intf = parts[7];
        }
    }

    // 4. Field Normalization & Type Conversion
    if (fields.src_ip) fields.srcIp = fields.src_ip;
    if (fields.dst_ip) fields.dstIp = fields.dst_ip;
    if (fields.src) fields.srcIp = fields.src; // Handle alternative names
    if (fields.dst) fields.dstIp = fields.dst;

    // Normalize ports
    if (fields.src_port) fields.srcPort = parseInt(fields.src_port, 10);
    if (fields.dst_port) fields.dstPort = parseInt(fields.dst_port, 10);

    // Convert numeric fields
    ['sent_bytes', 'rcvd_bytes', 'duration', 'id', 'weight', 'score'].forEach(field => {
        if (fields[field] && /^\d+$/.test(fields[field])) {
            fields[field] = parseInt(fields[field], 10);
        }
    });

    fields._log_source = 'WatchGuard';
    return fields;
}

/**
 * Parse multiple logs
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') return [];
    return logText.split('\n').filter(line => line.trim()).map(parseLog);
}

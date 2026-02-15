/**
 * Barracuda CloudGen Firewall Log Parser (Fewer/8.x/9.x)
 * Parses Barracuda networks firewall logs (formerly NG Firewall)
 * Supports standard syslog formats with key-value or pipe-separated payloads
 *
 * Typical format:
 * <PRI>Timestamp Hostname Process[PID]: type=FWD|AUD|... key=value key="value" ...
 * or
 * <PRI>Timestamp Hostname Process[PID]: key: value | key: value ...
 */

/**
 * Parse a Barracuda log line
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

    // 2. Parse Payload
    // Format A: key=value key="value with spaces"
    if (remaining.includes('=')) {
        const kvRegex = /(\w[\w.-]*)=(?:"([^"]*)"|((?:[^\s]|(?<=\\)\s)*))/g;
        let match;
        while ((match = kvRegex.exec(remaining)) !== null) {
            const key = match[1];
            const value = match[2] !== undefined ? match[2] : match[3];
            fields[key] = value;
        }
    }
    // Format B: key: value | key: value (less common in modern structured logs, but supported)
    else if (remaining.includes('|') && remaining.includes(':')) {
        const parts = remaining.split('|');
        parts.forEach(part => {
            const [key, ...valParts] = part.split(':');
            if (key && valParts.length > 0) {
                fields[key.trim()] = valParts.join(':').trim();
            }
        });
    }

    // 3. Field Normalization & Type Conversion
    if (fields.src) fields.srcIp = fields.src;
    if (fields.srcIP) fields.srcIp = fields.srcIP;
    if (fields.dst) fields.dstIp = fields.dst;
    if (fields.dstIP) fields.dstIp = fields.dstIP;
    if (fields.proto) fields.protocol = fields.proto;
    if (fields.srcMAC) fields.srcMac = fields.srcMAC;
    if (fields.dstMAC) fields.dstMac = fields.dstMAC;

    // Convert numeric fields
    ['srcPort', 'dstPort', 'count', 'receivedBytes', 'sentBytes', 'receivedPackets', 'sentPackets', 'duration'].forEach(field => {
        if (fields[field] && /^\d+$/.test(fields[field])) {
            fields[field] = parseInt(fields[field], 10);
        }
    });

    fields._log_source = 'Barracuda';
    return fields;
}

/**
 * Parse multiple logs
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') return [];
    return logText.split('\n').filter(line => line.trim()).map(parseLog);
}

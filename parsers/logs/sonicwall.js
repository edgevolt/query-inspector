/**
 * SonicWall Firewall Log Parser (SonicOS 6.5/7.x)
 * Parses SonicWall Enhanced Syslog format messages
 * Format: id=firewall sn=SERIAL time="TIMESTAMP" fw=IP pri=N c=N m=N msg="MESSAGE" key=value ...
 *
 * Key characteristics:
 * - Space-separated key=value pairs
 * - Quoted values for strings with spaces (msg="text", time="timestamp")
 * - Combined src/dst fields: src=IP:port:zone dst=IP:port:zone
 * - Numeric fields: pri, c (category), m (message ID), n (count)
 * - Security service fields: dpi, fw_action, Category, catid, app, appName
 */

/**
 * Parse SonicWall key=value pairs handling quoted values
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed key-value pairs
 */
function parseKeyValuePairs(logLine) {
    const fields = {};
    if (!logLine) return fields;

    let remaining = logLine.trim();

    // Strip optional syslog priority <NNN>
    const priMatch = remaining.match(/^<(\d{1,3})>\s*/);
    if (priMatch) {
        fields.SyslogPriority = parseInt(priMatch[1], 10);
        fields.SyslogFacility = Math.floor(fields.SyslogPriority / 8);
        fields.SyslogSeverityCode = fields.SyslogPriority % 8;
        remaining = remaining.substring(priMatch[0].length);
    }

    // Strip optional syslog header before "id=firewall"
    // Format: <PRI>timestamp hostname : id=firewall ...
    // or: <PRI>timestamp hostname id=firewall ...
    const idIndex = remaining.indexOf('id=');
    if (idIndex > 0) {
        // Extract syslog host from header if present
        const header = remaining.substring(0, idIndex).trim();
        // Try to extract timestamp and hostname from header
        const headerMatch = header.match(/^(?:(\S+\s+\d+\s+\d+:\d+:\d+|\d{4}-\d{2}-\d{2}T[\d:.]+(?:[+-]\d{2}:\d{2}|Z)?)\s+)?(\S+)\s*:?\s*$/);
        if (headerMatch) {
            if (headerMatch[1]) fields.SyslogTimestamp = headerMatch[1];
            if (headerMatch[2]) fields.SyslogHost = headerMatch[2];
        }
        remaining = remaining.substring(idIndex);
    }

    // Parse space-separated key=value pairs
    // Handles: key=value, key="value with spaces", key="value"
    const regex = /(\w[\w.-]*)=(?:"([^"]*)"|((?:[^\s]|(?<=\\)\s)*))/g;
    let match;

    while ((match = regex.exec(remaining)) !== null) {
        const key = match[1];
        const value = match[2] !== undefined ? match[2] : match[3];
        fields[key] = value;
    }

    return fields;
}

/**
 * Expand combined src/dst fields (IP:port:zone format)
 * SonicWall packs: src=10.0.0.1:443:X1 -> srcIp, srcPort, srcZone
 * @param {object} fields - Parsed fields
 * @returns {object} Fields with expanded src/dst
 */
function expandAddressFields(fields) {
    const expanded = { ...fields };

    // Expand src=IP:port:zone
    if (fields.src && fields.src.includes(':')) {
        const parts = fields.src.split(':');
        if (parts.length >= 1) expanded.srcIp = parts[0];
        if (parts.length >= 2) expanded.srcPort = parts[1];
        if (parts.length >= 3) expanded.srcZone = parts[2];
    }

    // Expand dst=IP:port:zone
    if (fields.dst && fields.dst.includes(':')) {
        const parts = fields.dst.split(':');
        if (parts.length >= 1) expanded.dstIp = parts[0];
        if (parts.length >= 2) expanded.dstPort = parts[1];
        if (parts.length >= 3) expanded.dstZone = parts[2];
    }

    return expanded;
}

/**
 * Convert field values to appropriate types
 * @param {object} fields - Parsed fields
 * @returns {object} Fields with converted types
 */
function convertFieldTypes(fields) {
    const converted = {};

    // Fields that should remain as strings even if purely numeric
    const stringFields = new Set([
        'sn', 'fw', 'srcIp', 'dstIp', 'src', 'dst', 'srcPort', 'dstPort',
        'srcMac', 'dstMac', 'natSrc', 'natDst', 'natSrcPort', 'natDstPort',
        'sess', 'id', 'uuid', 'time', 'SyslogTimestamp', 'SyslogHost',
        'vpnpolicy', 'dstname', 'srcname', 'ipscat', 'ipssigname'
    ]);

    for (const [key, value] of Object.entries(fields)) {
        if (value === undefined || value === null) continue;

        const strValue = String(value);

        if (stringFields.has(key)) {
            converted[key] = strValue;
        } else if (/^\d+$/.test(strValue) && strValue.length < 16) {
            converted[key] = parseInt(strValue, 10);
        } else {
            converted[key] = strValue;
        }
    }

    return converted;
}

/**
 * Parse a single SonicWall log line
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed log object with key-value pairs
 */
export function parseLog(logLine) {
    if (!logLine || typeof logLine !== 'string') {
        return {};
    }

    // Parse the key-value pairs
    const kvFields = parseKeyValuePairs(logLine);

    // Expand combined address fields
    const expanded = expandAddressFields(kvFields);

    // Convert field types
    const converted = convertFieldTypes(expanded);

    // Add log source indicator
    converted._log_source = 'SonicWall';

    return converted;
}

/**
 * Parse multiple SonicWall log lines
 * @param {string} logText - Multiple log lines separated by newlines
 * @returns {Array} Array of parsed log objects
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') {
        return [];
    }

    const lines = logText.split('\n').filter(line => line.trim());
    return lines.map(line => parseLog(line));
}

/**
 * Extract specific field from parsed log
 * @param {object} parsedLog - Parsed log object
 * @param {string} fieldName - Field name to extract
 * @returns {any} Field value or null if not found
 */
export function getField(parsedLog, fieldName) {
    return parsedLog[fieldName] || null;
}

/**
 * Check if log matches specific criteria
 * @param {object} parsedLog - Parsed log object
 * @param {object} criteria - Criteria object with field-value pairs
 * @returns {boolean} True if log matches all criteria
 */
export function matchesCriteria(parsedLog, criteria) {
    if (!criteria || typeof criteria !== 'object') {
        return true;
    }

    return Object.entries(criteria).every(([key, value]) => {
        return parsedLog[key] === value;
    });
}

/**
 * Filter logs by criteria
 * @param {Array} parsedLogs - Array of parsed log objects
 * @param {object} criteria - Criteria object with field-value pairs
 * @returns {Array} Filtered array of logs
 */
export function filterLogs(parsedLogs, criteria) {
    if (!Array.isArray(parsedLogs)) {
        return [];
    }

    return parsedLogs.filter(log => matchesCriteria(log, criteria));
}

/**
 * Get unique values for a specific field across multiple logs
 * @param {Array} parsedLogs - Array of parsed log objects
 * @param {string} fieldName - Field name to extract
 * @returns {Array} Array of unique values
 */
export function getUniqueValues(parsedLogs, fieldName) {
    if (!Array.isArray(parsedLogs)) {
        return [];
    }

    const values = parsedLogs
        .map(log => log[fieldName])
        .filter(value => value !== undefined && value !== null);

    return [...new Set(values)];
}

/**
 * Count occurrences of field values
 * @param {Array} parsedLogs - Array of parsed log objects
 * @param {string} fieldName - Field name to count
 * @returns {object} Object with value counts
 */
export function countFieldValues(parsedLogs, fieldName) {
    if (!Array.isArray(parsedLogs)) {
        return {};
    }

    const counts = {};

    parsedLogs.forEach(log => {
        const value = log[fieldName];
        if (value !== undefined && value !== null) {
            counts[value] = (counts[value] || 0) + 1;
        }
    });

    return counts;
}

/**
 * Get summary statistics for parsed logs
 * @param {Array} parsedLogs - Array of parsed log objects
 * @returns {object} Summary statistics
 */
export function getSummaryStats(parsedLogs) {
    if (!Array.isArray(parsedLogs) || parsedLogs.length === 0) {
        return {
            totalLogs: 0,
            uniqueSourceIPs: 0,
            uniqueDestIPs: 0,
            actions: {},
            messageIds: {},
            categories: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueSourceIPs: getUniqueValues(parsedLogs, 'srcIp').length,
        uniqueDestIPs: getUniqueValues(parsedLogs, 'dstIp').length,
        actions: countFieldValues(parsedLogs, 'fw_action'),
        messageIds: countFieldValues(parsedLogs, 'm'),
        categories: countFieldValues(parsedLogs, 'Category')
    };
}

/**
 * Cisco Firepower Threat Defense (FTD) Log Parser
 * Parses Cisco Firepower syslog messages (FTD 6.x/7.x)
 * Supports connection events (430002/430003), intrusion events (430001),
 * file/malware events (430004/430005), and Security Intelligence events
 *
 * Format: <PRI>Timestamp Hostname SFIMS: %FTD-severity-messageID: Key: Value, Key: Value, ...
 */

/**
 * Parse syslog header and extract metadata
 * Handles optional PRI, timestamp, hostname, and %FTD/%NGIPS prefix
 * @param {string} logLine - Raw log line
 * @returns {object} { metadata, kvString }
 */
function parseSyslogHeader(logLine) {
    const metadata = {};
    let remaining = logLine.trim();

    // Extract optional syslog priority <NNN>
    const priMatch = remaining.match(/^<(\d{1,3})>/);
    if (priMatch) {
        const pri = parseInt(priMatch[1], 10);
        metadata.SyslogPriority = pri;
        metadata.SyslogFacility = Math.floor(pri / 8);
        metadata.SyslogSeverityCode = pri % 8;
        remaining = remaining.substring(priMatch[0].length).trim();
    }

    // Extract timestamp — RFC 5424 (2024-01-29T14:30:15Z) or legacy (Jan 29 14:30:15)
    const rfc5424Match = remaining.match(/^(\d{4}-\d{2}-\d{2}T[\d:.]+Z?)\s+/);
    const legacyMatch = remaining.match(/^([A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2})\s+/);
    if (rfc5424Match) {
        metadata.Timestamp = rfc5424Match[1];
        remaining = remaining.substring(rfc5424Match[0].length).trim();
    } else if (legacyMatch) {
        metadata.Timestamp = legacyMatch[1];
        remaining = remaining.substring(legacyMatch[0].length).trim();
    }

    // Extract hostname (next non-space token before SFIMS or %FTD)
    const hostMatch = remaining.match(/^([\w.\-]+)\s+/);
    if (hostMatch && !hostMatch[1].startsWith('%')) {
        metadata.SyslogHost = hostMatch[1];
        remaining = remaining.substring(hostMatch[0].length).trim();
    }

    // Skip optional "SFIMS:" or "SFIMS :" prefix
    const sfimsMatch = remaining.match(/^SFIMS\s*:\s*/);
    if (sfimsMatch) {
        remaining = remaining.substring(sfimsMatch[0].length).trim();
    }

    // Extract %FTD-severity-messageID or %NGIPS-severity-messageID
    const ftdMatch = remaining.match(/^%(FTD|NGIPS)-(\d)-(\d{6}):\s*/);
    if (ftdMatch) {
        metadata.LogSource = ftdMatch[1];
        metadata.SyslogSeverity = parseInt(ftdMatch[2], 10);
        metadata.MessageID = parseInt(ftdMatch[3], 10);
        remaining = remaining.substring(ftdMatch[0].length).trim();
    }

    return { metadata, kvString: remaining };
}

/**
 * Parse comma-separated key-value pairs from Firepower log body
 * Handles: Key: Value, Key: Value, Key: "Quoted Value", Key: Value with spaces until next key
 * @param {string} kvString - Key-value string
 * @returns {object} Parsed key-value pairs
 */
function parseKeyValuePairs(kvString) {
    const fields = {};
    if (!kvString) return fields;

    // Firepower uses "Key: Value, Key: Value" format
    // Some values contain commas (e.g., Message field), so we match Key: greedily
    // Strategy: find all "Key:" positions, then extract values between them

    // Find all key positions: word characters (and spaces in multi-word keys) followed by ":"
    const keyPattern = /(?:^|,\s*)([A-Za-z][A-Za-z0-9_ ]*?):\s*/g;
    const keyPositions = [];
    let match;

    while ((match = keyPattern.exec(kvString)) !== null) {
        keyPositions.push({
            key: match[1].trim(),
            valueStart: match.index + match[0].length
        });
    }

    // Extract values between consecutive key positions
    for (let i = 0; i < keyPositions.length; i++) {
        const key = keyPositions[i].key;
        const valueStart = keyPositions[i].valueStart;
        const valueEnd = i + 1 < keyPositions.length
            ? kvString.lastIndexOf(',', keyPositions[i + 1].valueStart)
            : kvString.length;

        let value = kvString.substring(valueStart, valueEnd >= valueStart ? valueEnd : kvString.length).trim();

        // Strip surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
        }

        // Strip trailing period (Firepower often ends messages with a period)
        if (value.endsWith('.') && !value.match(/\d+\.\d+$/)) {
            value = value.substring(0, value.length - 1).trim();
        }

        fields[key] = value;
    }

    return fields;
}

/**
 * Convert numeric string values to appropriate types
 * @param {object} fields - Parsed fields object
 * @returns {object} Fields with converted values
 */
function convertFieldTypes(fields) {
    const converted = {};
    // Fields that should remain as strings even if numeric
    const stringFields = new Set([
        'SrcIP', 'DstIP', 'NATInitiatorIP', 'NATResponderIP',
        'SrcPort', 'DstPort', 'NATInitiatorPort', 'NATResponderPort',
        'DeviceUUID', 'ConnectionID', 'MessageID', 'SSLSessionID',
        'SSLTicketID', 'FileSHA256', 'VLANID'
    ]);

    for (const [key, value] of Object.entries(fields)) {
        if (!value && value !== 0 && value !== '0') continue;

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
 * Parse a single Cisco Firepower log line
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed log object with key-value pairs
 */
export function parseLog(logLine) {
    if (!logLine || typeof logLine !== 'string') {
        return {};
    }

    // Parse the syslog header
    const { metadata, kvString } = parseSyslogHeader(logLine);

    // Parse the key-value body
    const kvFields = parseKeyValuePairs(kvString);

    // Merge and convert types
    const merged = { ...metadata, ...kvFields };
    const converted = convertFieldTypes(merged);

    // Add log source indicator
    converted._log_source = 'Cisco Firepower';

    return converted;
}

/**
 * Parse multiple Cisco Firepower log lines
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
            messageTypes: {},
            protocols: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueSourceIPs: getUniqueValues(parsedLogs, 'SrcIP').length,
        uniqueDestIPs: getUniqueValues(parsedLogs, 'DstIP').length,
        actions: countFieldValues(parsedLogs, 'AccessControlRuleAction'),
        messageTypes: countFieldValues(parsedLogs, 'MessageID'),
        protocols: countFieldValues(parsedLogs, 'Protocol')
    };
}

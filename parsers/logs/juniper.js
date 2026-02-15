/**
 * Juniper Networks SRX Firewall Log Parser (Junos OS)
 * Parses Juniper SRX syslog messages in structured-data (RFC 5424) and legacy formats
 * Supports RT_FLOW (session create/close/deny), RT_UTM (web filter, antivirus),
 * RT_IDP (intrusion detection), and RT_AAMW (anti-malware) events
 *
 * Structured format:
 *   <PRI>1 Timestamp Hostname RT_FLOW - RT_FLOW_SESSION_CLOSE [junos@... key="value" ...]
 *
 * Legacy/UTM format:
 *   Hostname RT_UTM: WEBFILTER_URL_BLOCKED: WebFilter: ACTION="URL Blocked" ip(port)->ip(port) KEY=value ...
 */

/**
 * Parse syslog header and determine log subformat
 * @param {string} logLine - Raw log line
 * @returns {object} { metadata, bodyString, format }
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

    // Skip optional RFC 5424 version "1 "
    if (/^\d\s/.test(remaining)) {
        remaining = remaining.substring(2).trim();
    }

    // Extract timestamp — RFC 5424 (2024-01-29T14:30:15.000Z) or legacy (Jan 29 14:30:15)
    const rfc5424Match = remaining.match(/^(\d{4}-\d{2}-\d{2}T[\d:.]+(?:[+-]\d{2}:\d{2}|Z)?)\s+/);
    const legacyMatch = remaining.match(/^([A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2})\s+/);
    if (rfc5424Match) {
        metadata.Timestamp = rfc5424Match[1];
        remaining = remaining.substring(rfc5424Match[0].length).trim();
    } else if (legacyMatch) {
        metadata.Timestamp = legacyMatch[1];
        remaining = remaining.substring(legacyMatch[0].length).trim();
    }

    // Extract hostname (next non-space token)
    const hostMatch = remaining.match(/^([\w.\-]+)\s+/);
    if (hostMatch) {
        metadata.SyslogHost = hostMatch[1];
        remaining = remaining.substring(hostMatch[0].length).trim();
    }

    // Detect log type from the remaining text
    // RT_FLOW structured format: "RT_FLOW - RT_FLOW_SESSION_CLOSE [junos@..."
    // RT_UTM format: "RT_UTM: WEBFILTER_URL_BLOCKED: ..."
    // RT_IDP format: "RT_IDP: IDP_ATTACK_LOG_EVENT: ..."
    const structuredMatch = remaining.match(/^(RT_FLOW|RT_UTM|RT_IDP|RT_AAMW|RT_SCREEN)\s+-\s+(\S+)\s+/);
    const legacyTypeMatch = remaining.match(/^(RT_FLOW|RT_UTM|RT_IDP|RT_AAMW|RT_SCREEN)\s*:\s*(\S+)\s*:\s*/);

    if (structuredMatch) {
        metadata.LogCategory = structuredMatch[1];
        metadata.EventType = structuredMatch[2];
        remaining = remaining.substring(structuredMatch[0].length).trim();
        return { metadata, bodyString: remaining, format: 'structured' };
    } else if (legacyTypeMatch) {
        metadata.LogCategory = legacyTypeMatch[1];
        metadata.EventType = legacyTypeMatch[2];
        remaining = remaining.substring(legacyTypeMatch[0].length).trim();
        return { metadata, bodyString: remaining, format: 'legacy' };
    }

    // Fallback: try to detect structured data brackets
    if (remaining.includes('[junos@')) {
        return { metadata, bodyString: remaining, format: 'structured' };
    }

    return { metadata, bodyString: remaining, format: 'unknown' };
}

/**
 * Parse RFC 5424 structured data section [junos@OID key="value" key="value"]
 * @param {string} sdString - String containing structured data
 * @returns {object} Parsed key-value pairs
 */
function parseStructuredData(sdString) {
    const fields = {};

    // Match the structured data block [junos@... key="value" ...]
    const sdBlockMatch = sdString.match(/\[junos@[\d.]+\s+(.*?)\]/s);
    if (!sdBlockMatch) {
        // Try generic structured data block [identifier key="value" ...]
        const genericMatch = sdString.match(/\[(\S+)\s+(.*?)\]/s);
        if (!genericMatch) return fields;
        // Extract key="value" pairs
        return extractKeyValuePairs(genericMatch[2]);
    }

    return extractKeyValuePairs(sdBlockMatch[1]);
}

/**
 * Extract key="value" pairs from a space-separated string
 * @param {string} kvString - String of key="value" pairs
 * @returns {object} Parsed fields
 */
function extractKeyValuePairs(kvString) {
    const fields = {};
    // Match key="value" or key=unquoted_value patterns
    const regex = /([\w-]+)=(?:"([^"]*)"|(\S*))/g;
    let match;

    while ((match = regex.exec(kvString)) !== null) {
        const key = match[1];
        const value = match[2] !== undefined ? match[2] : match[3];
        fields[key] = value;
    }

    return fields;
}

/**
 * Parse legacy/UTM format log body
 * Handles: WebFilter: ACTION="URL Blocked" IP(port)->IP(port) KEY=value ...
 * Also handles IDP: at TIMESTAMP, ANOMALY Attack log <src/port->dst/port> ...
 * @param {string} bodyString - Log body text
 * @returns {object} Parsed fields
 */
function parseLegacyBody(bodyString) {
    const fields = {};

    // Extract sub-category description (e.g., "WebFilter:", "IDP:", "AntiVirus:")
    const subCatMatch = bodyString.match(/^(\w+):\s*/);
    if (subCatMatch) {
        fields.SubCategory = subCatMatch[1];
        bodyString = bodyString.substring(subCatMatch[0].length).trim();
    }

    // Extract flow notation: IP(port)->IP(port)
    const flowMatch = bodyString.match(/([\d.]+)\((\d+)\)\s*->\s*([\d.]+)\((\d+)\)/);
    if (flowMatch) {
        fields['source-address'] = flowMatch[1];
        fields['source-port'] = flowMatch[2];
        fields['destination-address'] = flowMatch[3];
        fields['destination-port'] = flowMatch[4];
    }

    // Extract IDP attack log notation: <IP/port->IP/port>
    const idpFlowMatch = bodyString.match(/<([\d.]+)\/(\d+)\s*->\s*([\d.]+)\/(\d+)>/);
    if (idpFlowMatch) {
        fields['source-address'] = idpFlowMatch[1];
        fields['source-port'] = idpFlowMatch[2];
        fields['destination-address'] = idpFlowMatch[3];
        fields['destination-port'] = idpFlowMatch[4];
    }

    // Extract KEY=value or KEY="value" pairs
    const kvPairs = extractKeyValuePairs(bodyString);
    Object.assign(fields, kvPairs);

    // Also extract non-quoted KEY=value patterns like action=NONE, threat-severity=INFO
    // These may use comma separation in IDP logs
    const bareKvRegex = /\b([\w-]+)=([\w./:-]+)(?=[,\s]|$)/g;
    let match;
    while ((match = bareKvRegex.exec(bodyString)) !== null) {
        const key = match[1];
        if (!fields[key]) {
            fields[key] = match[2];
        }
    }

    return fields;
}

/**
 * Normalize field names to consistent format
 * Converts common Juniper hyphenated names as-is (they match knowledge base)
 * @param {object} fields - Raw parsed fields
 * @returns {object} Normalized fields
 */
function normalizeFields(fields) {
    const normalized = {};

    for (const [key, value] of Object.entries(fields)) {
        if (!value && value !== 0 && value !== '0') continue;

        const strValue = String(value);

        // Convert purely numeric values (but keep IPs and ports as strings)
        if (/^\d+$/.test(strValue) && strValue.length < 16 &&
            !key.includes('address') && !key.includes('port') &&
            !key.includes('ip') && key !== 'protocol-id') {
            normalized[key] = parseInt(strValue, 10);
        } else {
            normalized[key] = strValue;
        }
    }

    return normalized;
}

/**
 * Parse a single Juniper SRX log line
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed log object with key-value pairs
 */
export function parseLog(logLine) {
    if (!logLine || typeof logLine !== 'string') {
        return {};
    }

    const { metadata, bodyString, format } = parseSyslogHeader(logLine);
    let bodyFields = {};

    if (format === 'structured') {
        bodyFields = parseStructuredData(bodyString);
    } else if (format === 'legacy') {
        bodyFields = parseLegacyBody(bodyString);
    } else {
        // Try structured first, fall back to legacy
        bodyFields = parseStructuredData(bodyString);
        if (Object.keys(bodyFields).length === 0) {
            bodyFields = parseLegacyBody(bodyString);
        }
    }

    // Merge and normalize
    const merged = { ...metadata, ...bodyFields };
    const normalized = normalizeFields(merged);

    // Add log source indicator
    normalized._log_source = 'Juniper SRX';

    return normalized;
}

/**
 * Parse multiple Juniper SRX log lines
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
            eventTypes: {},
            policies: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueSourceIPs: getUniqueValues(parsedLogs, 'source-address').length,
        uniqueDestIPs: getUniqueValues(parsedLogs, 'destination-address').length,
        actions: countFieldValues(parsedLogs, 'ACTION'),
        eventTypes: countFieldValues(parsedLogs, 'EventType'),
        policies: countFieldValues(parsedLogs, 'policy-name')
    };
}

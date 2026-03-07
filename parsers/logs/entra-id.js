/**
 * Microsoft Entra ID Log Parser
 * Parses Microsoft Entra ID (formerly Azure AD) logs in JSON format
 * Supports Sign-In, Audit, Provisioning, and Identity Protection / Risk Detection logs
 */

/**
 * Flatten a nested JSON object into a single-level object using dot-notation keys.
 * Arrays of objects are serialized as summarized strings; primitive arrays are joined.
 * @param {object} obj - Nested object to flatten
 * @param {string} prefix - Current key prefix
 * @param {object} result - Accumulator
 * @returns {object} Flattened key-value object
 */
function flattenObject(obj, prefix = '', result = {}) {
    if (obj === null || obj === undefined) {
        return result;
    }

    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (value === null || value === undefined) {
            // Skip null/undefined values
            continue;
        } else if (Array.isArray(value)) {
            // Handle arrays
            if (value.length === 0) {
                result[fullKey] = '[]';
            } else if (typeof value[0] === 'object' && value[0] !== null) {
                // Array of objects — serialize to a readable summary
                result[fullKey] = summarizeObjectArray(value, key);
            } else {
                // Array of primitives — join with comma
                result[fullKey] = value.join(', ');
            }
        } else if (typeof value === 'object') {
            // Recurse into nested objects
            flattenObject(value, fullKey, result);
        } else {
            // Primitive value
            result[fullKey] = value;
        }
    }

    return result;
}

/**
 * Create a readable summary of an array of objects.
 * Extracts key display properties to produce a compact representation.
 * @param {Array} arr - Array of objects
 * @param {string} fieldName - Parent field name (used for context-aware summarization)
 * @returns {string} Summarized string
 */
function summarizeObjectArray(arr, fieldName) {
    const lowerName = fieldName.toLowerCase();

    // Conditional Access policies — show name + result
    if (lowerName.includes('conditionalaccess') || lowerName.includes('conditionalaccesspolicies')) {
        return arr.map(item => {
            const name = item.displayName || item.name || 'Unnamed';
            const result = item.result || item.status || '?';
            return `${name} (${result})`;
        }).join('; ');
    }

    // Modified properties — show property name with old → new
    if (lowerName.includes('modifiedproperties') || lowerName.includes('modified')) {
        return arr.map(item => {
            const prop = item.displayName || item.name || 'Unknown';
            const oldVal = item.oldValue ? truncateValue(item.oldValue) : '(none)';
            const newVal = item.newValue ? truncateValue(item.newValue) : '(none)';
            return `${prop}: ${oldVal} → ${newVal}`;
        }).join('; ');
    }

    // Target resources — show type + displayName
    if (lowerName.includes('targetresources') || lowerName.includes('target')) {
        return arr.map(item => {
            const type = item.type || item['@odata.type'] || '';
            const name = item.displayName || item.userPrincipalName || item.id || 'Unknown';
            return type ? `[${type}] ${name}` : name;
        }).join('; ');
    }

    // Authentication details — show method + succeeded
    if (lowerName.includes('authenticationdetails') || lowerName.includes('authentication')) {
        return arr.map(item => {
            const method = item.authenticationMethod || item.method || 'Unknown';
            const succeeded = item.succeeded !== undefined ? (item.succeeded ? '✓' : '✗') : '';
            const detail = item.authenticationStepResultDetail || item.statusDetail || '';
            return `${method} ${succeeded}${detail ? ` (${detail})` : ''}`;
        }).join('; ');
    }

    // Provisioning steps — show step name + status
    if (lowerName.includes('provisioningsteps') || lowerName.includes('steps')) {
        return arr.map(item => {
            const name = item.name || item.displayName || 'Step';
            const status = item.status || '?';
            return `${name} (${status})`;
        }).join(' → ');
    }

    // Additional details / info — show key=value pairs
    if (lowerName.includes('additionaldetails') || lowerName.includes('additionalinfo')) {
        return arr.map(item => {
            if (item.key && item.value !== undefined) {
                return `${item.key}=${truncateValue(String(item.value))}`;
            }
            if (item.Key && item.Value !== undefined) {
                return `${item.Key}=${truncateValue(String(item.Value))}`;
            }
            return JSON.stringify(item);
        }).join('; ');
    }

    // Generic fallback — attempt to show displayName/name, otherwise JSON
    return arr.map(item => {
        if (item.displayName) return item.displayName;
        if (item.name) return item.name;
        return JSON.stringify(item);
    }).join('; ');
}

/**
 * Truncate a string value for display.
 * @param {string} value - Value to truncate
 * @param {number} maxLen - Maximum length (default 60)
 * @returns {string} Truncated value
 */
function truncateValue(value, maxLen = 60) {
    if (!value || typeof value !== 'string') return String(value);
    // Strip surrounding quotes if present
    const cleaned = value.replace(/^["']|["']$/g, '');
    if (cleaned.length <= maxLen) return cleaned;
    return cleaned.substring(0, maxLen) + '…';
}

/**
 * Detect the Entra ID log sub-type from a parsed JSON object.
 * @param {object} obj - Raw parsed JSON object (before flattening)
 * @returns {string} Sub-type: 'SignIn', 'Audit', 'Provisioning', 'RiskDetection', or 'Unknown'
 */
function detectLogSubType(obj) {
    if (!obj || typeof obj !== 'object') return 'Unknown';

    // Sign-In log indicators
    if (obj.userPrincipalName !== undefined && obj.appDisplayName !== undefined) return 'SignIn';
    if (obj.clientAppUsed !== undefined || obj.conditionalAccessStatus !== undefined) return 'SignIn';
    if (obj.isInteractive !== undefined) return 'SignIn';
    if (obj.authenticationRequirement !== undefined) return 'SignIn';

    // Audit log indicators
    if (obj.activityDisplayName !== undefined && obj.targetResources !== undefined) return 'Audit';
    if (obj.loggedByService !== undefined && obj.operationType !== undefined) return 'Audit';

    // Provisioning log indicators
    if (obj.provisioningAction !== undefined) return 'Provisioning';
    if (obj.sourceSystem !== undefined && obj.targetSystem !== undefined) return 'Provisioning';
    if (obj.provisioningStatusInfo !== undefined) return 'Provisioning';

    // Risk Detection log indicators
    if (obj.riskEventType !== undefined) return 'RiskDetection';
    if (obj.detectionTimingType !== undefined && obj.riskLevel !== undefined) return 'RiskDetection';

    return 'Unknown';
}

/**
 * Parse a single Entra ID log entry.
 * Accepts a JSON string (single object or the first element of a JSON array).
 * Also handles already-parsed objects for convenience.
 * @param {string|object} logLine - Raw JSON log string or object
 * @returns {object} Parsed and flattened log object with key-value pairs
 */
export function parseLog(logLine) {
    if (!logLine) return {};

    let rawObj;

    if (typeof logLine === 'object') {
        rawObj = logLine;
    } else if (typeof logLine === 'string') {
        const trimmed = logLine.trim();
        if (!trimmed) return {};

        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                rawObj = parsed[0] || {};
            } else {
                rawObj = parsed;
            }
        } catch (e) {
            // Attempt to recover from common issues:
            // 1. Multiple JSON objects concatenated (take first)
            // 2. Trailing commas
            const recovered = tryRecoverJSON(trimmed);
            if (recovered) {
                rawObj = recovered;
            } else {
                return { _parseError: `Invalid JSON: ${e.message}`, _raw: truncateValue(trimmed, 200) };
            }
        }
    } else {
        return {};
    }

    // Detect sub-type before flattening
    const subType = detectLogSubType(rawObj);

    // Flatten nested JSON structure
    const flattened = flattenObject(rawObj);

    // Add metadata
    flattened._logSubType = subType;
    flattened._log_source = 'Microsoft Entra ID';

    return flattened;
}

/**
 * Attempt to recover a valid JSON object from malformed input.
 * Handles:
 *  - Newline-delimited JSON (takes first line)
 *  - Trailing commas
 *  - Wrapped in extra brackets
 * @param {string} text - Raw text
 * @returns {object|null} Recovered JSON object or null
 */
function tryRecoverJSON(text) {
    // Try first line only (newline-delimited JSON)
    const firstLine = text.split('\n').find(l => l.trim().startsWith('{'));
    if (firstLine) {
        try {
            return JSON.parse(firstLine.trim());
        } catch (_) { /* continue */ }
    }

    // Try removing trailing commas
    const cleaned = text.replace(/,\s*([\]}])/g, '$1');
    try {
        const parsed = JSON.parse(cleaned);
        return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (_) { /* continue */ }

    return null;
}

/**
 * Parse multiple Entra ID log entries.
 * Handles:
 *  - JSON array of objects
 *  - Newline-delimited JSON (one object per line)
 *  - A single JSON object
 * @param {string} logText - Raw log text (may contain multiple entries)
 * @returns {Array} Array of parsed log objects
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') return [];

    const trimmed = logText.trim();
    if (!trimmed) return [];

    // Try parsing as a JSON array first
    if (trimmed.startsWith('[')) {
        try {
            const arr = JSON.parse(trimmed);
            if (Array.isArray(arr)) {
                return arr.map(item => parseLog(item));
            }
        } catch (_) { /* fall through to line-by-line */ }
    }

    // Try parsing as a single JSON object (possibly pretty-printed / multi-line)
    if (trimmed.startsWith('{')) {
        try {
            const obj = JSON.parse(trimmed);
            return [parseLog(obj)];
        } catch (_) { /* fall through to line-by-line */ }
    }

    // Newline-delimited JSON: parse each line that starts with '{'
    const lines = trimmed.split('\n').filter(l => l.trim().startsWith('{'));
    if (lines.length > 0) {
        return lines.map(line => parseLog(line.trim()));
    }

    // Last resort: try the entire text as a single entry
    return [parseLog(trimmed)];
}

/**
 * Extract specific field from parsed log
 * @param {object} parsedLog - Parsed log object
 * @param {string} fieldName - Field name to extract
 * @returns {any} Field value or null if not found
 */
export function getField(parsedLog, fieldName) {
    return parsedLog[fieldName] !== undefined ? parsedLog[fieldName] : null;
}

/**
 * Check if log matches specific criteria
 * @param {object} parsedLog - Parsed log object
 * @param {object} criteria - Criteria object with field-value pairs
 * @returns {boolean} True if log matches all criteria
 */
export function matchesCriteria(parsedLog, criteria) {
    if (!criteria || typeof criteria !== 'object') return true;
    return Object.entries(criteria).every(([key, value]) => parsedLog[key] === value);
}

/**
 * Filter logs by criteria
 * @param {Array} parsedLogs - Array of parsed log objects
 * @param {object} criteria - Criteria object with field-value pairs
 * @returns {Array} Filtered array of logs
 */
export function filterLogs(parsedLogs, criteria) {
    if (!Array.isArray(parsedLogs)) return [];
    return parsedLogs.filter(log => matchesCriteria(log, criteria));
}

/**
 * Get unique values for a specific field across multiple logs
 * @param {Array} parsedLogs - Array of parsed log objects
 * @param {string} fieldName - Field name to extract
 * @returns {Array} Array of unique values
 */
export function getUniqueValues(parsedLogs, fieldName) {
    if (!Array.isArray(parsedLogs)) return [];
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
    if (!Array.isArray(parsedLogs)) return {};
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
 * Get summary statistics for parsed Entra ID logs
 * @param {Array} parsedLogs - Array of parsed log objects
 * @returns {object} Summary statistics
 */
export function getSummaryStats(parsedLogs) {
    if (!Array.isArray(parsedLogs) || parsedLogs.length === 0) {
        return {
            totalLogs: 0,
            uniqueUsers: 0,
            uniqueApps: 0,
            logSubTypes: {},
            results: {},
            riskLevels: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueUsers: getUniqueValues(parsedLogs, 'userPrincipalName').length,
        uniqueApps: getUniqueValues(parsedLogs, 'appDisplayName').length,
        logSubTypes: countFieldValues(parsedLogs, '_logSubType'),
        results: countFieldValues(parsedLogs, 'result'),
        riskLevels: countFieldValues(parsedLogs, 'riskLevelDuringSignIn')
    };
}

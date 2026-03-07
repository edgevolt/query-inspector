/**
 * Okta System Log Parser
 * Parses Okta System Log events in JSON format
 * Supports Authentication, Lifecycle, Security, Policy, Application, and System events
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
            continue;
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                result[fullKey] = '[]';
            } else if (typeof value[0] === 'object' && value[0] !== null) {
                result[fullKey] = summarizeObjectArray(value, key);
            } else {
                result[fullKey] = value.join(', ');
            }
        } else if (typeof value === 'object') {
            flattenObject(value, fullKey, result);
        } else {
            result[fullKey] = value;
        }
    }

    return result;
}

/**
 * Create a readable summary of an array of objects.
 * @param {Array} arr - Array of objects
 * @param {string} fieldName - Parent field name
 * @returns {string} Summarized string
 */
function summarizeObjectArray(arr, fieldName) {
    const lowerName = fieldName.toLowerCase();

    // Target resources — show [Type] displayName (alternateId)
    if (lowerName === 'target' || lowerName.includes('target')) {
        return arr.map(item => {
            const type = item.type || '';
            const name = item.displayName || item.alternateId || item.id || 'Unknown';
            const alt = item.alternateId && item.alternateId !== item.displayName ? ` (${item.alternateId})` : '';
            return type ? `[${type}] ${name}${alt}` : `${name}${alt}`;
        }).join('; ');
    }

    // IP chain — show IP addresses with geo
    if (lowerName === 'ipchain' || lowerName.includes('ipchain')) {
        return arr.map(item => {
            const ip = item.ip || 'unknown';
            const geo = item.geographicalContext;
            const city = geo ? (geo.city || geo.country || '') : '';
            return city ? `${ip} (${city})` : ip;
        }).join(' → ');
    }

    // Detail entries — show key=value
    if (lowerName.includes('detail')) {
        return arr.map(item => {
            if (typeof item === 'object') {
                return Object.entries(item).map(([k, v]) => `${k}=${v}`).join(', ');
            }
            return String(item);
        }).join('; ');
    }

    // Generic fallback
    return arr.map(item => {
        if (item.displayName) return item.displayName;
        if (item.name) return item.name;
        return JSON.stringify(item);
    }).join('; ');
}

/**
 * Truncate a string value for display.
 * @param {string} value - Value to truncate
 * @param {number} maxLen - Maximum length
 * @returns {string} Truncated value
 */
function truncateValue(value, maxLen = 200) {
    if (!value || typeof value !== 'string') return String(value);
    if (value.length <= maxLen) return value;
    return value.substring(0, maxLen) + '…';
}

/**
 * Detect the Okta log event category from a parsed JSON object.
 * @param {object} obj - Raw parsed JSON object (before flattening)
 * @returns {string} Category: 'Authentication', 'Lifecycle', 'Security', 'Policy', 'Application', 'System', or 'Unknown'
 */
function detectEventCategory(obj) {
    if (!obj || !obj.eventType) return 'Unknown';

    const et = obj.eventType;

    if (et.startsWith('user.session.') || et.startsWith('user.authentication.') || et.includes('.auth_via_')) return 'Authentication';
    if (et.startsWith('user.lifecycle.') || et.startsWith('user.account.')) return 'Lifecycle';
    if (et.startsWith('user.mfa.') || et.startsWith('security.') || et.includes('.threat.')) return 'Security';
    if (et.startsWith('policy.')) return 'Policy';
    if (et.startsWith('application.') || et.startsWith('app.')) return 'Application';
    if (et.startsWith('system.') || et.startsWith('org.')) return 'System';
    if (et.startsWith('group.')) return 'Lifecycle';

    return 'Unknown';
}

/**
 * Parse a single Okta System Log event.
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
            const recovered = tryRecoverJSON(trimmed);
            if (recovered) {
                rawObj = recovered;
            } else {
                return { _parseError: `Invalid JSON: ${e.message}`, _raw: truncateValue(trimmed) };
            }
        }
    } else {
        return {};
    }

    // Detect event category before flattening
    const category = detectEventCategory(rawObj);

    // Flatten nested JSON structure
    const flattened = flattenObject(rawObj);

    // Add metadata
    flattened._eventCategory = category;
    flattened._log_source = 'Okta';

    return flattened;
}

/**
 * Attempt to recover a valid JSON object from malformed input.
 * @param {string} text - Raw text
 * @returns {object|null} Recovered JSON object or null
 */
function tryRecoverJSON(text) {
    // Try first line only (NDJSON)
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
 * Parse multiple Okta System Log events.
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
        } catch (_) { /* fall through */ }
    }

    // Try parsing as a single JSON object
    if (trimmed.startsWith('{')) {
        try {
            const obj = JSON.parse(trimmed);
            return [parseLog(obj)];
        } catch (_) { /* fall through */ }
    }

    // NDJSON: parse each line that starts with '{'
    const lines = trimmed.split('\n').filter(l => l.trim().startsWith('{'));
    if (lines.length > 0) {
        return lines.map(line => parseLog(line.trim()));
    }

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
 * Get summary statistics for parsed Okta logs
 * @param {Array} parsedLogs - Array of parsed log objects
 * @returns {object} Summary statistics
 */
export function getSummaryStats(parsedLogs) {
    if (!Array.isArray(parsedLogs) || parsedLogs.length === 0) {
        return {
            totalLogs: 0,
            uniqueActors: 0,
            uniqueTargets: 0,
            eventCategories: {},
            outcomes: {},
            severities: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueActors: getUniqueValues(parsedLogs, 'actor.alternateId').length,
        uniqueTargets: getUniqueValues(parsedLogs, 'target').length,
        eventCategories: countFieldValues(parsedLogs, '_eventCategory'),
        outcomes: countFieldValues(parsedLogs, 'outcome.result'),
        severities: countFieldValues(parsedLogs, 'severity')
    };
}

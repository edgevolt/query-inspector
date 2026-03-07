/**
 * Ping Identity (PingOne) Audit Log Parser
 * Parses PingOne Platform audit activity logs in JSON format
 * Supports Authentication, User Lifecycle, MFA, Application, Policy, and Admin events
 */

/**
 * Flatten a nested JSON object into a single-level object using dot-notation keys.
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

    // Actors — show [Type] name
    if (lowerName === 'actors' || lowerName.includes('actor')) {
        return arr.map(item => {
            // PingOne actors have nested user/client objects
            if (item.user) {
                const name = item.user.name || item.user.id || 'Unknown';
                return `[User] ${name}`;
            }
            if (item.client) {
                const name = item.client.name || item.client.id || 'Unknown';
                return `[Client] ${name}`;
            }
            return item.displayName || item.name || JSON.stringify(item);
        }).join('; ');
    }

    // Resources — show [Type] name
    if (lowerName === 'resources' || lowerName.includes('resource')) {
        return arr.map(item => {
            // PingOne resources have typed nested objects
            if (item.user) {
                const name = item.user.name || item.user.id || 'Unknown';
                return `[User] ${name}`;
            }
            if (item.application) {
                const name = item.application.name || item.application.id || 'Unknown';
                return `[App] ${name}`;
            }
            if (item.group) {
                const name = item.group.name || item.group.id || 'Unknown';
                return `[Group] ${name}`;
            }
            if (item.policy) {
                const name = item.policy.name || item.policy.id || 'Unknown';
                return `[Policy] ${name}`;
            }
            // Flat resource objects (type/name/id at top level)
            const type = item.type || '';
            const name = item.name || item.id || 'Unknown';
            return type ? `[${type}] ${name}` : name;
        }).join('; ');
    }

    // Risk predictors
    if (lowerName.includes('predictor')) {
        return arr.map(item => {
            const name = item.name || item.type || 'Unknown';
            const score = item.score !== undefined ? ` (${item.score})` : '';
            return `${name}${score}`;
        }).join('; ');
    }

    // Tags
    if (lowerName === 'tags') {
        return arr.join(', ');
    }

    // IP chain / headers
    if (lowerName.includes('ipchain') || lowerName.includes('headers')) {
        return arr.map(item => {
            if (typeof item === 'string') return item;
            if (item.ip) return item.ip;
            return JSON.stringify(item);
        }).join(' → ');
    }

    // Generic fallback
    return arr.map(item => {
        if (typeof item === 'string') return item;
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
 * Detect the PingOne event category from a parsed JSON object.
 * @param {object} obj - Raw parsed JSON object
 * @returns {string} Category
 */
function detectEventCategory(obj) {
    if (!obj || !obj.action || !obj.action.type) return 'Unknown';

    const at = obj.action.type.toUpperCase();

    if (at.startsWith('AUTHENTICATION') || at.startsWith('PASSWORD.') || at === 'PASSWORD.CHECK_SUCCEEDED' || at === 'PASSWORD.CHECK_FAILED') return 'Authentication';
    if (at.startsWith('USER.') || at.startsWith('USER_')) return 'Lifecycle';
    if (at.startsWith('MFA.') || at.startsWith('MFA_')) return 'Security';
    if (at.startsWith('APPLICATION') || at.startsWith('APP.') || at.startsWith('APP_')) return 'Application';
    if (at.startsWith('GROUP')) return 'Lifecycle';
    if (at.startsWith('POLICY') || at.startsWith('FLOW')) return 'Policy';
    if (at.startsWith('RISK')) return 'Security';
    if (at.startsWith('GATEWAY') || at.startsWith('ENVIRONMENT') || at.startsWith('API_') || at.startsWith('SYSTEM')) return 'System';

    return 'Unknown';
}

/**
 * Parse a single PingOne audit log event.
 * @param {string|object} logLine - Raw JSON log string or object
 * @returns {object} Parsed and flattened log object
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

    const category = detectEventCategory(rawObj);
    const flattened = flattenObject(rawObj);

    flattened._eventCategory = category;
    flattened._log_source = 'Ping Identity (PingOne)';

    return flattened;
}

/**
 * Attempt to recover a valid JSON object from malformed input.
 * @param {string} text - Raw text
 * @returns {object|null} Recovered JSON object or null
 */
function tryRecoverJSON(text) {
    const firstLine = text.split('\n').find(l => l.trim().startsWith('{'));
    if (firstLine) {
        try {
            return JSON.parse(firstLine.trim());
        } catch (_) { /* continue */ }
    }

    const cleaned = text.replace(/,\s*([\]}])/g, '$1');
    try {
        const parsed = JSON.parse(cleaned);
        return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (_) { /* continue */ }

    return null;
}

/**
 * Parse multiple PingOne audit log events.
 * @param {string} logText - Raw log text
 * @returns {Array} Array of parsed log objects
 */
export function parseLogs(logText) {
    if (!logText || typeof logText !== 'string') return [];

    const trimmed = logText.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith('[')) {
        try {
            const arr = JSON.parse(trimmed);
            if (Array.isArray(arr)) {
                return arr.map(item => parseLog(item));
            }
        } catch (_) { /* fall through */ }
    }

    if (trimmed.startsWith('{')) {
        try {
            const obj = JSON.parse(trimmed);
            return [parseLog(obj)];
        } catch (_) { /* fall through */ }
    }

    const lines = trimmed.split('\n').filter(l => l.trim().startsWith('{'));
    if (lines.length > 0) {
        return lines.map(line => parseLog(line.trim()));
    }

    return [parseLog(trimmed)];
}

/**
 * Extract specific field from parsed log
 */
export function getField(parsedLog, fieldName) {
    return parsedLog[fieldName] !== undefined ? parsedLog[fieldName] : null;
}

/**
 * Check if log matches specific criteria
 */
export function matchesCriteria(parsedLog, criteria) {
    if (!criteria || typeof criteria !== 'object') return true;
    return Object.entries(criteria).every(([key, value]) => parsedLog[key] === value);
}

/**
 * Filter logs by criteria
 */
export function filterLogs(parsedLogs, criteria) {
    if (!Array.isArray(parsedLogs)) return [];
    return parsedLogs.filter(log => matchesCriteria(log, criteria));
}

/**
 * Get unique values for a specific field
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
 * Get summary statistics for parsed PingOne logs
 */
export function getSummaryStats(parsedLogs) {
    if (!Array.isArray(parsedLogs) || parsedLogs.length === 0) {
        return {
            totalLogs: 0,
            uniqueActors: 0,
            eventCategories: {},
            results: {},
            actionTypes: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueActors: getUniqueValues(parsedLogs, 'actors').length,
        eventCategories: countFieldValues(parsedLogs, '_eventCategory'),
        results: countFieldValues(parsedLogs, 'result.status'),
        actionTypes: countFieldValues(parsedLogs, 'action.type')
    };
}

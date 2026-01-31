/**
 * Check Point Firewall Log Parser (R81.x)
 * Parses Check Point firewall logs in LEA (Log Export API) format
 * Supports R81.x Traffic, Threat, VPN, and Authentication log formats
 */

/**
 * Parse key-value pairs from Check Point LEA format
 * Handles quoted values, escaped characters, and nested structures
 * @param {string} logLine - Raw log line
 * @returns {object} Parsed key-value pairs
 */
function parseKeyValuePairs(logLine) {
    const fields = {};
    let i = 0;

    while (i < logLine.length) {
        // Skip whitespace
        while (i < logLine.length && /\s/.test(logLine[i])) {
            i++;
        }

        if (i >= logLine.length) break;

        // Extract key
        let key = '';
        while (i < logLine.length && logLine[i] !== '=' && logLine[i] !== ':') {
            key += logLine[i];
            i++;
        }
        key = key.trim();

        if (!key || i >= logLine.length) break;

        // Skip separator (= or :)
        i++;

        // Skip whitespace after separator
        while (i < logLine.length && /\s/.test(logLine[i])) {
            i++;
        }

        // Extract value
        let value = '';
        let inQuotes = false;
        let quoteChar = '';

        if (i < logLine.length && (logLine[i] === '"' || logLine[i] === "'")) {
            inQuotes = true;
            quoteChar = logLine[i];
            i++; // Skip opening quote

            while (i < logLine.length) {
                if (logLine[i] === '\\' && i + 1 < logLine.length) {
                    // Handle escaped characters
                    i++;
                    value += logLine[i];
                    i++;
                } else if (logLine[i] === quoteChar) {
                    // End of quoted value
                    i++;
                    break;
                } else {
                    value += logLine[i];
                    i++;
                }
            }
        } else {
            // Unquoted value - read until whitespace or semicolon
            while (i < logLine.length && logLine[i] !== ';' && !/\s/.test(logLine[i])) {
                value += logLine[i];
                i++;
            }
        }

        // Skip semicolon if present
        if (i < logLine.length && logLine[i] === ';') {
            i++;
        }

        // Store the field
        if (key) {
            fields[key] = value.trim();
        }
    }

    return fields;
}

/**
 * Convert numeric string values to numbers
 * @param {object} fields - Parsed fields object
 * @returns {object} Fields with numeric values converted
 */
function convertNumericFields(fields) {
    const converted = {};

    for (const [key, value] of Object.entries(fields)) {
        // Skip empty values
        if (!value || value === '') {
            continue;
        }

        // Convert numeric values
        if (/^\d+$/.test(value)) {
            converted[key] = parseInt(value, 10);
        } else if (/^\d+\.\d+$/.test(value)) {
            converted[key] = parseFloat(value);
        } else {
            converted[key] = value;
        }
    }

    return converted;
}

/**
 * Parse a Check Point log line
 * @param {string} logLine - Raw log line in LEA format
 * @returns {object} Parsed log object with key-value pairs
 */
export function parseLog(logLine) {
    if (!logLine || typeof logLine !== 'string') {
        return {};
    }

    // Parse key-value pairs
    const fields = parseKeyValuePairs(logLine);

    // Convert numeric fields
    const converted = convertNumericFields(fields);

    // Add metadata
    if (converted.product) {
        converted._log_source = 'Check Point';
    }

    return converted;
}

/**
 * Parse multiple Check Point log lines
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
            products: {},
            threats: {}
        };
    }

    return {
        totalLogs: parsedLogs.length,
        uniqueSourceIPs: getUniqueValues(parsedLogs, 'src').length,
        uniqueDestIPs: getUniqueValues(parsedLogs, 'dst').length,
        actions: countFieldValues(parsedLogs, 'action'),
        products: countFieldValues(parsedLogs, 'product'),
        threats: countFieldValues(parsedLogs, 'malware_action')
    };
}

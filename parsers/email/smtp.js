/**
 * SMTP Email Header Parser (RFC 5322 and RFC 5321)
 * Parses email headers with support for folded headers, address parsing, and routing extraction
 */

/**
 * Parse email headers from raw header text
 * Handles multi-line folded headers per RFC 5322
 * @param {string} headerText - Raw email headers
 * @returns {object} Parsed headers object
 */
export function parseHeaders(headerText) {
    if (!headerText || typeof headerText !== 'string') {
        return {};
    }

    const headers = {};
    const lines = headerText.split('\n');
    let currentHeader = null;
    let currentValue = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if this is a continuation line (starts with whitespace)
        if (/^\s/.test(line) && currentHeader) {
            // Folded header - append to current value
            currentValue += ' ' + line.trim();
        } else if (line.includes(':')) {
            // Save previous header if exists
            if (currentHeader) {
                headers[currentHeader.toLowerCase()] = currentValue.trim();
            }

            // Parse new header
            const colonIndex = line.indexOf(':');
            currentHeader = line.substring(0, colonIndex).trim();
            currentValue = line.substring(colonIndex + 1).trim();
        } else if (line.trim() === '') {
            // Empty line - end of headers
            break;
        }
    }

    // Save last header
    if (currentHeader) {
        headers[currentHeader.toLowerCase()] = currentValue.trim();
    }

    // Handle multiple Received headers (stored as array)
    const receivedHeaders = [];
    lines.forEach(line => {
        if (line.toLowerCase().startsWith('received:')) {
            let value = line.substring(line.indexOf(':') + 1).trim();
            // Check for continuation lines
            let nextIndex = lines.indexOf(line) + 1;
            while (nextIndex < lines.length && /^\s/.test(lines[nextIndex])) {
                value += ' ' + lines[nextIndex].trim();
                nextIndex++;
            }
            receivedHeaders.push(value);
        }
    });

    if (receivedHeaders.length > 0) {
        headers.received = receivedHeaders;
    }

    return headers;
}

/**
 * Parse email address with display name
 * Handles formats: "Display Name" <email@example.com> or email@example.com
 * @param {string} addressString - Email address string
 * @returns {object} Parsed address with name and email
 */
export function parseEmailAddress(addressString) {
    if (!addressString) {
        return { name: null, email: null };
    }

    // Match: "Display Name" <email@example.com>
    const namedMatch = addressString.match(/^"?([^"<]+)"?\s*<([^>]+)>$/);
    if (namedMatch) {
        return {
            name: namedMatch[1].trim(),
            email: namedMatch[2].trim()
        };
    }

    // Match: Display Name <email@example.com> (without quotes)
    const unquotedMatch = addressString.match(/^([^<]+)\s*<([^>]+)>$/);
    if (unquotedMatch) {
        return {
            name: unquotedMatch[1].trim(),
            email: unquotedMatch[2].trim()
        };
    }

    // Just email address
    return {
        name: null,
        email: addressString.trim()
    };
}

/**
 * Parse Received headers to extract routing information
 * @param {Array|string} receivedHeaders - Received header(s)
 * @returns {Array} Array of routing hops with server, IP, and timestamp
 */
export function parseRoutingPath(receivedHeaders) {
    const hops = [];
    const headers = Array.isArray(receivedHeaders) ? receivedHeaders : [receivedHeaders];

    headers.forEach((header, index) => {
        // Extract server names
        let fromServer = null;
        let byServer = null;

        // Extract "from <server>" (but not "envelope-from")
        const fromMatch = header.match(/(?<!envelope-)from\s+([^\s\(<]+)/i);
        if (fromMatch) {
            fromServer = fromMatch[1];
        }

        // Extract "by <server>"
        const byMatch = header.match(/by\s+([^\s\(<]+)/i);
        if (byMatch) {
            byServer = byMatch[1];
        }

        // Extract IP address (IPv4 or IPv6)
        let ip = null;
        const ipv4Match = header.match(/[\[\(](\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})[\]\)]/);
        if (ipv4Match) {
            ip = ipv4Match[1];
        } else {
            const ipv6Match = header.match(/\(([0-9a-f:]+:[0-9a-f:]+)\)/i);
            if (ipv6Match && ipv6Match[1].includes(':')) {
                ip = ipv6Match[1];
            }
        }

        // Extract timestamp (RFC 5322 format at end of Received header)
        let timestamp = null;
        let parsedDate = null;
        const timestampMatch = header.match(/;\s*(.+?)(?:\s*\(envelope-from.*)?$/);
        if (timestampMatch) {
            timestamp = timestampMatch[1].trim();
            parsedDate = new Date(timestamp);
        } else {
            // Try to extract non-standard timestamp formats (e.g., SendGrid)
            // Look for date patterns like "2026-01-31 20:13:59" or standard date strings
            const altTimestampMatch = header.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:\s+[+-]\d{4})?(?:\s+UTC)?)/);
            if (altTimestampMatch) {
                timestamp = altTimestampMatch[1];
                parsedDate = new Date(timestamp);
            } else {
                // Try to find any date-like string
                const dateMatch = header.match(/([A-Z][a-z]{2},?\s+\d{1,2}\s+[A-Z][a-z]{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}(?:\s+[+-]\d{4})?(?:\s+\([A-Z]{3,4}\))?)/);
                if (dateMatch) {
                    timestamp = dateMatch[1];
                    parsedDate = new Date(timestamp);
                }
            }
        }

        // Extract encryption information
        let encryption = null;

        // Look for TLS version (TLS1_2, TLS1_3, etc.)
        const tlsMatch = header.match(/\b(TLS1?[._]?\d(?:[._]\d)?)\b/i);
        if (tlsMatch) {
            const tlsVersion = tlsMatch[1].replace(/_/g, '.').toUpperCase();
            encryption = { version: tlsVersion };

            // Look for cipher suite
            const cipherMatch = header.match(/cipher[=\s]+([A-Z0-9_]+)/i);
            if (cipherMatch) {
                encryption.cipher = cipherMatch[1];
            }
        }
        // Look for SMTPS, ESMTPS
        else if (header.match(/\b(SMTPS|ESMTPS)\b/i)) {
            encryption = { version: 'TLS', cipher: null };
        }

        // Create hops for both from and by servers when they're different
        // Headers are in reverse chronological order, so we add "by" first, then "from"
        if (fromServer && byServer && fromServer !== byServer) {
            // Add "by" server hop first (receiver) with encryption info
            hops.push({
                index: index,
                server: byServer,
                ip: null,
                timestamp: timestamp,
                parsedDate: parsedDate,
                encryption: encryption,
                raw: header
            });

            // Add "from" server hop second (sender)
            hops.push({
                index: index,
                server: fromServer,
                ip: ip,
                timestamp: timestamp,
                parsedDate: parsedDate,
                encryption: null, // Encryption applies to the connection TO the "by" server
                raw: header
            });
        } else if (fromServer || byServer) {
            // Only one server, add it
            hops.push({
                index: index,
                server: fromServer || byServer,
                ip: ip,
                timestamp: timestamp,
                parsedDate: parsedDate,
                encryption: encryption,
                raw: header
            });
        } else if (timestamp) {
            // No server but has timestamp (shouldn't happen but handle it)
            hops.push({
                index: index,
                server: null,
                ip: ip,
                timestamp: timestamp,
                parsedDate: parsedDate,
                encryption: encryption,
                raw: header
            });
        }
    });

    // Reverse to show chronological order (sender to recipient)
    return hops.reverse();
}

/**
 * Calculate transit times between routing hops
 * @param {Array} routingPath - Array of routing hops
 * @returns {Array} Routing path with transit times added
 */
export function calculateTransitTimes(routingPath) {
    if (!routingPath || routingPath.length < 2) {
        return routingPath;
    }

    const pathWithTimes = [...routingPath];

    for (let i = 1; i < pathWithTimes.length; i++) {
        const prevHop = pathWithTimes[i - 1];
        const currentHop = pathWithTimes[i];

        if (prevHop.parsedDate && currentHop.parsedDate) {
            const diffMs = currentHop.parsedDate - prevHop.parsedDate;
            const diffSeconds = Math.floor(diffMs / 1000);
            const diffMinutes = Math.floor(Math.abs(diffSeconds) / 60);
            const diffHours = Math.floor(diffMinutes / 60);

            // Handle negative times (clock skew between servers)
            if (diffSeconds < 0) {
                const absSeconds = Math.abs(diffSeconds);
                if (diffHours > 0) {
                    currentHop.transitTime = `⚠️ -${diffHours}h ${diffMinutes % 60}m (clock skew)`;
                } else if (diffMinutes > 0) {
                    currentHop.transitTime = `⚠️ -${diffMinutes}m ${absSeconds % 60}s (clock skew)`;
                } else {
                    currentHop.transitTime = `⚠️ -${absSeconds}s (clock skew)`;
                }
            } else if (diffHours > 0) {
                // Long delay - show warning
                currentHop.transitTime = `⚠️ ${diffHours}h ${diffMinutes % 60}m (slow)`;
            } else if (diffMinutes >= 2) {
                // Delay over 2 minutes - show warning
                currentHop.transitTime = `⚠️ ${diffMinutes}m ${diffSeconds % 60}s (slow)`;
            } else if (diffMinutes > 0) {
                currentHop.transitTime = `${diffMinutes}m ${diffSeconds % 60}s`;
            } else {
                currentHop.transitTime = `${diffSeconds}s`;
            }
        }
    }

    return pathWithTimes;
}

/**
 * Extract all email addresses from To, Cc, Bcc headers
 * @param {object} headers - Parsed headers object
 * @returns {Array} Array of email addresses
 */
export function extractRecipients(headers) {
    const recipients = [];
    const fields = ['to', 'cc', 'bcc'];

    fields.forEach(field => {
        if (headers[field]) {
            // Split by comma and parse each address
            const addresses = headers[field].split(',');
            addresses.forEach(addr => {
                const parsed = parseEmailAddress(addr.trim());
                if (parsed.email) {
                    recipients.push({
                        type: field.toUpperCase(),
                        ...parsed
                    });
                }
            });
        }
    });

    return recipients;
}

/**
 * Get summary information from parsed headers
 * @param {object} headers - Parsed headers object
 * @returns {object} Summary information
 */
export function getHeaderSummary(headers) {
    const from = headers.from ? parseEmailAddress(headers.from) : null;
    const recipients = extractRecipients(headers);
    const routingPath = headers.received ? parseRoutingPath(headers.received) : [];

    return {
        from: from,
        recipients: recipients,
        subject: headers.subject || null,
        date: headers.date || null,
        messageId: headers['message-id'] || null,
        hops: routingPath.length,
        hasSecurityHeaders: !!(headers['dkim-signature'] || headers['authentication-results']),
        contentType: headers['content-type'] || null
    };
}

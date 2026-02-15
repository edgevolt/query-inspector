/**
 * Email Mode Handler
 * Manages the email header parser mode UI and functionality
 */

import { parseHeaders, parseRoutingPath, calculateTransitTimes, getHeaderSummary } from './parsers/email/smtp.js';
import smtpKnowledge from './knowledge/email/smtp.js';
import { emailExamples } from './email-examples.js';

/**
 * Initialize email mode functionality
 */
export function initEmailMode() {
    // Get DOM elements
    const emailModeBtn = document.getElementById('email-mode-btn');
    const emailInput = document.getElementById('email-input');

    // Mode toggle handled in main.js

    // Email input change - parse in real-time
    emailInput.addEventListener('input', debounce(() => {
        const headerText = emailInput.value.trim();
        if (headerText) {
            parseAndDisplayHeaders(headerText);
        } else {
            clearParsedHeaders();
        }
    }, 500));

    // Load example headers
    loadEmailExamples();
}



/**
 * Parse email headers and display results
 * @param {string} headerText - Raw email headers
 */
function parseAndDisplayHeaders(headerText) {
    try {
        // Parse headers
        const headers = parseHeaders(headerText);

        // Display parsed headers
        displayParsedHeaders(headers);

        // Display routing visualization if Received headers exist
        if (headers.received) {
            displayRoutingVisualization(headers.received);
        } else {
            hideRoutingVisualization();
        }
    } catch (error) {
        console.error('Error parsing email headers:', error);
    }
}

/**
 * Display parsed headers in table format
 * @param {object} headers - Parsed headers object
 */
function displayParsedHeaders(headers) {
    const container = document.getElementById('parsed-headers-container');
    container.innerHTML = '';

    if (!headers || Object.keys(headers).length === 0) {
        return;
    }

    const table = document.createElement('table');
    table.className = 'parsed-fields-table';

    // Create header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Header</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');

    Object.entries(headers).forEach(([header, value]) => {
        // Skip internal fields and handle Received separately
        if (header.startsWith('_') || header === 'received') {
            return;
        }

        const headerInfo = smtpKnowledge[header] || { description: 'Custom or non-standard header', category: 'metadata' };

        const row = document.createElement('tr');
        row.className = `field-category-${headerInfo.category}`;

        // Truncate long values for display
        let displayValue = String(value);
        if (displayValue.length > 100) {
            displayValue = displayValue.substring(0, 100) + '...';
        }

        row.innerHTML = `
            <td>
                <span class="field-indicator"></span>
                <strong>${escapeHtml(header)}</strong>
            </td>
            <td class="field-value">${escapeHtml(displayValue)}</td>
            <td>${headerInfo.description || 'No description available'}</td>
        `;

        // Add click handler to show full value
        row.addEventListener('click', () => showHeaderDetails(header, value, headerInfo));

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
 * Display email routing visualization
 * @param {Array|string} receivedHeaders - Received header(s)
 */
function displayRoutingVisualization(receivedHeaders) {
    const section = document.querySelector('.email-routing-section');
    const container = document.getElementById('email-routing-container');

    section.style.display = 'block';
    container.innerHTML = '';

    // Parse routing path
    let routingPath = parseRoutingPath(receivedHeaders);
    routingPath = calculateTransitTimes(routingPath);

    // Calculate total delivery time
    if (routingPath.length >= 2) {
        const firstHop = routingPath[0];
        const lastHop = routingPath[routingPath.length - 1];

        if (firstHop.parsedDate && lastHop.parsedDate) {
            const totalMs = lastHop.parsedDate - firstHop.parsedDate;
            const totalSeconds = Math.floor(totalMs / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);

            let totalTimeStr = '';
            if (totalDays > 0) {
                totalTimeStr = `${totalDays}d ${totalHours % 24}h ${totalMinutes % 60}m`;
            } else if (totalHours > 0) {
                totalTimeStr = `${totalHours}h ${totalMinutes % 60}m ${totalSeconds % 60}s`;
            } else if (totalMinutes > 0) {
                totalTimeStr = `${totalMinutes}m ${totalSeconds % 60}s`;
            } else {
                totalTimeStr = `${totalSeconds}s`;
            }


            // Check for clock skew (negative time or timestamps going backwards)
            let hasClockSkew = totalMs < 0;
            if (!hasClockSkew) {
                // Check if any hop has a timestamp earlier than the previous hop
                for (let i = 1; i < routingPath.length; i++) {
                    if (routingPath[i].parsedDate && routingPath[i - 1].parsedDate) {
                        if (routingPath[i].parsedDate < routingPath[i - 1].parsedDate) {
                            hasClockSkew = true;
                            break;
                        }
                    }
                }
            }

            // Add total delivery time banner
            const totalTimeDiv = document.createElement('div');
            totalTimeDiv.className = 'total-delivery-time';

            if (hasClockSkew) {
                totalTimeDiv.innerHTML = `
                    <strong>📬 Total Delivery Time:</strong> ${totalTimeStr}
                    <span class="delivery-time-detail">(${routingPath.length} hops from ${escapeHtml(firstHop.server || 'sender')} to ${escapeHtml(lastHop.server || 'recipient')})</span>
                    <div class="clock-skew-warning">⚠️ Clock skew detected: Server timestamps are inconsistent. Delivery time may be inaccurate.</div>
                `;
            } else {
                totalTimeDiv.innerHTML = `
                    <strong>📬 Total Delivery Time:</strong> ${totalTimeStr}
                    <span class="delivery-time-detail">(${routingPath.length} hops from ${escapeHtml(firstHop.server || 'sender')} to ${escapeHtml(lastHop.server || 'recipient')})</span>
                `;
            }
            container.appendChild(totalTimeDiv);
        }
    }

    // Create routing flow
    const flowContainer = document.createElement('div');
    flowContainer.className = 'routing-flow';

    routingPath.forEach((hop, index) => {
        // Create hop element
        const hopElement = document.createElement('div');

        // Detect organization from server name
        const getOrganization = (serverName) => {
            if (!serverName) return null;
            const lower = serverName.toLowerCase();
            if (lower.includes('google') || lower.includes('gmail')) return 'google';
            if (lower.includes('outlook') || lower.includes('microsoft')) return 'microsoft';
            if (lower.includes('yahoo')) return 'yahoo';
            if (lower.includes('icloud') || lower.includes('apple')) return 'apple';
            // Extract domain for others
            const parts = serverName.split('.');
            if (parts.length >= 2) return parts[parts.length - 2];
            return null;
        };

        const currentOrg = getOrganization(hop.server);
        const nextOrg = index < routingPath.length - 1 ? getOrganization(routingPath[index + 1].server) : null;
        const isExternal = currentOrg && nextOrg && currentOrg !== nextOrg;

        hopElement.className = isExternal ? 'routing-hop routing-hop-external' : 'routing-hop';

        const serverName = hop.server || 'Unknown Server';
        const ipAddress = hop.ip ? `[${hop.ip}]` : '';

        // Format timestamp consistently (convert to ISO 8601 with UTC)
        let timestamp = '';
        if (hop.parsedDate && !isNaN(hop.parsedDate.getTime())) {
            // Format: "Thu, 29 Jan 2026 16:40:27 UTC"
            timestamp = hop.parsedDate.toUTCString().replace(' GMT', ' UTC');
        } else if (hop.timestamp) {
            // Fallback to original if parsing failed, but normalize GMT to UTC
            timestamp = hop.timestamp.replace(/\bGMT\b/g, 'UTC');
        }

        const transitTime = hop.transitTime || '';

        // Create single VirusTotal link (prefer IP, fallback to server)
        const vtLink = hop.ip ?
            `https://www.virustotal.com/gui/ip-address/${encodeURIComponent(hop.ip)}` :
            hop.server ? `https://www.virustotal.com/gui/domain/${encodeURIComponent(hop.server)}` : '';

        hopElement.innerHTML = `
            <div class="hop-number">${index + 1}</div>
            <div class="hop-server">${escapeHtml(serverName)}</div>
            ${ipAddress ? `<div class="hop-ip">${escapeHtml(ipAddress)}</div>` : ''}
            <div class="hop-timestamp">⏱ ${escapeHtml(timestamp)}</div>
            ${vtLink ? `<a href="${vtLink}" target="_blank" rel="noopener noreferrer" class="vt-link-hop" title="Check reputation on VirusTotal">🔍 VirusTotal</a>` : ''}
        `;

        flowContainer.appendChild(hopElement);

        // Add arrow with transit time and encryption between hops (except after last hop)
        if (index < routingPath.length - 1) {
            const nextHop = routingPath[index + 1];
            const arrowContainer = document.createElement('div');
            arrowContainer.className = 'routing-arrow-container';

            // Format encryption info for this connection
            let encryptionBadge = '';
            if (nextHop.encryption) {
                const version = nextHop.encryption.version;
                const cipher = nextHop.encryption.cipher;

                // Determine security level for color coding
                let securityClass = 'encryption-good';
                if (version.includes('1.3')) {
                    securityClass = 'encryption-excellent';
                } else if (version.includes('1.2')) {
                    securityClass = 'encryption-good';
                } else if (version.includes('1.1') || version.includes('1.0')) {
                    securityClass = 'encryption-weak';
                }

                // Show version only, cipher in tooltip
                const title = cipher ? `Cipher: ${cipher}` : 'Encrypted connection';
                encryptionBadge = `<div class="encryption-badge ${securityClass}" title="${title}">🔒 ${version}</div>`;
            } else {
                // Check if this is a local delivery (no "from" server in next hop, just "by")
                if (!nextHop.server || nextHop.raw.match(/^Received:\s+by\s+/i)) {
                    encryptionBadge = '<div class="encryption-badge encryption-local" title="Local delivery within datacenter">📍 Local delivery</div>';
                } else {
                    encryptionBadge = '<div class="encryption-badge encryption-none" title="Unencrypted connection">⚠️ No encryption</div>';
                }
            }

            arrowContainer.innerHTML = `
                <div class="routing-arrow">→</div>
                ${nextHop.transitTime ? `<div class="arrow-transit-time">⏳ ${escapeHtml(nextHop.transitTime)}</div>` : ''}
                ${encryptionBadge}
            `;

            flowContainer.appendChild(arrowContainer);
        }
    });

    container.appendChild(flowContainer);
}

/**
 * Hide routing visualization section
 */
function hideRoutingVisualization() {
    const section = document.querySelector('.email-routing-section');
    section.style.display = 'none';
}

/**
 * Show detailed header information
 * @param {string} header - Header name
 * @param {any} value - Header value
 * @param {object} headerInfo - Header metadata
 */
function showHeaderDetails(header, value, headerInfo) {
    // Reuse the existing info panel from query mode
    const infoPanel = document.getElementById('info-panel');
    const infoPanelTitle = document.getElementById('info-panel-title');
    const infoPanelContent = document.getElementById('info-panel-content');

    infoPanelTitle.textContent = header;

    let content = `
        <div class="info-panel-row">
            <div class="info-panel-label">Value</div>
            <div class="info-panel-value"><code>${escapeHtml(String(value))}</code></div>
        </div>
        <div class="info-panel-row">
            <div class="info-panel-label">Description</div>
            <div class="info-panel-value">${headerInfo.description || 'No description available'}</div>
        </div>
        <div class="info-panel-row">
            <div class="info-panel-label">Category</div>
            <div class="info-panel-value">${headerInfo.category || 'metadata'}</div>
        </div>
    `;

    if (headerInfo.examples) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Examples</div>
                <div class="info-panel-value">${headerInfo.examples.map(ex => `<code>${escapeHtml(ex)}</code>`).join('<br>')}</div>
            </div>
        `;
    }

    infoPanelContent.innerHTML = content;
    infoPanel.style.display = 'block';
}

/**
 * Clear parsed headers display
 */
function clearParsedHeaders() {
    const container = document.getElementById('parsed-headers-container');
    container.innerHTML = '';
    hideRoutingVisualization();
}

/**
 * Load example email headers
 */
function loadEmailExamples() {
    const examplesGrid = document.getElementById('email-examples-grid');
    examplesGrid.innerHTML = '';

    emailExamples.forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-title">📧 ${example.title}</div>
            <div class="example-query">${example.description}</div>
        `;

        card.addEventListener('click', () => {
            // Switch to email mode by clicking the button
            const emailModeBtn = document.getElementById('email-mode-btn');
            if (!emailModeBtn.classList.contains('active')) {
                emailModeBtn.click();
            }

            // Set header text
            const emailInput = document.getElementById('email-input');
            emailInput.value = example.headers;
            emailInput.dispatchEvent(new Event('input'));

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        examplesGrid.appendChild(card);
    });
}

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

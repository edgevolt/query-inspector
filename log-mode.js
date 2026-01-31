/**
 * Log Mode Handler
 * Manages the log parser mode UI and functionality
 */

import { getAllLogFormats, getLogFormat, autoDetectLogFormat } from './log-formats.js';

// State management
let currentMode = 'query'; // 'query' or 'log'
let currentLogFormat = null;
let logParser = null;
let logKnowledge = null;

/**
 * Initialize log mode functionality
 */
export function initLogMode() {
    // Get DOM elements
    const queryModeBtn = document.getElementById('query-mode-btn');
    const logModeBtn = document.getElementById('log-mode-btn');
    const queryModeContainer = document.getElementById('query-mode-container');
    const logModeContainer = document.getElementById('log-mode-container');
    const logFormatSelector = document.getElementById('log-format-selector');
    const autoDetectBtn = document.getElementById('auto-detect-btn');
    const logInput = document.getElementById('log-input');

    // Populate log format selector
    populateLogFormatSelector();

    // Mode toggle event listeners
    queryModeBtn.addEventListener('click', () => switchMode('query'));
    logModeBtn.addEventListener('click', () => switchMode('log'));

    // Log format selector change
    logFormatSelector.addEventListener('change', async (e) => {
        const formatId = e.target.value;
        if (formatId) {
            await loadLogFormat(formatId);
            // Parse current input if any
            const logText = logInput.value.trim();
            if (logText) {
                parseAndDisplayLog(logText);
            }
        }
    });

    // Auto-detect button
    autoDetectBtn.addEventListener('click', () => {
        const logText = logInput.value.trim();
        if (!logText) {
            alert('Please enter some log data first');
            return;
        }

        const detectedFormat = autoDetectLogFormat(logText);
        if (detectedFormat) {
            logFormatSelector.value = detectedFormat;
            logFormatSelector.dispatchEvent(new Event('change'));
            showNotification(`Detected format: ${getLogFormat(detectedFormat).name}`, 'success');
        } else {
            showNotification('Could not auto-detect log format. Please select manually.', 'warning');
        }
    });

    // Log input change - parse in real-time
    logInput.addEventListener('input', debounce(() => {
        const logText = logInput.value.trim();
        if (logText && currentLogFormat) {
            parseAndDisplayLog(logText);
        } else if (!logText) {
            clearParsedFields();
        }
    }, 500));

    // Load example logs
    loadLogExamples();
}

/**
 * Switch between query and log modes
 * @param {string} mode - 'query' or 'log'
 */
function switchMode(mode) {
    const queryModeBtn = document.getElementById('query-mode-btn');
    const logModeBtn = document.getElementById('log-mode-btn');
    const queryModeContainer = document.getElementById('query-mode-container');
    const logModeContainer = document.getElementById('log-mode-container');

    if (mode === 'query') {
        queryModeBtn.classList.add('active');
        logModeBtn.classList.remove('active');
        queryModeContainer.classList.add('active');
        logModeContainer.classList.remove('active');
        currentMode = 'query';
    } else if (mode === 'log') {
        logModeBtn.classList.add('active');
        queryModeBtn.classList.remove('active');
        logModeContainer.classList.add('active');
        queryModeContainer.classList.remove('active');
        currentMode = 'log';
    }
}

/**
 * Populate log format selector dropdown
 */
function populateLogFormatSelector() {
    const selector = document.getElementById('log-format-selector');
    const formats = getAllLogFormats();

    formats.forEach(format => {
        const option = document.createElement('option');
        option.value = format.id;
        option.textContent = `${format.emoji} ${format.name}`;
        selector.appendChild(option);
    });
}

/**
 * Load log format parser and knowledge base
 * @param {string} formatId - Log format ID
 */
async function loadLogFormat(formatId) {
    try {
        // Dynamically import parser and knowledge base
        const parserModule = await import(`./parsers/logs/${formatId}.js`);
        const knowledgeModule = await import(`./knowledge/logs/${formatId}.js`);

        logParser = parserModule;
        logKnowledge = knowledgeModule.default || knowledgeModule;
        currentLogFormat = formatId;

        console.log(`Loaded log format: ${formatId}`);
    } catch (error) {
        console.error(`Failed to load log format ${formatId}:`, error);
        showNotification(`Failed to load ${formatId} parser`, 'error');
    }
}

/**
 * Parse log text and display results
 * @param {string} logText - Raw log text
 */
function parseAndDisplayLog(logText) {
    if (!logParser || !logParser.parseLog) {
        console.error('No parser loaded');
        return;
    }

    try {
        // Parse the log(s)
        const lines = logText.split('\n').filter(line => line.trim());
        const parsedLogs = lines.map(line => logParser.parseLog(line));

        // Display parsed fields
        displayParsedFields(parsedLogs);

        // Show statistics if multiple logs
        if (parsedLogs.length > 1) {
            displayStatistics(parsedLogs);
        } else {
            hideStatistics();
        }
    } catch (error) {
        console.error('Error parsing log:', error);
        showNotification('Error parsing log data', 'error');
    }
}

/**
 * Display parsed fields in table format
 * @param {Array} parsedLogs - Array of parsed log objects
 */
function displayParsedFields(parsedLogs) {
    const container = document.getElementById('parsed-fields-container');
    container.innerHTML = '';

    if (!parsedLogs || parsedLogs.length === 0) {
        return;
    }

    // For single log, show detailed field table
    if (parsedLogs.length === 1) {
        const table = createFieldTable(parsedLogs[0]);
        container.appendChild(table);
    } else {
        // For multiple logs, show summary
        parsedLogs.forEach((log, index) => {
            const logHeader = document.createElement('h4');
            logHeader.textContent = `Log Entry ${index + 1}`;
            logHeader.style.marginTop = index > 0 ? '1.5rem' : '0';
            logHeader.style.marginBottom = '0.5rem';
            container.appendChild(logHeader);

            const table = createFieldTable(log);
            container.appendChild(table);
        });
    }
}

/**
 * Create field table for a single parsed log
 * @param {object} parsedLog - Parsed log object
 * @returns {HTMLElement} Table element
 */
function createFieldTable(parsedLog) {
    const table = document.createElement('table');
    table.className = 'parsed-fields-table';

    // Create header
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <tr>
      <th>Field</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
  `;
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');

    Object.entries(parsedLog).forEach(([field, value]) => {
        // Skip internal metadata fields (those starting with underscore)
        if (field.startsWith('_')) {
            return;
        }

        const fieldInfo = logKnowledge[field] || { description: 'Unknown field', category: 'default' };

        const row = document.createElement('tr');
        row.className = `field-category-${fieldInfo.category}`;
        row.innerHTML = `
      <td>
        <span class="field-indicator"></span>
        <strong>${field}</strong>
      </td>
      <td class="field-value">${escapeHtml(String(value))}</td>
      <td>${fieldInfo.description || 'No description available'}</td>
    `;

        // Add click handler to show detailed info
        row.addEventListener('click', () => showFieldDetails(field, value, fieldInfo));

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

/**
 * Show detailed field information
 * @param {string} field - Field name
 * @param {any} value - Field value
 * @param {object} fieldInfo - Field metadata
 */
function showFieldDetails(field, value, fieldInfo) {
    // Reuse the existing info panel from query mode
    const infoPanel = document.getElementById('info-panel');
    const infoPanelTitle = document.getElementById('info-panel-title');
    const infoPanelContent = document.getElementById('info-panel-content');

    infoPanelTitle.textContent = field;

    let content = `
    <div class="info-panel-row">
      <div class="info-panel-label">Value</div>
      <div class="info-panel-value"><code>${escapeHtml(String(value))}</code></div>
    </div>
    <div class="info-panel-row">
      <div class="info-panel-label">Description</div>
      <div class="info-panel-value">${fieldInfo.description || 'No description available'}</div>
    </div>
    <div class="info-panel-row">
      <div class="info-panel-label">Category</div>
      <div class="info-panel-value">${fieldInfo.category || 'default'}</div>
    </div>
  `;

    if (fieldInfo.examples) {
        content += `
      <div class="info-panel-row">
        <div class="info-panel-label">Examples</div>
        <div class="info-panel-value">${fieldInfo.examples.join(', ')}</div>
      </div>
    `;
    }

    infoPanelContent.innerHTML = content;
    infoPanel.style.display = 'block';
}

/**
 * Display statistics for multiple logs
 * @param {Array} parsedLogs - Array of parsed log objects
 */
function displayStatistics(parsedLogs) {
    const section = document.querySelector('.log-statistics-section');
    const container = document.getElementById('log-statistics-container');

    section.style.display = 'block';

    // Calculate statistics
    const stats = {
        totalLogs: parsedLogs.length,
        uniqueSourceIPs: new Set(parsedLogs.map(log => log.srcip).filter(Boolean)).size,
        uniqueDestIPs: new Set(parsedLogs.map(log => log.dstip).filter(Boolean)).size,
        actions: {}
    };

    // Count actions
    parsedLogs.forEach(log => {
        if (log.action) {
            stats.actions[log.action] = (stats.actions[log.action] || 0) + 1;
        }
    });

    // Create stats grid
    container.innerHTML = `
    <div class="stat-grid">
      <div class="stat-item">
        <div class="stat-label">Total Logs</div>
        <div class="stat-value">${stats.totalLogs}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Unique Source IPs</div>
        <div class="stat-value">${stats.uniqueSourceIPs}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Unique Dest IPs</div>
        <div class="stat-value">${stats.uniqueDestIPs}</div>
      </div>
      ${Object.entries(stats.actions).map(([action, count]) => `
        <div class="stat-item">
          <div class="stat-label">Action: ${action}</div>
          <div class="stat-value">${count}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Hide statistics section
 */
function hideStatistics() {
    const section = document.querySelector('.log-statistics-section');
    section.style.display = 'none';
}

/**
 * Clear parsed fields display
 */
function clearParsedFields() {
    const container = document.getElementById('parsed-fields-container');
    container.innerHTML = '';
    hideStatistics();
}

/**
 * Load example logs for current format
 */
function loadLogExamples() {
    const examplesGrid = document.getElementById('log-examples-grid');
    const formats = getAllLogFormats();

    examplesGrid.innerHTML = '';

    // Show examples from all formats
    formats.forEach(format => {
        if (format.examples && format.examples.length > 0) {
            format.examples.forEach(example => {
                const card = document.createElement('div');
                card.className = 'example-card';
                card.innerHTML = `
          <div class="example-title">${format.emoji} ${format.name}: ${example.title}</div>
          <div class="example-query">${example.log.substring(0, 100)}...</div>
        `;

                card.addEventListener('click', () => {
                    // Switch to log mode if not already
                    if (currentMode !== 'log') {
                        switchMode('log');
                    }

                    // Set format
                    const selector = document.getElementById('log-format-selector');
                    selector.value = format.id;
                    selector.dispatchEvent(new Event('change'));

                    // Set log text
                    const logInput = document.getElementById('log-input');
                    logInput.value = example.log;
                    logInput.dispatchEvent(new Event('input'));

                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                examplesGrid.appendChild(card);
            });
        }
    });
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - 'success', 'warning', or 'error'
 */
function showNotification(message, type = 'info') {
    // Simple console notification for now
    // Could be enhanced with a toast notification UI
    console.log(`[${type.toUpperCase()}] ${message}`);

    // For errors and warnings, also alert the user
    if (type === 'error') {
        alert(`Error: ${message}`);
    }
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

// Main application logic

import { parseKQL } from './parsers/statements/app.js';
import { getLanguage, getAllLanguages, getDefaultLanguage } from './languages.js';
import { initLogMode } from './log-mode.js';
import { initRegexMode } from './regex-mode.js';
import { initEmailMode } from './email-mode.js';

// Current language state
let currentLanguage = null;
let currentParser = null;

// DOM elements
let queryInput;
let explanationContainer;
let examplesGrid;
let languageSelector;
let languageName;
let languageDescription;

// Debounce timer
let debounceTimer;

/**
 * Initialize the application
 */
async function init() {
    // Get DOM elements
    queryInput = document.getElementById('query-input');
    explanationContainer = document.getElementById('explanation-container');
    examplesGrid = document.getElementById('examples-grid');
    languageSelector = document.getElementById('language-selector');
    languageName = document.getElementById('language-name');
    languageDescription = document.getElementById('language-description');

    // Populate language selector
    populateLanguageSelector();

    // Set up event listeners
    queryInput.addEventListener('input', handleQueryInput);
    languageSelector.addEventListener('change', handleLanguageChange);

    // Setup mode switching
    setupModeSwitching();

    // Determine initial language
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('selectedLanguage');
    const initialLangId = urlLang || savedLang || 'kql';

    // Load initial language
    await loadLanguage(initialLangId);

    // Initialize modes (without their internal listeners)
    initLogMode();
    initRegexMode();
    initEmailMode();

    // Check for initial query
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
        queryInput.value = initialQuery;
        updateExplanation(initialQuery);
    }
}

/**
 * Populate language selector dropdown
 */
function populateLanguageSelector() {
    const languages = getAllLanguages();
    languageSelector.innerHTML = '';

    // Group languages by category
    const grouped = {};
    languages.forEach(lang => {
        const category = lang.category || 'Other';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(lang);
    });

    // Add optgroups for each category
    Object.keys(grouped).sort().forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;

        // Sort languages alphabetically within category
        grouped[category].sort((a, b) => a.name.localeCompare(b.name)).forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.id;
            option.textContent = `${lang.icon} ${lang.name}`;
            optgroup.appendChild(option);
        });

        languageSelector.appendChild(optgroup);
    });
}

/**
 * Handle language change
 */
async function handleLanguageChange(event) {
    const langId = event.target.value;
    await loadLanguage(langId);

    // Update URL parameter
    const url = new URL(window.location);
    url.searchParams.set('lang', langId);
    window.history.pushState({}, '', url);

    // Save to localStorage
    localStorage.setItem('selectedLanguage', langId);

    // Clear current query
    queryInput.value = '';
    updateExplanation('');
}

/**
 * Load a language module
 */
async function loadLanguage(langId) {
    const language = getLanguage(langId);
    currentLanguage = language;

    // Update UI
    languageSelector.value = langId;
    languageName.textContent = language.name;
    languageDescription.textContent = language.description;
    queryInput.placeholder = language.placeholder;

    // Update input label
    const queryInputLabel = document.getElementById('query-input-label');
    if (queryInputLabel) {
        queryInputLabel.textContent = `Enter your ${language.name} query:`;
    }

    // Update page title
    document.title = `${language.name} - Inspector`;

    // Load parser
    if (langId === 'kql') {
        currentParser = parseKQL;
    } else if (langId === 'sql') {
        const { parseSQL } = await import('./parsers/statements/sql-parser.js');
        currentParser = parseSQL;
    } else if (langId === 'promql') {
        const { parsePromQL } = await import('./parsers/statements/promql-parser.js');
        currentParser = parsePromQL;
    } else if (langId === 'powershell') {
        const { parsePowerShell } = await import('./parsers/statements/powershell-parser.js');
        currentParser = parsePowerShell;
    } else if (langId === 'fortios') {
        const { tokenize, getExplanation } = await import('./knowledge/statements/fortios.js');
        // Create parser function that returns tokens with explanations
        currentParser = (query) => {
            const tokens = tokenize(query);
            return tokens.map(token => ({
                ...token,
                explanation: getExplanation(token.value, token.type)
            }));
        };
    } else if (langId === 'graphql') {
        const { parseGraphQL } = await import('./parsers/statements/graphql-parser.js');
        currentParser = parseGraphQL;
    } else if (langId === 'mongodb') {
        const { parseMongoDB } = await import('./parsers/statements/mongodb-parser.js');
        currentParser = parseMongoDB;
    } else if (langId === 'elasticsearch') {
        const { parseElasticsearch } = await import('./parsers/statements/elasticsearch-parser.js');
        currentParser = parseElasticsearch;
    } else if (langId === 'odata') {
        const { parseOData } = await import('./parsers/statements/odata-parser.js');
        currentParser = parseOData;
    } else if (langId === 'cql') {
        const { parseCQL } = await import('./parsers/statements/cql-parser.js');
        currentParser = parseCQL;
    } else if (langId === 'cypher') {
        const { parseCypher } = await import('./parsers/statements/cypher-parser.js');
        currentParser = parseCypher;
    } else if (langId === 'fortios') {
        const { tokenize, getExplanation } = await import('./knowledge/statements/fortios.js');
        currentParser = (query) => {
            const tokens = tokenize(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' ? getExplanation(query) : null
            }));
        };
    } else if (langId === 'panos') {
        const { tokenize, getExplanation } = await import('./knowledge/statements/panos.js');
        currentParser = (query) => {
            const tokens = tokenize(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'bash') {
        const { parseBash } = await import('./parsers/statements/bash-parser.js');
        const { getExplanation } = await import('./knowledge/statements/bash.js');
        currentParser = (query) => {
            const tokens = parseBash(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'terraform') {
        const { parseTerraform } = await import('./parsers/statements/terraform-parser.js');
        const { getExplanation } = await import('./knowledge/statements/terraform.js');
        currentParser = (query) => {
            const tokens = parseTerraform(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'qql') {
        const { parseQQL } = await import('./parsers/statements/qql-parser.js');
        const { getExplanation } = await import('./knowledge/statements/qql.js');
        currentParser = (query) => {
            const tokens = parseQQL(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'spl') {
        const { parseSPL } = await import('./parsers/statements/spl-parser.js');
        const { getExplanation } = await import('./knowledge/statements/spl.js');
        currentParser = (query) => {
            const tokens = parseSPL(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'aql') {
        const { parseAQL } = await import('./parsers/statements/aql-parser.js');
        const { getExplanation } = await import('./knowledge/statements/aql.js');
        currentParser = (query) => {
            const tokens = parseAQL(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'eql') {
        const { parseEQL } = await import('./parsers/statements/eql-parser.js');
        const { getExplanation } = await import('./knowledge/statements/eql.js');
        currentParser = (query) => {
            const tokens = parseEQL(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'osquery') {
        const { parseOSQuery } = await import('./parsers/statements/osquery-parser.js');
        const { getExplanation } = await import('./knowledge/statements/osquery.js');
        currentParser = (query) => {
            const tokens = parseOSQuery(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else if (langId === 'yaral') {
        const { parseYaraL } = await import('./parsers/statements/yaral-parser.js');
        const { getExplanation } = await import('./knowledge/statements/yaral.js');
        currentParser = (query) => {
            const tokens = parseYaraL(query);
            return tokens.map(token => ({
                ...token,
                explanation: token.type !== 'whitespace' && token.type !== 'comment' ? getExplanation(token.value, token.type) : null
            }));
        };
    } else {
        currentParser = null;
    }

    // Update examples
    renderExamples();
}

/**
 * Handle query input with debouncing
 */
function handleQueryInput(event) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        updateExplanation(event.target.value);
    }, 300);
}

/**
 * Update the explanation display
 */
function updateExplanation(query) {
    if (!query || query.trim() === '') {
        explanationContainer.innerHTML = '<div class="explanation-empty">Enter a query above to see a detailed explanation</div>';
        return;
    }

    if (!currentParser) {
        explanationContainer.innerHTML = '<div class="explanation-empty">Parser for this language is not yet implemented</div>';
        return;
    }

    try {
        const tokens = currentParser(query);
        renderExplanation(tokens);
    } catch (error) {
        console.error('Error parsing query:', error);
        explanationContainer.innerHTML = '<div class="explanation-empty">Unable to parse query. Please check your syntax.</div>';
    }
}

/**
 * Render the explanation with tokens
 */
function renderExplanation(tokens) {
    const queryDisplay = document.createElement('div');
    queryDisplay.className = 'query-display';

    tokens.forEach(token => {
        if (token.type === 'whitespace') {
            // Preserve whitespace
            const span = document.createElement('span');
            span.textContent = token.value;
            queryDisplay.appendChild(span);
        } else {
            // Create token element with tooltip
            const tokenEl = createTokenElement(token);
            queryDisplay.appendChild(tokenEl);
        }
    });

    explanationContainer.innerHTML = '';
    explanationContainer.appendChild(queryDisplay);
}

/**
 * Create a token element with tooltip
 */
function createTokenElement(token) {
    const span = document.createElement('span');
    span.className = `token token-${token.type}`;
    span.textContent = token.value;

    // Add click handler if we have explanation data
    if (token.explanation) {
        // Click to show info panel
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            showInfoPanel(token.value, token.explanation);
        });
    }

    return span;
}

/**
 * Show info panel with token details
 */
function showInfoPanel(tokenValue, explanation) {
    const infoPanel = document.getElementById('info-panel');
    const infoPanelTitle = document.getElementById('info-panel-title');
    const infoPanelContent = document.getElementById('info-panel-content');
    const infoPanelClose = document.getElementById('info-panel-close');

    // Set title
    infoPanelTitle.textContent = tokenValue;

    // Build content
    let content = '';

    if (explanation.description) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Description</div>
                <div class="info-panel-value">${explanation.description}</div>
            </div>
        `;
    }

    if (explanation.syntax) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Syntax</div>
                <div class="info-panel-value"><code>${explanation.syntax}</code></div>
            </div>
        `;
    }

    if (explanation.details) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Details</div>
                <div class="info-panel-value">${explanation.details}</div>
            </div>
        `;
    }

    if (explanation.example) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Example</div>
                <div class="info-panel-value"><code>${explanation.example}</code></div>
            </div>
        `;
    }

    if (explanation.docUrl) {
        content += `
            <div class="info-panel-row">
                <a href="${explanation.docUrl}" target="_blank" rel="noopener noreferrer" class="info-panel-link">
                    📚 View Official Documentation →
                </a>
            </div>
        `;
    }

    infoPanelContent.innerHTML = content;

    // Show panel
    infoPanel.style.display = 'block';

    // Scroll to panel on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Close button handler (only attach once)
    if (!infoPanelClose.hasAttribute('data-listener')) {
        infoPanelClose.setAttribute('data-listener', 'true');
        infoPanelClose.addEventListener('click', () => {
            infoPanel.style.display = 'none';
        });
    }
}

/**
 * Render example queries for current language
 */
function renderExamples() {
    examplesGrid.innerHTML = '';

    if (!currentLanguage || !currentLanguage.examples) {
        return;
    }

    currentLanguage.examples.forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const title = document.createElement('div');
        title.className = 'example-title';
        title.textContent = example.title;

        const query = document.createElement('div');
        query.className = 'example-query';
        query.textContent = example.query;

        card.appendChild(title);
        card.appendChild(query);

        // Click handler
        card.addEventListener('click', () => {
            queryInput.value = example.query;
            updateExplanation(example.query);
            queryInput.focus();
            // Scroll to top on mobile
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Keyboard handler
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        examplesGrid.appendChild(card);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Setup centralized mode switching
 */
function setupModeSwitching() {
    const modes = ['query', 'log', 'regex', 'email'];
    const buttons = {};
    const containers = {};

    // Get elements
    modes.forEach(mode => {
        buttons[mode] = document.getElementById(`${mode}-mode-btn`);
        containers[mode] = document.getElementById(`${mode}-mode-container`);

        // Attach listener
        if (buttons[mode]) {
            buttons[mode].addEventListener('click', () => switchMode(mode));
        }
    });

    // Check URL or localStorage for initial mode
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('mode');
    const savedMode = localStorage.getItem('selectedMode');

    // Default to 'query' only if no URL mode and no saved mode, or if they are invalid
    let initialMode = 'query';
    if (urlMode && modes.includes(urlMode)) {
        initialMode = urlMode;
    } else if (savedMode && modes.includes(savedMode)) {
        initialMode = savedMode;
    }

    switchMode(initialMode, false); // Don't push state on initial load
}

/**
 * Switch application mode
 * @param {string} modeId - The mode to switch to ('query', 'log', 'regex', 'email')
 * @param {boolean} updateHistory - Whether to push a new history state
 */
export function switchMode(modeId, updateHistory = true) {
    const modes = ['query', 'log', 'regex', 'email'];

    modes.forEach(mode => {
        const btn = document.getElementById(`${mode}-mode-btn`);
        const container = document.getElementById(`${mode}-mode-container`);

        if (mode === modeId) {
            if (btn) btn.classList.add('active');
            if (container) container.classList.add('active');
        } else {
            if (btn) btn.classList.remove('active');
            if (container) container.classList.remove('active');
        }
    });

    // Save to localStorage
    localStorage.setItem('selectedMode', modeId);

    // Update URL if requested
    if (updateHistory) {
        const url = new URL(window.location);
        url.searchParams.set('mode', modeId);
        window.history.pushState({}, '', url);
    }
}


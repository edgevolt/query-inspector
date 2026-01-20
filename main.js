// Main application logic

import { parseKQL } from './app.js';
import { getLanguage, getAllLanguages, getDefaultLanguage } from './languages.js';

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

    // Determine initial language
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('selectedLanguage');
    const initialLangId = urlLang || savedLang || 'kql';

    // Load initial language
    await loadLanguage(initialLangId);

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

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.id;
        option.textContent = `${lang.icon} ${lang.name}`;
        languageSelector.appendChild(option);
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
        const { parseSQL } = await import('./sql-parser.js');
        currentParser = parseSQL;
    } else if (langId === 'promql') {
        const { parsePromQL } = await import('./promql-parser.js');
        currentParser = parsePromQL;
    } else if (langId === 'powershell') {
        const { parsePowerShell } = await import('./powershell-parser.js');
        currentParser = parsePowerShell;
    } else if (langId === 'fortios') {
        const { tokenize, getExplanation } = await import('./languages/fortios.js');
        // Create parser function that returns tokens with explanations
        currentParser = (query) => {
            const tokens = tokenize(query);
            return tokens.map(token => ({
                ...token,
                explanation: getExplanation(token.value, token.type)
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

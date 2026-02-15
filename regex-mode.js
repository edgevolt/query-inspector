/**
 * Regex Mode Handler
 * Handles all regex mode functionality including pattern parsing,
 * test string matching, and example patterns
 */

import { parseRegex, validatePattern, getPatternComplexity } from './parsers/regex/regex-parser.js';
import regexKB from './knowledge/regex/regex-kb.js';

// Import helper functions (we'll inline them since they're not exported)
// These are defined at the bottom of this file

// DOM elements
let patternInput;
let testInput;
let breakdownContainer;
let matchesContainer;
let matchesSection;
let groupsContainer;
let groupsSection;
let matchStatsDiv;
let examplesGrid;
let cheatsheetContent;
let flagCheckboxes = {};

// Current state
let currentPattern = '';
let currentFlags = 'g';
let debounceTimer;

/**
 * Initialize regex mode
 */
export function initRegexMode() {
    // Get DOM elements
    patternInput = document.getElementById('regex-pattern-input');
    testInput = document.getElementById('regex-test-input');
    breakdownContainer = document.getElementById('regex-breakdown-container');
    matchesContainer = document.getElementById('regex-matches-container');
    matchesSection = document.querySelector('.regex-matches-section');
    groupsContainer = document.getElementById('regex-groups-container');
    groupsSection = document.querySelector('.regex-groups-section');
    matchStatsDiv = document.getElementById('regex-match-stats');
    examplesGrid = document.getElementById('regex-examples-grid');
    cheatsheetContent = document.getElementById('regex-cheatsheet-content');

    // Get flag checkboxes
    ['i', 'g', 'm', 's', 'u', 'y'].forEach(flag => {
        flagCheckboxes[flag] = document.getElementById(`flag-${flag}`);
    });

    // Set up event listeners
    patternInput.addEventListener('input', handlePatternInput);
    testInput.addEventListener('input', handleTestInput);

    // Flag checkboxes
    Object.values(flagCheckboxes).forEach(checkbox => {
        checkbox.addEventListener('change', handleFlagsChange);
    });

    // Info panel close button
    const infoPanelClose = document.getElementById('regex-info-panel-close');
    if (infoPanelClose) {
        infoPanelClose.addEventListener('click', () => {
            const infoPanelSection = document.querySelector('.regex-info-section');
            if (infoPanelSection) {
                infoPanelSection.style.display = 'none';
            }
        });
    }

    // Mode toggle handled in main.js

    // Render examples and cheat sheet
    renderExamples();
    renderCheatSheet();
}



/**
 * Handle pattern input with debouncing
 */
function handlePatternInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentPattern = patternInput.value;
        updatePatternBreakdown();
        updateMatches();
    }, 300);
}

/**
 * Handle test string input
 */
function handleTestInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        updateMatches();
    }, 300);
}

/**
 * Handle flags change
 */
function handleFlagsChange() {
    currentFlags = '';
    Object.entries(flagCheckboxes).forEach(([flag, checkbox]) => {
        if (checkbox.checked) {
            currentFlags += flag;
        }
    });
    updateMatches();
}

/**
 * Update pattern breakdown display
 */
function updatePatternBreakdown() {
    if (!currentPattern || currentPattern.trim() === '') {
        breakdownContainer.innerHTML = '<div class="explanation-empty">Enter a regex pattern above to see a detailed breakdown</div>';
        return;
    }

    // Validate pattern
    const validation = validatePattern(currentPattern);
    if (!validation.valid) {
        breakdownContainer.innerHTML = `<div class="explanation-empty" style="color: #dc2626;">Invalid pattern: ${validation.error}</div>`;
        return;
    }

    try {
        const tokens = parseRegex(currentPattern);
        renderPatternBreakdown(tokens);
    } catch (error) {
        console.error('Error parsing pattern:', error);
        breakdownContainer.innerHTML = '<div class="explanation-empty">Unable to parse pattern</div>';
    }
}

/**
 * Render pattern breakdown with tokens
 */
function renderPatternBreakdown(tokens) {
    const display = document.createElement('div');
    display.className = 'query-display';

    tokens.forEach(token => {
        const tokenEl = createTokenElement(token);
        display.appendChild(tokenEl);
    });

    breakdownContainer.innerHTML = '';
    breakdownContainer.appendChild(display);
}

/**
 * Create a token element with click handler
 */
function createTokenElement(token) {
    const span = document.createElement('span');
    span.className = `token token-${token.type}`;
    span.textContent = token.value;
    span.style.cursor = 'pointer';
    span.title = 'Click to see explanation';

    // Add click handler for explanation
    span.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Token clicked:', token);
        showTokenExplanation(token);
    });

    return span;
}

/**
 * Show token explanation in info panel
 */
function showTokenExplanation(token) {
    console.log('showTokenExplanation called with token:', token);

    const infoPanel = document.getElementById('regex-info-panel');
    const infoPanelSection = document.querySelector('.regex-info-section');
    const infoPanelTitle = document.getElementById('regex-info-panel-title');
    const infoPanelContent = document.getElementById('regex-info-panel-content');

    console.log('Info panel elements:', { infoPanel, infoPanelSection, infoPanelTitle, infoPanelContent });

    // Get explanation from knowledge base
    const explanation = getExplanationForToken(token);

    console.log('Explanation:', explanation);

    infoPanelTitle.textContent = token.value;

    let content = '';

    // Add "What This Does" section for groups and complex patterns
    const whatItDoes = getWhatItDoes(token);
    if (whatItDoes) {
        content += `
            <div class="info-panel-row" style="background: rgba(0, 92, 197, 0.05); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md);">
                <div class="info-panel-label" style="color: var(--color-function); font-weight: 700;">💡 What This Does</div>
                <div class="info-panel-value" style="font-size: var(--font-size-base); line-height: 1.6;">${whatItDoes}</div>
            </div>
        `;
    }

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
                <div class="info-panel-value"><code>${escapeHtml(explanation.syntax)}</code></div>
            </div>
        `;
    }

    if (explanation.example) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Example</div>
                <div class="info-panel-value">${escapeHtml(explanation.example)}</div>
            </div>
        `;
    }

    if (explanation.matches) {
        content += `
            <div class="info-panel-row">
                <div class="info-panel-label">Matches</div>
                <div class="info-panel-value">${escapeHtml(explanation.matches)}</div>
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

    if (explanation.docUrl) {
        content += `
            <div class="info-panel-row">
                <a href="${explanation.docUrl}" target="_blank" rel="noopener noreferrer" class="info-panel-link">
                    📚 View Documentation →
                </a>
            </div>
        `;
    }

    infoPanelContent.innerHTML = content;
    infoPanelSection.style.display = 'block';
    infoPanel.style.display = 'block';
    console.log('Info panel display set to block. Panel should now be visible.');
    console.log('Panel computed style:', window.getComputedStyle(infoPanel).display);

    // Scroll to the info panel so it's visible
    setTimeout(() => {
        infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Get a plain-English explanation of what a specific pattern section does
 */
function getWhatItDoes(token) {
    const value = token.value;
    const type = token.type;

    // Groups - explain the content
    if (type.startsWith('group')) {
        if (value.startsWith('(?:')) {
            const inner = value.slice(3, -1);
            return `This is a <strong>non-capturing group</strong> that matches <code>${escapeHtml(inner)}</code> without saving it. Use this when you need grouping for alternation or quantifiers but don't need to reference the match later.`;
        }
        if (value.startsWith('(?<') || value.startsWith("(?'")) {
            const nameMatch = value.match(/\?<([^>]+)>/) || value.match(/\?'([^']+)'/);
            const name = nameMatch ? nameMatch[1] : 'unknown';
            const inner = value.slice(value.indexOf('>') + 1, -1) || value.slice(value.indexOf("'", 2) + 1, -1);
            return `This is a <strong>named capturing group</strong> called "<code>${escapeHtml(name)}</code>" that matches <code>${escapeHtml(inner)}</code>. You can reference this match by name instead of by number, making your regex more readable.`;
        }
        if (value.startsWith('(?=')) {
            const inner = value.slice(3, -1);
            return `This is a <strong>positive lookahead</strong> that checks if <code>${escapeHtml(inner)}</code> appears ahead <em>without consuming characters</em>. The match continues from the same position. Useful for "followed by" conditions.`;
        }
        if (value.startsWith('(?!')) {
            const inner = value.slice(3, -1);
            return `This is a <strong>negative lookahead</strong> that checks that <code>${escapeHtml(inner)}</code> does <em>NOT</em> appear ahead. The match only succeeds if this pattern is absent. Useful for "not followed by" conditions.`;
        }
        if (value.startsWith('(?<=')) {
            const inner = value.slice(4, -1);
            return `This is a <strong>positive lookbehind</strong> that checks if <code>${escapeHtml(inner)}</code> appears behind the current position. The match only succeeds if this pattern precedes it. Useful for "preceded by" conditions.`;
        }
        if (value.startsWith('(?<!')) {
            const inner = value.slice(4, -1);
            return `This is a <strong>negative lookbehind</strong> that checks that <code>${escapeHtml(inner)}</code> does <em>NOT</em> appear behind. The match only succeeds if this pattern is absent before. Useful for "not preceded by" conditions.`;
        }
        if (value.startsWith('(?>')) {
            const inner = value.slice(3, -1);
            return `This is an <strong>atomic group</strong> that matches <code>${escapeHtml(inner)}</code> and prevents backtracking. Once matched, the regex engine won't reconsider this group even if the rest of the pattern fails. Improves performance but can prevent valid matches.`;
        }
        if (value.startsWith('(?(')) {
            return `This is a <strong>conditional pattern</strong> that matches different patterns based on whether a condition is true. Format: <code>(?(condition)yes-pattern|no-pattern)</code>. Advanced feature not supported in JavaScript.`;
        }
        // Regular capturing group - explain what's inside
        const inner = value.slice(1, -1);
        const innerExplanation = explainPatternContent(inner);
        return `This is a <strong>capturing group</strong> that matches the following pattern and saves the result:<br><br>${innerExplanation}<br><br>You can reference this match later using backreferences like <code>\\1</code> or in replacement strings.`;
    }

    // Character sets
    if (type === 'character-set') {
        if (value.startsWith('[^')) {
            const chars = value.slice(2, -1);
            const breakdown = explainCharacterSetContent(chars);
            return `This matches <strong>any single character EXCEPT</strong> those in the set. The <code>^</code> negates the set.<br><br>${breakdown}`;
        }
        const chars = value.slice(1, -1);
        const breakdown = explainCharacterSetContent(chars);
        return `This matches <strong>any single character</strong> from this set:<br><br>${breakdown}`;
    }

    // Quantifiers - explain repetition
    if (type.startsWith('quantifier')) {
        if (value === '*') return `Matches the preceding element <strong>0 or more times</strong> (greedy). Will match as many as possible.`;
        if (value === '+') return `Matches the preceding element <strong>1 or more times</strong> (greedy). Requires at least one match.`;
        if (value === '?') return `Matches the preceding element <strong>0 or 1 time</strong>. Makes it optional.`;
        if (value === '*?') return `Matches the preceding element <strong>0 or more times</strong> (lazy). Will match as few as possible.`;
        if (value === '+?') return `Matches the preceding element <strong>1 or more times</strong> (lazy). Will match as few as possible while still matching at least once.`;
        if (value === '??') return `Matches the preceding element <strong>0 or 1 time</strong> (lazy). Prefers not matching when possible.`;

        const exactMatch = value.match(/^\{(\d+)\}$/);
        if (exactMatch) {
            return `Matches the preceding element <strong>exactly ${exactMatch[1]} times</strong>. No more, no less.`;
        }

        const minMatch = value.match(/^\{(\d+),\}(\?)?$/);
        if (minMatch) {
            const lazy = minMatch[2] ? ' (lazy - matches as few as possible)' : ' (greedy - matches as many as possible)';
            return `Matches the preceding element <strong>${minMatch[1]} or more times</strong>${lazy}.`;
        }

        const rangeMatch = value.match(/^\{(\d+),(\d+)\}(\?)?$/);
        if (rangeMatch) {
            const lazy = rangeMatch[3] ? ' (lazy - prefers minimum)' : ' (greedy - prefers maximum)';
            return `Matches the preceding element <strong>between ${rangeMatch[1]} and ${rangeMatch[2]} times</strong>${lazy}.`;
        }
    }

    // Anchors
    if (type === 'anchor') {
        if (value === '^') return `Matches the <strong>start of the string</strong> (or start of a line in multiline mode). Ensures the pattern starts at the beginning.`;
        if (value === '$') return `Matches the <strong>end of the string</strong> (or end of a line in multiline mode). Ensures the pattern ends at the end.`;
        if (value === '\\A') return `Matches the <strong>absolute start of the string</strong>. Unlike <code>^</code>, this is not affected by multiline mode.`;
        if (value === '\\Z') return `Matches the <strong>end of the string</strong> (or before a final newline). Not affected by multiline mode.`;
        if (value === '\\z') return `Matches the <strong>absolute end of the string</strong>. Stricter than <code>\\Z</code>.`;
    }

    // Boundaries
    if (type === 'boundary') {
        if (value === '\\b') return `Matches a <strong>word boundary</strong> - the position between a word character (<code>\\w</code>) and a non-word character. Useful for matching whole words only.`;
        if (value === '\\B') return `Matches a <strong>non-word boundary</strong> - a position that is NOT at a word boundary. Matches within words.`;
        if (value === '\\G') return `Matches at the position where the <strong>previous match ended</strong>. Useful for continuous matching in parsers.`;
    }

    // Backreferences
    if (type.startsWith('backreference')) {
        if (value.startsWith('\\k')) {
            const nameMatch = value.match(/\\k<([^>]+)>/) || value.match(/\\k'([^']+)'/);
            const name = nameMatch ? nameMatch[1] : 'unknown';
            return `Matches the <strong>same text</strong> that was captured by the group named "<code>${escapeHtml(name)}</code>". Ensures the same content appears again.`;
        }
        const num = value.slice(1);
        return `Matches the <strong>same text</strong> that was captured by group ${num}. Ensures the same content appears again (e.g., for matching repeated words or balanced quotes).`;
    }

    // Character classes
    if (type === 'character-class') {
        if (value === '.') return `Matches <strong>any single character</strong> except newline (unless in dotall mode with the <code>s</code> flag).`;
        if (value === '\\d') return `Matches any <strong>digit</strong> (0-9). Equivalent to <code>[0-9]</code>.`;
        if (value === '\\D') return `Matches any <strong>non-digit</strong> character. Equivalent to <code>[^0-9]</code>.`;
        if (value === '\\w') return `Matches any <strong>word character</strong>: letters, digits, or underscore. Equivalent to <code>[A-Za-z0-9_]</code>.`;
        if (value === '\\W') return `Matches any <strong>non-word character</strong>: anything except letters, digits, or underscore.`;
        if (value === '\\s') return `Matches any <strong>whitespace character</strong>: space, tab, newline, etc.`;
        if (value === '\\S') return `Matches any <strong>non-whitespace character</strong>: any visible character.`;
    }

    // Alternation
    if (type === 'alternation') {
        return `This is the <strong>OR operator</strong>. Matches either the pattern on the left OR the pattern on the right. Tries left to right, and stops at the first match.`;
    }

    return null;
}

/**
 * Explain the contents of a character set in detail
 */
function explainCharacterSetContent(chars) {
    const parts = [];
    let i = 0;

    while (i < chars.length) {
        // Check for range (e.g., a-z, A-Z, 0-9)
        if (i + 2 < chars.length && chars[i + 1] === '-' && chars[i] !== '\\') {
            const start = chars[i];
            const end = chars[i + 2];

            // Describe the range
            let rangeDesc = '';
            if (start >= 'a' && end <= 'z') {
                rangeDesc = 'lowercase letters';
            } else if (start >= 'A' && end <= 'Z') {
                rangeDesc = 'uppercase letters';
            } else if (start >= '0' && end <= '9') {
                rangeDesc = 'digits';
            } else {
                rangeDesc = `characters from "<strong>${start}</strong>" through "<strong>${end}</strong>"`;
            }

            parts.push(`• <code>${escapeHtml(start)}-${escapeHtml(end)}</code> = Any ${rangeDesc} (${describeRange(start, end)})`);
            i += 3;
        }
        // Check for escape sequences
        else if (chars[i] === '\\' && i + 1 < chars.length) {
            const escapeChar = chars[i + 1];
            let escapeDesc = '';

            if (escapeChar === 'd') escapeDesc = 'Any digit (0-9)';
            else if (escapeChar === 'D') escapeDesc = 'Any non-digit';
            else if (escapeChar === 'w') escapeDesc = 'Any word character (letters, digits, underscore)';
            else if (escapeChar === 'W') escapeDesc = 'Any non-word character';
            else if (escapeChar === 's') escapeDesc = 'Any whitespace (space, tab, newline, etc.)';
            else if (escapeChar === 'S') escapeDesc = 'Any non-whitespace';
            else if (escapeChar === 'n') escapeDesc = 'Newline character';
            else if (escapeChar === 'r') escapeDesc = 'Carriage return';
            else if (escapeChar === 't') escapeDesc = 'Tab character';
            else escapeDesc = `Literal "<strong>${escapeChar}</strong>" character`;

            parts.push(`• <code>\\${escapeChar}</code> = ${escapeDesc}`);
            i += 2;
        }
        // Individual character
        else {
            const char = chars[i];
            if (char !== '-') {  // Skip standalone dashes (they're literal)
                parts.push(`• <code>${escapeHtml(char)}</code> = The literal character "<strong>${char}</strong>"`);
            } else {
                parts.push(`• <code>-</code> = The literal dash character`);
            }
            i++;
        }
    }

    if (parts.length === 0) {
        return 'Empty character set';
    }

    return parts.join('<br>');
}

/**
 * Describe a character range with examples
 */
function describeRange(start, end) {
    const examples = [];
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);

    // Show up to 5 examples
    for (let i = startCode; i <= endCode && examples.length < 5; i++) {
        examples.push(String.fromCharCode(i));
    }

    if (endCode - startCode > 4) {
        examples.push('...');
        examples.push(end);
    }

    return examples.join(', ');
}

/**
 * Get explanation for a token from knowledge base
 */
function getExplanationForToken(token) {
    const value = token.value;
    const type = token.type;

    // Character classes
    if (type === 'character-class') {
        return regexKB.characterClasses[value] || null;
    }

    // Quantifiers
    if (type.startsWith('quantifier')) {
        return regexKB.quantifiers[value] || null;
    }

    // Anchors and boundaries
    if (type === 'anchor' || type === 'boundary') {
        return regexKB.anchors[value] || null;
    }

    // Groups
    if (type.startsWith('group')) {
        // Match generic patterns
        if (value.startsWith('(?:')) return regexKB.groups['(?:...)'];
        if (value.startsWith('(?<') || value.startsWith("(?'")) return regexKB.groups['(?<name>...)'];
        if (value.startsWith('(?>')) return regexKB.groups['(?>...)'];
        if (value.startsWith('(?(')) return regexKB.groups['(?(condition)yes|no)'];
        if (value.startsWith('(?#')) return regexKB.groups['(?#comment)'];
        if (value.startsWith('(?|')) return regexKB.groups['(?|...)'];
        return regexKB.groups['(...)'];
    }

    // Assertions
    if (type.startsWith('assertion')) {
        if (value.startsWith('(?=')) return regexKB.assertions['(?=...)'];
        if (value.startsWith('(?!')) return regexKB.assertions['(?!...)'];
        if (value.startsWith('(?<=')) return regexKB.assertions['(?<=...)'];
        if (value.startsWith('(?<!')) return regexKB.assertions['(?<!...)'];
    }

    // Backreferences
    if (type.startsWith('backreference')) {
        if (value.startsWith('\\k')) return regexKB.backreferences['\\k<name>'];
        return regexKB.backreferences['\\1'];
    }

    // Recursion and subroutines
    if (type === 'recursion') {
        return regexKB.backreferences['(?R)'];
    }

    if (type === 'subroutine') {
        return regexKB.backreferences['(?&name)'];
    }

    // Escape sequences
    if (type.startsWith('escape')) {
        return regexKB.escapeSequences[value] || null;
    }

    // Unicode properties
    if (type === 'unicode-property') {
        // Try to match specific property
        for (const [key, val] of Object.entries(regexKB.unicodeProperties)) {
            if (value.includes(key.replace(/\\/g, ''))) {
                return val;
            }
        }
        return regexKB.unicodeProperties['\\p{L}'];
    }

    // Special constructs
    if (type === 'alternation') {
        return regexKB.specialConstructs['|'];
    }

    // Character sets - return a minimal object so getWhatItDoes can explain them
    if (type === 'character-set') {
        return {
            description: 'Character set',
            syntax: value
        };
    }

    // Fallback for any token type - return minimal object so getWhatItDoes can explain
    return {
        description: `${type} token`,
        syntax: value
    };
}

/**
 * Update matches display
 */
function updateMatches() {
    const testString = testInput.value;

    if (!currentPattern || !testString) {
        matchesSection.style.display = 'none';
        groupsSection.style.display = 'none';
        return;
    }

    try {
        const regex = new RegExp(currentPattern, currentFlags);
        const matches = [...testString.matchAll(regex)];

        if (matches.length === 0) {
            matchesContainer.innerHTML = '<div style="color: var(--color-text-muted);">No matches found</div>';
            matchesSection.style.display = 'block';
            groupsSection.style.display = 'none';
            return;
        }

        // Highlight matches in test string
        highlightMatches(testString, matches);

        // Show capture groups if any
        showCaptureGroups(matches);

        // Show statistics
        showMatchStats(matches);

        matchesSection.style.display = 'block';

    } catch (error) {
        matchesContainer.innerHTML = `<div style="color: #dc2626;">Error: ${error.message}</div>`;
        matchesSection.style.display = 'block';
        groupsSection.style.display = 'none';
    }
}

/**
 * Highlight matches in test string
 */
function highlightMatches(text, matches) {
    let result = '';
    let lastIndex = 0;

    matches.forEach((match, i) => {
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;

        // Add text before match
        result += escapeHtml(text.substring(lastIndex, matchStart));

        // Add highlighted match
        result += `<span class="regex-match">${escapeHtml(match[0])}</span>`;

        lastIndex = matchEnd;
    });

    // Add remaining text
    result += escapeHtml(text.substring(lastIndex));

    matchesContainer.innerHTML = result;
}

/**
 * Show capture groups
 */
function showCaptureGroups(matches) {
    // Check if there are any capture groups
    const hasGroups = matches.some(match => match.length > 1 || (match.groups && Object.keys(match.groups).length > 0));

    if (!hasGroups) {
        groupsSection.style.display = 'none';
        return;
    }

    let tableHTML = `
        <table class="regex-groups-table">
            <thead>
                <tr>
                    <th>Match #</th>
                    <th>Group</th>
                    <th>Value</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
    `;

    matches.forEach((match, matchIndex) => {
        // Numbered groups
        for (let i = 1; i < match.length; i++) {
            if (match[i] !== undefined) {
                tableHTML += `
                    <tr>
                        <td>${matchIndex + 1}</td>
                        <td>Group ${i}</td>
                        <td><span class="group-value">${escapeHtml(match[i])}</span></td>
                        <td>${match.index}</td>
                    </tr>
                `;
            }
        }

        // Named groups
        if (match.groups) {
            Object.entries(match.groups).forEach(([name, value]) => {
                if (value !== undefined) {
                    tableHTML += `
                        <tr>
                            <td>${matchIndex + 1}</td>
                            <td>${escapeHtml(name)}</td>
                            <td><span class="group-value">${escapeHtml(value)}</span></td>
                            <td>${match.index}</td>
                        </tr>
                    `;
                }
            });
        }
    });

    tableHTML += '</tbody></table>';

    groupsContainer.innerHTML = tableHTML;
    groupsSection.style.display = 'block';
}

/**
 * Show match statistics
 */
function showMatchStats(matches) {
    const uniqueMatches = new Set(matches.map(m => m[0]));

    matchStatsDiv.innerHTML = `
        <strong>${matches.length}</strong> total match${matches.length !== 1 ? 'es' : ''} found
        ${uniqueMatches.size !== matches.length ? ` (<strong>${uniqueMatches.size}</strong> unique)` : ''}
    `;
}

/**
 * Render example patterns
 */
function renderExamples() {
    const examples = getExamplePatterns();

    examplesGrid.innerHTML = '';

    examples.forEach(example => {
        const card = document.createElement('div');
        card.className = 'example-card';

        const title = document.createElement('div');
        title.className = 'example-title';
        title.textContent = example.title;

        const pattern = document.createElement('div');
        pattern.className = 'example-query';
        pattern.textContent = example.pattern;

        card.appendChild(title);
        card.appendChild(pattern);

        card.addEventListener('click', () => {
            patternInput.value = example.pattern;
            testInput.value = example.testString || '';

            // Set flags
            Object.keys(flagCheckboxes).forEach(flag => {
                flagCheckboxes[flag].checked = example.flags ? example.flags.includes(flag) : flag === 'g';
            });

            handleFlagsChange();
            currentPattern = example.pattern;
            updatePatternBreakdown();
            updateMatches();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        examplesGrid.appendChild(card);
    });
}

/**
 * Render cheat sheet
 */
function renderCheatSheet() {
    let html = '';

    const categories = [
        { title: 'Character Classes', data: regexKB.characterClasses, limit: 10 },
        { title: 'Quantifiers', data: regexKB.quantifiers, limit: 10 },
        { title: 'Anchors', data: regexKB.anchors, limit: 8 },
        { title: 'Groups', data: regexKB.groups, limit: 6 },
        { title: 'Assertions', data: regexKB.assertions, limit: 4 },
        { title: 'Escape Sequences', data: regexKB.escapeSequences, limit: 10 }
    ];

    categories.forEach(category => {
        html += `<div class="cheatsheet-category">`;
        html += `<h4>${category.title}</h4>`;
        html += `<div class="cheatsheet-items">`;

        const entries = Object.entries(category.data).slice(0, category.limit);
        entries.forEach(([pattern, info]) => {
            html += `
                <div class="cheatsheet-item">
                    <span class="cheatsheet-pattern">${escapeHtml(pattern)}</span>
                    <span class="cheatsheet-desc">${info.description || info.name}</span>
                </div>
            `;
        });

        html += `</div></div>`;
    });

    cheatsheetContent.innerHTML = html;
}

/**
 * Get example patterns (25+ examples)
 */
function getExamplePatterns() {
    return [
        // Text Validation
        {
            title: 'Email (Simple)',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            testString: 'user@example.com\ninvalid@\ntest@domain.co.uk',
            flags: 'gm'
        },
        {
            title: 'Phone (US)',
            pattern: '^(\\+1)?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$',
            testString: '+1-555-123-4567\n(555) 123-4567\n5551234567',
            flags: 'gm'
        },
        {
            title: 'URL',
            pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
            testString: 'https://example.com\nhttp://www.test.org/path?query=value',
            flags: 'g'
        },
        {
            title: 'IPv4 Address',
            pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
            testString: '192.168.1.1\n10.0.0.255\n256.1.1.1 (invalid)',
            flags: 'g'
        },
        {
            title: 'Hex Color',
            pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
            testString: '#FF5733\n#abc\n#12345G (invalid)',
            flags: 'g'
        },

        // Date & Time
        {
            title: 'Date (MM/DD/YYYY)',
            pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d{2}\\b',
            testString: '12/25/2023\n1/1/2024\n13/45/2023 (invalid)',
            flags: 'g'
        },
        {
            title: 'Date (YYYY-MM-DD)',
            pattern: '\\b(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\\b',
            testString: '2023-12-25\n2024-01-01\n2023-13-45 (invalid)',
            flags: 'g'
        },
        {
            title: 'Time (24-hour)',
            pattern: '\\b([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?\\b',
            testString: '14:30\n09:05:23\n25:00 (invalid)',
            flags: 'g'
        },

        // Password Validation
        {
            title: 'Password (Strong)',
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            testString: 'Passw0rd!\nweak\nNoSpecial1',
            flags: 'gm'
        },

        // Code & Markup
        {
            title: 'HTML Tag',
            pattern: '<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)',
            testString: '<div class="test">content</div>\n<img src="pic.jpg" />',
            flags: 'gi'
        },
        {
            title: 'HTML Comment',
            pattern: '<!--[\\s\\S]*?-->',
            testString: '<!-- This is a comment -->\n<!-- Multi\nline\ncomment -->',
            flags: 'g'
        },
        {
            title: 'CSS Color (RGB)',
            pattern: 'rgb\\(\\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\s*,\\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\s*,\\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\s*\\)',
            testString: 'rgb(255, 0, 128)\nrgb(0,0,0)\nrgb(256,0,0) (invalid)',
            flags: 'gi'
        },

        // Data Extraction
        {
            title: 'Hashtags',
            pattern: '#[a-zA-Z0-9_]+',
            testString: 'Check out #JavaScript and #WebDev for #coding tips!',
            flags: 'g'
        },
        {
            title: '@Mentions',
            pattern: '@[a-zA-Z0-9_]+',
            testString: 'Thanks @user123 and @developer for the help!',
            flags: 'g'
        },
        {
            title: 'Numbers (Integer)',
            pattern: '-?\\d+',
            testString: '42\n-17\n3.14\n1,234',
            flags: 'g'
        },
        {
            title: 'Numbers (Decimal)',
            pattern: '-?\\d+(\\.\\d+)?',
            testString: '42\n-17.5\n3.14159\n.5',
            flags: 'g'
        },
        {
            title: 'Currency (USD)',
            pattern: '\\$\\d{1,3}(,\\d{3})*(\\.\\d{2})?',
            testString: '$1,234.56\n$42\n$1,000,000.00',
            flags: 'g'
        },
        {
            title: 'Quoted Strings',
            pattern: '"([^"\\\\]|\\\\.)*"',
            testString: '"Hello World"\n"Escaped \\"quotes\\""\n"Multi word string"',
            flags: 'g'
        },

        // Advanced Patterns
        {
            title: 'Duplicate Words',
            pattern: '\\b(\\w+)\\s+\\1\\b',
            testString: 'The the quick brown fox\nThis is is a test',
            flags: 'gi'
        },
        {
            title: 'Whitespace Cleanup',
            pattern: '\\s+',
            testString: 'Too    many     spaces\nand\n\n\nnewlines',
            flags: 'g'
        },
        {
            title: 'File Path (Unix)',
            pattern: '^\\/(?:[^\\/]+\\/)*[^\\/]+$',
            testString: '/home/user/documents/file.txt\n/var/log/system.log',
            flags: 'gm'
        },
        {
            title: 'File Path (Windows)',
            pattern: '^[a-zA-Z]:\\\\(?:[^\\\\]+\\\\)*[^\\\\]+$',
            testString: 'C:\\Users\\Documents\\file.txt\nD:\\Program Files\\app.exe',
            flags: 'gm'
        },
        {
            title: 'MAC Address',
            pattern: '([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})',
            testString: '00:1B:44:11:3A:B7\n00-1B-44-11-3A-B7',
            flags: 'g'
        },
        {
            title: 'Credit Card (Visa)',
            pattern: '4[0-9]{12}(?:[0-9]{3})?',
            testString: '4111111111111111\n4012888888881881',
            flags: 'g'
        },
        {
            title: 'SSN',
            pattern: '\\b\\d{3}-\\d{2}-\\d{4}\\b',
            testString: '123-45-6789\n987-65-4321',
            flags: 'g'
        },
        {
            title: 'ZIP Code (US)',
            pattern: '\\b\\d{5}(-\\d{4})?\\b',
            testString: '12345\n12345-6789\n90210',
            flags: 'g'
        }
    ];
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
/**
 * Explain what a pattern is matching in plain English
 */
function explainPatternContent(pattern) {
    if (!pattern) return 'Empty pattern';

    const parts = [];

    // Check for alternation (|)
    if (pattern.includes('|')) {
        const alternatives = pattern.split('|');
        parts.push(`<strong>Matches any ONE of these alternatives:</strong><br>`);
        alternatives.forEach((alt, i) => {
            parts.push(`<br><strong>Option ${i + 1}:</strong> ${explainSimplePattern(alt)}`);
        });
        return parts.join('');
    }

    return explainSimplePattern(pattern);
}

/**
 * Explain a simple pattern (without top-level alternation)
 */
function explainSimplePattern(pattern) {
    const parts = [];
    let i = 0;

    while (i < pattern.length) {
        // Character class
        if (pattern[i] === '[') {
            const endBracket = findMatchingBracket(pattern, i);
            if (endBracket !== -1) {
                const charSet = pattern.substring(i, endBracket + 1);
                const isNegated = charSet.startsWith('[^');
                const chars = isNegated ? charSet.slice(2, -1) : charSet.slice(1, -1);

                if (isNegated) {
                    parts.push(`• Any character <strong>EXCEPT</strong>: ${describeCharSet(chars)}`);
                } else {
                    parts.push(`• Any character from: ${describeCharSet(chars)}`);
                }

                i = endBracket + 1;

                // Check for quantifier
                const quantifier = getQuantifier(pattern, i);
                if (quantifier) {
                    parts[parts.length - 1] += ` ${describeQuantifier(quantifier)}`;
                    i += quantifier.length;
                }
                continue;
            }
        }

        // Escape sequences
        if (pattern[i] === '\\' && i + 1 < pattern.length) {
            const escapeChar = pattern[i + 1];
            let desc = '';

            if (escapeChar === 'd') desc = 'Any <strong>digit</strong> (0-9)';
            else if (escapeChar === 'D') desc = 'Any <strong>non-digit</strong>';
            else if (escapeChar === 'w') desc = 'Any <strong>word character</strong> (letter, digit, underscore)';
            else if (escapeChar === 'W') desc = 'Any <strong>non-word character</strong>';
            else if (escapeChar === 's') desc = 'Any <strong>whitespace</strong>';
            else if (escapeChar === 'S') desc = 'Any <strong>non-whitespace</strong>';
            else if (escapeChar === 'b') desc = 'A <strong>word boundary</strong>';
            else if (escapeChar === 'B') desc = 'A <strong>non-word boundary</strong>';
            else if (escapeChar === 'n') desc = 'A <strong>newline</strong>';
            else if (escapeChar === 'r') desc = 'A <strong>carriage return</strong>';
            else if (escapeChar === 't') desc = 'A <strong>tab</strong>';
            else if (escapeChar === '/') desc = 'The literal character "<strong>/</strong>"';
            else desc = `The literal character "<strong>${escapeChar}</strong>"`;

            parts.push(`• ${desc}`);
            i += 2;

            // Check for quantifier
            const quantifier = getQuantifier(pattern, i);
            if (quantifier) {
                parts[parts.length - 1] += ` ${describeQuantifier(quantifier)}`;
                i += quantifier.length;
            }
            continue;
        }

        // Dot (any character)
        if (pattern[i] === '.') {
            parts.push(`• Any <strong>single character</strong>`);
            i++;

            const quantifier = getQuantifier(pattern, i);
            if (quantifier) {
                parts[parts.length - 1] += ` ${describeQuantifier(quantifier)}`;
                i += quantifier.length;
            }
            continue;
        }

        // Anchors
        if (pattern[i] === '^') {
            parts.push(`• <strong>Start of string/line</strong>`);
            i++;
            continue;
        }
        if (pattern[i] === '$') {
            parts.push(`• <strong>End of string/line</strong>`);
            i++;
            continue;
        }

        // Literal characters
        let literal = '';
        while (i < pattern.length && !'[\\.()|*+?{^$'.includes(pattern[i])) {
            literal += pattern[i];
            i++;
        }

        if (literal) {
            parts.push(`• The literal text "<strong>${escapeHtml(literal)}</strong>"`);

            const quantifier = getQuantifier(pattern, i);
            if (quantifier) {
                parts[parts.length - 1] += ` ${describeQuantifier(quantifier)}`;
                i += quantifier.length;
            }
        } else {
            i++; // Skip unhandled character
        }
    }

    return parts.length > 0 ? parts.join('<br>') : 'Pattern matches the content';
}

/**
 * Describe a character set in simple terms
 */
function describeCharSet(chars) {
    if (chars.match(/^[0-9]-[0-9]$/)) return '<strong>digits</strong> (' + chars + ')';
    if (chars.match(/^a-z$/)) return '<strong>lowercase letters</strong>';
    if (chars.match(/^A-Z$/)) return '<strong>uppercase letters</strong>';
    if (chars.match(/^0-9$/)) return '<strong>digits</strong>';
    if (chars.match(/^[0-9]-[0-9][0-9]$/)) return '<strong>digits</strong> (' + chars + ')';

    // Check for ranges
    if (chars.includes('-') && chars.length === 3) {
        return `<strong>${chars[0]}-${chars[2]}</strong>`;
    }

    return `<code>${escapeHtml(chars)}</code>`;
}

/**
 * Get quantifier at position
 */
function getQuantifier(pattern, pos) {
    if (pos >= pattern.length) return null;

    const char = pattern[pos];
    if (char === '*' || char === '+' || char === '?') {
        // Check for lazy modifier
        if (pos + 1 < pattern.length && pattern[pos + 1] === '?') {
            return char + '?';
        }
        return char;
    }

    if (char === '{') {
        const endBrace = pattern.indexOf('}', pos);
        if (endBrace !== -1) {
            return pattern.substring(pos, endBrace + 1);
        }
    }

    return null;
}

/**
 * Describe a quantifier in plain English
 */
function describeQuantifier(q) {
    if (q === '*') return '(<strong>0 or more times</strong>)';
    if (q === '+') return '(<strong>1 or more times</strong>)';
    if (q === '?') return '(<strong>optional</strong>)';
    if (q === '*?') return '(<strong>0 or more times, lazy</strong>)';
    if (q === '+?') return '(<strong>1 or more times, lazy</strong>)';
    if (q === '??') return '(<strong>optional, lazy</strong>)';

    const exactMatch = q.match(/^\{(\d+)\}$/);
    if (exactMatch) return `(<strong>exactly ${exactMatch[1]} times</strong>)`;

    const minMatch = q.match(/^\{(\d+),\}$/);
    if (minMatch) return `(<strong>${minMatch[1]} or more times</strong>)`;

    const rangeMatch = q.match(/^\{(\d+),(\d+)\}$/);
    if (rangeMatch) return `(<strong>${rangeMatch[1]} to ${rangeMatch[2]} times</strong>)`;

    return '';
}

/**
 * Find matching closing bracket
 */
function findMatchingBracket(pattern, start) {
    let depth = 0;
    for (let i = start; i < pattern.length; i++) {
        if (pattern[i] === '[' && (i === 0 || pattern[i - 1] !== '\\')) depth++;
        if (pattern[i] === ']' && (i === 0 || pattern[i - 1] !== '\\')) {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

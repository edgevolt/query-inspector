/**
 * Comprehensive Regex Parser
 * Tokenizes regex patterns into meaningful components with 20+ token types
 */

/**
 * Parse a regex pattern into tokens
 * @param {string} pattern - The regex pattern to parse
 * @returns {Array} Array of token objects with type, value, and position
 */
export function parseRegex(pattern) {
    if (!pattern || pattern.trim() === '') {
        return [];
    }

    const tokens = [];
    let i = 0;

    while (i < pattern.length) {
        const char = pattern[i];
        const nextChar = pattern[i + 1];
        const remaining = pattern.substring(i);

        // Handle escape sequences
        if (char === '\\') {
            const escapeToken = parseEscapeSequence(remaining);
            if (escapeToken) {
                tokens.push({ ...escapeToken, position: i });
                i += escapeToken.value.length;
                continue;
            }
        }

        // Handle groups and assertions
        if (char === '(') {
            const groupToken = parseGroup(remaining);
            if (groupToken) {
                tokens.push({ ...groupToken, position: i });
                i += groupToken.value.length;
                continue;
            }
        }

        // Handle character sets
        if (char === '[') {
            const setToken = parseCharacterSet(remaining);
            if (setToken) {
                tokens.push({ ...setToken, position: i });
                i += setToken.value.length;
                continue;
            }
        }

        // Handle quantifiers
        if (isQuantifierStart(char)) {
            const quantToken = parseQuantifier(remaining, pattern[i - 1]);
            if (quantToken) {
                tokens.push({ ...quantToken, position: i });
                i += quantToken.value.length;
                continue;
            }
        }

        // Handle anchors and boundaries
        if (char === '^') {
            tokens.push({ type: 'anchor', value: '^', position: i });
            i++;
            continue;
        }

        if (char === '$') {
            tokens.push({ type: 'anchor', value: '$', position: i });
            i++;
            continue;
        }

        // Handle alternation
        if (char === '|') {
            tokens.push({ type: 'alternation', value: '|', position: i });
            i++;
            continue;
        }

        // Handle dot (any character)
        if (char === '.') {
            tokens.push({ type: 'character-class', value: '.', position: i });
            i++;
            continue;
        }

        // Handle literal characters
        tokens.push({ type: 'literal', value: char, position: i });
        i++;
    }

    return tokens;
}

/**
 * Parse escape sequences
 */
function parseEscapeSequence(str) {
    if (!str.startsWith('\\')) return null;

    const char = str[1];

    // Character classes
    if ('dDwWsS'.includes(char)) {
        return { type: 'character-class', value: '\\' + char };
    }

    // Boundaries
    if (char === 'b' || char === 'B') {
        return { type: 'boundary', value: '\\' + char };
    }

    if (char === 'A' || char === 'Z' || char === 'z' || char === 'G') {
        return { type: 'anchor', value: '\\' + char };
    }

    // Backreferences - numbered
    if (/[1-9]/.test(char)) {
        let num = char;
        let idx = 2;
        while (idx < str.length && /[0-9]/.test(str[idx])) {
            num += str[idx];
            idx++;
        }
        return { type: 'backreference-numbered', value: '\\' + num };
    }

    // Backreferences - named
    if (char === 'k') {
        const namedMatch = str.match(/^\\k<([^>]+)>/) || str.match(/^\\k'([^']+)'/) || str.match(/^\\k\{([^}]+)\}/);
        if (namedMatch) {
            return { type: 'backreference-named', value: namedMatch[0] };
        }
    }

    // Recursion and subroutines
    if (char === 'g') {
        const subMatch = str.match(/^\\g<([^>]+)>/) || str.match(/^\\g'([^']+)'/);
        if (subMatch) {
            return { type: 'subroutine', value: subMatch[0] };
        }
    }

    // Unicode properties
    if (char === 'p' || char === 'P') {
        const unicodeMatch = str.match(/^\\[pP]\{[^}]+\}/);
        if (unicodeMatch) {
            return { type: 'unicode-property', value: unicodeMatch[0] };
        }
    }

    // Control characters
    if ('nrtfv'.includes(char)) {
        return { type: 'escape-control', value: '\\' + char };
    }

    // Hex escape
    if (char === 'x') {
        const hexMatch = str.match(/^\\x([0-9a-fA-F]{2})/) || str.match(/^\\x\{([0-9a-fA-F]+)\}/);
        if (hexMatch) {
            return { type: 'escape-hex', value: hexMatch[0] };
        }
    }

    // Unicode escape
    if (char === 'u') {
        const uniMatch = str.match(/^\\u([0-9a-fA-F]{4})/) || str.match(/^\\u\{([0-9a-fA-F]+)\}/);
        if (uniMatch) {
            return { type: 'escape-unicode', value: uniMatch[0] };
        }
    }

    // Octal escape
    if (char === '0' || /[1-7]/.test(char)) {
        const octalMatch = str.match(/^\\([0-7]{1,3})/);
        if (octalMatch) {
            return { type: 'escape-octal', value: octalMatch[0] };
        }
    }

    // Control character
    if (char === 'c') {
        if (str.length > 2) {
            return { type: 'escape-control', value: str.substring(0, 3) };
        }
    }

    // Literal mode
    if (char === 'Q') {
        const endIndex = str.indexOf('\\E');
        if (endIndex !== -1) {
            return { type: 'literal-mode', value: str.substring(0, endIndex + 2) };
        }
    }

    // Keep match
    if (char === 'K') {
        return { type: 'special-construct', value: '\\K' };
    }

    // Special characters (escaped)
    if ('.^$*+?{}[]()|\\/'.includes(char)) {
        return { type: 'escape-special', value: '\\' + char };
    }

    // Alert and escape
    if (char === 'a' || char === 'e') {
        return { type: 'escape-control', value: '\\' + char };
    }

    // Default: escaped character
    return { type: 'escape-special', value: '\\' + char };
}

/**
 * Parse groups and assertions
 */
function parseGroup(str) {
    if (!str.startsWith('(')) return null;

    // Find matching closing parenthesis
    let depth = 0;
    let i = 0;
    for (; i < str.length; i++) {
        if (str[i] === '\\') {
            i++; // Skip escaped character
            continue;
        }
        if (str[i] === '(') depth++;
        if (str[i] === ')') {
            depth--;
            if (depth === 0) break;
        }
    }

    if (depth !== 0) {
        // Unmatched parenthesis
        return { type: 'group-capture', value: '(' };
    }

    const groupContent = str.substring(0, i + 1);

    // Check for special group types
    if (str.startsWith('(?:')) {
        return { type: 'group-noncapture', value: groupContent };
    }

    // Named groups
    if (str.startsWith('(?<') || str.startsWith("(?'")) {
        return { type: 'group-named', value: groupContent };
    }

    // Atomic group
    if (str.startsWith('(?>')) {
        return { type: 'group-atomic', value: groupContent };
    }

    // Positive lookahead
    if (str.startsWith('(?=')) {
        return { type: 'assertion-lookahead-pos', value: groupContent };
    }

    // Negative lookahead
    if (str.startsWith('(?!')) {
        return { type: 'assertion-lookahead-neg', value: groupContent };
    }

    // Positive lookbehind
    if (str.startsWith('(?<=')) {
        return { type: 'assertion-lookbehind-pos', value: groupContent };
    }

    // Negative lookbehind
    if (str.startsWith('(?<!')) {
        return { type: 'assertion-lookbehind-neg', value: groupContent };
    }

    // Conditional
    if (str.startsWith('(?(')) {
        return { type: 'group-conditional', value: groupContent };
    }

    // Comment
    if (str.startsWith('(?#')) {
        return { type: 'comment', value: groupContent };
    }

    // Mode modifiers
    if (str.match(/^\(\?[imsx-]+:?/)) {
        return { type: 'mode-modifier', value: groupContent };
    }

    // Recursion
    if (str.startsWith('(?R)') || str.startsWith('(?0)')) {
        return { type: 'recursion', value: str.substring(0, 4) };
    }

    // Numbered recursion
    const recMatch = str.match(/^\(\?[1-9]\d*\)/);
    if (recMatch) {
        return { type: 'recursion', value: recMatch[0] };
    }

    // Subroutine call
    const subMatch = str.match(/^\(\?&[^)]+\)/);
    if (subMatch) {
        return { type: 'subroutine', value: subMatch[0] };
    }

    // Verb controls
    const verbMatch = str.match(/^\(\*[A-Z]+\)/);
    if (verbMatch) {
        return { type: 'verb', value: verbMatch[0] };
    }

    // Branch reset
    if (str.startsWith('(?|')) {
        return { type: 'group-branch-reset', value: groupContent };
    }

    // Default: capturing group
    return { type: 'group-capture', value: groupContent };
}

/**
 * Parse character sets
 */
function parseCharacterSet(str) {
    if (!str.startsWith('[')) return null;

    let i = 1;
    let escaped = false;

    // Handle negated set
    const isNegated = str[1] === '^';
    if (isNegated) i++;

    while (i < str.length) {
        if (escaped) {
            escaped = false;
            i++;
            continue;
        }

        if (str[i] === '\\') {
            escaped = true;
            i++;
            continue;
        }

        if (str[i] === ']') {
            const setValue = str.substring(0, i + 1);
            
            // Check for POSIX classes
            if (setValue.includes('[:')) {
                return { type: 'posix-class', value: setValue };
            }

            return { type: 'character-set', value: setValue };
        }

        i++;
    }

    // Unclosed set
    return { type: 'character-set', value: '[' };
}

/**
 * Parse quantifiers
 */
function parseQuantifier(str, prevChar) {
    const char = str[0];

    // Simple quantifiers
    if (char === '*' || char === '+' || char === '?') {
        // Check for lazy or possessive
        if (str[1] === '?') {
            return { type: 'quantifier-lazy', value: char + '?' };
        }
        if (str[1] === '+') {
            return { type: 'quantifier-possessive', value: char + '+' };
        }
        return { type: 'quantifier-greedy', value: char };
    }

    // Curly brace quantifiers
    if (char === '{') {
        const match = str.match(/^\{(\d+)(,)?(\d+)?\}/);
        if (match) {
            const quantValue = match[0];
            // Check for lazy or possessive
            if (str[quantValue.length] === '?') {
                return { type: 'quantifier-lazy', value: quantValue + '?' };
            }
            if (str[quantValue.length] === '+') {
                return { type: 'quantifier-possessive', value: quantValue + '+' };
            }
            return { type: 'quantifier-greedy', value: quantValue };
        }
    }

    return null;
}

/**
 * Check if character can start a quantifier
 */
function isQuantifierStart(char) {
    return '*+?{'.includes(char);
}

/**
 * Validate regex pattern
 * @param {string} pattern - The regex pattern to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
export function validatePattern(pattern) {
    try {
        new RegExp(pattern);
        return { valid: true, error: null };
    } catch (e) {
        return { valid: false, error: e.message };
    }
}

/**
 * Calculate pattern complexity score
 * @param {Array} tokens - Array of tokens from parseRegex
 * @returns {number} Complexity score (0-100)
 */
export function getPatternComplexity(tokens) {
    let score = 0;

    const weights = {
        'literal': 1,
        'character-class': 2,
        'character-set': 3,
        'posix-class': 3,
        'unicode-property': 4,
        'quantifier-greedy': 3,
        'quantifier-lazy': 4,
        'quantifier-possessive': 5,
        'anchor': 2,
        'boundary': 2,
        'group-capture': 4,
        'group-named': 5,
        'group-noncapture': 3,
        'group-atomic': 6,
        'group-conditional': 8,
        'assertion-lookahead-pos': 6,
        'assertion-lookahead-neg': 6,
        'assertion-lookbehind-pos': 7,
        'assertion-lookbehind-neg': 7,
        'backreference-numbered': 5,
        'backreference-named': 6,
        'recursion': 10,
        'subroutine': 9,
        'alternation': 3
    };

    tokens.forEach(token => {
        score += weights[token.type] || 1;
    });

    // Normalize to 0-100
    return Math.min(100, Math.round((score / tokens.length) * 10));
}

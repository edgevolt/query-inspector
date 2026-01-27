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

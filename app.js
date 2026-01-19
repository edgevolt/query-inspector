// KQL Parser and Tokenizer

import { getExplanation } from './languages/kql.js';

// Token types
const TokenType = {
    PIPE: 'pipe',
    OPERATOR: 'operator',
    FUNCTION: 'function',
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    STRING: 'string',
    NUMBER: 'number',
    COMPARISON: 'comparison',
    PUNCTUATION: 'punctuation',
    WHITESPACE: 'whitespace'
};

// Known KQL operators (table operators)
const OPERATORS = new Set([
    'where', 'project', 'extend', 'summarize', 'take', 'limit',
    'sort', 'order', 'join', 'union', 'distinct', 'top', 'count',
    'render', 'make-series', 'mv-expand', 'parse', 'evaluate'
]);

// Known KQL functions
const FUNCTIONS = new Set([
    'count', 'sum', 'avg', 'min', 'max', 'dcount', 'ago', 'now',
    'bin', 'startswith', 'endswith', 'contains', 'has', 'between',
    'datetime', 'tostring', 'toint', 'todouble', 'tobool', 'strlen',
    'substring', 'strcat', 'split', 'replace', 'trim', 'toupper',
    'tolower', 'isempty', 'isnull', 'isnotempty', 'isnotnull'
]);

// Known keywords
const KEYWORDS = new Set([
    'by', 'on', 'asc', 'desc', 'kind', 'and', 'or', 'not', 'in',
    'between', 'has', 'contains', 'startswith', 'endswith', 'matches'
]);

// Comparison operators
const COMPARISONS = new Set([
    '==', '!=', '>', '<', '>=', '<=', '=~', '!~', 'has', 'contains',
    'startswith', 'endswith', 'matches', 'in', 'between'
]);

/**
 * Tokenizes a KQL query string into an array of tokens
 */
export function tokenizeKQL(query) {
    const tokens = [];
    let i = 0;

    while (i < query.length) {
        const char = query[i];

        // Skip whitespace but track it
        if (/\s/.test(char)) {
            let whitespace = '';
            while (i < query.length && /\s/.test(query[i])) {
                whitespace += query[i];
                i++;
            }
            tokens.push({
                type: TokenType.WHITESPACE,
                value: whitespace,
                start: i - whitespace.length,
                end: i
            });
            continue;
        }

        // Pipe operator
        if (char === '|') {
            tokens.push({
                type: TokenType.PIPE,
                value: '|',
                start: i,
                end: i + 1
            });
            i++;
            continue;
        }

        // String literals (single or double quotes)
        if (char === '"' || char === "'") {
            const quote = char;
            let str = quote;
            i++;
            while (i < query.length && query[i] !== quote) {
                if (query[i] === '\\' && i + 1 < query.length) {
                    str += query[i] + query[i + 1];
                    i += 2;
                } else {
                    str += query[i];
                    i++;
                }
            }
            if (i < query.length) {
                str += query[i];
                i++;
            }
            tokens.push({
                type: TokenType.STRING,
                value: str,
                start: i - str.length,
                end: i
            });
            continue;
        }

        // Numbers
        if (/\d/.test(char)) {
            let num = '';
            const start = i;
            while (i < query.length && /[\d.]/.test(query[i])) {
                num += query[i];
                i++;
            }
            // Check for time units (1h, 7d, 30m, etc.)
            if (i < query.length && /[dhms]/.test(query[i])) {
                num += query[i];
                i++;
            }
            tokens.push({
                type: TokenType.NUMBER,
                value: num,
                start: start,
                end: i
            });
            continue;
        }

        // Comparison operators (==, !=, >=, <=, etc.)
        if (char === '=' || char === '!' || char === '>' || char === '<') {
            let op = char;
            i++;
            if (i < query.length && (query[i] === '=' || query[i] === '~')) {
                op += query[i];
                i++;
            }
            tokens.push({
                type: TokenType.COMPARISON,
                value: op,
                start: i - op.length,
                end: i
            });
            continue;
        }

        // Punctuation
        if (/[(),.\[\]]/.test(char)) {
            tokens.push({
                type: TokenType.PUNCTUATION,
                value: char,
                start: i,
                end: i + 1
            });
            i++;
            continue;
        }

        // Identifiers, operators, functions, keywords
        if (/[a-zA-Z_]/.test(char)) {
            let word = '';
            const start = i;
            while (i < query.length && /[a-zA-Z0-9_-]/.test(query[i])) {
                word += query[i];
                i++;
            }

            // Check if followed by parenthesis (function call)
            let nextNonWhitespace = i;
            while (nextNonWhitespace < query.length && /\s/.test(query[nextNonWhitespace])) {
                nextNonWhitespace++;
            }
            const isFunction = nextNonWhitespace < query.length && query[nextNonWhitespace] === '(';

            // Determine token type
            let type = TokenType.IDENTIFIER;
            const lowerWord = word.toLowerCase();

            if (OPERATORS.has(lowerWord)) {
                type = TokenType.OPERATOR;
            } else if (isFunction || FUNCTIONS.has(lowerWord)) {
                type = TokenType.FUNCTION;
            } else if (KEYWORDS.has(lowerWord)) {
                type = TokenType.KEYWORD;
            }

            tokens.push({
                type: type,
                value: word,
                start: start,
                end: i
            });
            continue;
        }

        // Unknown character, skip it
        i++;
    }

    return tokens;
}

/**
 * Enriches tokens with explanation data
 */
export function enrichTokens(tokens) {
    return tokens.map(token => {
        if (token.type === TokenType.WHITESPACE) {
            return token;
        }

        const explanation = getExplanation(token.value, token.type);
        return {
            ...token,
            explanation
        };
    });
}

/**
 * Main parse function
 */
export function parseKQL(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    const tokens = tokenizeKQL(query);
    return enrichTokens(tokens);
}

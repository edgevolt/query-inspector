// SQL Parser and Tokenizer

import { getExplanation } from './languages/sql.js';

// Token types
const TokenType = {
    CLAUSE: 'clause',
    FUNCTION: 'function',
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    STRING: 'string',
    NUMBER: 'number',
    OPERATOR: 'operator',
    PUNCTUATION: 'punctuation',
    WHITESPACE: 'whitespace'
};

// Known SQL clauses
const CLAUSES = new Set([
    'select', 'from', 'where', 'group', 'having', 'order', 'limit', 'offset',
    'join', 'inner', 'left', 'right', 'full', 'outer', 'cross',
    'insert', 'into', 'update', 'delete', 'set', 'values',
    'create', 'alter', 'drop', 'table', 'index', 'view'
]);

// Known SQL functions
const FUNCTIONS = new Set([
    'count', 'sum', 'avg', 'min', 'max', 'upper', 'lower', 'now',
    'coalesce', 'concat', 'substring', 'length', 'trim', 'round',
    'cast', 'convert', 'date', 'year', 'month', 'day'
]);

// Known SQL keywords
const KEYWORDS = new Set([
    'as', 'by', 'on', 'and', 'or', 'not', 'in', 'between', 'like',
    'distinct', 'all', 'asc', 'desc', 'null', 'is', 'exists',
    'case', 'when', 'then', 'else', 'end'
]);

// SQL operators
const OPERATORS = new Set([
    '=', '!=', '<>', '>', '<', '>=', '<=', '+', '-', '*', '/', '%'
]);

/**
 * Tokenizes a SQL query string into an array of tokens
 */
export function tokenizeSQL(query) {
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

        // String literals (single quotes in SQL)
        if (char === "'") {
            let str = "'";
            i++;
            while (i < query.length && query[i] !== "'") {
                if (query[i] === '\\' && i + 1 < query.length) {
                    str += query[i] + query[i + 1];
                    i += 2;
                } else if (query[i] === "'" && i + 1 < query.length && query[i + 1] === "'") {
                    // Handle escaped single quote ''
                    str += "''";
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
            tokens.push({
                type: TokenType.NUMBER,
                value: num,
                start: start,
                end: i
            });
            continue;
        }

        // Operators
        if ('=!<>+-*/%'.includes(char)) {
            let op = char;
            i++;
            // Check for two-character operators
            if (i < query.length && '=><'.includes(query[i])) {
                op += query[i];
                i++;
            }
            tokens.push({
                type: TokenType.OPERATOR,
                value: op,
                start: i - op.length,
                end: i
            });
            continue;
        }

        // Punctuation
        if (/[(),;.]/.test(char)) {
            tokens.push({
                type: TokenType.PUNCTUATION,
                value: char,
                start: i,
                end: i + 1
            });
            i++;
            continue;
        }

        // Identifiers, clauses, functions, keywords
        if (/[a-zA-Z_]/.test(char)) {
            let word = '';
            const start = i;
            while (i < query.length && /[a-zA-Z0-9_]/.test(query[i])) {
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

            if (CLAUSES.has(lowerWord)) {
                type = TokenType.CLAUSE;
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
export function parseSQL(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    const tokens = tokenizeSQL(query);
    return enrichTokens(tokens);
}

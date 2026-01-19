// PromQL Parser and Tokenizer

import { getExplanation } from './languages/promql.js';

// Token types
const TokenType = {
    FUNCTION: 'function',
    AGGREGATION: 'aggregation',
    KEYWORD: 'keyword',
    METRIC: 'metric',
    LABEL: 'label',
    STRING: 'string',
    NUMBER: 'number',
    OPERATOR: 'operator',
    PUNCTUATION: 'punctuation',
    DURATION: 'duration',
    WHITESPACE: 'whitespace'
};

// Known PromQL functions and aggregations
const FUNCTIONS = new Set([
    'rate', 'irate', 'increase', 'delta', 'deriv', 'predict_linear',
    'histogram_quantile', 'absent', 'changes', 'resets',
    'label_replace', 'label_join', 'vector', 'scalar',
    'sort', 'sort_desc', 'timestamp', 'time', 'day_of_month',
    'day_of_week', 'days_in_month', 'hour', 'minute', 'month', 'year',
    'abs', 'ceil', 'floor', 'round', 'exp', 'ln', 'log2', 'log10', 'sqrt'
]);

const AGGREGATIONS = new Set([
    'sum', 'min', 'max', 'avg', 'count', 'stddev', 'stdvar',
    'topk', 'bottomk', 'quantile', 'count_values', 'group'
]);

// PromQL keywords
const KEYWORDS = new Set([
    'by', 'without', 'on', 'ignoring', 'group_left', 'group_right',
    'bool', 'offset', 'and', 'or', 'unless'
]);

// PromQL operators
const OPERATORS = new Set([
    '==', '!=', '>', '<', '>=', '<=', '+', '-', '*', '/', '%', '^',
    '=~', '!~'
]);

/**
 * Tokenizes a PromQL query string into an array of tokens
 */
export function tokenizePromQL(query) {
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

        // Numbers (including floats and scientific notation)
        if (/\d/.test(char)) {
            let num = '';
            const start = i;
            while (i < query.length && /[\d.eE+-]/.test(query[i])) {
                num += query[i];
                i++;
            }

            // Check if followed by time unit (duration)
            if (i < query.length && /[smhdwy]/.test(query[i])) {
                num += query[i];
                i++;
                tokens.push({
                    type: TokenType.DURATION,
                    value: num,
                    start: start,
                    end: i
                });
            } else {
                tokens.push({
                    type: TokenType.NUMBER,
                    value: num,
                    start: start,
                    end: i
                });
            }
            continue;
        }

        // Operators (including two-character operators)
        if ('=!><+-*/%^~'.includes(char)) {
            let op = char;
            i++;
            // Check for two-character operators
            if (i < query.length && '=~'.includes(query[i])) {
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
        if (/[(){}\[\],]/.test(char)) {
            tokens.push({
                type: TokenType.PUNCTUATION,
                value: char,
                start: i,
                end: i + 1
            });
            i++;
            continue;
        }

        // Identifiers (metrics, functions, labels, keywords)
        if (/[a-zA-Z_:]/.test(char)) {
            let word = '';
            const start = i;
            while (i < query.length && /[a-zA-Z0-9_:]/.test(query[i])) {
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
            let type = TokenType.METRIC;
            const lowerWord = word.toLowerCase();

            if (AGGREGATIONS.has(lowerWord)) {
                type = TokenType.AGGREGATION;
            } else if (isFunction || FUNCTIONS.has(lowerWord)) {
                type = TokenType.FUNCTION;
            } else if (KEYWORDS.has(lowerWord)) {
                type = TokenType.KEYWORD;
            } else if (word.includes(':')) {
                // Likely a metric name (contains colon)
                type = TokenType.METRIC;
            } else if (tokens.length > 0 &&
                (tokens[tokens.length - 2]?.value === '{' ||
                    tokens[tokens.length - 2]?.value === ',')) {
                // Inside label selector
                type = TokenType.LABEL;
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
export function parsePromQL(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    const tokens = tokenizePromQL(query);
    return enrichTokens(tokens);
}

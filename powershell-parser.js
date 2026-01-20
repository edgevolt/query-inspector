// PowerShell Parser and Tokenizer

import { getExplanation } from './languages/powershell.js';

// Token types
const TokenType = {
    CMDLET: 'cmdlet',
    PARAMETER: 'parameter',
    OPERATOR: 'operator',
    VARIABLE: 'variable',
    STRING: 'string',
    NUMBER: 'number',
    KEYWORD: 'keyword',
    PUNCTUATION: 'punctuation',
    WHITESPACE: 'whitespace',
    COMMENT: 'comment'
};

// Common PowerShell cmdlets (verb-noun pattern)
const CMDLET_VERBS = new Set([
    'get', 'set', 'new', 'remove', 'add', 'clear', 'copy', 'move',
    'invoke', 'start', 'stop', 'restart', 'test', 'write', 'read',
    'select', 'where', 'foreach', 'sort', 'group', 'measure',
    'export', 'import', 'convert', 'join', 'split', 'format',
    'out', 'compare', 'resolve', 'enter', 'rename'
]);

// PowerShell operators
const OPERATORS = new Set([
    '-eq', '-ne', '-gt', '-lt', '-ge', '-le',
    '-like', '-notlike', '-match', '-notmatch',
    '-contains', '-notcontains', '-in', '-notin',
    '-and', '-or', '-not', '-xor', '-band', '-bor', '-bnot'
]);

// PowerShell keywords
const KEYWORDS = new Set([
    'if', 'else', 'elseif', 'switch', 'for', 'foreach', 'while', 'do',
    'function', 'filter', 'param', 'begin', 'process', 'end',
    'try', 'catch', 'finally', 'throw', 'return', 'break', 'continue'
]);

/**
 * Tokenizes a PowerShell command string into an array of tokens
 */
export function tokenizePowerShell(command) {
    const tokens = [];
    let i = 0;

    while (i < command.length) {
        const char = command[i];

        // Skip whitespace but track it
        if (/\s/.test(char)) {
            let whitespace = '';
            while (i < command.length && /\s/.test(command[i])) {
                whitespace += command[i];
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

        // Comments
        if (char === '#') {
            let comment = '';
            while (i < command.length && command[i] !== '\n') {
                comment += command[i];
                i++;
            }
            tokens.push({
                type: TokenType.COMMENT,
                value: comment,
                start: i - comment.length,
                end: i
            });
            continue;
        }

        // String literals (single or double quotes)
        if (char === '"' || char === "'") {
            const quote = char;
            let str = quote;
            i++;
            while (i < command.length && command[i] !== quote) {
                if (command[i] === '`' && i + 1 < command.length) {
                    // PowerShell escape character
                    str += command[i] + command[i + 1];
                    i += 2;
                } else {
                    str += command[i];
                    i++;
                }
            }
            if (i < command.length) {
                str += command[i];
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
            while (i < command.length && /[\d.]/.test(command[i])) {
                num += command[i];
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

        // Variables (start with $)
        if (char === '$') {
            let variable = '$';
            i++;
            while (i < command.length && /[a-zA-Z0-9_]/.test(command[i])) {
                variable += command[i];
                i++;
            }
            tokens.push({
                type: TokenType.VARIABLE,
                value: variable,
                start: i - variable.length,
                end: i
            });
            continue;
        }

        // Parameters (start with -)
        if (char === '-' && i + 1 < command.length && /[a-zA-Z]/.test(command[i + 1])) {
            let param = '-';
            i++;
            while (i < command.length && /[a-zA-Z0-9_]/.test(command[i])) {
                param += command[i];
                i++;
            }

            // Check if it's an operator
            if (OPERATORS.has(param.toLowerCase())) {
                tokens.push({
                    type: TokenType.OPERATOR,
                    value: param,
                    start: i - param.length,
                    end: i
                });
            } else {
                tokens.push({
                    type: TokenType.PARAMETER,
                    value: param,
                    start: i - param.length,
                    end: i
                });
            }
            continue;
        }

        // Punctuation and operators
        if (/[|(){}\[\];,=+*/<>!]/.test(char)) {
            tokens.push({
                type: TokenType.PUNCTUATION,
                value: char,
                start: i,
                end: i + 1
            });
            i++;
            continue;
        }

        // Cmdlets and keywords (letters, hyphens)
        if (/[a-zA-Z]/.test(char)) {
            let word = '';
            const start = i;
            while (i < command.length && /[a-zA-Z0-9-]/.test(command[i])) {
                word += command[i];
                i++;
            }

            // Determine token type
            let type = TokenType.CMDLET;
            const lowerWord = word.toLowerCase();

            if (KEYWORDS.has(lowerWord)) {
                type = TokenType.KEYWORD;
            } else if (word.includes('-')) {
                // Check if it's a cmdlet (Verb-Noun pattern)
                const parts = word.split('-');
                if (parts.length === 2 && CMDLET_VERBS.has(parts[0].toLowerCase())) {
                    type = TokenType.CMDLET;
                }
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
        if (token.type === TokenType.WHITESPACE || token.type === TokenType.COMMENT) {
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
export function parsePowerShell(command) {
    if (!command || command.trim() === '') {
        return [];
    }

    const tokens = tokenizePowerShell(command);
    return enrichTokens(tokens);
}

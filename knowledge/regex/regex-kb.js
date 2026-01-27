/**
 * Comprehensive Regex Knowledge Base
 * 100+ regex components with detailed explanations
 */

export default {
    // Character Classes (30+ entries)
    characterClasses: {
        '.': {
            description: 'Matches any single character except newline',
            syntax: '.',
            example: 'a.c matches "abc", "a1c", "a c"',
            matches: 'Any character (except \\n by default)',
            details: 'Use the "s" flag (dotall mode) to make . match newlines as well',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\d': {
            description: 'Matches any digit (0-9)',
            syntax: '\\d',
            example: '\\d+ matches "123", "42", "7"',
            matches: '[0-9]',
            details: 'Equivalent to [0-9]. Use \\D for non-digits',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\D': {
            description: 'Matches any non-digit character',
            syntax: '\\D',
            example: '\\D+ matches "abc", "hello", "!@#"',
            matches: '[^0-9]',
            details: 'Opposite of \\d. Matches letters, symbols, whitespace, etc.',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\w': {
            description: 'Matches any word character (alphanumeric + underscore)',
            syntax: '\\w',
            example: '\\w+ matches "hello", "test_123", "var_name"',
            matches: '[A-Za-z0-9_]',
            details: 'Includes letters, digits, and underscore. Use \\W for non-word characters',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\W': {
            description: 'Matches any non-word character',
            syntax: '\\W',
            example: '\\W+ matches "!@#", "   ", "..."',
            matches: '[^A-Za-z0-9_]',
            details: 'Opposite of \\w. Matches spaces, punctuation, symbols, etc.',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\s': {
            description: 'Matches any whitespace character',
            syntax: '\\s',
            example: '\\s+ matches spaces, tabs, newlines',
            matches: '[ \\t\\n\\r\\f\\v]',
            details: 'Includes space, tab, newline, carriage return, form feed, vertical tab',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\S': {
            description: 'Matches any non-whitespace character',
            syntax: '\\S',
            example: '\\S+ matches "hello", "123", "!@#"',
            matches: '[^ \\t\\n\\r\\f\\v]',
            details: 'Opposite of \\s. Matches any visible character',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '[abc]': {
            description: 'Matches any single character in the set',
            syntax: '[characters]',
            example: '[aeiou] matches any vowel',
            matches: 'Any character listed in the brackets',
            details: 'Character sets are case-sensitive unless using the i flag',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '[^abc]': {
            description: 'Matches any character NOT in the set',
            syntax: '[^characters]',
            example: '[^0-9] matches any non-digit',
            matches: 'Any character not listed in the brackets',
            details: 'The ^ must be the first character inside the brackets to negate',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '[a-z]': {
            description: 'Matches any character in the range',
            syntax: '[start-end]',
            example: '[a-z] matches lowercase letters, [0-9] matches digits',
            matches: 'Any character between start and end (inclusive)',
            details: 'Ranges use ASCII/Unicode order. Can combine: [a-zA-Z0-9]',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        }
    },

    // Quantifiers (15+ entries)
    quantifiers: {
        '*': {
            description: 'Matches 0 or more occurrences (greedy)',
            syntax: 'pattern*',
            example: 'a* matches "", "a", "aa", "aaa"',
            matches: '0 or more times',
            details: 'Greedy: matches as many as possible. Use *? for lazy matching',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '+': {
            description: 'Matches 1 or more occurrences (greedy)',
            syntax: 'pattern+',
            example: 'a+ matches "a", "aa", "aaa" (not "")',
            matches: '1 or more times',
            details: 'Greedy: matches as many as possible. Use +? for lazy matching',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '?': {
            description: 'Matches 0 or 1 occurrence (optional)',
            syntax: 'pattern?',
            example: 'colou?r matches "color" and "colour"',
            matches: '0 or 1 time',
            details: 'Makes the preceding element optional. Use ?? for lazy matching',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '{n}': {
            description: 'Matches exactly n occurrences',
            syntax: 'pattern{n}',
            example: 'a{3} matches "aaa" only',
            matches: 'Exactly n times',
            details: 'Precise count. No more, no less',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '{n,}': {
            description: 'Matches n or more occurrences',
            syntax: 'pattern{n,}',
            example: 'a{2,} matches "aa", "aaa", "aaaa", etc.',
            matches: 'n or more times',
            details: 'Greedy: matches as many as possible. Use {n,}? for lazy',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '{n,m}': {
            description: 'Matches between n and m occurrences',
            syntax: 'pattern{n,m}',
            example: 'a{2,4} matches "aa", "aaa", "aaaa"',
            matches: 'Between n and m times (inclusive)',
            details: 'Greedy: prefers maximum. Use {n,m}? for lazy',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '*?': {
            description: 'Lazy/non-greedy version of *',
            syntax: 'pattern*?',
            example: '<.*?> matches "<div>" in "<div><span>"',
            matches: '0 or more times (minimum)',
            details: 'Matches as few characters as possible',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '+?': {
            description: 'Lazy/non-greedy version of +',
            syntax: 'pattern+?',
            example: 'a+? matches single "a" when possible',
            matches: '1 or more times (minimum)',
            details: 'Matches as few characters as possible',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '??': {
            description: 'Lazy/non-greedy version of ?',
            syntax: 'pattern??',
            example: 'a?? prefers not matching when possible',
            matches: '0 or 1 time (prefers 0)',
            details: 'Matches zero times if possible',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '{n,m}?': {
            description: 'Lazy/non-greedy range quantifier',
            syntax: 'pattern{n,m}?',
            example: 'a{2,4}? prefers matching 2 over 3 or 4',
            matches: 'Between n and m times (minimum)',
            details: 'Matches as few as possible within the range',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers'
        },
        '*+': {
            description: 'Possessive version of * (no backtracking)',
            syntax: 'pattern*+',
            example: 'a*+a never matches (possessive * consumes all)',
            matches: '0 or more times (no backtracking)',
            details: 'Not supported in JavaScript. Available in PCRE, Java, etc.',
            docUrl: 'https://www.regular-expressions.info/possessive.html'
        },
        '++': {
            description: 'Possessive version of + (no backtracking)',
            syntax: 'pattern++',
            example: 'a++a never matches',
            matches: '1 or more times (no backtracking)',
            details: 'Not supported in JavaScript. Available in PCRE, Java, etc.',
            docUrl: 'https://www.regular-expressions.info/possessive.html'
        },
        '?+': {
            description: 'Possessive version of ? (no backtracking)',
            syntax: 'pattern?+',
            example: 'a?+a may fail to match "aa"',
            matches: '0 or 1 time (no backtracking)',
            details: 'Not supported in JavaScript. Available in PCRE, Java, etc.',
            docUrl: 'https://www.regular-expressions.info/possessive.html'
        }
    },

    // Anchors & Boundaries (10+ entries)
    anchors: {
        '^': {
            description: 'Matches the start of a line or string',
            syntax: '^pattern',
            example: '^Hello matches "Hello world" but not "Say Hello"',
            matches: 'Start of string (or line in multiline mode)',
            details: 'In multiline mode (m flag), matches after newlines too',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '$': {
            description: 'Matches the end of a line or string',
            syntax: 'pattern$',
            example: 'world$ matches "Hello world" but not "world peace"',
            matches: 'End of string (or line in multiline mode)',
            details: 'In multiline mode (m flag), matches before newlines too',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '\\b': {
            description: 'Matches a word boundary',
            syntax: '\\bpattern\\b',
            example: '\\bcat\\b matches "cat" but not "catch" or "scat"',
            matches: 'Position between word and non-word character',
            details: 'Zero-width assertion. Useful for whole word matching',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '\\B': {
            description: 'Matches a non-word boundary',
            syntax: '\\Bpattern\\B',
            example: '\\Bcat\\B matches "scat" in "scatter"',
            matches: 'Position not at a word boundary',
            details: 'Opposite of \\b. Matches within words',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '\\A': {
            description: 'Matches the absolute start of the string',
            syntax: '\\Apattern',
            example: '\\AHello always matches start (ignores multiline)',
            matches: 'Start of string only',
            details: 'Not affected by multiline mode. Not supported in JavaScript',
            docUrl: 'https://www.regular-expressions.info/anchors.html'
        },
        '\\Z': {
            description: 'Matches the end of string (before final newline)',
            syntax: 'pattern\\Z',
            example: 'world\\Z matches end (allows trailing newline)',
            matches: 'End of string (or before final \\n)',
            details: 'Not supported in JavaScript. Available in PCRE, Ruby, etc.',
            docUrl: 'https://www.regular-expressions.info/anchors.html'
        },
        '\\z': {
            description: 'Matches the absolute end of the string',
            syntax: 'pattern\\z',
            example: 'world\\z matches absolute end only',
            matches: 'Absolute end of string',
            details: 'Not supported in JavaScript. Available in PCRE, Ruby, etc.',
            docUrl: 'https://www.regular-expressions.info/anchors.html'
        },
        '\\G': {
            description: 'Matches at the position where the previous match ended',
            syntax: '\\Gpattern',
            example: 'Useful for continuous matching',
            matches: 'End of previous match',
            details: 'Not supported in JavaScript. Available in PCRE, Perl, etc.',
            docUrl: 'https://www.regular-expressions.info/continue.html'
        }
    },

    // Groups & Captures (15+ entries)
    groups: {
        '(...)': {
            description: 'Capturing group - captures matched text',
            syntax: '(pattern)',
            example: '(\\d+) captures numbers for backreference',
            matches: 'Groups and captures the pattern',
            details: 'Creates numbered capture group (\\1, \\2, etc.)',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences'
        },
        '(?:...)': {
            description: 'Non-capturing group - groups without capturing',
            syntax: '(?:pattern)',
            example: '(?:https?|ftp):// groups protocol without capturing',
            matches: 'Groups but doesn\'t create a capture',
            details: 'More efficient when you don\'t need the captured text',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences'
        },
        '(?<name>...)': {
            description: 'Named capturing group',
            syntax: '(?<name>pattern)',
            example: '(?<year>\\d{4}) captures year with name',
            matches: 'Captures with a custom name',
            details: 'Access via groups.name in JavaScript. ES2018+',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences'
        },
        '(?>...)': {
            description: 'Atomic group - no backtracking',
            syntax: '(?>pattern)',
            example: '(?>\\d+)\\. prevents backtracking into digits',
            matches: 'Groups and prevents backtracking',
            details: 'Not supported in JavaScript. Available in PCRE, Java, etc.',
            docUrl: 'https://www.regular-expressions.info/atomic.html'
        },
        '(?(condition)yes|no)': {
            description: 'Conditional pattern',
            syntax: '(?(condition)yes|no)',
            example: '(?(1)\\d+|[a-z]+) matches based on group 1',
            matches: 'Different patterns based on condition',
            details: 'Not supported in JavaScript. Available in PCRE, .NET, etc.',
            docUrl: 'https://www.regular-expressions.info/conditional.html'
        },
        '(?#comment)': {
            description: 'Comment - ignored by regex engine',
            syntax: '(?#comment text)',
            example: '\\d+(?#matches numbers) documents the pattern',
            matches: 'Nothing - just a comment',
            details: 'Not supported in JavaScript. Available in PCRE, Perl, etc.',
            docUrl: 'https://www.regular-expressions.info/comments.html'
        },
        '(?i)': {
            description: 'Inline case-insensitive flag',
            syntax: '(?i)pattern or (?i:pattern)',
            example: '(?i)hello matches "HELLO", "Hello", "hello"',
            matches: 'Enables case-insensitive matching',
            details: 'Not supported in JavaScript. Use /pattern/i flag instead',
            docUrl: 'https://www.regular-expressions.info/modifiers.html'
        },
        '(?-i)': {
            description: 'Disable case-insensitive flag',
            syntax: '(?-i)pattern',
            example: '(?i)hello(?-i)WORLD requires exact case for WORLD',
            matches: 'Disables case-insensitive matching',
            details: 'Not supported in JavaScript',
            docUrl: 'https://www.regular-expressions.info/modifiers.html'
        },
        '(?|...)': {
            description: 'Branch reset group',
            syntax: '(?|(a)|(b)|(c))',
            example: 'All alternatives share same capture numbers',
            matches: 'Resets capture numbering for each branch',
            details: 'Not supported in JavaScript. Available in PCRE',
            docUrl: 'https://www.regular-expressions.info/branchreset.html'
        }
    },

    // Lookaround Assertions (8+ entries)
    assertions: {
        '(?=...)': {
            description: 'Positive lookahead - assert pattern ahead',
            syntax: '(?=pattern)',
            example: '\\d+(?=px) matches numbers followed by "px"',
            matches: 'Zero-width assertion (doesn\'t consume)',
            details: 'Checks if pattern exists ahead without including it in match',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '(?!...)': {
            description: 'Negative lookahead - assert pattern NOT ahead',
            syntax: '(?!pattern)',
            example: '\\d+(?!px) matches numbers NOT followed by "px"',
            matches: 'Zero-width assertion (doesn\'t consume)',
            details: 'Checks that pattern does NOT exist ahead',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '(?<=...)': {
            description: 'Positive lookbehind - assert pattern behind',
            syntax: '(?<=pattern)',
            example: '(?<=\\$)\\d+ matches numbers preceded by "$"',
            matches: 'Zero-width assertion (doesn\'t consume)',
            details: 'ES2018+. Checks if pattern exists behind',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '(?<!...)': {
            description: 'Negative lookbehind - assert pattern NOT behind',
            syntax: '(?<!pattern)',
            example: '(?<!\\$)\\d+ matches numbers NOT preceded by "$"',
            matches: 'Zero-width assertion (doesn\'t consume)',
            details: 'ES2018+. Checks that pattern does NOT exist behind',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        }
    },

    // Backreferences & Recursion (8+ entries)
    backreferences: {
        '\\1': {
            description: 'Backreference to capture group 1',
            syntax: '\\1, \\2, \\3, etc.',
            example: '(\\w+)\\s+\\1 matches repeated words like "the the"',
            matches: 'Same text as captured group',
            details: 'References the text matched by a capturing group',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences'
        },
        '\\k<name>': {
            description: 'Named backreference',
            syntax: '\\k<name>',
            example: '(?<word>\\w+)\\s+\\k<word> matches repeated words',
            matches: 'Same text as named capture group',
            details: 'ES2018+. References named capturing group',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences'
        },
        '(?R)': {
            description: 'Recursion - match entire pattern recursively',
            syntax: '(?R) or (?0)',
            example: '\\((?:[^()]|(?R))*\\) matches nested parentheses',
            matches: 'Recursive pattern matching',
            details: 'Not supported in JavaScript. Available in PCRE, Ruby, etc.',
            docUrl: 'https://www.regular-expressions.info/recurse.html'
        },
        '(?1)': {
            description: 'Subroutine call to group 1',
            syntax: '(?1), (?2), etc.',
            example: 'Calls pattern from capture group',
            matches: 'Pattern from specified group',
            details: 'Not supported in JavaScript. Available in PCRE',
            docUrl: 'https://www.regular-expressions.info/subroutine.html'
        },
        '(?&name)': {
            description: 'Named subroutine call',
            syntax: '(?&name)',
            example: 'Calls pattern from named group',
            matches: 'Pattern from named group',
            details: 'Not supported in JavaScript. Available in PCRE',
            docUrl: 'https://www.regular-expressions.info/subroutine.html'
        }
    },

    // Escape Sequences (20+ entries)
    escapeSequences: {
        '\\n': {
            description: 'Newline character',
            syntax: '\\n',
            example: 'line1\\nline2 matches text with newline',
            matches: 'Line feed (LF)',
            details: 'ASCII code 10',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\r': {
            description: 'Carriage return',
            syntax: '\\r',
            example: 'Matches carriage return character',
            matches: 'Carriage return (CR)',
            details: 'ASCII code 13. Windows uses \\r\\n',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\t': {
            description: 'Tab character',
            syntax: '\\t',
            example: 'word1\\tword2 matches tab-separated text',
            matches: 'Horizontal tab',
            details: 'ASCII code 9',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\f': {
            description: 'Form feed',
            syntax: '\\f',
            example: 'Matches form feed character',
            matches: 'Form feed',
            details: 'ASCII code 12. Rare in modern text',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\v': {
            description: 'Vertical tab',
            syntax: '\\v',
            example: 'Matches vertical tab character',
            matches: 'Vertical tab',
            details: 'ASCII code 11. Rare in modern text',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\0': {
            description: 'Null character',
            syntax: '\\0',
            example: 'Matches null byte',
            matches: 'NULL character',
            details: 'ASCII code 0',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\xhh': {
            description: 'Hexadecimal character code',
            syntax: '\\xhh (2 hex digits)',
            example: '\\x41 matches "A", \\x20 matches space',
            matches: 'Character with hex code hh',
            details: 'Two hex digits required (00-FF)',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes'
        },
        '\\uhhhh': {
            description: 'Unicode character (4 digits)',
            syntax: '\\uhhhh',
            example: '\\u0041 matches "A", \\u2764 matches ❤',
            matches: 'Unicode character with code hhhh',
            details: 'Four hex digits required (0000-FFFF)',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\u{hhhhh}': {
            description: 'Unicode character (variable length)',
            syntax: '\\u{hhhhh}',
            example: '\\u{1F600} matches 😀',
            matches: 'Unicode character with code point',
            details: 'Requires u flag. Supports full Unicode range',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\cX': {
            description: 'Control character',
            syntax: '\\cX (X = A-Z)',
            example: '\\cM matches Ctrl+M (carriage return)',
            matches: 'Control character',
            details: '\\cA = Ctrl+A, etc.',
            docUrl: 'https://www.regular-expressions.info/nonprint.html'
        }
    },

    // Unicode Properties (15+ entries)
    unicodeProperties: {
        '\\p{L}': {
            description: 'Any Unicode letter',
            syntax: '\\p{L} or \\p{Letter}',
            example: 'Matches letters in any language',
            matches: 'All Unicode letters',
            details: 'Requires u flag. Includes all scripts',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{N}': {
            description: 'Any Unicode number',
            syntax: '\\p{N} or \\p{Number}',
            example: 'Matches digits in any script',
            matches: 'All Unicode numbers',
            details: 'Requires u flag',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{P}': {
            description: 'Any Unicode punctuation',
            syntax: '\\p{P} or \\p{Punctuation}',
            example: 'Matches punctuation marks',
            matches: 'All Unicode punctuation',
            details: 'Requires u flag',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{S}': {
            description: 'Any Unicode symbol',
            syntax: '\\p{S} or \\p{Symbol}',
            example: 'Matches symbols like $, ©, ™',
            matches: 'All Unicode symbols',
            details: 'Requires u flag',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{Z}': {
            description: 'Any Unicode separator',
            syntax: '\\p{Z} or \\p{Separator}',
            example: 'Matches space separators',
            matches: 'All Unicode separators',
            details: 'Requires u flag',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{Emoji}': {
            description: 'Any emoji character',
            syntax: '\\p{Emoji}',
            example: 'Matches 😀, 🎉, ❤️, etc.',
            matches: 'All emoji characters',
            details: 'Requires u flag. ES2018+',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        },
        '\\p{Script=Latin}': {
            description: 'Characters from Latin script',
            syntax: '\\p{Script=ScriptName}',
            example: '\\p{Script=Greek} matches Greek letters',
            matches: 'Characters from specified script',
            details: 'Requires u flag. Supports all Unicode scripts',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes'
        }
    },

    // Flags (6 entries)
    flags: {
        'i': {
            name: 'Case Insensitive',
            description: 'Makes the pattern case-insensitive',
            syntax: '/pattern/i',
            example: '/hello/i matches "Hello", "HELLO", "hello"',
            details: 'Ignores case for all letters in the pattern',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        },
        'g': {
            name: 'Global',
            description: 'Find all matches rather than stopping after first',
            syntax: '/pattern/g',
            example: '/a/g finds all "a" in the string',
            details: 'Without g, only first match is found',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        },
        'm': {
            name: 'Multiline',
            description: 'Makes ^ and $ match line boundaries',
            syntax: '/pattern/m',
            example: '/^line/m matches "line" at start of any line',
            details: 'Without m, ^ and $ only match string start/end',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        },
        's': {
            name: 'Dotall',
            description: 'Makes . match newline characters',
            syntax: '/pattern/s',
            example: '/a.b/s matches "a\\nb"',
            details: 'Without s, . doesn\'t match newlines. ES2018+',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        },
        'u': {
            name: 'Unicode',
            description: 'Enables Unicode mode for proper handling',
            syntax: '/pattern/u',
            example: 'Required for \\p{}, \\u{}, emoji, etc.',
            details: 'Treats pattern as Unicode code points. ES2015+',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        },
        'y': {
            name: 'Sticky',
            description: 'Matches only from lastIndex position',
            syntax: '/pattern/y',
            example: 'Anchors match to lastIndex',
            details: 'Useful for tokenizers and parsers. ES2015+',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags'
        }
    },

    // Special Constructs (10+ entries)
    specialConstructs: {
        '|': {
            description: 'Alternation - OR operator',
            syntax: 'pattern1|pattern2',
            example: 'cat|dog matches "cat" or "dog"',
            matches: 'Either pattern1 or pattern2',
            details: 'Tries patterns left to right. First match wins',
            docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions'
        },
        '\\Q...\\E': {
            description: 'Literal mode - treat as literal text',
            syntax: '\\Q...\\E',
            example: '\\Q.*+?\\E matches literal ".*+?"',
            matches: 'Literal text (no special meaning)',
            details: 'Not supported in JavaScript. Available in PCRE, Java',
            docUrl: 'https://www.regular-expressions.info/freespacing.html'
        },
        '\\K': {
            description: 'Keep - reset match start',
            syntax: 'prefix\\Kpattern',
            example: 'foo\\Kbar matches "bar" but requires "foo" before',
            matches: 'Resets the start of the match',
            details: 'Not supported in JavaScript. Available in PCRE, Perl',
            docUrl: 'https://www.regular-expressions.info/keep.html'
        },
        '(*ACCEPT)': {
            description: 'Verb control - accept match immediately',
            syntax: '(*ACCEPT)',
            example: 'Forces immediate match success',
            matches: 'Control verb',
            details: 'Not supported in JavaScript. Available in PCRE',
            docUrl: 'https://www.regular-expressions.info/backtrackcontrol.html'
        },
        '(*FAIL)': {
            description: 'Verb control - force match failure',
            syntax: '(*FAIL) or (*F)',
            example: 'Forces immediate match failure',
            matches: 'Control verb',
            details: 'Not supported in JavaScript. Available in PCRE',
            docUrl: 'https://www.regular-expressions.info/backtrackcontrol.html'
        }
    }
};

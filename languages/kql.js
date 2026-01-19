// KQL Knowledge Base - Explanations for operators, functions, and keywords

export const kqlKnowledge = {
    // Table operators
    operators: {
        'where': {
            type: 'operator',
            description: 'Filters rows based on a condition',
            syntax: 'where <condition>',
            example: 'where TimeGenerated > ago(1h)',
            details: 'Returns only the rows that satisfy the boolean condition. Commonly used for filtering data by time, status, or other criteria.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/whereoperator'
        },
        'project': {
            type: 'operator',
            description: 'Selects specific columns to include in output',
            syntax: 'project <column1>, <column2>, ...',
            example: 'project Computer, EventID, TimeGenerated',
            details: 'Similar to SELECT in SQL. Use this to reduce the number of columns and focus on relevant data.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/projectoperator'
        },
        'extend': {
            type: 'operator',
            description: 'Creates new calculated columns',
            syntax: 'extend <new_column> = <expression>',
            example: 'extend Duration = EndTime - StartTime',
            details: 'Adds new columns to the result set without removing existing ones. Useful for calculations and transformations.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/extendoperator'
        },
        'summarize': {
            type: 'operator',
            description: 'Aggregates data into groups',
            syntax: 'summarize <aggregation> by <column>',
            example: 'summarize count() by Computer',
            details: 'Groups rows and performs aggregations like count, sum, avg. Similar to GROUP BY in SQL.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/summarizeoperator'
        },
        'take': {
            type: 'operator',
            description: 'Returns a specified number of rows',
            syntax: 'take <number>',
            example: 'take 100',
            details: 'Limits the result set to the specified number of rows. Useful for sampling or quick previews.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/takeoperator'
        },
        'limit': {
            type: 'operator',
            description: 'Alias for take - returns a specified number of rows',
            syntax: 'limit <number>',
            example: 'limit 100',
            details: 'Same as "take". Limits the result set to the specified number of rows.'
        },
        'sort': {
            type: 'operator',
            description: 'Orders results by one or more columns',
            syntax: 'sort by <column> [asc|desc]',
            example: 'sort by TimeGenerated desc',
            details: 'Sorts the result set. Use "asc" for ascending (default) or "desc" for descending order.'
        },
        'order': {
            type: 'operator',
            description: 'Alias for sort - orders results by columns',
            syntax: 'order by <column> [asc|desc]',
            example: 'order by count_ desc',
            details: 'Same as "sort". Orders the result set by specified columns.'
        },
        'join': {
            type: 'operator',
            description: 'Combines rows from two tables',
            syntax: 'join kind=<type> (<table>) on <key>',
            example: 'join kind=inner (SecurityEvent) on Computer',
            details: 'Merges data from two tables based on matching keys. Supports inner, outer, left, right joins.'
        },
        'union': {
            type: 'operator',
            description: 'Combines rows from multiple tables',
            syntax: 'union <table1>, <table2>, ...',
            example: 'union SecurityEvent, Syslog',
            details: 'Stacks rows from multiple tables vertically. All tables should have compatible schemas.'
        },
        'distinct': {
            type: 'operator',
            description: 'Returns unique rows',
            syntax: 'distinct <column1>, <column2>, ...',
            example: 'distinct Computer',
            details: 'Removes duplicate rows based on specified columns.'
        },
        'top': {
            type: 'operator',
            description: 'Returns top N rows by a column',
            syntax: 'top <number> by <column> [asc|desc]',
            example: 'top 10 by count_ desc',
            details: 'Returns the top N rows sorted by the specified column. More efficient than sort + take.'
        }
    },

    // Aggregation functions
    functions: {
        'count': {
            type: 'function',
            description: 'Counts the number of rows',
            syntax: 'count()',
            example: 'summarize count()',
            details: 'Returns the total number of rows in the group. Most commonly used aggregation function.',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/count-aggfunction'
        },
        'sum': {
            type: 'function',
            description: 'Calculates the sum of values',
            syntax: 'sum(<column>)',
            example: 'summarize sum(BytesSent)',
            details: 'Adds up all numeric values in the specified column.'
        },
        'avg': {
            type: 'function',
            description: 'Calculates the average of values',
            syntax: 'avg(<column>)',
            example: 'summarize avg(Duration)',
            details: 'Computes the arithmetic mean of numeric values in the column.'
        },
        'min': {
            type: 'function',
            description: 'Finds the minimum value',
            syntax: 'min(<column>)',
            example: 'summarize min(TimeGenerated)',
            details: 'Returns the smallest value in the column.'
        },
        'max': {
            type: 'function',
            description: 'Finds the maximum value',
            syntax: 'max(<column>)',
            example: 'summarize max(TimeGenerated)',
            details: 'Returns the largest value in the column.'
        },
        'dcount': {
            type: 'function',
            description: 'Counts distinct (unique) values',
            syntax: 'dcount(<column>)',
            example: 'summarize dcount(Computer)',
            details: 'Returns the number of unique values in the column. Useful for counting unique users, IPs, etc.'
        },
        'ago': {
            type: 'function',
            description: 'Calculates a time in the past',
            syntax: 'ago(<timespan>)',
            example: 'ago(1h), ago(7d), ago(30m)',
            details: 'Returns a datetime that is the specified timespan before now. Common units: d (days), h (hours), m (minutes), s (seconds).',
            docUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/agofunction'
        },
        'now': {
            type: 'function',
            description: 'Returns the current UTC time',
            syntax: 'now()',
            example: 'now()',
            details: 'Returns the current datetime in UTC. Useful for time-based calculations.'
        },
        'bin': {
            type: 'function',
            description: 'Rounds values down to a multiple',
            syntax: 'bin(<value>, <roundTo>)',
            example: 'bin(TimeGenerated, 1h)',
            details: 'Groups timestamps into time buckets. Essential for time-series charts and aggregations.'
        },
        'startswith': {
            type: 'function',
            description: 'Checks if string starts with a value',
            syntax: 'startswith(<string>, <prefix>)',
            example: 'where startswith(Computer, "WEB")',
            details: 'Returns true if the string starts with the specified prefix. Case-sensitive by default.'
        },
        'endswith': {
            type: 'function',
            description: 'Checks if string ends with a value',
            syntax: 'endswith(<string>, <suffix>)',
            example: 'where endswith(Computer, ".com")',
            details: 'Returns true if the string ends with the specified suffix.'
        },
        'contains': {
            type: 'function',
            description: 'Checks if string contains a substring',
            syntax: 'contains(<string>, <substring>)',
            example: 'where contains(Message, "error")',
            details: 'Returns true if the substring is found anywhere in the string. Case-insensitive.'
        },
        'has': {
            type: 'function',
            description: 'Checks for whole word match',
            syntax: 'has(<string>, <word>)',
            example: 'where Message has "failed"',
            details: 'Returns true if the word appears as a complete term (not part of another word). More efficient than contains.'
        },
        'between': {
            type: 'function',
            description: 'Checks if value is in a range',
            syntax: 'between(<value>, <min> .. <max>)',
            example: 'where TimeGenerated between (ago(1h) .. now())',
            details: 'Returns true if the value is within the specified range (inclusive).'
        },
        'datetime': {
            type: 'function',
            description: 'Converts string to datetime',
            syntax: 'datetime(<string>)',
            example: 'datetime("2024-01-01")',
            details: 'Parses a string into a datetime value. Supports various date formats.'
        },
        'tostring': {
            type: 'function',
            description: 'Converts value to string',
            syntax: 'tostring(<value>)',
            example: 'tostring(EventID)',
            details: 'Converts any value to its string representation.'
        },
        'toint': {
            type: 'function',
            description: 'Converts value to integer',
            syntax: 'toint(<value>)',
            example: 'toint("42")',
            details: 'Converts a string or numeric value to an integer.'
        }
    },

    // Keywords and special tokens
    keywords: {
        'by': {
            type: 'keyword',
            description: 'Specifies grouping or sorting columns',
            details: 'Used with summarize, sort, order, and top operators to specify which columns to group or sort by.'
        },
        'on': {
            type: 'keyword',
            description: 'Specifies join key columns',
            details: 'Used with join operator to specify which columns to match between tables.'
        },
        'asc': {
            type: 'keyword',
            description: 'Ascending sort order',
            details: 'Sorts from smallest to largest (A-Z, 0-9, oldest to newest).'
        },
        'desc': {
            type: 'keyword',
            description: 'Descending sort order',
            details: 'Sorts from largest to smallest (Z-A, 9-0, newest to oldest).'
        },
        'kind': {
            type: 'keyword',
            description: 'Specifies the type of operation',
            details: 'Used with join to specify join type (inner, outer, left, right, etc.).'
        },
        'and': {
            type: 'keyword',
            description: 'Logical AND operator',
            details: 'Both conditions must be true for the result to be true.'
        },
        'or': {
            type: 'keyword',
            description: 'Logical OR operator',
            details: 'At least one condition must be true for the result to be true.'
        },
        'not': {
            type: 'keyword',
            description: 'Logical NOT operator',
            details: 'Negates a boolean condition.'
        }
    }
};

// Helper function to get explanation for any token
export function getExplanation(token, tokenType) {
    const lowerToken = token.toLowerCase();

    if (kqlKnowledge.operators[lowerToken]) {
        return kqlKnowledge.operators[lowerToken];
    }

    if (kqlKnowledge.functions[lowerToken]) {
        return kqlKnowledge.functions[lowerToken];
    }

    if (kqlKnowledge.keywords[lowerToken]) {
        return kqlKnowledge.keywords[lowerToken];
    }

    // Default explanations for unknown tokens
    if (tokenType === 'string') {
        return {
            type: 'string',
            description: 'String literal value',
            details: 'A text value enclosed in quotes.'
        };
    }

    if (tokenType === 'number') {
        return {
            type: 'number',
            description: 'Numeric value',
            details: 'A numeric literal used in calculations or comparisons.'
        };
    }

    if (tokenType === 'identifier') {
        return {
            type: 'identifier',
            description: 'Column or table name',
            details: 'References a column in the current table or a table name.'
        };
    }

    return {
        type: 'unknown',
        description: token,
        details: 'Token type not recognized.'
    };
}

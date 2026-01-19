// SQL Knowledge Base - Explanations for SQL statements, clauses, and functions

export const sqlKnowledge = {
    // SQL Clauses and Keywords
    clauses: {
        'select': {
            type: 'clause',
            description: 'Retrieves data from one or more tables',
            syntax: 'SELECT column1, column2, ... FROM table',
            example: 'SELECT name, email FROM users',
            details: 'The SELECT statement is used to query data from a database. Use * to select all columns, or specify individual column names.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'from': {
            type: 'clause',
            description: 'Specifies the table(s) to query',
            syntax: 'FROM table_name',
            example: 'FROM customers',
            details: 'The FROM clause specifies which table or tables to retrieve data from. Can include joins to combine multiple tables.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'where': {
            type: 'clause',
            description: 'Filters rows based on a condition',
            syntax: 'WHERE condition',
            example: 'WHERE age > 18',
            details: 'The WHERE clause filters records that meet specified conditions. Only rows satisfying the condition are returned.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'group': {
            type: 'clause',
            description: 'Groups rows with the same values',
            syntax: 'GROUP BY column1, column2, ...',
            example: 'GROUP BY country',
            details: 'The GROUP BY clause groups rows that have the same values into summary rows. Often used with aggregate functions.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'having': {
            type: 'clause',
            description: 'Filters groups based on a condition',
            syntax: 'HAVING condition',
            example: 'HAVING COUNT(*) > 5',
            details: 'The HAVING clause filters groups after GROUP BY. Similar to WHERE but operates on grouped data.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'order': {
            type: 'clause',
            description: 'Sorts the result set',
            syntax: 'ORDER BY column [ASC|DESC]',
            example: 'ORDER BY created_at DESC',
            details: 'The ORDER BY clause sorts the result set by one or more columns. Use ASC for ascending (default) or DESC for descending.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'limit': {
            type: 'clause',
            description: 'Limits the number of rows returned',
            syntax: 'LIMIT number',
            example: 'LIMIT 10',
            details: 'The LIMIT clause restricts the number of rows returned by the query. Useful for pagination.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'offset': {
            type: 'clause',
            description: 'Skips a specified number of rows',
            syntax: 'OFFSET number',
            example: 'OFFSET 20',
            details: 'The OFFSET clause skips a specified number of rows before returning results. Used with LIMIT for pagination.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'join': {
            type: 'clause',
            description: 'Combines rows from two or more tables',
            syntax: 'JOIN table ON condition',
            example: 'JOIN orders ON users.id = orders.user_id',
            details: 'The JOIN clause combines rows from multiple tables based on a related column. Types include INNER, LEFT, RIGHT, and FULL.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'inner': {
            type: 'clause',
            description: 'Returns matching rows from both tables',
            syntax: 'INNER JOIN table ON condition',
            example: 'INNER JOIN orders ON users.id = orders.user_id',
            details: 'INNER JOIN returns only rows that have matching values in both tables.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'left': {
            type: 'clause',
            description: 'Returns all rows from left table',
            syntax: 'LEFT JOIN table ON condition',
            example: 'LEFT JOIN orders ON users.id = orders.user_id',
            details: 'LEFT JOIN returns all rows from the left table and matching rows from the right table. NULL for non-matches.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-select.html'
        },
        'insert': {
            type: 'clause',
            description: 'Inserts new rows into a table',
            syntax: 'INSERT INTO table (columns) VALUES (values)',
            example: 'INSERT INTO users (name, email) VALUES (\'John\', \'john@example.com\')',
            details: 'The INSERT statement adds new records to a table.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-insert.html'
        },
        'update': {
            type: 'clause',
            description: 'Modifies existing rows',
            syntax: 'UPDATE table SET column = value WHERE condition',
            example: 'UPDATE users SET status = \'active\' WHERE id = 1',
            details: 'The UPDATE statement modifies existing records in a table. Always use WHERE to avoid updating all rows.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-update.html'
        },
        'delete': {
            type: 'clause',
            description: 'Removes rows from a table',
            syntax: 'DELETE FROM table WHERE condition',
            example: 'DELETE FROM users WHERE inactive = true',
            details: 'The DELETE statement removes records from a table. Always use WHERE to avoid deleting all rows.',
            docUrl: 'https://www.postgresql.org/docs/current/sql-delete.html'
        }
    },

    // SQL Functions
    functions: {
        'count': {
            type: 'function',
            description: 'Counts the number of rows',
            syntax: 'COUNT(column) or COUNT(*)',
            example: 'SELECT COUNT(*) FROM users',
            details: 'COUNT returns the number of rows. COUNT(*) counts all rows, COUNT(column) counts non-NULL values.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html'
        },
        'sum': {
            type: 'function',
            description: 'Calculates the sum of values',
            syntax: 'SUM(column)',
            example: 'SELECT SUM(amount) FROM orders',
            details: 'SUM returns the total of all numeric values in a column.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html'
        },
        'avg': {
            type: 'function',
            description: 'Calculates the average of values',
            syntax: 'AVG(column)',
            example: 'SELECT AVG(price) FROM products',
            details: 'AVG returns the average (mean) of all numeric values in a column.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html'
        },
        'min': {
            type: 'function',
            description: 'Finds the minimum value',
            syntax: 'MIN(column)',
            example: 'SELECT MIN(price) FROM products',
            details: 'MIN returns the smallest value in a column.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html'
        },
        'max': {
            type: 'function',
            description: 'Finds the maximum value',
            syntax: 'MAX(column)',
            example: 'SELECT MAX(price) FROM products',
            details: 'MAX returns the largest value in a column.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html'
        },
        'upper': {
            type: 'function',
            description: 'Converts string to uppercase',
            syntax: 'UPPER(string)',
            example: 'SELECT UPPER(name) FROM users',
            details: 'UPPER converts all characters in a string to uppercase.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-string.html'
        },
        'lower': {
            type: 'function',
            description: 'Converts string to lowercase',
            syntax: 'LOWER(string)',
            example: 'SELECT LOWER(email) FROM users',
            details: 'LOWER converts all characters in a string to lowercase.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-string.html'
        },
        'now': {
            type: 'function',
            description: 'Returns current date and time',
            syntax: 'NOW()',
            example: 'SELECT NOW()',
            details: 'NOW returns the current date and time.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-datetime.html'
        },
        'coalesce': {
            type: 'function',
            description: 'Returns first non-NULL value',
            syntax: 'COALESCE(value1, value2, ...)',
            example: 'SELECT COALESCE(phone, email, \'N/A\') FROM users',
            details: 'COALESCE returns the first non-NULL value from a list of arguments.',
            docUrl: 'https://www.postgresql.org/docs/current/functions-conditional.html'
        }
    },

    // SQL Keywords
    keywords: {
        'as': {
            type: 'keyword',
            description: 'Creates an alias for a column or table',
            details: 'AS renames a column or table in the result set. Makes output more readable.'
        },
        'by': {
            type: 'keyword',
            description: 'Used with GROUP BY and ORDER BY',
            details: 'Specifies the column(s) for grouping or sorting.'
        },
        'on': {
            type: 'keyword',
            description: 'Specifies join condition',
            details: 'Used with JOIN to specify which columns to match between tables.'
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
        },
        'in': {
            type: 'keyword',
            description: 'Checks if value is in a list',
            details: 'Returns true if the value matches any value in a list.'
        },
        'between': {
            type: 'keyword',
            description: 'Checks if value is in a range',
            details: 'Returns true if the value is within the specified range (inclusive).'
        },
        'like': {
            type: 'keyword',
            description: 'Pattern matching with wildcards',
            details: 'Matches strings using % (any characters) and _ (single character) wildcards.'
        },
        'distinct': {
            type: 'keyword',
            description: 'Returns unique values only',
            details: 'Removes duplicate rows from the result set.'
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
        'null': {
            type: 'keyword',
            description: 'Represents missing or unknown value',
            details: 'NULL is a special marker for missing data. Use IS NULL or IS NOT NULL to check.'
        },
        'is': {
            type: 'keyword',
            description: 'Used to check for NULL values',
            details: 'IS NULL checks if a value is NULL. IS NOT NULL checks if a value exists.'
        }
    }
};

// Helper function to get explanation for any SQL token
export function getExplanation(token, tokenType) {
    const lowerToken = token.toLowerCase();

    if (sqlKnowledge.clauses[lowerToken]) {
        return sqlKnowledge.clauses[lowerToken];
    }

    if (sqlKnowledge.functions[lowerToken]) {
        return sqlKnowledge.functions[lowerToken];
    }

    if (sqlKnowledge.keywords[lowerToken]) {
        return sqlKnowledge.keywords[lowerToken];
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
            details: 'References a column in a table or a table name.'
        };
    }

    return {
        type: 'unknown',
        description: token,
        details: 'Token type not recognized.'
    };
}

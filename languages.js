// Language Registry - Configuration for all supported query languages

export const languages = {
    kql: {
        id: 'kql',
        name: 'KQL',
        fullName: 'Kusto Query Language',
        description: 'Query language for Azure Data Explorer, Log Analytics, and Application Insights',
        placeholder: 'SecurityEvent | where TimeGenerated > ago(1h) | take 10',
        icon: '📊',
        module: './languages/kql.js',
        examples: [
            {
                title: 'Recent Security Events',
                query: 'SecurityEvent | where TimeGenerated > ago(1h) | take 10'
            },
            {
                title: 'Count by Computer',
                query: 'SecurityEvent | summarize count() by Computer | order by count_ desc'
            },
            {
                title: 'Filter and Project',
                query: 'Syslog | where Severity == "error" | project TimeGenerated, Computer, Message'
            },
            {
                title: 'Time-based Aggregation',
                query: 'Heartbeat | summarize count() by bin(TimeGenerated, 1h)'
            },
            {
                title: 'String Search',
                query: 'Event | where EventLog has "Application" and EventLevelName == "Error"'
            },
            {
                title: 'Top Results',
                query: 'PerformanceCounter | where CounterName == "% Processor Time" | top 20 by CounterValue desc'
            }
        ]
    },
    sql: {
        id: 'sql',
        name: 'SQL',
        fullName: 'Structured Query Language',
        description: 'Standard language for managing and querying relational databases',
        placeholder: 'SELECT name, email FROM users WHERE active = true LIMIT 10',
        icon: '🗄️',
        module: './languages/sql.js',
        examples: [
            {
                title: 'Basic SELECT Query',
                query: 'SELECT name, email FROM users WHERE active = true'
            },
            {
                title: 'Count and Group',
                query: 'SELECT country, COUNT(*) as total FROM users GROUP BY country ORDER BY total DESC'
            },
            {
                title: 'JOIN Tables',
                query: 'SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id'
            },
            {
                title: 'Aggregate Functions',
                query: 'SELECT AVG(price) as avg_price, MAX(price) as max_price FROM products'
            },
            {
                title: 'String Functions',
                query: 'SELECT UPPER(name), LOWER(email) FROM users WHERE name LIKE \'%John%\''
            },
            {
                title: 'Date and Limit',
                query: 'SELECT * FROM orders WHERE created_at > NOW() - INTERVAL \'7 days\' LIMIT 20'
            }
        ]
    },
    promql: {
        id: 'promql',
        name: 'PromQL',
        fullName: 'Prometheus Query Language',
        description: 'Query language for Prometheus monitoring and time series data',
        placeholder: 'rate(http_requests_total[5m])',
        icon: '📈',
        module: './languages/promql.js',
        examples: [
            {
                title: 'Request Rate',
                query: 'rate(http_requests_total[5m])'
            },
            {
                title: 'CPU Usage by Instance',
                query: 'avg(rate(cpu_usage_seconds_total[5m])) by (instance)'
            },
            {
                title: 'Top 5 Memory Consumers',
                query: 'topk(5, memory_usage_bytes)'
            },
            {
                title: 'P95 Latency',
                query: 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))'
            },
            {
                title: 'Error Rate',
                query: 'sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))'
            },
            {
                title: 'Disk Space Prediction',
                query: 'predict_linear(disk_free_bytes[1h], 3600 * 24)'
            }
        ]
    },
    powershell: {
        id: 'powershell',
        name: 'PowerShell',
        fullName: 'PowerShell',
        description: 'Task automation and configuration management framework from Microsoft',
        placeholder: 'Get-Process | Where-Object {$_.CPU -gt 10} | Select-Object Name, CPU',
        icon: '⚡',
        module: './languages/powershell.js',
        examples: [
            {
                title: 'List Files',
                query: 'Get-ChildItem -Path C:\\Users -Recurse -Filter *.txt'
            },
            {
                title: 'Filter Processes',
                query: 'Get-Process | Where-Object {$_.CPU -gt 10} | Sort-Object CPU -Descending'
            },
            {
                title: 'Service Management',
                query: 'Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name, Status'
            },
            {
                title: 'Group and Count',
                query: 'Get-Process | Group-Object ProcessName | Sort-Object Count -Descending'
            },
            {
                title: 'Web Request',
                query: 'Invoke-RestMethod -Uri https://api.github.com/users/octocat'
            },
            {
                title: 'File Operations',
                query: 'Get-Content -Path log.txt | Where-Object {$_ -match "ERROR"}'
            }
        ]
    }
    // Future languages can be added here:
    // bash: { ... },
    // python: { ... }
};

// Get language by ID
export function getLanguage(langId) {
    return languages[langId] || languages.kql;
}

// Get all available languages
export function getAllLanguages() {
    return Object.values(languages);
}

// Get default language
export function getDefaultLanguage() {
    return languages.kql;
}

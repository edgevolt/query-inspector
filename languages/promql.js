// PromQL Knowledge Base - Explanations for Prometheus Query Language

export const promqlKnowledge = {
    // Metric selectors and operators
    selectors: {
        'rate': {
            type: 'function',
            description: 'Calculates per-second rate of increase',
            syntax: 'rate(metric[time_range])',
            example: 'rate(http_requests_total[5m])',
            details: 'Calculates the per-second average rate of increase over the specified time range. Used for counters.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#rate'
        },
        'irate': {
            type: 'function',
            description: 'Calculates instant rate of increase',
            syntax: 'irate(metric[time_range])',
            example: 'irate(http_requests_total[5m])',
            details: 'Calculates the per-second rate of increase based on the last two data points. More sensitive to short-term changes.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#irate'
        },
        'sum': {
            type: 'aggregation',
            description: 'Sums values across dimensions',
            syntax: 'sum(metric) by (label)',
            example: 'sum(http_requests_total) by (status)',
            details: 'Aggregates values by summing them. Use "by" to preserve specific labels, "without" to remove labels.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'avg': {
            type: 'aggregation',
            description: 'Calculates average across dimensions',
            syntax: 'avg(metric) by (label)',
            example: 'avg(cpu_usage) by (instance)',
            details: 'Calculates the average of values. Use "by" to group by specific labels.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'max': {
            type: 'aggregation',
            description: 'Finds maximum value across dimensions',
            syntax: 'max(metric) by (label)',
            example: 'max(memory_usage) by (pod)',
            details: 'Returns the maximum value. Useful for finding peak values.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'min': {
            type: 'aggregation',
            description: 'Finds minimum value across dimensions',
            syntax: 'min(metric) by (label)',
            example: 'min(disk_free) by (node)',
            details: 'Returns the minimum value. Useful for finding lowest values.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'count': {
            type: 'aggregation',
            description: 'Counts number of time series',
            syntax: 'count(metric) by (label)',
            example: 'count(up) by (job)',
            details: 'Counts the number of time series in the result. Useful for counting instances.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'increase': {
            type: 'function',
            description: 'Calculates increase over time range',
            syntax: 'increase(metric[time_range])',
            example: 'increase(http_requests_total[1h])',
            details: 'Calculates the total increase in value over the specified time range. For counters.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#increase'
        },
        'histogram_quantile': {
            type: 'function',
            description: 'Calculates quantile from histogram',
            syntax: 'histogram_quantile(φ, metric)',
            example: 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))',
            details: 'Calculates the φ-quantile (0 ≤ φ ≤ 1) from histogram buckets. Common for p95, p99 latencies.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile'
        },
        'topk': {
            type: 'aggregation',
            description: 'Returns top K time series by value',
            syntax: 'topk(k, metric)',
            example: 'topk(5, http_requests_total)',
            details: 'Returns the k largest time series by sample value. Useful for finding top consumers.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'bottomk': {
            type: 'aggregation',
            description: 'Returns bottom K time series by value',
            syntax: 'bottomk(k, metric)',
            example: 'bottomk(3, disk_free)',
            details: 'Returns the k smallest time series by sample value.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators'
        },
        'delta': {
            type: 'function',
            description: 'Calculates difference between first and last value',
            syntax: 'delta(metric[time_range])',
            example: 'delta(cpu_temp_celsius[1h])',
            details: 'Calculates the difference between the first and last value in the time range. For gauges.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#delta'
        },
        'deriv': {
            type: 'function',
            description: 'Calculates per-second derivative',
            syntax: 'deriv(metric[time_range])',
            example: 'deriv(node_cpu_seconds_total[5m])',
            details: 'Calculates the per-second derivative using linear regression. Shows rate of change.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#deriv'
        },
        'predict_linear': {
            type: 'function',
            description: 'Predicts future value using linear regression',
            syntax: 'predict_linear(metric[time_range], seconds)',
            example: 'predict_linear(disk_free[1h], 3600)',
            details: 'Predicts the value of the time series after the specified number of seconds using linear regression.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear'
        },
        'absent': {
            type: 'function',
            description: 'Returns 1 if metric is missing',
            syntax: 'absent(metric)',
            example: 'absent(up{job="api"})',
            details: 'Returns 1 if the metric does not exist, otherwise returns nothing. Useful for alerting on missing metrics.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#absent'
        },
        'changes': {
            type: 'function',
            description: 'Counts number of value changes',
            syntax: 'changes(metric[time_range])',
            example: 'changes(process_start_time_seconds[1h])',
            details: 'Returns the number of times the value changed within the time range.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#changes'
        },
        'resets': {
            type: 'function',
            description: 'Counts number of counter resets',
            syntax: 'resets(metric[time_range])',
            example: 'resets(http_requests_total[1h])',
            details: 'Returns the number of counter resets (decreases) within the time range.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#resets'
        },
        'label_replace': {
            type: 'function',
            description: 'Replaces label values using regex',
            syntax: 'label_replace(metric, "dst", "replacement", "src", "regex")',
            example: 'label_replace(up, "host", "$1", "instance", "([^:]+):.*")',
            details: 'Creates or replaces a label by applying a regex to an existing label value.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#label_replace'
        },
        'label_join': {
            type: 'function',
            description: 'Joins multiple label values',
            syntax: 'label_join(metric, "dst", "separator", "src1", "src2", ...)',
            example: 'label_join(up, "full_name", "-", "job", "instance")',
            details: 'Creates a new label by joining the values of multiple source labels with a separator.',
            docUrl: 'https://prometheus.io/docs/prometheus/latest/querying/functions/#label_join'
        }
    },

    // Keywords and operators
    keywords: {
        'by': {
            type: 'keyword',
            description: 'Groups results by specified labels',
            details: 'Used with aggregation operators to preserve specific labels while aggregating.'
        },
        'without': {
            type: 'keyword',
            description: 'Groups results excluding specified labels',
            details: 'Used with aggregation operators to remove specific labels while aggregating.'
        },
        'on': {
            type: 'keyword',
            description: 'Specifies matching labels for binary operations',
            details: 'Used in vector matching to specify which labels should match between two vectors.'
        },
        'ignoring': {
            type: 'keyword',
            description: 'Ignores specified labels when matching',
            details: 'Used in vector matching to ignore specific labels when comparing vectors.'
        },
        'group_left': {
            type: 'keyword',
            description: 'Many-to-one matching from left side',
            details: 'Allows multiple matches from the left side in a binary operation.'
        },
        'group_right': {
            type: 'keyword',
            description: 'One-to-many matching from right side',
            details: 'Allows multiple matches from the right side in a binary operation.'
        },
        'bool': {
            type: 'keyword',
            description: 'Returns 0 or 1 instead of filtering',
            details: 'Modifies comparison operators to return boolean values (0/1) instead of filtering.'
        },
        'offset': {
            type: 'keyword',
            description: 'Shifts time range backwards',
            details: 'Queries data from a specific time in the past. Example: metric[5m] offset 1h'
        },
        'and': {
            type: 'operator',
            description: 'Intersection of two vectors',
            details: 'Returns elements that exist in both vectors.'
        },
        'or': {
            type: 'operator',
            description: 'Union of two vectors',
            details: 'Returns elements from either vector.'
        },
        'unless': {
            type: 'operator',
            description: 'Complement of vectors',
            details: 'Returns elements from the left vector that do not have matching elements in the right vector.'
        }
    }
};

// Helper function to get explanation for any PromQL token
export function getExplanation(token, tokenType) {
    const lowerToken = token.toLowerCase();

    if (promqlKnowledge.selectors[lowerToken]) {
        return promqlKnowledge.selectors[lowerToken];
    }

    if (promqlKnowledge.keywords[lowerToken]) {
        return promqlKnowledge.keywords[lowerToken];
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
            details: 'A numeric literal used in calculations or time ranges.'
        };
    }

    if (tokenType === 'metric') {
        return {
            type: 'metric',
            description: 'Metric name',
            details: 'The name of a time series metric being queried.'
        };
    }

    if (tokenType === 'label') {
        return {
            type: 'label',
            description: 'Label name',
            details: 'A label used to filter or group time series.'
        };
    }

    return {
        type: 'unknown',
        description: token,
        details: 'Token type not recognized.'
    };
}

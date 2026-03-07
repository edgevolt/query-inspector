# Inspector

**Version 2.3.3**

A minimalistic web application that explains query language statements, parses log entries, analyzes email headers, and helps you understand regular expressions with visual indicators and interactive info panels. Supports 20 query languages, 13 log formats (9 firewall + 4 identity/IAM), SMTP email headers with routing visualization, and comprehensive regex pattern analysis with an extensible architecture.

**Live at**: [explain.getstat.dev](https://explain.getstat.dev)

## Supported Languages

- 📊 **KQL** (Kusto Query Language) - Azure Data Explorer, Log Analytics
- 🗄️ **SQL** (Structured Query Language) - Relational databases
- 📈 **PromQL** (Prometheus Query Language) - Monitoring and metrics
- ⚡ **PowerShell** - Task automation and configuration management (85+ cmdlets)
- 🔷 **GraphQL** - API query language with strong typing and introspection
- 🍃 **MongoDB** - NoSQL database queries and aggregation pipelines
- 🔍 **Elasticsearch** - Search and analytics (Query DSL + ES|QL)
- 🌐 **OData** - REST API query protocol for web services
- 🔗 **CQL** (Cassandra Query Language) - Apache Cassandra NoSQL database
- 🕸️ **Cypher** - Neo4j graph database query language
- 🛡️ **FortiOS** (FortiOS CLI) - FortiGate firewall commands (7.4.x+)
- 🔥 **PAN-OS** (PAN-OS CLI) - Palo Alto Networks firewall commands
- 💻 **Bash** - Unix shell and command language
- 🏗️ **Terraform** - Infrastructure as Code (HashiCorp Configuration Language)
- 🔐 **QQL** (Qualys Query Language) - Qualys vulnerability management platform
- 🔍 **SPL** (Splunk Search Processing Language) - Splunk search and analytics
- 🛡️ **AQL** (Ariel Query Language) - IBM QRadar SIEM
- 🎯 **EQL** (Event Query Language) - Elastic threat hunting and security analysis
- 🔎 **Yara-L** (Yara-L) - Google Chronicle detection rule language
- 🔎 **OSQuery** - SQL-powered operating system instrumentation and monitoring


## Modes

### 🔍 Statement Mode
Analyze and understand query language statements with interactive parsing and detailed explanations.

### 📋 Log Mode
Parse and explain firewall and server log entries with field-by-field breakdowns.

#### Supported Log Formats
- 🐟 **Barracuda CloudGen Firewall (8.x/9.x)** - Barracuda Networks CloudGen/NG firewall logs (110+ field definitions)
- 🔷 **Check Point (R81.x)** - Check Point firewall logs (80+ field definitions)
- 🛡️ **Cisco Firepower (FTD 6.x/7.x)** - Cisco Firepower Threat Defense syslog logs (120+ field definitions)
- 🔥 **FortiGate (FortiOS 7.x)** - Fortinet FortiGate firewall logs (80+ field definitions)
- 🌲 **Juniper SRX (Junos OS 12.x/15.x+)** - Juniper Networks SRX firewall logs (100+ field definitions)
- 🔑 **Microsoft Entra ID** - Sign-in, audit, provisioning, and risk detection logs (120+ field definitions)
  - Sign-in logs (success/failure, MFA, Conditional Access)
  - Audit logs (user/group/app management)
  - Provisioning logs (identity sync operations)
  - Identity Protection risk detections
- 🔐 **Okta** - System Log events — authentication, lifecycle, security, and admin operations (100+ field definitions)
  - Authentication & SSO (sign-in, MFA challenge, federation)
  - User lifecycle (create, activate, deactivate, suspend)
  - Application & group management
  - Security events (threat detection, lockouts, risk signals)
- 🏓 **Ping Identity (PingOne)** - Audit activity logs — authentication, lifecycle, MFA, and admin events (100+ field definitions)
  - Authentication & SSO (sign-in, password checks, federation)
  - User lifecycle (create, update, delete, enable/disable)
  - MFA events (enrollment, challenge, factor management)
  - Risk evaluation (predictors, scores, policy decisions)
- 🔶 **Palo Alto (PAN-OS 11.x)** - Palo Alto Networks firewall logs (100+ field definitions)
- 🔶 **SonicWall (SonicOS 6.5/7.x)** - SonicWall firewall Enhanced Syslog format (90+ field definitions)
- 🔷 **Ubiquiti UniFi/EdgeRouter (UniFi OS)** - Ubiquiti UniFi and EdgeRouter logs (80+ field definitions)
- 🔥 **WatchGuard Firebox (Fireware OS 12.x)** - WatchGuard Firebox syslog format (95+ field definitions)

### 📧 Email Mode
Parse and analyze SMTP email headers with RFC 5322/5321 compliance. Features include:
- 50+ email header field definitions
- Email routing visualization showing mail server path
- Support for security headers (DKIM, SPF, DMARC)
- Multi-line folded header parsing
- Transit time calculation between hops

### 🔤 Regex Mode
Understand regular expressions with visual syntax highlighting, pattern explanations, and interactive testing.

---

#### Features
- **Pattern Breakdown** - Visual tokenization of regex patterns with 20+ token types
- **Live Testing** - Test patterns against sample text with real-time match highlighting
- **Capture Groups** - View all capture groups with names, values, and positions
- **Flags Support** - Toggle between i, g, m, s, u, y flags
- **100+ Components** - Comprehensive knowledge base covering all regex features
- **25+ Examples** - Pre-built patterns for common use cases (email, phone, URL, dates, etc.)
- **Cheat Sheet** - Quick reference for character classes, quantifiers, anchors, and more

## Features

### Statement Mode
- 🔍 **Interactive Query Parsing** - Real-time parsing and explanation of queries
- 🎨 **Visual Syntax Highlighting** - Color-coded tokens for operators, functions, keywords, and more
- 💡 **Detailed Info Panel** - Click any token to see comprehensive explanations with documentation links
- 🎯 **Example Queries** - Pre-built examples to get started quickly
- 📚 **20 Languages Supported** - From SQL to Yara-L

### Log Mode
- 📋 **Automatic Field Parsing** - Extracts all fields from log entries
- 🎨 **Color-Coded Categories** - Fields grouped by type (source, destination, action, etc.)
- 💡 **Field Explanations** - Click any field to see detailed descriptions and examples
- 📊 **Statistics** - Automatic aggregation for multiple log entries
- 🔍 **Auto-Detection** - Automatically identify log format
- 🎯 **Example Logs** - Pre-built log samples for testing

### General
- 📱 **Mobile-Friendly** - Fully responsive design optimized for learning on the go
- ⚡ **Fast & Lightweight** - Pure vanilla JavaScript, no frameworks required

## Usage

### Running Locally

Simply open `index.html` in your web browser:

```bash
cd query-inspector
# Option 1: Open directly
open index.html  # macOS
xdg-open index.html  # Linux

# Option 2: Use a local server (recommended for best experience)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Using the Application

#### Statement Mode
1. **Select a language** from the dropdown menu
2. **Enter a query or command** in the text area
3. **Click any token** to see detailed explanations in the info panel
4. **Click example queries** to load pre-built samples

#### Log Mode
1. **Click "📋 Log Mode"** to switch to log parsing
2. **Select a log format** from the dropdown (or use Auto-Detect)
3. **Paste one or more log entries** in the text area
4. **View parsed fields** in the color-coded table
5. **Click any field** to see detailed explanations
6. **View statistics** when parsing multiple logs

## Supported KQL Features

### Table Operators
- `where` - Filter rows by condition
- `project` - Select specific columns
- `extend` - Add calculated columns
- `summarize` - Aggregate data
- `take` / `limit` - Limit result count
- `sort` / `order` - Sort results
- `join` - Combine tables
- `union` - Stack tables
- `distinct` - Get unique rows
- `top` - Get top N rows

### Functions
- **Aggregations**: `count()`, `sum()`, `avg()`, `min()`, `max()`, `dcount()`
- **Time**: `ago()`, `now()`, `bin()`, `datetime()`
- **String**: `startswith()`, `endswith()`, `contains()`, `has()`
- **Conversion**: `tostring()`, `toint()`, `todouble()`

### Keywords & Operators
- Logical: `and`, `or`, `not`
- Comparison: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Grouping: `by`
- Sorting: `asc`, `desc`

## Architecture

```
query-inspector/
├── index.html              # Main HTML structure
├── style.css               # Minimalistic design system
├── main.js                 # Application logic and UI
├── languages.js            # Language registry
├── log-formats.js          # Log format registry
├── log-mode.js             # Log parsing mode handler
├── parsers/
│   ├── statements/         # Query/shell parsers (18 files)
│   │   ├── app.js          # KQL parser
│   │   ├── sql-parser.js
│   │   ├── yaral-parser.js
│   │   └── ...
│   └── logs/              # Log parsers (13 files)
│       ├── barracuda.js   # Barracuda CloudGen parser
│       ├── checkpoint.js  # Check Point parser
│       ├── entra-id.js    # Microsoft Entra ID parser (JSON)
│       ├── firepower.js   # Cisco Firepower parser
│       ├── fortinet.js    # FortiGate parser
│       ├── juniper.js     # Juniper SRX parser
│       ├── okta.js        # Okta System Log parser (JSON)
│       ├── paloalto.js    # Palo Alto parser
│       ├── ping-identity.js # Ping Identity parser (JSON)
│       ├── sonicwall.js   # SonicWall parser
│       ├── ubiquiti.js    # Ubiquiti UniFi parser
│       └── watchguard.js  # WatchGuard Firebox parser
└── knowledge/
    ├── statements/        # Query/shell knowledge bases (20 files)
    │   ├── kql.js
    │   ├── sql.js
    │   └── ...
    └── logs/             # Log knowledge bases (13 files)
        ├── barracuda.js   # Barracuda field definitions
        ├── checkpoint.js  # Check Point field definitions
        ├── entra-id.js    # Microsoft Entra ID field definitions
        ├── firepower.js   # Cisco Firepower field definitions
        ├── fortinet.js    # FortiGate field definitions
        ├── juniper.js     # Juniper SRX field definitions
        ├── okta.js        # Okta field definitions
        ├── paloalto.js    # Palo Alto field definitions
        ├── ping-identity.js # Ping Identity field definitions
        ├── sonicwall.js   # SonicWall field definitions
        ├── ubiquiti.js    # Ubiquiti UniFi field definitions
        └── watchguard.js  # WatchGuard Firebox field definitions
```

### How It Works

#### Statement Mode
1. **Tokenization** (`parsers/statements/*.js`) - Queries are broken down into tokens (operators, functions, keywords, etc.)
2. **Enrichment** (`knowledge/statements/*.js`) - Each token is matched with explanation data from the knowledge base
3. **Rendering** (`main.js`) - Tokens are rendered with color coding and interactive info panels
4. **Interaction** - Users can click tokens to see detailed explanations

#### Log Mode
1. **Format Detection** (`log-formats.js`) - Automatically identify log format or allow manual selection
2. **Parsing** (`parsers/logs/*.js`) - Log entries are parsed into field-value pairs
3. **Enrichment** (`knowledge/logs/*.js`) - Each field is matched with metadata (description, category, examples)
4. **Rendering** (`log-mode.js`) - Fields are displayed in a color-coded table by category
5. **Statistics** - Aggregate data is calculated for multiple log entries

## Extending the Application

### Adding New KQL Operators

Edit `kql-knowledge.js` and add to the appropriate section:

```javascript
operators: {
  'your-operator': {
    type: 'operator',
    description: 'Short description',
    syntax: 'operator <parameters>',
    example: 'Table | your-operator param',
    details: 'Detailed explanation of what it does'
  }
}
```

### Adding New Examples

Edit `main.js` and add to the `examples` array:

```javascript
{
  title: 'Your Example Title',
  query: 'YourTable | where condition | take 10'
}
```

### Adding a New Log Format

1. **Create parser** in `parsers/logs/yourformat.js`:
```javascript
export function parseLog(logLine) {
  // Parse log and return object with field-value pairs
  return { field1: value1, field2: value2 };
}
```

2. **Create knowledge base** in `knowledge/logs/yourformat.js`:
```javascript
export default {
  field1: {
    description: 'Field description',
    category: 'source', // source, destination, action, etc.
    examples: ['example1', 'example2']
  }
};
```

3. **Register format** in `log-formats.js`:
```javascript
export const logFormats = {
  yourformat: {
    id: 'yourformat',
    name: 'Your Format',
    emoji: '🔥',
    description: 'Description',
    examples: [{ title: 'Example', log: '...' }]
  }
};
```

## Design Philosophy

- **Minimalistic** - Clean, distraction-free interface focused on readability
- **Accessible** - Semantic HTML, proper ARIA labels, keyboard navigation
- **Mobile-First** - Optimized for learning on any device
- **Fast** - No build step, no dependencies, instant loading

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Resources

- [Official KQL Documentation](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)
- [KQL Quick Reference](https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)

## Contributing

Contributions are welcome! Feel free to:
- Add support for new query languages
- Add support for new log formats (Palo Alto, Cisco ASA, pfSense, etc.)
- Improve existing explanations
- Add more operators and functions
- Enhance the UI/UX
- Report bugs or suggest features

## License

MIT License - See [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Mike Berggren


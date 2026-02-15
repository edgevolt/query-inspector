# Changelog

All notable changes to Query Inspector will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.1] - 2026-02-14

### Added
- **Expanded Firewall Support** - Added **6 new major firewall log parsers**:
  - **Cisco Firepower (FTD 6.x/7.x)** - Support for standard syslog format with 120+ fields
  - **Juniper SRX (Junos OS)** - Support for standard and structured-data (SD-ID) formats (100+ fields)
  - **SonicWall (SonicOS)** - Support for standard and legacy syslog formats (90+ fields)
  - **Barracuda CloudGen Firewall** - Support for pipe-separated and key-value formats (110+ fields)
  - **WatchGuard Firebox** - Support for Fireware OS 12.x traffic and event logs (95+ fields)
  - **Ubiquiti UniFi/EdgeRouter** - Support for kernel-based firewall logs and rule prefixes (80+ fields)
- **URL Shortcuts** - Direct access to specific modes via URL parameters:
  - `?mode=log` - Open directly in Log Parser mode
  - `?mode=regex` - Open directly in Regex Mode
  - `?mode=email` - Open directly in Email Mode
  - `?mode=query` - Open directly in Statement Mode
- **State Persistence** - Application now remembers your last active mode across page reloads

### Changed
- **Log Registry** - Alphabetized vendor list in UI for better discoverability
- **Log Detection** - Enhanced auto-detection logic for all new vendors

## [2.3.0] - 2026-01-31

### Added
- **Email Mode for SMTP Headers** - New dedicated mode for parsing and analyzing email headers
  - **RFC 5322/5321 Compliance** - Full compliance with SMTP email header standards
  - **50+ Header Field Definitions** - Comprehensive coverage of email headers including source, destination, routing, content, and security headers
  - **Interactive Routing Visualization** - Visual flow diagram showing mail server path:
    - **Hop-by-Hop Analysis** - Captures all intermediate servers by parsing both "from" and "by" clauses
    - **Organization Detection** - Visually distinguishes internal hops from external organization boundaries (Microsoft, Google, etc.)
    - **Encryption Insights** - Displays TLS version (1.2, 1.3) and cipher suites on connection arrows with color-coded security badges
    - **Timing Analysis** - Calculates transit times between hops and detects clock skew issues with warnings
    - **Local Delivery** - Identifies and labels internal datacenter handoffs
  - **Security Header Analysis** - Detailed breakdown of DKIM, SPF, DMARC, and ARC authentication results
  - **Multi-line Parsing** - Proper handling of folded headers and non-standard timestamp formats (e.g., SendGrid)
  - **6 Example Email Headers** - Diverse examples covering marketing, security, threading, and forwarding scenarios
- **Check Point Firewall Log Parser (R81.x)** - Comprehensive firewall log parsing support
  - **80+ Field Definitions** - Extensive coverage of Traffic, Threat, VPN, and Authentication log fields
  - **LEA Format Support** - Robust parsing of Log Export API (LEA) key-value pair format
  - **Traffic Logs** - Support for network flow, NAT, policy decisions, and identity awareness
  - **Threat Prevention** - Support for IPS, Anti-Virus, Anti-Bot, and URL Filtering
  - **Auto-Detection** - Automatically identifies Check Point LEA log format
  - **6 Example Logs** - Traffic (accept/drop), IPS prevention, URL filtering, VPN connection, Anti-Virus detection
- **Version Designation** - Check Point parser clearly shows "Check Point (R81.x)" for OS version clarity

### Changed
- Updated README to reflect new Email Mode, Check Point support, and version 2.3.0
- Updated architecture documentation to show 3 log parsers and 3 knowledge bases
- Enhanced auto-detection logic to distinguish between FortiGate, Palo Alto, and Check Point log formats

## [2.2.0] - 2026-01-29

### Added
- **Palo Alto Networks Log Parser (PAN-OS 11.x)** - Comprehensive firewall log parsing support
  - **100+ Field Definitions** - Extensive coverage of Traffic and Threat log fields
  - **Traffic Logs** - Support for 108 fields including:
    - Network flow data (source/destination IP, ports, zones, interfaces)
    - NAT translation information
    - Policy and rule matching
    - Application identification (App-ID with category/subcategory/technology)
    - Traffic statistics (bytes, packets - total/sent/received)
    - Session tracking (ID, duration, end reason)
    - Geographic location (source/dest country)
    - Device context (IoT Security integration - 16 fields per direction)
    - SD-WAN metrics (cluster, site, link switches)
    - Container/Kubernetes context (pod name, namespace, container ID)
  - **Threat Logs** - Support for 93 fields including:
    - All Traffic log fields plus threat-specific data
    - Threat identification (name, ID, category, severity)
    - URL and web filtering
    - File analysis (hash, type, WildFire report ID)
    - HTTP details (method, headers, user agent, referer)
    - Email fields (sender, subject, recipient)
  - **CSV Parsing** - Robust parser with escape sequence handling
  - **Auto-Detection** - Automatically identifies Palo Alto CSV log format
  - **6 Example Logs** - Traffic (allow/deny), Threat (spyware, virus, URL filtering, vulnerability)
- **Version Designations** - Added major version numbers to log parser names
  - FortiGate parser now shows "FortiGate (FortiOS 7.x)"
  - Palo Alto parser shows "Palo Alto (PAN-OS 11.x)"
  - Clear indication of supported log format versions
- **Color Legend for Log Mode** - Interactive guide explaining field category colors
  - Collapsible legend showing 9 color categories
  - Blue (source), Green (destination), Red (security), Orange (action)
  - Purple (policy), Cyan (timestamp), Lime (protocol), Pink (traffic), Gray (general)
  - Consistent with Regex Mode's color guide design

### Changed
- Updated README to reflect new Palo Alto support and version designations
- Updated architecture documentation to show 2 log parsers and 2 knowledge bases

## [2.1.0] - 2026-01-27

### Added
- **Regex Mode** - Comprehensive regular expression parser and testing tool
  - **Pattern Breakdown** - Visual tokenization with 20+ token types
    - Character classes (`.`, `\d`, `\w`, `\s`, POSIX, Unicode properties)
    - Quantifiers (greedy, lazy, possessive: `*`, `+`, `?`, `{n,m}`)
    - Anchors and boundaries (`^`, `$`, `\b`, `\A`, `\Z`, `\G`)
    - Groups (capturing, non-capturing, named, atomic, conditional)
    - Assertions (lookahead/lookbehind, positive/negative)
    - Backreferences (numbered, named, relative)
    - Escape sequences (control, hex, unicode, octal)
    - Special constructs (recursion, subroutines, verbs)
  - **Live Pattern Testing** - Real-time matching with multi-color highlighting
  - **Capture Groups Display** - Table showing group names, values, and positions
  - **Match Statistics** - Total matches and unique match counts
  - **Flags Support** - Interactive toggles for i, g, m, s, u, y flags
  - **100+ Knowledge Base Entries** - Detailed explanations for all regex components
  - **25+ Example Patterns** covering:
    - Text validation (email, phone, URL, IP addresses, MAC addresses)
    - Date & time formats (MM/DD/YYYY, ISO 8601, 12/24-hour)
    - Password validation (strength requirements)
    - Code & markup (HTML tags, comments, CSS colors)
    - Data extraction (hashtags, mentions, numbers, currency)
    - Advanced patterns (duplicate words, file paths, credit cards, SSN, ZIP codes)
  - **Interactive Cheat Sheet** - Collapsible quick reference with 50+ regex components

## [2.0.0] - 2026-01-24

### Added
- **Yara-L Language Support** - Comprehensive support for Google Chronicle's Yara-L detection rule language
  - Complete knowledge base with 200+ Yara-L features
  - Rule structure keywords: `rule`, `meta`, `events`, `match`, `condition`, `outcome`, `options`
  - 8+ event types including `PROCESS_LAUNCH`, `NETWORK_CONNECTION`, `FILE_CREATION`, etc.
  - String functions (14): `strings.concat()`, `strings.to_lower()`, `strings.contains()`, etc.
  - Regular expression functions (4): `re.regex()`, `re.iregex()`, `re.capture()`, `re.replace()`
  - Network functions (3): `net.ip_in_range_cidr()`, `net.is_internal_ip()`, `net.is_external_ip()`
  - UDM (Unified Data Model) field references
  - Event variables (`$e`, `$e1`, `$e2`) and outcome variables (`$risk_score`, `$severity`)
  - 14 comprehensive example queries covering real-world security detection scenarios
  - Full parser with syntax highlighting and interactive tooltips

## [1.0.0] - 2026-01-23

### Added
- Initial release with support for 19 query languages:
  - **KQL** (Kusto Query Language) - Azure Data Explorer, Log Analytics
  - **SQL** (Structured Query Language) - Relational databases
  - **PromQL** (Prometheus Query Language) - Monitoring and metrics
  - **PowerShell** - Task automation (85+ cmdlets)
  - **GraphQL** - API query language
  - **MongoDB** - NoSQL database queries
  - **Elasticsearch** - Search and analytics (Query DSL + ES|QL)
  - **OData** - REST API query protocol
  - **CQL** (Cassandra Query Language) - Apache Cassandra
  - **Cypher** - Neo4j graph database
  - **FortiOS CLI** - FortiGate firewall commands
  - **PAN-OS CLI** - Palo Alto Networks firewall commands
  - **Bash** - Unix shell and command language
  - **Terraform/HCL** - Infrastructure as Code
  - **QQL** (Qualys Query Language) - Qualys vulnerability management
  - **SPL** (Splunk Search Processing Language) - Splunk search and analytics
  - **AQL** (Ariel Query Language) - IBM QRadar SIEM
  - **EQL** (Event Query Language) - Elastic threat hunting
  - **OSQuery** - SQL-powered OS instrumentation

### Features
- Interactive query parsing with real-time explanations
- Visual syntax highlighting with color-coded tokens
- Detailed info panel with comprehensive explanations
- Click any token to see documentation and examples
- Mobile-friendly responsive design
- Fast and lightweight (pure vanilla JavaScript, no frameworks)
- Pre-built example queries for each language
- Language-specific knowledge bases with official documentation links

---

## Release Notes

### Yara-L Support Details

The Yara-L implementation provides comprehensive coverage for writing detection rules in Google Chronicle SIEM:

**Core Features:**
- Complete rule structure support (meta, events, match, condition, outcome)
- All common event types for security monitoring
- Extensive string manipulation and pattern matching
- Network analysis and CIDR range checking
- Multi-event correlation capabilities
- Event counting and threshold detection
- Risk scoring and alert generation

**Example Use Cases:**
- Process execution monitoring
- Network connection analysis
- File operation detection
- Registry modification tracking
- User authentication monitoring
- Lateral movement detection
- Command line obfuscation detection
- Time-based anomaly detection

**Documentation:**
All Yara-L features include detailed explanations, syntax examples, and links to official Google Chronicle documentation.

---

## Contributing

Contributions are welcome! To add support for a new query language:

1. Create a knowledge base file in `languages/<language>.js`
2. Create a parser file `<language>-parser.js`
3. Add the language configuration to `languages.js`
4. Update `main.js` to import the parser
5. Add the language to `README.md`
6. Update this CHANGELOG

## License

MIT License - See [LICENSE](LICENSE) file for details.

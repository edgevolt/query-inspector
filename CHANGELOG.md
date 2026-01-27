# Changelog

All notable changes to Query Inspector will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

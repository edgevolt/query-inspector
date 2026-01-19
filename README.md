# Query Inspector

A minimalistic web application that explains query language statements with visual indicators and interactive info panels. Supports multiple query languages with an extensible architecture.

**Live at**: [explain.getstat.dev](https://explain.getstat.dev)

## Supported Languages

- 📊 **KQL** (Kusto Query Language) - Azure Data Explorer, Log Analytics
- 🗄️ **SQL** (Structured Query Language) - Relational databases
- 📈 **PromQL** (Prometheus Query Language) - Monitoring and metrics
- ⚡ **PowerShell** - Task automation and configuration management

## Features

- 🔍 **Interactive Query Parsing** - Real-time parsing and explanation of queries
- 🎨 **Visual Syntax Highlighting** - Color-coded tokens for operators, functions, keywords, and more
- 💡 **Detailed Info Panel** - Click any token to see comprehensive explanations with documentation links
- 📱 **Mobile-Friendly** - Fully responsive design optimized for learning on the go
- ⚡ **Fast & Lightweight** - Pure vanilla JavaScript, no frameworks required
- 🎯 **Example Queries** - Pre-built examples to get started quickly

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

1. **Enter a KQL query** in the text area
2. **Hover over any token** to see detailed explanations
3. **Click example queries** to load pre-built samples
4. **On mobile**, tap tokens to view tooltips

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
explain/
├── index.html          # Main HTML structure
├── style.css           # Minimalistic design system
├── main.js             # Application logic and UI
├── app.js              # KQL parser and tokenizer
├── kql-knowledge.js    # Knowledge base with explanations
└── README.md           # This file
```

### How It Works

1. **Tokenization** (`app.js`) - The query is broken down into tokens (operators, functions, keywords, strings, numbers, etc.)
2. **Enrichment** (`kql-knowledge.js`) - Each token is matched with explanation data from the knowledge base
3. **Rendering** (`main.js`) - Tokens are rendered with color coding and interactive tooltips
4. **Interaction** - Users can hover (desktop) or tap (mobile) to see detailed explanations

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
- Improve existing explanations
- Add more KQL operators and functions
- Enhance the UI/UX
- Report bugs or suggest features

## License

MIT License - See [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Mike Berggren


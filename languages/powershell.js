// PowerShell Knowledge Base - Explanations for PowerShell cmdlets and constructs

export const powershellKnowledge = {
    // Common PowerShell cmdlets
    cmdlets: {
        'get-childitem': {
            type: 'cmdlet',
            description: 'Gets items in a location',
            syntax: 'Get-ChildItem [-Path] <string> [-Recurse] [-Filter <string>]',
            example: 'Get-ChildItem -Path C:\\Users -Recurse',
            details: 'Lists files and folders. Alias: ls, dir, gci. Use -Recurse for subdirectories, -Filter for patterns.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem'
        },
        'get-content': {
            type: 'cmdlet',
            description: 'Gets the content of a file',
            syntax: 'Get-Content [-Path] <string> [-Raw]',
            example: 'Get-Content -Path log.txt',
            details: 'Reads file content. Alias: cat, gc, type. Use -Raw to get entire file as single string.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-content'
        },
        'set-content': {
            type: 'cmdlet',
            description: 'Writes content to a file',
            syntax: 'Set-Content [-Path] <string> [-Value] <object>',
            example: 'Set-Content -Path output.txt -Value "Hello"',
            details: 'Writes or replaces file content. Alias: sc. Creates file if it doesn\'t exist.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content'
        },
        'get-process': {
            type: 'cmdlet',
            description: 'Gets running processes',
            syntax: 'Get-Process [-Name] <string>',
            example: 'Get-Process -Name chrome',
            details: 'Lists running processes. Alias: ps, gps. Can filter by name or ID.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process'
        },
        'get-service': {
            type: 'cmdlet',
            description: 'Gets services on the computer',
            syntax: 'Get-Service [-Name] <string>',
            example: 'Get-Service -Name wuauserv',
            details: 'Lists Windows services. Alias: gsv. Shows status (Running, Stopped, etc.).',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service'
        },
        'start-service': {
            type: 'cmdlet',
            description: 'Starts a stopped service',
            syntax: 'Start-Service [-Name] <string>',
            example: 'Start-Service -Name wuauserv',
            details: 'Starts one or more services. Alias: sasv. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/start-service'
        },
        'stop-service': {
            type: 'cmdlet',
            description: 'Stops a running service',
            syntax: 'Stop-Service [-Name] <string>',
            example: 'Stop-Service -Name wuauserv',
            details: 'Stops one or more services. Alias: spsv. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-service'
        },
        'select-object': {
            type: 'cmdlet',
            description: 'Selects specific properties of objects',
            syntax: 'Select-Object [-Property] <string[]> [-First <int>]',
            example: 'Get-Process | Select-Object Name, CPU',
            details: 'Filters object properties. Alias: select. Use -First/-Last for limiting results.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-object'
        },
        'where-object': {
            type: 'cmdlet',
            description: 'Filters objects based on property values',
            syntax: 'Where-Object {<condition>}',
            example: 'Get-Process | Where-Object {$_.CPU -gt 10}',
            details: 'Filters pipeline objects. Alias: where, ?. Use $_ to reference current object.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/where-object'
        },
        'foreach-object': {
            type: 'cmdlet',
            description: 'Performs operation on each object',
            syntax: 'ForEach-Object {<scriptblock>}',
            example: 'Get-ChildItem | ForEach-Object {$_.Name}',
            details: 'Iterates through pipeline objects. Alias: foreach, %. Use $_ for current object.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object'
        },
        'sort-object': {
            type: 'cmdlet',
            description: 'Sorts objects by property values',
            syntax: 'Sort-Object [-Property] <string> [-Descending]',
            example: 'Get-Process | Sort-Object CPU -Descending',
            details: 'Sorts pipeline objects. Alias: sort. Use -Descending for reverse order.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/sort-object'
        },
        'measure-object': {
            type: 'cmdlet',
            description: 'Calculates numeric properties',
            syntax: 'Measure-Object [-Property] <string> [-Sum] [-Average]',
            example: 'Get-Process | Measure-Object CPU -Sum',
            details: 'Calculates statistics. Alias: measure. Can compute Sum, Average, Min, Max, Count.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/measure-object'
        },
        'group-object': {
            type: 'cmdlet',
            description: 'Groups objects by property value',
            syntax: 'Group-Object [-Property] <string>',
            example: 'Get-Process | Group-Object ProcessName',
            details: 'Groups objects with same property value. Alias: group. Returns count per group.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/group-object'
        },
        'write-host': {
            type: 'cmdlet',
            description: 'Writes output to the console',
            syntax: 'Write-Host [-Object] <object> [-ForegroundColor <color>]',
            example: 'Write-Host "Hello World" -ForegroundColor Green',
            details: 'Displays text in console. Can set colors. Does not output to pipeline.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/write-host'
        },
        'write-output': {
            type: 'cmdlet',
            description: 'Sends output to the pipeline',
            syntax: 'Write-Output [-InputObject] <object>',
            example: 'Write-Output "Hello World"',
            details: 'Sends objects to pipeline. Alias: echo, write. Default output method.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/write-output'
        },
        'invoke-webrequest': {
            type: 'cmdlet',
            description: 'Gets content from a web page',
            syntax: 'Invoke-WebRequest [-Uri] <string> [-Method <string>]',
            example: 'Invoke-WebRequest -Uri https://api.example.com',
            details: 'Makes HTTP requests. Alias: iwr, curl, wget. Returns response object.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest'
        },
        'invoke-restmethod': {
            type: 'cmdlet',
            description: 'Sends HTTP request to REST API',
            syntax: 'Invoke-RestMethod [-Uri] <string> [-Method <string>]',
            example: 'Invoke-RestMethod -Uri https://api.example.com/data',
            details: 'Makes REST API calls. Alias: irm. Automatically parses JSON/XML responses.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod'
        },
        'test-path': {
            type: 'cmdlet',
            description: 'Tests if a path exists',
            syntax: 'Test-Path [-Path] <string>',
            example: 'Test-Path -Path C:\\file.txt',
            details: 'Returns $true if path exists, $false otherwise. Works for files and folders.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/test-path'
        },
        'new-item': {
            type: 'cmdlet',
            description: 'Creates a new item',
            syntax: 'New-Item [-Path] <string> [-ItemType <string>]',
            example: 'New-Item -Path C:\\folder -ItemType Directory',
            details: 'Creates files, folders, registry keys, etc. Alias: ni. Use -ItemType to specify type.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-item'
        },
        'remove-item': {
            type: 'cmdlet',
            description: 'Deletes items',
            syntax: 'Remove-Item [-Path] <string> [-Recurse] [-Force]',
            example: 'Remove-Item -Path C:\\temp -Recurse',
            details: 'Deletes files and folders. Alias: rm, del, ri. Use -Recurse for folders with content.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-item'
        },
        'copy-item': {
            type: 'cmdlet',
            description: 'Copies items from one location to another',
            syntax: 'Copy-Item [-Path] <string> [-Destination] <string>',
            example: 'Copy-Item -Path file.txt -Destination C:\\backup\\',
            details: 'Copies files and folders. Alias: cp, copy, cpi. Use -Recurse for folders.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item'
        }
    },

    // PowerShell operators and keywords
    operators: {
        '-eq': {
            type: 'operator',
            description: 'Equal to comparison',
            details: 'Case-insensitive equality comparison. Use -ceq for case-sensitive.'
        },
        '-ne': {
            type: 'operator',
            description: 'Not equal to comparison',
            details: 'Case-insensitive inequality comparison. Use -cne for case-sensitive.'
        },
        '-gt': {
            type: 'operator',
            description: 'Greater than comparison',
            details: 'Numeric or alphabetic greater than comparison.'
        },
        '-lt': {
            type: 'operator',
            description: 'Less than comparison',
            details: 'Numeric or alphabetic less than comparison.'
        },
        '-ge': {
            type: 'operator',
            description: 'Greater than or equal comparison',
            details: 'Numeric or alphabetic greater than or equal comparison.'
        },
        '-le': {
            type: 'operator',
            description: 'Less than or equal comparison',
            details: 'Numeric or alphabetic less than or equal comparison.'
        },
        '-like': {
            type: 'operator',
            description: 'Wildcard pattern matching',
            details: 'Matches strings using * and ? wildcards. Case-insensitive by default.'
        },
        '-match': {
            type: 'operator',
            description: 'Regular expression matching',
            details: 'Matches strings using regex patterns. Case-insensitive by default.'
        },
        '-contains': {
            type: 'operator',
            description: 'Checks if collection contains value',
            details: 'Returns true if array/collection contains the specified value.'
        },
        '-and': {
            type: 'operator',
            description: 'Logical AND operator',
            details: 'Both conditions must be true.'
        },
        '-or': {
            type: 'operator',
            description: 'Logical OR operator',
            details: 'At least one condition must be true.'
        },
        '-not': {
            type: 'operator',
            description: 'Logical NOT operator',
            details: 'Negates a boolean value. Can also use ! symbol.'
        }
    }
};

// Helper function to get explanation for any PowerShell token
export function getExplanation(token, tokenType) {
    const lowerToken = token.toLowerCase();

    if (powershellKnowledge.cmdlets[lowerToken]) {
        return powershellKnowledge.cmdlets[lowerToken];
    }

    if (powershellKnowledge.operators[lowerToken]) {
        return powershellKnowledge.operators[lowerToken];
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
            details: 'A numeric literal.'
        };
    }

    if (tokenType === 'variable') {
        return {
            type: 'variable',
            description: 'PowerShell variable',
            details: 'Variables start with $ and store values. $_ is the current pipeline object.'
        };
    }

    if (tokenType === 'parameter') {
        return {
            type: 'parameter',
            description: 'Cmdlet parameter',
            details: 'Parameters start with - and modify cmdlet behavior.'
        };
    }

    return {
        type: 'unknown',
        description: token,
        details: 'Token type not recognized.'
    };
}

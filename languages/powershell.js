// PowerShell Knowledge Base - Explanations for PowerShell cmdlets and constructs

export const powershellKnowledge = {
    // Common PowerShell cmdlets
    cmdlets: {
        // === DISCOVERY & HELP ===
        'get-command': {
            type: 'cmdlet',
            description: 'Gets all cmdlets, functions, and aliases',
            syntax: 'Get-Command [-Name] <string> [-Module <string>]',
            example: 'Get-Command -Module Microsoft.PowerShell.Management',
            details: 'Discovers available commands. Alias: gcm. Use -Name for pattern matching, -Module to filter by module.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command'
        },
        'get-help': {
            type: 'cmdlet',
            description: 'Displays help information about cmdlets',
            syntax: 'Get-Help [-Name] <string> [-Examples] [-Online]',
            example: 'Get-Help Get-Process -Examples',
            details: 'Shows cmdlet documentation. Use -Examples for examples only, -Online to open web documentation.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-help'
        },
        'get-module': {
            type: 'cmdlet',
            description: 'Gets loaded or available PowerShell modules',
            syntax: 'Get-Module [-Name] <string> [-ListAvailable]',
            example: 'Get-Module -ListAvailable',
            details: 'Lists PowerShell modules. Alias: gmo. Use -ListAvailable to see all installed modules.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-module'
        },
        'import-module': {
            type: 'cmdlet',
            description: 'Loads a PowerShell module',
            syntax: 'Import-Module [-Name] <string>',
            example: 'Import-Module ActiveDirectory',
            details: 'Imports module cmdlets into session. Alias: ipmo. Modules auto-load in PowerShell 3.0+.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/import-module'
        },
        'get-member': {
            type: 'cmdlet',
            description: 'Gets properties and methods of objects',
            syntax: 'Get-Member [-InputObject] <object> [-MemberType <string>]',
            example: 'Get-Process | Get-Member',
            details: 'Displays object structure. Alias: gm. Essential for discovering available properties and methods.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-member'
        },

        // === FILE SYSTEM ===
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
        'add-content': {
            type: 'cmdlet',
            description: 'Appends content to a file',
            syntax: 'Add-Content [-Path] <string> [-Value] <object>',
            example: 'Add-Content -Path log.txt -Value "New entry"',
            details: 'Appends to existing file. Alias: ac. Creates file if it doesn\'t exist.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/add-content'
        },
        'clear-content': {
            type: 'cmdlet',
            description: 'Clears the content of a file',
            syntax: 'Clear-Content [-Path] <string>',
            example: 'Clear-Content -Path log.txt',
            details: 'Empties file content without deleting the file. Alias: clc.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/clear-content'
        },
        'out-file': {
            type: 'cmdlet',
            description: 'Sends output to a file',
            syntax: 'Out-File [-FilePath] <string> [-Append]',
            example: 'Get-Process | Out-File processes.txt',
            details: 'Writes pipeline output to file. Use -Append to add to existing file.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-file'
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
        },
        'move-item': {
            type: 'cmdlet',
            description: 'Moves items from one location to another',
            syntax: 'Move-Item [-Path] <string> [-Destination] <string>',
            example: 'Move-Item -Path file.txt -Destination C:\\archive\\',
            details: 'Moves files and folders. Alias: mv, move, mi.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/move-item'
        },
        'rename-item': {
            type: 'cmdlet',
            description: 'Renames an item',
            syntax: 'Rename-Item [-Path] <string> [-NewName] <string>',
            example: 'Rename-Item -Path old.txt -NewName new.txt',
            details: 'Renames files and folders. Alias: ren, rni.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/rename-item'
        },
        'get-item': {
            type: 'cmdlet',
            description: 'Gets an item at a specified location',
            syntax: 'Get-Item [-Path] <string>',
            example: 'Get-Item -Path C:\\file.txt',
            details: 'Gets file or folder object with properties. Alias: gi.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-item'
        },
        'get-location': {
            type: 'cmdlet',
            description: 'Gets the current working location',
            syntax: 'Get-Location',
            example: 'Get-Location',
            details: 'Shows current directory. Alias: pwd, gl.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-location'
        },
        'set-location': {
            type: 'cmdlet',
            description: 'Sets the current working location',
            syntax: 'Set-Location [-Path] <string>',
            example: 'Set-Location -Path C:\\Users',
            details: 'Changes current directory. Alias: cd, chdir, sl.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-location'
        },

        // === PROCESS & SERVICE MANAGEMENT ===
        'get-process': {
            type: 'cmdlet',
            description: 'Gets running processes',
            syntax: 'Get-Process [-Name] <string>',
            example: 'Get-Process -Name chrome',
            details: 'Lists running processes. Alias: ps, gps. Can filter by name or ID.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process'
        },
        'stop-process': {
            type: 'cmdlet',
            description: 'Stops running processes',
            syntax: 'Stop-Process [-Name] <string> [-Force]',
            example: 'Stop-Process -Name notepad',
            details: 'Terminates processes. Alias: kill, spps. Use -Force for unresponsive processes.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process'
        },
        'start-process': {
            type: 'cmdlet',
            description: 'Starts a process',
            syntax: 'Start-Process [-FilePath] <string> [-ArgumentList <string[]>]',
            example: 'Start-Process notepad.exe',
            details: 'Launches applications. Alias: saps. Use -ArgumentList for command-line arguments.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/start-process'
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
        'restart-service': {
            type: 'cmdlet',
            description: 'Restarts a service',
            syntax: 'Restart-Service [-Name] <string>',
            example: 'Restart-Service -Name wuauserv',
            details: 'Stops and starts a service. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/restart-service'
        },

        // === NETWORKING ===
        'test-connection': {
            type: 'cmdlet',
            description: 'Sends ICMP echo requests (ping)',
            syntax: 'Test-Connection [-ComputerName] <string> [-Count <int>]',
            example: 'Test-Connection -ComputerName google.com -Count 4',
            details: 'Tests network connectivity. Returns detailed ping statistics.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/test-connection'
        },
        'test-netconnection': {
            type: 'cmdlet',
            description: 'Tests network connectivity with detailed diagnostics',
            syntax: 'Test-NetConnection [-ComputerName] <string> [-Port <int>]',
            example: 'Test-NetConnection -ComputerName google.com -Port 443',
            details: 'Advanced connectivity testing. Shows route, ping, and port status. Alias: tnc.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection'
        },
        'resolve-dnsname': {
            type: 'cmdlet',
            description: 'Performs DNS name resolution',
            syntax: 'Resolve-DnsName [-Name] <string> [-Type <string>]',
            example: 'Resolve-DnsName -Name google.com',
            details: 'DNS lookups. Use -Type for specific record types (A, MX, TXT, etc.).',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname'
        },
        'get-netadapter': {
            type: 'cmdlet',
            description: 'Gets network adapter properties',
            syntax: 'Get-NetAdapter [-Name] <string>',
            example: 'Get-NetAdapter',
            details: 'Lists network interfaces and their status.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/netadapter/get-netadapter'
        },
        'get-netipaddress': {
            type: 'cmdlet',
            description: 'Gets IP address configuration',
            syntax: 'Get-NetIPAddress [-InterfaceAlias] <string>',
            example: 'Get-NetIPAddress',
            details: 'Shows IP addresses assigned to network adapters.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-netipaddress'
        },
        'invoke-command': {
            type: 'cmdlet',
            description: 'Runs commands on remote computers',
            syntax: 'Invoke-Command [-ComputerName] <string> [-ScriptBlock] <scriptblock>',
            example: 'Invoke-Command -ComputerName Server01 -ScriptBlock {Get-Service}',
            details: 'Remote command execution. Alias: icm. Requires WinRM configuration.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/invoke-command'
        },
        'enter-pssession': {
            type: 'cmdlet',
            description: 'Starts an interactive remote session',
            syntax: 'Enter-PSSession [-ComputerName] <string>',
            example: 'Enter-PSSession -ComputerName Server01',
            details: 'Interactive remote PowerShell session. Use Exit-PSSession to disconnect.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/enter-pssession'
        },

        // === PIPELINE OPERATIONS ===
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
        'compare-object': {
            type: 'cmdlet',
            description: 'Compares two sets of objects',
            syntax: 'Compare-Object [-ReferenceObject] <object[]> [-DifferenceObject] <object[]>',
            example: 'Compare-Object -ReferenceObject $old -DifferenceObject $new',
            details: 'Finds differences between object collections. Alias: compare, diff.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/compare-object'
        },

        // === DATA CONVERSION ===
        'convertto-json': {
            type: 'cmdlet',
            description: 'Converts objects to JSON format',
            syntax: 'ConvertTo-Json [-InputObject] <object> [-Depth <int>]',
            example: 'Get-Process | Select-Object Name, CPU | ConvertTo-Json',
            details: 'Serializes objects to JSON. Use -Depth to control nesting level (default 2).',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-json'
        },
        'convertfrom-json': {
            type: 'cmdlet',
            description: 'Converts JSON to PowerShell objects',
            syntax: 'ConvertFrom-Json [-InputObject] <string>',
            example: 'Get-Content data.json | ConvertFrom-Json',
            details: 'Parses JSON strings into PowerShell objects.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json'
        },
        'convertto-csv': {
            type: 'cmdlet',
            description: 'Converts objects to CSV format',
            syntax: 'ConvertTo-Csv [-InputObject] <object> [-NoTypeInformation]',
            example: 'Get-Process | ConvertTo-Csv -NoTypeInformation',
            details: 'Converts to CSV string. Use -NoTypeInformation to omit type header.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-csv'
        },
        'convertfrom-csv': {
            type: 'cmdlet',
            description: 'Converts CSV to PowerShell objects',
            syntax: 'ConvertFrom-Csv [-InputObject] <string>',
            example: 'Get-Content data.csv | ConvertFrom-Csv',
            details: 'Parses CSV strings into objects.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-csv'
        },
        'export-csv': {
            type: 'cmdlet',
            description: 'Exports objects to a CSV file',
            syntax: 'Export-Csv [-Path] <string> [-NoTypeInformation]',
            example: 'Get-Process | Export-Csv -Path processes.csv -NoTypeInformation',
            details: 'Saves objects to CSV file. Alias: epcsv.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/export-csv'
        },
        'import-csv': {
            type: 'cmdlet',
            description: 'Imports data from a CSV file',
            syntax: 'Import-Csv [-Path] <string>',
            example: 'Import-Csv -Path data.csv',
            details: 'Reads CSV file into objects. Alias: ipcsv.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/import-csv'
        },
        'convertto-html': {
            type: 'cmdlet',
            description: 'Converts objects to HTML',
            syntax: 'ConvertTo-Html [-InputObject] <object> [-Title <string>]',
            example: 'Get-Service | ConvertTo-Html -Title "Services"',
            details: 'Generates HTML table from objects.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-html'
        },
        'convertto-xml': {
            type: 'cmdlet',
            description: 'Converts objects to XML',
            syntax: 'ConvertTo-Xml [-InputObject] <object>',
            example: 'Get-Process | ConvertTo-Xml',
            details: 'Serializes objects to XML format.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-xml'
        },

        // === FORMATTING & OUTPUT ===
        'format-table': {
            type: 'cmdlet',
            description: 'Formats output as a table',
            syntax: 'Format-Table [-Property] <string[]> [-AutoSize]',
            example: 'Get-Process | Format-Table Name, CPU, Memory -AutoSize',
            details: 'Displays objects in table format. Alias: ft. Use -AutoSize for optimal column width.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/format-table'
        },
        'format-list': {
            type: 'cmdlet',
            description: 'Formats output as a list',
            syntax: 'Format-List [-Property] <string[]>',
            example: 'Get-Process | Format-List *',
            details: 'Displays objects as property lists. Alias: fl. Use * to show all properties.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/format-list'
        },
        'format-wide': {
            type: 'cmdlet',
            description: 'Formats output in wide columns',
            syntax: 'Format-Wide [-Property] <string> [-Column <int>]',
            example: 'Get-ChildItem | Format-Wide Name -Column 4',
            details: 'Displays single property in multiple columns. Alias: fw.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/format-wide'
        },
        'out-gridview': {
            type: 'cmdlet',
            description: 'Sends output to interactive grid window',
            syntax: 'Out-GridView [-Title <string>]',
            example: 'Get-Process | Out-GridView',
            details: 'Opens GUI grid with filtering and sorting. Alias: ogv. Windows only.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-gridview'
        },
        'out-string': {
            type: 'cmdlet',
            description: 'Converts objects to strings',
            syntax: 'Out-String [-Width <int>]',
            example: 'Get-Process | Out-String',
            details: 'Converts pipeline objects to string representation.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-string'
        },
        'out-null': {
            type: 'cmdlet',
            description: 'Suppresses output',
            syntax: 'Out-Null',
            example: 'Get-Process | Out-Null',
            details: 'Discards output instead of displaying it. Useful for suppressing unwanted output.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/out-null'
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

        // === STRING & PATH MANIPULATION ===
        'split-path': {
            type: 'cmdlet',
            description: 'Extracts part of a file path',
            syntax: 'Split-Path [-Path] <string> [-Parent|-Leaf]',
            example: 'Split-Path -Path C:\\Users\\file.txt -Leaf',
            details: 'Gets parent directory (-Parent) or filename (-Leaf) from path.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/split-path'
        },
        'join-path': {
            type: 'cmdlet',
            description: 'Combines path elements',
            syntax: 'Join-Path [-Path] <string> [-ChildPath] <string>',
            example: 'Join-Path -Path C:\\Users -ChildPath file.txt',
            details: 'Combines paths with correct separator for OS.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/join-path'
        },
        'resolve-path': {
            type: 'cmdlet',
            description: 'Resolves wildcards in path to actual paths',
            syntax: 'Resolve-Path [-Path] <string>',
            example: 'Resolve-Path -Path .\\*.txt',
            details: 'Expands wildcards and relative paths to absolute paths. Alias: rvpa.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/resolve-path'
        },
        'select-string': {
            type: 'cmdlet',
            description: 'Searches for text patterns in strings and files',
            syntax: 'Select-String [-Pattern] <string> [-Path <string>]',
            example: 'Select-String -Pattern "error" -Path *.log',
            details: 'Text search with regex support. Similar to grep. Alias: sls.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-string'
        },

        // === EVENT LOGS ===
        'get-winevent': {
            type: 'cmdlet',
            description: 'Gets events from event logs',
            syntax: 'Get-WinEvent [-LogName] <string> [-MaxEvents <int>]',
            example: 'Get-WinEvent -LogName Application -MaxEvents 10',
            details: 'Modern event log cmdlet. Supports filtering and remote computers.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent'
        },
        'get-eventlog': {
            type: 'cmdlet',
            description: 'Gets events from classic event logs',
            syntax: 'Get-EventLog [-LogName] <string> [-Newest <int>]',
            example: 'Get-EventLog -LogName System -Newest 20',
            details: 'Legacy event log cmdlet. Use Get-WinEvent for newer logs.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-eventlog'
        },

        // === REGISTRY ===
        'get-itemproperty': {
            type: 'cmdlet',
            description: 'Gets properties of registry keys or files',
            syntax: 'Get-ItemProperty [-Path] <string> [-Name <string>]',
            example: 'Get-ItemProperty -Path "HKLM:\\Software\\Microsoft"',
            details: 'Reads registry values or file properties. Alias: gp.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-itemproperty'
        },
        'set-itemproperty': {
            type: 'cmdlet',
            description: 'Sets properties of registry keys or files',
            syntax: 'Set-ItemProperty [-Path] <string> [-Name <string>] [-Value <object>]',
            example: 'Set-ItemProperty -Path "HKLM:\\Software\\App" -Name Version -Value "2.0"',
            details: 'Writes registry values or file properties. Alias: sp.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-itemproperty'
        },
        'new-itemproperty': {
            type: 'cmdlet',
            description: 'Creates new registry value',
            syntax: 'New-ItemProperty [-Path] <string> [-Name <string>] [-Value <object>]',
            example: 'New-ItemProperty -Path "HKLM:\\Software\\App" -Name Setting -Value 1',
            details: 'Creates new registry values. Requires appropriate permissions.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-itemproperty'
        },
        'remove-itemproperty': {
            type: 'cmdlet',
            description: 'Deletes registry values',
            syntax: 'Remove-ItemProperty [-Path] <string> [-Name <string>]',
            example: 'Remove-ItemProperty -Path "HKLM:\\Software\\App" -Name OldSetting',
            details: 'Deletes registry values. Requires appropriate permissions.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-itemproperty'
        },

        // === SECURITY & CREDENTIALS ===
        'set-executionpolicy': {
            type: 'cmdlet',
            description: 'Sets PowerShell script execution policy',
            syntax: 'Set-ExecutionPolicy [-ExecutionPolicy] <string> [-Scope <string>]',
            example: 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser',
            details: 'Controls script execution. Policies: Restricted, AllSigned, RemoteSigned, Unrestricted, Bypass.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy'
        },
        'get-executionpolicy': {
            type: 'cmdlet',
            description: 'Gets current execution policy',
            syntax: 'Get-ExecutionPolicy [-Scope <string>]',
            example: 'Get-ExecutionPolicy',
            details: 'Shows script execution policy for current scope.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-executionpolicy'
        },
        'get-credential': {
            type: 'cmdlet',
            description: 'Prompts for username and password',
            syntax: 'Get-Credential [-UserName <string>]',
            example: 'Get-Credential -UserName admin',
            details: 'Creates PSCredential object for authentication. Opens credential prompt.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-credential'
        },
        'get-acl': {
            type: 'cmdlet',
            description: 'Gets security descriptor for a resource',
            syntax: 'Get-Acl [-Path] <string>',
            example: 'Get-Acl -Path C:\\folder',
            details: 'Gets file/folder permissions (ACL). Shows owner and access rules.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-acl'
        },
        'set-acl': {
            type: 'cmdlet',
            description: 'Sets security descriptor for a resource',
            syntax: 'Set-Acl [-Path] <string> [-AclObject] <object>',
            example: 'Set-Acl -Path C:\\folder -AclObject $acl',
            details: 'Modifies file/folder permissions. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-acl'
        },

        // === SYSTEM MANAGEMENT ===
        'get-computerinfo': {
            type: 'cmdlet',
            description: 'Gets comprehensive system information',
            syntax: 'Get-ComputerInfo',
            example: 'Get-ComputerInfo',
            details: 'Returns detailed system information including OS, hardware, and domain details.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-computerinfo'
        },
        'restart-computer': {
            type: 'cmdlet',
            description: 'Restarts computers',
            syntax: 'Restart-Computer [-ComputerName <string>] [-Force]',
            example: 'Restart-Computer -Force',
            details: 'Reboots local or remote computers. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/restart-computer'
        },
        'stop-computer': {
            type: 'cmdlet',
            description: 'Shuts down computers',
            syntax: 'Stop-Computer [-ComputerName <string>] [-Force]',
            example: 'Stop-Computer -Force',
            details: 'Shuts down local or remote computers. Requires administrator privileges.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-computer'
        },
        'get-hotfix': {
            type: 'cmdlet',
            description: 'Gets installed Windows updates',
            syntax: 'Get-HotFix [-Id <string>]',
            example: 'Get-HotFix',
            details: 'Lists installed updates and hotfixes.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-hotfix'
        },
        'get-psdrive': {
            type: 'cmdlet',
            description: 'Gets PowerShell drives',
            syntax: 'Get-PSDrive [-Name <string>]',
            example: 'Get-PSDrive',
            details: 'Lists all PowerShell drives including file system, registry, certificate, etc. Alias: gdr.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-psdrive'
        },
        'new-psdrive': {
            type: 'cmdlet',
            description: 'Creates temporary PowerShell drive',
            syntax: 'New-PSDrive [-Name] <string> [-PSProvider] <string> [-Root] <string>',
            example: 'New-PSDrive -Name Z -PSProvider FileSystem -Root \\\\Server\\Share',
            details: 'Maps network drives or creates custom drives. Alias: ndr, mount.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-psdrive'
        },
        'get-variable': {
            type: 'cmdlet',
            description: 'Gets PowerShell variables',
            syntax: 'Get-Variable [-Name <string>]',
            example: 'Get-Variable',
            details: 'Lists all variables in current session. Alias: gv.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-variable'
        },
        'set-variable': {
            type: 'cmdlet',
            description: 'Sets variable value',
            syntax: 'Set-Variable [-Name] <string> [-Value] <object>',
            example: 'Set-Variable -Name count -Value 10',
            details: 'Creates or updates variables. Alias: sv, set.',
            docUrl: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/set-variable'
        },

        // === WEB REQUESTS ===
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
        '-notlike': {
            type: 'operator',
            description: 'Wildcard pattern non-matching',
            details: 'Inverse of -like. Returns true if pattern does not match.'
        },
        '-match': {
            type: 'operator',
            description: 'Regular expression matching',
            details: 'Matches strings using regex patterns. Case-insensitive by default.'
        },
        '-notmatch': {
            type: 'operator',
            description: 'Regular expression non-matching',
            details: 'Inverse of -match. Returns true if pattern does not match.'
        },
        '-contains': {
            type: 'operator',
            description: 'Checks if collection contains value',
            details: 'Returns true if array/collection contains the specified value.'
        },
        '-notcontains': {
            type: 'operator',
            description: 'Checks if collection does not contain value',
            details: 'Returns true if array/collection does not contain the value.'
        },
        '-in': {
            type: 'operator',
            description: 'Checks if value is in collection',
            details: 'Returns true if value exists in the collection. Reverse of -contains.'
        },
        '-notin': {
            type: 'operator',
            description: 'Checks if value is not in collection',
            details: 'Returns true if value does not exist in the collection.'
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
        },
        '-xor': {
            type: 'operator',
            description: 'Logical XOR operator',
            details: 'Exactly one condition must be true (exclusive OR).'
        },
        '-is': {
            type: 'operator',
            description: 'Type comparison operator',
            details: 'Checks if object is of specified type. Example: $var -is [string]'
        },
        '-isnot': {
            type: 'operator',
            description: 'Type non-comparison operator',
            details: 'Checks if object is not of specified type.'
        },
        '-as': {
            type: 'operator',
            description: 'Type conversion operator',
            details: 'Converts value to specified type. Example: "123" -as [int]'
        },
        '-replace': {
            type: 'operator',
            description: 'String replacement operator',
            details: 'Replaces text using regex. Example: "hello" -replace "h", "j"'
        },
        '-split': {
            type: 'operator',
            description: 'String split operator',
            details: 'Splits string into array. Example: "a,b,c" -split ","'
        },
        '-join': {
            type: 'operator',
            description: 'Array join operator',
            details: 'Joins array elements into string. Example: @("a","b") -join ","'
        },
        '-f': {
            type: 'operator',
            description: 'Format operator',
            details: 'Formats strings. Example: "{0} is {1}" -f "Name", "Value"'
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

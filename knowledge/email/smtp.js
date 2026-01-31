/**
 * SMTP Email Header Knowledge Base
 * Comprehensive field definitions for RFC 5322 and RFC 5321 email headers
 */

export default {
    // Source Headers
    from: {
        description: 'Sender email address and display name',
        category: 'source',
        examples: ['"John Doe" <john@example.com>', 'sender@company.com']
    },
    sender: {
        description: 'Actual sender if different from From header (mailing lists, delegates)',
        category: 'source',
        examples: ['"List Manager" <list@example.com>']
    },
    'reply-to': {
        description: 'Email address where replies should be sent',
        category: 'source',
        examples: ['support@example.com', '"Support Team" <help@company.com>']
    },
    'return-path': {
        description: 'Email address for bounce messages (envelope sender)',
        category: 'source',
        examples: ['<bounces@example.com>', '<noreply@company.com>']
    },
    'x-sender': {
        description: 'Original sender address (non-standard header)',
        category: 'source',
        examples: ['user@example.com']
    },

    // Destination Headers
    to: {
        description: 'Primary recipient email addresses',
        category: 'destination',
        examples: ['"Jane Smith" <jane@example.com>', 'team@company.com']
    },
    cc: {
        description: 'Carbon copy recipients (visible to all)',
        category: 'destination',
        examples: ['manager@example.com, colleague@example.com']
    },
    bcc: {
        description: 'Blind carbon copy recipients (hidden from other recipients)',
        category: 'destination',
        examples: ['archive@example.com']
    },
    'delivered-to': {
        description: 'Final delivery address (added by receiving server)',
        category: 'destination',
        examples: ['user@example.com']
    },

    // Timestamp Headers
    date: {
        description: 'Date and time when email was sent (RFC 5322 format)',
        category: 'timestamp',
        examples: ['Mon, 29 Jan 2024 14:30:15 +0000', 'Fri, 31 Jan 2024 13:45:00 -0800']
    },
    received: {
        description: 'Mail server routing information (one per hop, reverse chronological)',
        category: 'timestamp',
        examples: ['from mail.example.com ([192.168.1.1]) by mx.google.com; Mon, 29 Jan 2024 14:30:15 +0000']
    },

    // Routing and Identification Headers
    'message-id': {
        description: 'Unique identifier for this email message',
        category: 'routing',
        examples: ['<abc123@example.com>', '<20240129143015.12345@mail.example.com>']
    },
    'in-reply-to': {
        description: 'Message-ID of the email this is replying to',
        category: 'routing',
        examples: ['<xyz789@example.com>']
    },
    references: {
        description: 'Message-IDs of previous emails in the thread',
        category: 'routing',
        examples: ['<msg1@example.com> <msg2@example.com>']
    },
    'resent-from': {
        description: 'Original sender when email is forwarded',
        category: 'routing',
        examples: ['"Original Sender" <original@example.com>']
    },
    'resent-to': {
        description: 'New recipient when email is forwarded',
        category: 'routing',
        examples: ['newrecipient@example.com']
    },
    'resent-date': {
        description: 'Date when email was forwarded',
        category: 'routing',
        examples: ['Tue, 30 Jan 2024 10:00:00 +0000']
    },
    'resent-message-id': {
        description: 'New Message-ID assigned when forwarded',
        category: 'routing',
        examples: ['<resent123@example.com>']
    },
    'original-recipient': {
        description: 'Original intended recipient address',
        category: 'routing',
        examples: ['user@example.com']
    },

    // Content Headers
    subject: {
        description: 'Email subject line',
        category: 'content',
        examples: ['Meeting Tomorrow at 2pm', 'Re: Project Update', 'Fwd: Important Notice']
    },
    'content-type': {
        description: 'MIME type and character encoding of email content',
        category: 'content',
        examples: ['text/plain; charset=UTF-8', 'multipart/alternative; boundary="boundary123"', 'text/html; charset=ISO-8859-1']
    },
    'content-transfer-encoding': {
        description: 'Encoding method for email body',
        category: 'content',
        examples: ['7bit', '8bit', 'quoted-printable', 'base64']
    },
    'content-disposition': {
        description: 'How content should be displayed (inline or attachment)',
        category: 'content',
        examples: ['inline', 'attachment; filename="document.pdf"']
    },
    'content-id': {
        description: 'Unique identifier for MIME part (for inline images)',
        category: 'content',
        examples: ['<image001@example.com>']
    },
    'content-description': {
        description: 'Human-readable description of content',
        category: 'content',
        examples: ['Company Logo', 'Attachment']
    },

    // Security Headers
    'dkim-signature': {
        description: 'DomainKeys Identified Mail cryptographic signature',
        category: 'security',
        examples: ['v=1; a=rsa-sha256; d=example.com; s=selector; h=from:to:subject; bh=...']
    },
    'authentication-results': {
        description: 'Results of email authentication checks (SPF, DKIM, DMARC)',
        category: 'security',
        examples: ['mx.google.com; spf=pass; dkim=pass; dmarc=pass']
    },
    'received-spf': {
        description: 'Sender Policy Framework verification result',
        category: 'security',
        examples: ['pass (google.com: domain of sender@example.com designates 192.168.1.1 as permitted sender)']
    },
    'arc-authentication-results': {
        description: 'Authenticated Received Chain authentication results',
        category: 'security',
        examples: ['i=1; mx.example.com; spf=pass; dkim=pass']
    },
    'arc-message-signature': {
        description: 'ARC message signature for email forwarding chains',
        category: 'security',
        examples: ['i=1; a=rsa-sha256; d=example.com; s=arc-selector; ...']
    },
    'arc-seal': {
        description: 'ARC seal to validate the chain',
        category: 'security',
        examples: ['i=1; a=rsa-sha256; d=example.com; s=arc-selector; ...']
    },
    'x-spam-status': {
        description: 'Spam filtering result',
        category: 'security',
        examples: ['No, score=-0.1', 'Yes, score=5.2 required=5.0']
    },
    'x-spam-score': {
        description: 'Numerical spam score',
        category: 'security',
        examples: ['-0.1', '5.2']
    },

    // MIME Headers
    'mime-version': {
        description: 'MIME protocol version (always 1.0)',
        category: 'metadata',
        examples: ['1.0']
    },

    // Client and Server Information
    'x-mailer': {
        description: 'Email client software used to send the message',
        category: 'metadata',
        examples: ['Microsoft Outlook 16.0', 'Apple Mail (2.3654)', 'Thunderbird 102.0']
    },
    'user-agent': {
        description: 'Email client user agent string',
        category: 'metadata',
        examples: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Mutt/1.10.1']
    },
    'x-originating-ip': {
        description: 'IP address of the client that sent the email',
        category: 'metadata',
        examples: ['[192.168.1.100]', '[203.0.113.50]']
    },
    'x-received': {
        description: 'Additional received information (Google-specific)',
        category: 'metadata',
        examples: ['by 2002:a05:6214:1234 with SMTP id abc123; Mon, 29 Jan 2024 14:30:15 -0800']
    },

    // Priority and Importance
    priority: {
        description: 'Email priority level',
        category: 'metadata',
        examples: ['urgent', 'normal', 'non-urgent']
    },
    importance: {
        description: 'Message importance (Microsoft)',
        category: 'metadata',
        examples: ['high', 'normal', 'low']
    },
    'x-priority': {
        description: 'Numerical priority (1=highest, 5=lowest)',
        category: 'metadata',
        examples: ['1', '3', '5']
    },

    // Mailing List Headers
    'list-id': {
        description: 'Mailing list identifier',
        category: 'metadata',
        examples: ['<team-updates.example.com>', 'Newsletter <newsletter@company.com>']
    },
    'list-unsubscribe': {
        description: 'URL or email to unsubscribe from mailing list',
        category: 'metadata',
        examples: ['<mailto:unsubscribe@example.com>', '<https://example.com/unsubscribe>']
    },
    'list-post': {
        description: 'Email address to post to mailing list',
        category: 'metadata',
        examples: ['<mailto:list@example.com>']
    },
    'list-help': {
        description: 'URL or email for mailing list help',
        category: 'metadata',
        examples: ['<mailto:help@example.com>']
    },
    'list-subscribe': {
        description: 'URL or email to subscribe to mailing list',
        category: 'metadata',
        examples: ['<mailto:subscribe@example.com>']
    },
    'list-archive': {
        description: 'URL to mailing list archive',
        category: 'metadata',
        examples: ['<https://example.com/archive>']
    },

    // Tracking and Analytics
    'x-campaign-id': {
        description: 'Marketing campaign identifier',
        category: 'metadata',
        examples: ['campaign-2024-01', 'newsletter-winter-2024']
    },
    'x-mailgun-variables': {
        description: 'Mailgun service variables (JSON)',
        category: 'metadata',
        examples: ['{"user_id": "12345", "campaign": "welcome"}']
    },

    // Auto-Response Headers
    'auto-submitted': {
        description: 'Indicates automatic generation (auto-reply, vacation)',
        category: 'metadata',
        examples: ['auto-replied', 'auto-generated']
    },
    'x-auto-response-suppress': {
        description: 'Suppress automatic responses (Microsoft)',
        category: 'metadata',
        examples: ['DR, OOF, AutoReply']
    },

    // Thread and Conversation
    'thread-index': {
        description: 'Thread identifier (Microsoft Outlook)',
        category: 'routing',
        examples: ['AQHZxYzQp1234567890abcdef==']
    },
    'thread-topic': {
        description: 'Original subject of the thread',
        category: 'routing',
        examples: ['Project Update']
    }
};

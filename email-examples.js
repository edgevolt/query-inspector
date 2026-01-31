/**
 * Example Email Headers
 * Diverse examples demonstrating various email header scenarios
 */

export const emailExamples = [
    {
        title: 'Simple Email',
        description: 'Basic email with essential headers',
        headers: `From: "John Doe" <john.doe@example.com>
To: "Jane Smith" <jane.smith@company.com>
Subject: Meeting Tomorrow at 2pm
Date: Mon, 29 Jan 2024 14:30:15 +0000
Message-ID: <abc123def456@example.com>
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 7bit`
    },
    {
        title: 'Marketing Email',
        description: 'Newsletter with tracking and unsubscribe headers',
        headers: `From: "Company Newsletter" <newsletter@company.com>
To: subscriber@example.com
Subject: Winter Sale - 50% Off Everything!
Date: Tue, 30 Jan 2024 10:00:00 -0800
Message-ID: <campaign-2024-winter@company.com>
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
List-Unsubscribe: <https://company.com/unsubscribe?id=12345>
List-ID: <newsletter.company.com>
X-Campaign-ID: winter-sale-2024
X-Mailer: SendGrid (https://sendgrid.com)
Precedence: bulk`
    },
    {
        title: 'Secure Email with Authentication',
        description: 'Email with DKIM, SPF, and DMARC headers',
        headers: `Received: from mail.example.com ([203.0.113.50])
        by mx.google.com with ESMTPS id abc123
        for <recipient@gmail.com>;
        Wed, 31 Jan 2024 13:45:00 -0800 (PST)
DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=default;
        h=from:to:subject:date:message-id;
        bh=abc123def456==;
        b=xyz789uvw012==
Authentication-Results: mx.google.com;
        spf=pass (google.com: domain of sender@example.com designates 203.0.113.50 as permitted sender) smtp.mailfrom=sender@example.com;
        dkim=pass header.d=example.com header.s=default;
        dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.com
Received-SPF: pass (google.com: domain of sender@example.com designates 203.0.113.50 as permitted sender) client-ip=203.0.113.50;
From: "Security Team" <security@example.com>
To: user@gmail.com
Subject: Account Security Alert
Date: Wed, 31 Jan 2024 13:45:00 -0800
Message-ID: <security-alert-789@example.com>
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8`
    },
    {
        title: 'Reply Email',
        description: 'Email reply with threading headers',
        headers: `From: "Jane Smith" <jane.smith@company.com>
To: "John Doe" <john.doe@example.com>
Subject: Re: Meeting Tomorrow at 2pm
Date: Mon, 29 Jan 2024 15:00:00 +0000
Message-ID: <reply-xyz789@company.com>
In-Reply-To: <abc123def456@example.com>
References: <abc123def456@example.com>
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Thread-Index: AQHZxYzQp1234567890abcdef==
Thread-Topic: Meeting Tomorrow at 2pm`
    },
    {
        title: 'Multipart MIME Email',
        description: 'Email with HTML and plain text alternatives',
        headers: `From: "Marketing Team" <marketing@company.com>
To: customer@example.com
Subject: Product Launch Announcement
Date: Thu, 01 Feb 2024 09:00:00 -0800
Message-ID: <product-launch-2024@company.com>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_Part_12345_67890.1234567890"
X-Mailer: Microsoft Outlook 16.0
Importance: high
X-Priority: 1`
    },
    {
        title: 'Forwarded Email with Routing',
        description: 'Email showing complete routing path through multiple servers',
        headers: `Received: from mail-sor-f41.google.com (mail-sor-f41.google.com [209.85.220.41])
        by mx.example.com with ESMTPS id abc123
        for <final@example.com>;
        Fri, 02 Feb 2024 08:30:00 -0800 (PST)
Received: by mail-sor-f41.google.com with SMTP id abc123
        for <final@example.com>;
        Fri, 02 Feb 2024 08:29:55 -0800 (PST)
Received: from mail.sender.com ([192.168.1.100])
        by smtp.gmail.com with ESMTPSA id xyz789
        for <intermediate@gmail.com>;
        Fri, 02 Feb 2024 08:29:50 -0800 (PST)
From: "Original Sender" <sender@sender.com>
To: "Final Recipient" <final@example.com>
Subject: Fwd: Important Document
Date: Fri, 02 Feb 2024 08:29:45 -0800
Message-ID: <fwd-12345@sender.com>
Resent-From: "Forwarder" <intermediate@gmail.com>
Resent-To: <final@example.com>
Resent-Date: Fri, 02 Feb 2024 08:29:50 -0800
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
X-Originating-IP: [192.168.1.100]`
    }
];

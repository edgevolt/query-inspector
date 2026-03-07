/**
 * Okta System Log Field Knowledge Base
 * Comprehensive definitions for Okta System Log event fields
 * Covers Authentication, Lifecycle, Security, Policy, Application, and System events
 * Categories: timestamp, source, destination, action, policy, protocol, traffic, security, default
 */

export default {
    // ============================================================
    //  EVENT METADATA
    // ============================================================

    uuid: {
        description: 'Unique identifier (UUID) for this log event',
        category: 'default',
        examples: ['f3c7e5a2-1b4d-4f8e-9c6a-0d2e8f7b1a3c']
    },
    published: {
        description: 'ISO 8601 timestamp of when the event was published to the Okta System Log',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00.000Z', '2026-01-15T09:22:11.123Z']
    },
    eventType: {
        description: 'Okta event type identifier — describes the specific action that occurred (e.g., user.session.start, user.authentication.sso)',
        category: 'action',
        examples: ['user.session.start', 'user.authentication.sso', 'user.lifecycle.create', 'user.mfa.factor.activate', 'application.lifecycle.create', 'policy.evaluate_sign_on', 'group.user_membership.add', 'system.api_token.create']
    },
    version: {
        description: 'Version of the Okta System Log event schema (currently "0")',
        category: 'default',
        examples: ['0']
    },
    severity: {
        description: 'Severity level of the event — DEBUG, INFO, WARN, or ERROR',
        category: 'security',
        examples: ['DEBUG', 'INFO', 'WARN', 'ERROR']
    },
    displayMessage: {
        description: 'Human-readable summary message describing the event',
        category: 'action',
        examples: ['User login to Okta', 'User single sign on to app', 'Add user to app', 'MFA factor activated by user']
    },
    legacyEventType: {
        description: 'Legacy event type name from the older Okta Events API (for backward compatibility)',
        category: 'default',
        examples: ['core.user_auth.login_success', 'app.generic.unauth_app_access_attempt']
    },

    // ============================================================
    //  ACTOR (Who performed the action)
    // ============================================================

    'actor.id': {
        description: 'Unique Okta ID of the entity that performed the action (user, app, or system)',
        category: 'source',
        examples: ['00u1a2b3c4d5e6f7g8', '0oa1a2b3c4d5e6f7g8']
    },
    'actor.type': {
        description: 'Type of the actor entity — User, SystemPrincipal, PublicClientApp, or AppInstance',
        category: 'source',
        examples: ['User', 'SystemPrincipal', 'PublicClientApp', 'AppInstance']
    },
    'actor.displayName': {
        description: 'Display name of the actor (e.g., user full name, app name, or "Okta System")',
        category: 'source',
        examples: ['Jane Smith', 'Okta System', 'Admin Console', 'Okta Workflow']
    },
    'actor.alternateId': {
        description: 'Alternate identifier for the actor — typically the user\'s email/login or app label',
        category: 'source',
        examples: ['jsmith@contoso.com', 'admin@fabrikam.com', 'Okta Admin Console']
    },
    'actor.detailEntry': {
        description: 'Additional key-value details about the actor (varies by event type)',
        category: 'source',
        examples: ['{"methodUsedVerifiedBy":"PASSWORD"}']
    },

    // ============================================================
    //  TARGET (What was acted upon)
    // ============================================================

    target: {
        description: 'Array of target resources acted upon — each with id, type, displayName, and alternateId',
        category: 'destination',
        examples: ['[{"id":"00u1...","type":"User","displayName":"Jane Smith","alternateId":"jsmith@contoso.com"}]']
    },
    'target.id': {
        description: 'Unique Okta ID of the target resource (user, app, group, policy, etc.)',
        category: 'destination',
        examples: ['00u1a2b3c4d5e6f7g8', '0oa1a2b3c4d5e6f7g8', '00g1a2b3c4d5e6f7g8']
    },
    'target.type': {
        description: 'Type of the target resource — User, AppInstance, AppUser, UserGroup, Policy, etc.',
        category: 'destination',
        examples: ['User', 'AppInstance', 'AppUser', 'UserGroup', 'Policy', 'AuthenticatorEnrollment', 'Factor']
    },
    'target.displayName': {
        description: 'Display name of the target resource',
        category: 'destination',
        examples: ['Jane Smith', 'Salesforce', 'Engineering Team', 'Okta Sign-On Policy']
    },
    'target.alternateId': {
        description: 'Alternate identifier for the target — email for users, label for apps, name for groups',
        category: 'destination',
        examples: ['jsmith@contoso.com', 'Salesforce', 'Everyone']
    },
    'target.detailEntry': {
        description: 'Additional key-value details about the target (e.g., method type for MFA)',
        category: 'destination',
        examples: ['{"methodTypeUsed":"PASSWORD","methodUsedVerifiedBy":"OKTA"}']
    },

    // ============================================================
    //  OUTCOME (Result of the action)
    // ============================================================

    'outcome.result': {
        description: 'Result of the event — SUCCESS, FAILURE, SKIPPED, DENY, ALLOW, CHALLENGE, or UNKNOWN',
        category: 'action',
        examples: ['SUCCESS', 'FAILURE', 'SKIPPED', 'DENY', 'ALLOW', 'CHALLENGE', 'UNKNOWN']
    },
    'outcome.reason': {
        description: 'Human-readable reason for the outcome, especially on failure (e.g., "INVALID_CREDENTIALS")',
        category: 'action',
        examples: ['INVALID_CREDENTIALS', 'VERIFICATION_ERROR', 'MFA_ENROLL_NOT_ALLOWED', 'NETWORK_ZONE_BLACKLISTED', 'LOCKED_OUT', null]
    },

    // ============================================================
    //  CLIENT (Client context — device, user agent, IP)
    // ============================================================

    'client.id': {
        description: 'Unique identifier of the client (e.g., Okta-managed client ID or API token ID)',
        category: 'default',
        examples: ['okta.client.12345', '0oa1a2b3c4d5e6f7g8']
    },
    'client.userAgent.rawUserAgent': {
        description: 'Raw User-Agent string from the HTTP request',
        category: 'default',
        examples: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36']
    },
    'client.userAgent.os': {
        description: 'Operating system parsed from the User-Agent string',
        category: 'default',
        examples: ['Windows 10', 'Mac OS X', 'iOS', 'Android', 'Linux', 'Unknown']
    },
    'client.userAgent.browser': {
        description: 'Browser name and version parsed from the User-Agent string',
        category: 'default',
        examples: ['Chrome', 'Firefox', 'Safari', 'Edge', 'UNKNOWN']
    },
    'client.zone': {
        description: 'Okta network zone that the client IP matched (e.g., "Corporate Network", "Default")',
        category: 'policy',
        examples: ['null', 'Corporate Network', 'BlockedIPs', 'Default']
    },
    'client.device': {
        description: 'Type of device used by the client — Computer, Mobile, or Unknown',
        category: 'default',
        examples: ['Computer', 'Mobile', 'Unknown']
    },
    'client.ipAddress': {
        description: 'IP address of the client that initiated the event',
        category: 'source',
        examples: ['203.0.113.42', '10.0.0.1', '2001:db8::1']
    },

    // ============================================================
    //  GEOGRAPHICAL CONTEXT (Client location from IP)
    // ============================================================

    'client.geographicalContext.city': {
        description: 'City of the client based on IP geolocation',
        category: 'source',
        examples: ['Seattle', 'London', 'Tokyo', 'San Francisco']
    },
    'client.geographicalContext.state': {
        description: 'State or province of the client based on IP geolocation',
        category: 'source',
        examples: ['Washington', 'California', 'Ontario', 'England']
    },
    'client.geographicalContext.country': {
        description: 'Country of the client based on IP geolocation',
        category: 'source',
        examples: ['United States', 'United Kingdom', 'Germany', 'Japan']
    },
    'client.geographicalContext.postalCode': {
        description: 'Postal/ZIP code of the client based on IP geolocation',
        category: 'source',
        examples: ['98101', '90210', 'SW1A 1AA', '100-0001']
    },
    'client.geographicalContext.geolocation.lat': {
        description: 'Latitude of the client based on IP geolocation',
        category: 'source',
        examples: ['47.6062', '51.5074', '35.6762']
    },
    'client.geographicalContext.geolocation.lon': {
        description: 'Longitude of the client based on IP geolocation',
        category: 'source',
        examples: ['-122.3321', '-0.1278', '139.6503']
    },

    // ============================================================
    //  AUTHENTICATION CONTEXT
    // ============================================================

    'authenticationContext.authenticationProvider': {
        description: 'Identity provider that authenticated the user — OKTA_AUTHENTICATION_PROVIDER, ACTIVE_DIRECTORY, LDAP, FEDERATION, or SOCIAL',
        category: 'security',
        examples: ['OKTA_AUTHENTICATION_PROVIDER', 'ACTIVE_DIRECTORY', 'LDAP', 'FEDERATION', 'SOCIAL']
    },
    'authenticationContext.credentialProvider': {
        description: 'Provider of the credential used — OKTA_CREDENTIAL_PROVIDER, RSA, SYMANTEC, GOOGLE, DUO, YUBIKEY',
        category: 'security',
        examples: ['OKTA_CREDENTIAL_PROVIDER', 'RSA', 'SYMANTEC', 'GOOGLE', 'DUO', 'YUBIKEY']
    },
    'authenticationContext.credentialType': {
        description: 'Type of credential used — OTP, SMS, PASSWORD, ASSERTION, IWA, EMAIL, OAUTH2, JWT, CERTIFICATE, PRE_SHARED_SYMMETRIC_KEY',
        category: 'security',
        examples: ['OTP', 'SMS', 'PASSWORD', 'ASSERTION', 'IWA', 'EMAIL', 'OAUTH2', 'JWT', 'CERTIFICATE', 'PRE_SHARED_SYMMETRIC_KEY']
    },
    'authenticationContext.externalSessionId': {
        description: 'External session identifier — correlates events belonging to the same user session',
        category: 'default',
        examples: ['trs8cVH0RuSnFPJxJnHQzg', 'idxR8V..._OKTA']
    },
    'authenticationContext.interface': {
        description: 'Authentication interface or channel used (e.g., /api/v1/authn, /app/saml)',
        category: 'default',
        examples: [null]
    },
    'authenticationContext.issuer': {
        description: 'Token issuer information for federated or external authentication',
        category: 'security',
        examples: [null, '{"id":"0oa...","type":"OpenIdConnect"}']
    },
    'authenticationContext.rootSessionId': {
        description: 'Root session ID — groups events from all sessions sharing a common authentication root',
        category: 'default',
        examples: ['trs8cVH0RuSnFPJxJnHQzg']
    },

    // ============================================================
    //  SECURITY CONTEXT
    // ============================================================

    'securityContext.asNumber': {
        description: 'Autonomous System Number (ASN) of the client network',
        category: 'source',
        examples: [8075, 15169, 16509]
    },
    'securityContext.asOrg': {
        description: 'Organization name that owns the ASN of the client network',
        category: 'source',
        examples: ['Microsoft Corporation', 'Google LLC', 'Amazon.com Inc.', 'Comcast Cable']
    },
    'securityContext.isp': {
        description: 'Internet Service Provider of the client network',
        category: 'source',
        examples: ['Microsoft Corporation', 'Comcast Cable', 'AT&T Services Inc.']
    },
    'securityContext.domain': {
        description: 'Domain name associated with the client IP address',
        category: 'source',
        examples: ['microsoft.com', 'comcast.net', 'amazonaws.com']
    },
    'securityContext.isProxy': {
        description: 'Whether the client IP is associated with a known proxy, VPN, or anonymizer service',
        category: 'security',
        examples: [true, false]
    },

    // ============================================================
    //  TRANSACTION
    // ============================================================

    'transaction.id': {
        description: 'Unique ID for the transaction — correlates events occurring within the same operation',
        category: 'default',
        examples: ['WcKpz1uPQsqlROjhKvacFg', 'Y5N3cW3DQH2LdCIBhBc6']
    },
    'transaction.type': {
        description: 'Type of transaction — WEB (user-initiated via browser) or JOB (background system task)',
        category: 'default',
        examples: ['WEB', 'JOB']
    },
    'transaction.detail': {
        description: 'Additional transaction details (e.g., requestApiTokenId for API-initiated events)',
        category: 'default',
        examples: ['{}', '{"requestApiTokenId":"00T..."}']
    },

    // ============================================================
    //  DEBUG CONTEXT
    // ============================================================

    'debugContext.debugData.requestUri': {
        description: 'URI of the HTTP request that triggered the event',
        category: 'default',
        examples: ['/api/v1/authn', '/login/login.htm', '/app/salesforce/sso/saml', '/oauth2/v1/authorize']
    },
    'debugContext.debugData.url': {
        description: 'Full URL of the request (may include query parameters)',
        category: 'default',
        examples: ['/api/v1/authn?rememberMe=true', '/login/login.htm']
    },
    'debugContext.debugData.requestId': {
        description: 'Unique identifier for the HTTP request that triggered this event',
        category: 'default',
        examples: ['req-abc123-def456', 'Y5N3cW3DQH2LdCIBhBc6']
    },
    'debugContext.debugData.dtHash': {
        description: 'Device token hash — fingerprint identifying the device used for authentication',
        category: 'security',
        examples: ['a1b2c3d4e5f67890abcdef1234567890']
    },
    'debugContext.debugData.deviceFingerprint': {
        description: 'Device fingerprint used for device trust and anomaly detection',
        category: 'security',
        examples: ['FPp...YHz']
    },
    'debugContext.debugData.factor': {
        description: 'MFA factor type used or enrolled in MFA-related events',
        category: 'security',
        examples: ['OKTA_VERIFY_PUSH', 'GOOGLE_AUTH', 'SMS', 'EMAIL', 'FIDO2_WEBAUTHN', 'YUBIKEY']
    },
    'debugContext.debugData.factorIntent': {
        description: 'Purpose of the MFA factor operation — AUTHENTICATION or ENROLLMENT',
        category: 'security',
        examples: ['AUTHENTICATION', 'ENROLLMENT']
    },
    'debugContext.debugData.changedAttributes': {
        description: 'Comma-separated list of attributes that changed in update events',
        category: 'default',
        examples: ['firstName,lastName,email', 'status', 'password']
    },
    'debugContext.debugData.behaviors': {
        description: 'Okta Behavior Detection results — JSON showing risk signals like new device, new IP, new location',
        category: 'security',
        examples: ['{"New Geo-Location":"NEGATIVE","New Device":"POSITIVE","New IP":"POSITIVE"}']
    },
    'debugContext.debugData.risk': {
        description: 'Okta risk assessment result — JSON with risk level and reason',
        category: 'security',
        examples: ['{"level":"LOW","reasons":"Okta detected low risk"}', '{"level":"HIGH","reasons":"Anomalous device,Anomalous location"}']
    },
    'debugContext.debugData.logOnlySecurityData': {
        description: 'Security metadata logged for analysis — includes risk, behaviors, and threat data',
        category: 'security',
        examples: ['{"risk":{"level":"LOW"},"behaviors":{"New Device":"POSITIVE"}}']
    },
    'debugContext.debugData.threatSuspected': {
        description: 'Whether Okta suspects a threat based on automated detection — "true" or "false"',
        category: 'security',
        examples: ['true', 'false']
    },
    'debugContext.debugData.signOnMode': {
        description: 'Sign-on mode for SSO events — SAML_2_0, OPENID_CONNECT, WS_FEDERATION, BOOKMARK, etc.',
        category: 'protocol',
        examples: ['SAML_2_0', 'OPENID_CONNECT', 'WS_FEDERATION', 'BOOKMARK', 'AUTO_LOGIN', 'SECURE_PASSWORD_STORE']
    },
    'debugContext.debugData.initiationType': {
        description: 'How the SSO session was initiated — IDP_INITIATED or SP_INITIATED',
        category: 'default',
        examples: ['IDP_INITIATED', 'SP_INITIATED']
    },

    // ============================================================
    //  REQUEST CONTEXT
    // ============================================================

    'request.ipChain': {
        description: 'IP chain showing the request path through proxies and load balancers (array of IP objects with geolocation)',
        category: 'source',
        examples: ['[{"ip":"203.0.113.42","geographicalContext":{"city":"Seattle"},"version":"V4","source":null}]']
    },

    // ============================================================
    //  COMMON EVENT TYPE DEFINITIONS
    //  (Used in the displayMessage but useful as reference)
    // ============================================================

    // --- Authentication & Session Events ---
    'eventTypes.user.session.start': {
        description: 'User successfully started a new Okta session (login)',
        category: 'action',
        examples: ['User login to Okta']
    },
    'eventTypes.user.session.end': {
        description: 'User session ended (logout or session expiry)',
        category: 'action',
        examples: ['User logout from Okta']
    },
    'eventTypes.user.authentication.sso': {
        description: 'User authenticated via Single Sign-On to an application',
        category: 'action',
        examples: ['User single sign on to app']
    },
    'eventTypes.user.authentication.auth_via_mfa': {
        description: 'User completed MFA challenge during authentication',
        category: 'action',
        examples: ['Authentication of user via MFA']
    },
    'eventTypes.user.authentication.auth_via_radius': {
        description: 'User authenticated via RADIUS integration',
        category: 'action',
        examples: ['Authentication of user via RADIUS']
    },
    'eventTypes.user.authentication.auth_via_IDP': {
        description: 'User authenticated via an external Identity Provider (federation)',
        category: 'action',
        examples: ['Authentication of user via IDP']
    },
    'eventTypes.user.authentication.verify': {
        description: 'User authentication credentials were verified',
        category: 'action',
        examples: ['User identity was verified']
    },

    // --- MFA / Factor Events ---
    'eventTypes.user.mfa.factor.activate': {
        description: 'User activated an MFA factor (e.g., Okta Verify, FIDO2, SMS)',
        category: 'security',
        examples: ['MFA factor activated by user']
    },
    'eventTypes.user.mfa.factor.deactivate': {
        description: 'MFA factor was deactivated or removed from a user',
        category: 'security',
        examples: ['MFA factor deactivated']
    },
    'eventTypes.user.mfa.factor.reset_all': {
        description: 'All MFA factors were reset for a user (admin action)',
        category: 'security',
        examples: ['All MFA factors reset for user']
    },
    'eventTypes.user.mfa.attempt_bypass': {
        description: 'Admin generated a temporary MFA bypass code for a user',
        category: 'security',
        examples: ['MFA bypass attempt']
    },

    // --- User Lifecycle Events ---
    'eventTypes.user.lifecycle.create': {
        description: 'New user account was created in Okta',
        category: 'action',
        examples: ['Create okta user']
    },
    'eventTypes.user.lifecycle.activate': {
        description: 'User account was activated (status changed to ACTIVE)',
        category: 'action',
        examples: ['Activate okta user']
    },
    'eventTypes.user.lifecycle.deactivate': {
        description: 'User account was deactivated (status changed to DEPROVISIONED)',
        category: 'action',
        examples: ['Deactivate okta user']
    },
    'eventTypes.user.lifecycle.suspend': {
        description: 'User account was suspended (status changed to SUSPENDED)',
        category: 'action',
        examples: ['Suspend okta user']
    },
    'eventTypes.user.lifecycle.unsuspend': {
        description: 'User account was unsuspended (reactivated from SUSPENDED)',
        category: 'action',
        examples: ['Unsuspend okta user']
    },
    'eventTypes.user.lifecycle.delete.initiated': {
        description: 'User account deletion was initiated',
        category: 'action',
        examples: ['User delete initiated']
    },
    'eventTypes.user.account.lock': {
        description: 'User account was locked out due to too many failed attempts',
        category: 'security',
        examples: ['Max sign in attempts exceeded, account locked']
    },
    'eventTypes.user.account.unlock': {
        description: 'User account was unlocked by an admin or self-service',
        category: 'security',
        examples: ['Account unlocked']
    },
    'eventTypes.user.account.update_password': {
        description: 'User password was changed or reset',
        category: 'security',
        examples: ['User update password for Okta']
    },
    'eventTypes.user.account.reset_password': {
        description: 'User password was reset by admin (forced password change)',
        category: 'security',
        examples: ['User password reset by admin']
    },

    // --- Group Events ---
    'eventTypes.group.user_membership.add': {
        description: 'User was added to a group',
        category: 'action',
        examples: ['Add user to group membership']
    },
    'eventTypes.group.user_membership.remove': {
        description: 'User was removed from a group',
        category: 'action',
        examples: ['Remove user from group membership']
    },

    // --- Application Events ---
    'eventTypes.application.lifecycle.create': {
        description: 'New application integration was created in Okta',
        category: 'action',
        examples: ['Create application']
    },
    'eventTypes.application.lifecycle.update': {
        description: 'Application integration settings were updated',
        category: 'action',
        examples: ['Update application']
    },
    'eventTypes.application.lifecycle.delete': {
        description: 'Application integration was deleted from Okta',
        category: 'action',
        examples: ['Delete application']
    },
    'eventTypes.application.user_membership.add': {
        description: 'User was assigned to an application',
        category: 'action',
        examples: ['Add user to application membership']
    },
    'eventTypes.application.user_membership.remove': {
        description: 'User was removed from an application',
        category: 'action',
        examples: ['Remove user from application membership']
    },
    'eventTypes.application.provision.user.push': {
        description: 'User was provisioned (pushed) to a connected application',
        category: 'action',
        examples: ['Push user to application']
    },

    // --- Policy Events ---
    'eventTypes.policy.evaluate_sign_on': {
        description: 'Sign-on policy was evaluated during authentication',
        category: 'policy',
        examples: ['Evaluation of sign-on policy']
    },
    'eventTypes.policy.lifecycle.create': {
        description: 'New policy was created in Okta',
        category: 'policy',
        examples: ['Create policy']
    },
    'eventTypes.policy.lifecycle.update': {
        description: 'Policy settings were updated',
        category: 'policy',
        examples: ['Update policy']
    },
    'eventTypes.policy.rule.update': {
        description: 'Policy rule was updated',
        category: 'policy',
        examples: ['Update policy rule']
    },

    // --- System / Admin Events ---
    'eventTypes.system.api_token.create': {
        description: 'API token was created',
        category: 'security',
        examples: ['Create API token']
    },
    'eventTypes.system.api_token.revoke': {
        description: 'API token was revoked',
        category: 'security',
        examples: ['Revoke API token']
    },
    'eventTypes.system.org.rate_limit.warning': {
        description: 'Organization is approaching API rate limit',
        category: 'default',
        examples: ['Rate limit warning']
    },
    'eventTypes.system.org.rate_limit.violation': {
        description: 'Organization exceeded API rate limit',
        category: 'default',
        examples: ['Rate limit violation']
    },

    // --- Security Threat Events ---
    'eventTypes.security.threat.detected': {
        description: 'Okta ThreatInsight detected a security threat (credential stuffing, brute force, etc.)',
        category: 'security',
        examples: ['Threat detected']
    },
    'eventTypes.security.request.blocked': {
        description: 'Request was blocked by Okta ThreatInsight or network zone policy',
        category: 'security',
        examples: ['Request blocked by ThreatInsight']
    }
};

/**
 * Ping Identity (PingOne) Audit Log Field Knowledge Base
 * Comprehensive definitions for PingOne Platform audit activity log fields
 * Covers Authentication, User Lifecycle, MFA, Application, Policy, and Admin events
 * Categories: timestamp, source, destination, action, policy, protocol, traffic, security, default
 */

export default {
    // ============================================================
    //  EVENT METADATA
    // ============================================================

    id: {
        description: 'Unique identifier (UUID) for this audit event',
        category: 'default',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    recordedAt: {
        description: 'ISO 8601 timestamp when the event was recorded by PingOne',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00.000Z', '2026-01-15T09:22:11.123Z']
    },
    createdAt: {
        description: 'ISO 8601 timestamp when the event originally occurred',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00.000Z']
    },
    tags: {
        description: 'Array of tags classifying the event — ACTIVITY_TYPE (adminActivity, identityActivity, configReadActivity) and EVENT_OUTCOME (SUCCESS, FAILURE)',
        category: 'action',
        examples: ['identityActivity, SUCCESS', 'adminActivity, SUCCESS', 'identityActivity, FAILURE']
    },

    // ============================================================
    //  ACTION (What happened)
    // ============================================================

    'action.type': {
        description: 'PingOne event type identifier — describes the specific action (e.g., AUTHENTICATION, USER.CREATED, MFA.CHECK)',
        category: 'action',
        examples: ['AUTHENTICATION', 'USER.CREATED', 'USER.UPDATED', 'USER.DELETED', 'PASSWORD.CHECK_SUCCEEDED', 'PASSWORD.RECOVERY', 'MFA.CHECK', 'APPLICATION.CREATED', 'GROUP.UPDATED', 'POLICY.CREATED', 'FLOW.UPDATED', 'RISK_EVALUATION.CREATED']
    },
    'action.description': {
        description: 'Human-readable description of the action that occurred',
        category: 'action',
        examples: ['User Authentication', 'User Created', 'Password Check Succeeded', 'MFA Check', 'Application Created']
    },

    // ============================================================
    //  ACTORS (Who performed the action)
    // ============================================================

    actors: {
        description: 'Array of actor objects — entities that initiated the event (user, client application, or system)',
        category: 'source',
        examples: ['[{"user":{"id":"...","name":"Jane Smith","type":"User"}},{"client":{"id":"...","name":"My App","type":"CLIENT"}}]']
    },
    'actors.user.id': {
        description: 'Unique PingOne user ID of the actor who performed the action',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'actors.user.name': {
        description: 'Display name of the actor user',
        category: 'source',
        examples: ['Jane Smith', 'Admin User', 'System']
    },
    'actors.user.type': {
        description: 'Type of the actor entity — User, Administrator, or System',
        category: 'source',
        examples: ['User', 'Administrator']
    },
    'actors.user.environment.id': {
        description: 'PingOne environment ID the actor user belongs to',
        category: 'source',
        examples: ['env-a1b2c3d4-e5f6-7890']
    },
    'actors.user.population.id': {
        description: 'PingOne population ID the actor user belongs to',
        category: 'source',
        examples: ['pop-a1b2c3d4-e5f6-7890']
    },
    'actors.client.id': {
        description: 'Unique PingOne application/client ID that initiated the event',
        category: 'source',
        examples: ['app-a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'actors.client.name': {
        description: 'Display name of the client application that initiated the event',
        category: 'source',
        examples: ['My Web App', 'PingOne Admin Console', 'Mobile Banking App']
    },
    'actors.client.type': {
        description: 'Type of the client — CLIENT (OAuth app), PING_ONE_ADMIN_CONSOLE, or SYSTEM',
        category: 'source',
        examples: ['CLIENT', 'PING_ONE_ADMIN_CONSOLE', 'SYSTEM']
    },
    'actors.client.environment.id': {
        description: 'PingOne environment ID the client application belongs to',
        category: 'source',
        examples: ['env-a1b2c3d4-e5f6-7890']
    },

    // ============================================================
    //  RESOURCES (What was acted upon)
    // ============================================================

    resources: {
        description: 'Array of resource objects — entities that were acted upon (user, application, group, policy, etc.)',
        category: 'destination',
        examples: ['[{"user":{"id":"...","name":"Jane Smith","type":"User"}},{"application":{"id":"...","name":"Salesforce"}}]']
    },
    'resources.user.id': {
        description: 'Unique PingOne ID of the target user resource',
        category: 'destination',
        examples: ['b2c3d4e5-f6a7-8901-bcde-f23456789012']
    },
    'resources.user.name': {
        description: 'Display name of the target user resource',
        category: 'destination',
        examples: ['Jane Smith', 'New Employee', 'Bob Johnson']
    },
    'resources.user.type': {
        description: 'Type of the target user resource — User',
        category: 'destination',
        examples: ['User']
    },
    'resources.user.population.id': {
        description: 'PingOne population ID the target user belongs to',
        category: 'destination',
        examples: ['pop-b2c3d4e5-f6a7-8901']
    },
    'resources.user.environment.id': {
        description: 'PingOne environment ID the target user belongs to',
        category: 'destination',
        examples: ['env-a1b2c3d4-e5f6-7890']
    },
    'resources.application.id': {
        description: 'Unique PingOne ID of the target application resource',
        category: 'destination',
        examples: ['app-c3d4e5f6-a7b8-9012-cdef-345678901234']
    },
    'resources.application.name': {
        description: 'Display name of the target application',
        category: 'destination',
        examples: ['Salesforce', 'Office 365', 'AWS Console']
    },
    'resources.application.type': {
        description: 'Type of the target application — OIDC (OpenID Connect), SAML, or NATIVE',
        category: 'destination',
        examples: ['OIDC', 'SAML', 'NATIVE']
    },
    'resources.group.id': {
        description: 'Unique PingOne ID of the target group resource',
        category: 'destination',
        examples: ['grp-d4e5f6a7-b8c9-0123-defa-456789012345']
    },
    'resources.group.name': {
        description: 'Display name of the target group',
        category: 'destination',
        examples: ['Engineering Team', 'All Users', 'Administrators']
    },
    'resources.policy.id': {
        description: 'Unique PingOne ID of the target policy resource',
        category: 'policy',
        examples: ['pol-e5f6a7b8-c9d0-1234-efab-567890123456']
    },
    'resources.policy.name': {
        description: 'Display name of the target policy',
        category: 'policy',
        examples: ['Default Sign-On Policy', 'MFA Required Policy', 'Risk-Based Policy']
    },
    'resources.policy.type': {
        description: 'Type of the policy — SIGN_ON, MFA, PASSWORD, or AUTHENTICATION',
        category: 'policy',
        examples: ['SIGN_ON', 'MFA', 'PASSWORD', 'AUTHENTICATION']
    },
    'resources.environment.id': {
        description: 'Unique PingOne environment ID of the target resource',
        category: 'destination',
        examples: ['env-a1b2c3d4-e5f6-7890']
    },
    'resources.population.id': {
        description: 'PingOne population ID associated with the target resource',
        category: 'destination',
        examples: ['pop-a1b2c3d4-e5f6-7890']
    },
    'resources.id': {
        description: 'Generic resource ID (used for non-typed resources)',
        category: 'destination',
        examples: ['res-a1b2c3d4-e5f6-7890']
    },
    'resources.name': {
        description: 'Generic resource name',
        category: 'destination',
        examples: ['Resource Name']
    },
    'resources.type': {
        description: 'Resource type — USER, APPLICATION, GROUP, POPULATION, ENVIRONMENT, POLICY, FLOW, GATEWAY, SCHEMA, SCOPE, CREDENTIAL_TYPE, etc.',
        category: 'destination',
        examples: ['USER', 'APPLICATION', 'GROUP', 'POPULATION', 'ENVIRONMENT', 'POLICY', 'FLOW', 'GATEWAY', 'SCHEMA']
    },

    // ============================================================
    //  RESULT (Outcome of the action)
    // ============================================================

    'result.status': {
        description: 'Result status of the event — SUCCESS or FAILURE',
        category: 'action',
        examples: ['SUCCESS', 'FAILURE']
    },
    'result.description': {
        description: 'Human-readable description of the result (especially on failure)',
        category: 'action',
        examples: ['Successful authentication', 'Invalid credentials', 'Account locked', 'MFA required but not completed']
    },
    'result.id': {
        description: 'Result identifier code (error code or success code)',
        category: 'action',
        examples: ['AUTH_SUCCESS', 'INVALID_CREDENTIALS', 'ACCOUNT_LOCKED', 'MFA_REQUIRED']
    },

    // ============================================================
    //  CORRELATION & TRACKING
    // ============================================================

    correlationId: {
        description: 'Correlation ID linking related events across a single user transaction or flow',
        category: 'default',
        examples: ['corr-a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'session.id': {
        description: 'PingOne session ID — identifies the user session this event belongs to',
        category: 'default',
        examples: ['sess-a1b2c3d4-e5f6-7890']
    },
    'connection.id': {
        description: 'Connection ID for the authentication flow or federation connection',
        category: 'default',
        examples: ['conn-a1b2c3d4-e5f6-7890']
    },

    // ============================================================
    //  ENVIRONMENT
    // ============================================================

    'environment.id': {
        description: 'PingOne environment ID where the event occurred',
        category: 'default',
        examples: ['env-a1b2c3d4-e5f6-7890']
    },

    // ============================================================
    //  CLIENT / IP CONTEXT
    // ============================================================

    'request.ipAddress': {
        description: 'IP address of the client that made the request',
        category: 'source',
        examples: ['203.0.113.42', '10.0.0.1', '2001:db8::1']
    },
    'request.userAgent': {
        description: 'Full User-Agent string from the client HTTP request',
        category: 'default',
        examples: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0']
    },
    'request.origin': {
        description: 'Origin URL of the request (from HTTP Origin header)',
        category: 'default',
        examples: ['https://myapp.contoso.com', 'https://admin.pingone.com']
    },
    'request.headers': {
        description: 'Relevant HTTP headers from the request (may include X-Forwarded-For, etc.)',
        category: 'default',
        examples: ['{"X-Forwarded-For":"203.0.113.42"}']
    },

    // ============================================================
    //  GEOGRAPHIC CONTEXT
    // ============================================================

    'location.city': {
        description: 'City of the client based on IP geolocation',
        category: 'source',
        examples: ['Seattle', 'London', 'Tokyo']
    },
    'location.state': {
        description: 'State or province of the client based on IP geolocation',
        category: 'source',
        examples: ['Washington', 'California', 'Ontario']
    },
    'location.country': {
        description: 'Country code of the client based on IP geolocation (ISO 3166-1 alpha-2)',
        category: 'source',
        examples: ['US', 'GB', 'DE', 'JP']
    },
    'location.latitude': {
        description: 'Latitude of the client based on IP geolocation',
        category: 'source',
        examples: ['47.6062', '51.5074']
    },
    'location.longitude': {
        description: 'Longitude of the client based on IP geolocation',
        category: 'source',
        examples: ['-122.3321', '-0.1278']
    },

    // ============================================================
    //  AUTHENTICATION CONTEXT
    // ============================================================

    'authentication.authMethod': {
        description: 'Authentication method used — PASSWORD, MFA, EXTERNAL_IDP, CERTIFICATE, FIDO2, etc.',
        category: 'security',
        examples: ['PASSWORD', 'MFA', 'EXTERNAL_IDP', 'CERTIFICATE', 'FIDO2', 'SOCIAL_LOGIN']
    },
    'authentication.flowType': {
        description: 'Authentication flow type — LOGIN, REGISTRATION, RECOVERY, MFA_ENROLLMENT, etc.',
        category: 'security',
        examples: ['LOGIN', 'REGISTRATION', 'RECOVERY', 'MFA_ENROLLMENT', 'PASSWORDLESS']
    },
    'authentication.protocol': {
        description: 'Authentication protocol used — OPENID_CONNECT, SAML, OAUTH2, or WS_FEDERATION',
        category: 'protocol',
        examples: ['OPENID_CONNECT', 'SAML', 'OAUTH2', 'WS_FEDERATION']
    },
    'authentication.grantType': {
        description: 'OAuth 2.0 grant type used — AUTHORIZATION_CODE, CLIENT_CREDENTIALS, IMPLICIT, REFRESH_TOKEN, etc.',
        category: 'protocol',
        examples: ['AUTHORIZATION_CODE', 'CLIENT_CREDENTIALS', 'IMPLICIT', 'REFRESH_TOKEN', 'DEVICE_CODE']
    },

    // ============================================================
    //  MFA CONTEXT
    // ============================================================

    'mfa.factorType': {
        description: 'MFA factor type used or enrolled — SMS, EMAIL, TOTP, PUSH, FIDO2, SECURITY_KEY',
        category: 'security',
        examples: ['SMS', 'EMAIL', 'TOTP', 'PUSH', 'FIDO2', 'SECURITY_KEY']
    },
    'mfa.status': {
        description: 'MFA challenge status — PASSED, FAILED, SKIPPED, TIMEOUT',
        category: 'security',
        examples: ['PASSED', 'FAILED', 'SKIPPED', 'TIMEOUT']
    },
    'mfa.device.id': {
        description: 'ID of the MFA device used for authentication',
        category: 'security',
        examples: ['dev-a1b2c3d4-e5f6-7890']
    },
    'mfa.device.type': {
        description: 'Type of MFA device — MOBILE, HARDWARE_TOKEN, PLATFORM',
        category: 'security',
        examples: ['MOBILE', 'HARDWARE_TOKEN', 'PLATFORM']
    },

    // ============================================================
    //  RISK CONTEXT
    // ============================================================

    'risk.level': {
        description: 'Risk level assessed for the event — LOW, MEDIUM, HIGH',
        category: 'security',
        examples: ['LOW', 'MEDIUM', 'HIGH']
    },
    'risk.score': {
        description: 'Numeric risk score (0-100) for the event, calculated by PingOne risk engine',
        category: 'security',
        examples: ['15', '45', '87']
    },
    'risk.predictors': {
        description: 'Risk predictors that contributed to the risk score — e.g., anonymous network, impossible travel, new device',
        category: 'security',
        examples: ['ANONYMOUS_NETWORK, NEW_DEVICE', 'IP_REPUTATION', 'IMPOSSIBLE_TRAVEL, GEOVELOCITY']
    },
    'risk.policyId': {
        description: 'PingOne risk policy ID that was evaluated',
        category: 'policy',
        examples: ['rpol-a1b2c3d4-e5f6-7890']
    },
    'risk.policyName': {
        description: 'Name of the risk policy that was evaluated',
        category: 'policy',
        examples: ['Default Risk Policy', 'High Security Policy']
    },
    'risk.result': {
        description: 'Risk evaluation decision — ALLOW, CHALLENGE, DENY',
        category: 'security',
        examples: ['ALLOW', 'CHALLENGE', 'DENY']
    },

    // ============================================================
    //  PROVISIONING / GATEWAY CONTEXT
    // ============================================================

    'gateway.id': {
        description: 'PingOne gateway ID used for LDAP/AD bridge operations',
        category: 'default',
        examples: ['gw-a1b2c3d4-e5f6-7890']
    },
    'gateway.name': {
        description: 'Display name of the PingOne gateway',
        category: 'default',
        examples: ['AD Gateway', 'LDAP Bridge']
    },
    'gateway.type': {
        description: 'Type of PingOne gateway — LDAP, RADIUS, API_GATEWAY, KERBEROS',
        category: 'default',
        examples: ['LDAP', 'RADIUS', 'API_GATEWAY', 'KERBEROS']
    },

    // ============================================================
    //  COMMON EVENT TYPE DEFINITIONS
    // ============================================================

    // --- Authentication Events ---
    'eventTypes.AUTHENTICATION': {
        description: 'User successfully or unsuccessfully authenticated to PingOne',
        category: 'action',
        examples: ['User Authentication']
    },
    'eventTypes.PASSWORD.CHECK_SUCCEEDED': {
        description: 'User password check succeeded during authentication',
        category: 'action',
        examples: ['Password Check Succeeded']
    },
    'eventTypes.PASSWORD.CHECK_FAILED': {
        description: 'User password check failed during authentication (wrong password)',
        category: 'action',
        examples: ['Password Check Failed']
    },
    'eventTypes.PASSWORD.RECOVERY': {
        description: 'User initiated password recovery/reset flow',
        category: 'action',
        examples: ['Password Recovery']
    },
    'eventTypes.PASSWORD.RESET': {
        description: 'User or admin reset password',
        category: 'action',
        examples: ['Password Reset']
    },

    // --- MFA Events ---
    'eventTypes.MFA.CHECK': {
        description: 'MFA challenge was presented and evaluated',
        category: 'security',
        examples: ['MFA Check']
    },
    'eventTypes.MFA.ENROLLMENT': {
        description: 'User enrolled a new MFA factor/device',
        category: 'security',
        examples: ['MFA Enrollment']
    },
    'eventTypes.MFA.FACTOR.DELETED': {
        description: 'MFA factor was deleted from a user account',
        category: 'security',
        examples: ['MFA Factor Deleted']
    },

    // --- User Lifecycle Events ---
    'eventTypes.USER.CREATED': {
        description: 'New user account was created in PingOne',
        category: 'action',
        examples: ['User Created']
    },
    'eventTypes.USER.UPDATED': {
        description: 'User account attributes were updated',
        category: 'action',
        examples: ['User Updated']
    },
    'eventTypes.USER.DELETED': {
        description: 'User account was deleted from PingOne',
        category: 'action',
        examples: ['User Deleted']
    },
    'eventTypes.USER.ENABLED': {
        description: 'User account was enabled (status changed to ENABLED)',
        category: 'action',
        examples: ['User Enabled']
    },
    'eventTypes.USER.DISABLED': {
        description: 'User account was disabled (status changed to DISABLED)',
        category: 'action',
        examples: ['User Disabled']
    },
    'eventTypes.USER.LOCKED': {
        description: 'User account was locked due to too many failed attempts',
        category: 'security',
        examples: ['User Account Locked']
    },
    'eventTypes.USER.UNLOCKED': {
        description: 'User account was unlocked by admin or self-service',
        category: 'security',
        examples: ['User Account Unlocked']
    },

    // --- Group Events ---
    'eventTypes.GROUP.CREATED': {
        description: 'New group was created in PingOne',
        category: 'action',
        examples: ['Group Created']
    },
    'eventTypes.GROUP.UPDATED': {
        description: 'Group attributes or membership were updated',
        category: 'action',
        examples: ['Group Updated']
    },
    'eventTypes.GROUP.DELETED': {
        description: 'Group was deleted from PingOne',
        category: 'action',
        examples: ['Group Deleted']
    },
    'eventTypes.GROUP_MEMBERSHIP.CREATED': {
        description: 'User was added to a group',
        category: 'action',
        examples: ['User added to group']
    },
    'eventTypes.GROUP_MEMBERSHIP.DELETED': {
        description: 'User was removed from a group',
        category: 'action',
        examples: ['User removed from group']
    },

    // --- Application Events ---
    'eventTypes.APPLICATION.CREATED': {
        description: 'New application integration was created in PingOne',
        category: 'action',
        examples: ['Application Created']
    },
    'eventTypes.APPLICATION.UPDATED': {
        description: 'Application integration settings were updated',
        category: 'action',
        examples: ['Application Updated']
    },
    'eventTypes.APPLICATION.DELETED': {
        description: 'Application integration was deleted from PingOne',
        category: 'action',
        examples: ['Application Deleted']
    },
    'eventTypes.APPLICATION_ROLE_ASSIGNMENT.CREATED': {
        description: 'User or group was assigned a role in an application',
        category: 'action',
        examples: ['Application role assigned']
    },

    // --- Policy & Flow Events ---
    'eventTypes.POLICY.CREATED': {
        description: 'New policy was created (sign-on, MFA, password, or risk)',
        category: 'policy',
        examples: ['Policy Created']
    },
    'eventTypes.POLICY.UPDATED': {
        description: 'Policy settings were updated',
        category: 'policy',
        examples: ['Policy Updated']
    },
    'eventTypes.FLOW.CREATED': {
        description: 'DaVinci authentication flow was created',
        category: 'action',
        examples: ['Flow Created']
    },
    'eventTypes.FLOW.UPDATED': {
        description: 'DaVinci authentication flow was updated',
        category: 'action',
        examples: ['Flow Updated']
    },

    // --- Risk Events ---
    'eventTypes.RISK_EVALUATION.CREATED': {
        description: 'Risk evaluation was performed for an authentication attempt',
        category: 'security',
        examples: ['Risk Evaluation Created']
    },

    // --- System Events ---
    'eventTypes.API_ACCESS_LOG_ENTRY': {
        description: 'API access was logged (admin or management API call)',
        category: 'default',
        examples: ['API Access Log Entry']
    },
    'eventTypes.ENVIRONMENT.CREATED': {
        description: 'New PingOne environment was created',
        category: 'action',
        examples: ['Environment Created']
    },
    'eventTypes.GATEWAY.CREATED': {
        description: 'New gateway connection was created (LDAP, RADIUS, etc.)',
        category: 'action',
        examples: ['Gateway Created']
    }
};

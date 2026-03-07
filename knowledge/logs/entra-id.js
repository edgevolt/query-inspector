/**
 * Microsoft Entra ID Log Field Knowledge Base
 * Comprehensive definitions for Microsoft Entra ID (formerly Azure AD) log fields
 * Covers Sign-In, Audit, Provisioning, and Identity Protection / Risk Detection logs
 * Categories: timestamp, source, destination, action, policy, protocol, traffic, security, default
 */

export default {
    // ============================================================
    //  SIGN-IN LOG FIELDS
    // ============================================================

    // ===== Identity & User =====
    userDisplayName: {
        description: 'Display name of the user who performed the sign-in (e.g., "Jane Smith")',
        category: 'source',
        examples: ['Jane Smith', 'John Doe', 'Service Account']
    },
    userPrincipalName: {
        description: 'User Principal Name (UPN) — the primary sign-in identifier, typically an email address',
        category: 'source',
        examples: ['jsmith@contoso.com', 'admin@fabrikam.onmicrosoft.com']
    },
    userId: {
        description: 'Unique GUID of the user object in Entra ID',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    userType: {
        description: 'Type of user account — Member (tenant user) or Guest (B2B invited user)',
        category: 'source',
        examples: ['Member', 'Guest']
    },
    homeTenantId: {
        description: 'Tenant ID of the user\'s home directory (relevant for cross-tenant / B2B scenarios)',
        category: 'source',
        examples: ['72f988bf-86f1-41af-91ab-2d7cd011db47']
    },
    homeTenantName: {
        description: 'Display name of the user\'s home tenant (e.g., "Contoso")',
        category: 'source',
        examples: ['Contoso', 'Fabrikam']
    },

    // ===== Application & Resource =====
    appDisplayName: {
        description: 'Display name of the application the user signed into (e.g., "Microsoft Teams", "Salesforce")',
        category: 'destination',
        examples: ['Microsoft Teams', 'Azure Portal', 'Salesforce', 'Custom App']
    },
    appId: {
        description: 'Unique application (client) ID registered in Entra ID',
        category: 'destination',
        examples: ['1fec8e78-bce4-4aaf-ab1b-5451cc387264', '00000003-0000-0000-c000-000000000000']
    },
    resourceDisplayName: {
        description: 'Display name of the resource (API) the token was issued for',
        category: 'destination',
        examples: ['Microsoft Graph', 'Office 365 Exchange Online', 'Windows Azure Active Directory']
    },
    resourceId: {
        description: 'Unique ID of the target resource / service principal the token grants access to',
        category: 'destination',
        examples: ['00000003-0000-0000-c000-000000000000']
    },
    resourceTenantId: {
        description: 'Tenant ID of the resource being accessed (may differ from home tenant in cross-tenant scenarios)',
        category: 'destination',
        examples: ['72f988bf-86f1-41af-91ab-2d7cd011db47']
    },
    resourceServicePrincipalId: {
        description: 'Service principal ID of the resource application in the resource tenant',
        category: 'destination',
        examples: ['b5c2e5a0-1234-5678-abcd-ef1234567890']
    },

    // ===== Timestamp & Identifiers =====
    createdDateTime: {
        description: 'ISO 8601 timestamp of when the sign-in event was created',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00Z', '2026-01-15T09:22:11.1234567Z']
    },
    id: {
        description: 'Unique identifier (GUID) for this log entry',
        category: 'default',
        examples: ['66ea54eb-6301-4ee5-be62-ff5a759b0100']
    },
    correlationId: {
        description: 'GUID used to correlate related events across the same sign-in session or operation',
        category: 'default',
        examples: ['d3087bfa-3456-7890-abcd-ef1234567890']
    },
    requestId: {
        description: 'Unique identifier for the token request — maps to the token issued',
        category: 'default',
        examples: ['b3c5a820-1234-5678-abcd-1a2b3c4d5e6f']
    },

    // ===== Network & Location =====
    ipAddress: {
        description: 'IP address of the client from which the sign-in originated',
        category: 'source',
        examples: ['203.0.113.42', '10.0.0.1', '2001:db8::1']
    },
    'location.city': {
        description: 'City from which the sign-in originated (based on IP geolocation)',
        category: 'source',
        examples: ['Seattle', 'London', 'Tokyo']
    },
    'location.state': {
        description: 'State or province from which the sign-in originated',
        category: 'source',
        examples: ['Washington', 'California', 'Ontario']
    },
    'location.countryOrRegion': {
        description: 'Two-letter ISO country code of the sign-in origin',
        category: 'source',
        examples: ['US', 'GB', 'DE', 'JP']
    },
    'location.geoCoordinates.latitude': {
        description: 'Latitude of the sign-in origin based on IP geolocation',
        category: 'source',
        examples: ['47.6062', '51.5074']
    },
    'location.geoCoordinates.longitude': {
        description: 'Longitude of the sign-in origin based on IP geolocation',
        category: 'source',
        examples: ['-122.3321', '-0.1278']
    },
    autonomousSystemNumber: {
        description: 'Autonomous System Number (ASN) of the network the sign-in came from',
        category: 'source',
        examples: ['8075', '15169', '16509']
    },
    networkLocationDetails: {
        description: 'Details about the network location including named network types (trusted, compliant, etc.)',
        category: 'source',
        examples: ['[{"networkType":"trustedNamedLocation","networkNames":["Corporate VPN"]}]']
    },

    // ===== Authentication Details =====
    clientAppUsed: {
        description: 'Client application used for the sign-in (e.g., browser, mobile app, desktop client)',
        category: 'default',
        examples: ['Browser', 'Mobile Apps and Desktop clients', 'Exchange ActiveSync', 'Other clients']
    },
    authenticationProtocol: {
        description: 'Authentication protocol or grant type used (e.g., OAuth2, SAML, WS-Federation)',
        category: 'protocol',
        examples: ['oAuth2', 'saml20', 'wsFederation', 'deviceCode', 'ropc']
    },
    authenticationRequirement: {
        description: 'Level of authentication required — singleFactorAuthentication or multiFactorAuthentication',
        category: 'security',
        examples: ['singleFactorAuthentication', 'multiFactorAuthentication']
    },
    authenticationMethodsUsed: {
        description: 'List of authentication methods used during the sign-in (password, MFA phone, FIDO2, etc.)',
        category: 'security',
        examples: ['password', 'mobileOTP', 'windowsHelloForBusiness', 'fido2', 'microsoftAuthenticatorPush']
    },
    'authenticationDetails': {
        description: 'Ordered sequence of authentication steps with method, status, and detail for each step',
        category: 'security',
        examples: ['[{"authenticationMethod":"Password","succeeded":true,"authenticationStepResultDetail":"MFA completed in Azure AD"}]']
    },
    'mfaDetail.authMethod': {
        description: 'MFA method used for the sign-in attempt (e.g., phone call, text message, authenticator app)',
        category: 'security',
        examples: ['PhoneAppNotification', 'PhoneAppOTP', 'OneWaySMS', 'TwoWayVoiceMobile']
    },
    'mfaDetail.authDetail': {
        description: 'Additional details about the MFA authentication method (e.g., phone number masked)',
        category: 'security',
        examples: ['Phone call to +X XXXXXXXX90', 'Notification sent to Microsoft Authenticator']
    },
    isInteractive: {
        description: 'Whether the sign-in was interactive (user-initiated) or non-interactive (token refresh, service call)',
        category: 'default',
        examples: ['true', 'false']
    },
    incomingTokenType: {
        description: 'Type of incoming token presented during the sign-in flow',
        category: 'security',
        examples: ['primaryRefreshToken', 'saml11', 'saml20', 'none']
    },
    tokenIssuerType: {
        description: 'Type of the token issuer — AzureAD, ADFederationServices, or External',
        category: 'security',
        examples: ['AzureAD', 'ADFederationServices', 'AzureADBackupAuth']
    },
    tokenIssuerName: {
        description: 'Name of the identity provider that issued the token (e.g., ADFS server name)',
        category: 'security',
        examples: ['sts.contoso.com', '']
    },
    originalRequestId: {
        description: 'Request ID of the first request in a multi-step authentication sequence',
        category: 'default',
        examples: ['b3c5a820-1234-5678-abcd-1a2b3c4d5e6f']
    },
    processingTimeInMilliseconds: {
        description: 'Server-side request processing time in milliseconds',
        category: 'traffic',
        examples: ['234', '1502', '89']
    },
    uniqueTokenIdentifier: {
        description: 'Base64-encoded unique identifier for the issued token — useful for token tracking',
        category: 'default',
        examples: ['dGhpcyBpcyBhIHRlc3Q=']
    },

    // ===== Device & Client Details =====
    'deviceDetail.deviceId': {
        description: 'Unique device ID from Entra ID device registration (empty if unregistered)',
        category: 'default',
        examples: ['b3c5a820-1234-5678-abcd-ef1234567890', '']
    },
    'deviceDetail.displayName': {
        description: 'Display name of the device used for sign-in',
        category: 'default',
        examples: ['DESKTOP-ABC123', 'JaneiPhone', 'YOURPC']
    },
    'deviceDetail.operatingSystem': {
        description: 'Operating system of the device performing the sign-in',
        category: 'default',
        examples: ['Windows 10', 'iOS 17.3', 'MacOs', 'Android 14', 'Linux']
    },
    'deviceDetail.browser': {
        description: 'Browser name and version used for the sign-in',
        category: 'default',
        examples: ['Chrome 122.0', 'Edge 122.0', 'Safari 17.3', 'Firefox 123.0']
    },
    'deviceDetail.isCompliant': {
        description: 'Whether the device is compliant with organizational Intune compliance policies',
        category: 'security',
        examples: ['true', 'false']
    },
    'deviceDetail.isManaged': {
        description: 'Whether the device is managed (enrolled in Intune or domain-joined)',
        category: 'security',
        examples: ['true', 'false']
    },
    'deviceDetail.trustType': {
        description: 'Trust type of the device — AzureAD joined, Hybrid joined, or registered',
        category: 'security',
        examples: ['Azure AD joined', 'Hybrid Azure AD joined', 'Azure AD registered', 'ServerAd']
    },

    // ===== Sign-In Status & Result =====
    'status.errorCode': {
        description: 'Entra ID error code for the sign-in result. 0 = success; non-zero = failure (e.g., 50126 = invalid credentials)',
        category: 'action',
        examples: ['0', '50126', '50053', '50076', '53003', '500121']
    },
    'status.failureReason': {
        description: 'Human-readable reason for sign-in failure (empty on success)',
        category: 'action',
        examples: ['Invalid username or password.', 'Account is locked.', 'MFA requirement not satisfied.', 'Blocked by Conditional Access.']
    },
    'status.additionalDetails': {
        description: 'Additional context about the sign-in result (e.g., MFA prompt details, interrupt reason)',
        category: 'action',
        examples: ['MFA completed in Azure AD', 'MFA required in Azure AD', 'Redirected to external provider']
    },
    resultType: {
        description: 'Overall result of the sign-in — 0 for success, non-zero error codes for failures',
        category: 'action',
        examples: ['0', '50126', '53003', '700016']
    },
    resultDescription: {
        description: 'Additional description text for the sign-in result or error condition',
        category: 'action',
        examples: ['', 'Invalid username or password', 'Blocked by Conditional Access']
    },

    // ===== Conditional Access =====
    conditionalAccessStatus: {
        description: 'Overall status of Conditional Access evaluation — success, failure, or notApplied',
        category: 'policy',
        examples: ['success', 'failure', 'notApplied']
    },
    appliedConditionalAccessPolicies: {
        description: 'List of Conditional Access policies evaluated during sign-in, with enforcement result per policy',
        category: 'policy',
        examples: ['[{"displayName":"Require MFA for All Users","result":"success","enforcedGrantControls":["mfa"]}]']
    },
    'appliedConditionalAccessPolicies.displayName': {
        description: 'Display name of a Conditional Access policy that was evaluated',
        category: 'policy',
        examples: ['Require MFA for All Users', 'Block Legacy Auth', 'Require Compliant Device']
    },
    'appliedConditionalAccessPolicies.result': {
        description: 'Result of the Conditional Access policy evaluation — success, failure, notApplied, notEnabled',
        category: 'policy',
        examples: ['success', 'failure', 'notApplied', 'notEnabled']
    },
    'appliedConditionalAccessPolicies.enforcedGrantControls': {
        description: 'Grant controls enforced by the Conditional Access policy (e.g., MFA, compliant device)',
        category: 'policy',
        examples: ['mfa', 'compliantDevice', 'domainJoinedDevice', 'approvedApplication']
    },
    'appliedConditionalAccessPolicies.enforcedSessionControls': {
        description: 'Session controls enforced by the Conditional Access policy (e.g., sign-in frequency, app enforced restrictions)',
        category: 'policy',
        examples: ['signInFrequency', 'cloudAppSecurity', 'persistentBrowser', 'appEnforcedRestrictions']
    },

    // ===== Risk & Identity Protection =====
    riskDetail: {
        description: 'Reason why a user or sign-in was flagged as risky, or why the risk was dismissed',
        category: 'security',
        examples: ['none', 'aiConfirmedSigninSafe', 'userPassedMFADrivenByRiskBasedPolicy', 'adminConfirmedSigninCompromised', 'adminDismissedAllRiskForUser']
    },
    riskEventTypes_v2: {
        description: 'List of risk event types detected during the sign-in (Identity Protection)',
        category: 'security',
        examples: ['unfamiliarFeatures', 'anonymizedIPAddress', 'maliciousIPAddress', 'impossibleTravel', 'leakedCredentials']
    },
    riskLevelAggregated: {
        description: 'Aggregated risk level across all risk detections for this sign-in',
        category: 'security',
        examples: ['none', 'low', 'medium', 'high', 'hidden']
    },
    riskLevelDuringSignIn: {
        description: 'Real-time risk level calculated at the time of sign-in',
        category: 'security',
        examples: ['none', 'low', 'medium', 'high']
    },
    riskState: {
        description: 'Current state of the risk detection — at risk, confirmed compromised, remediated, or dismissed',
        category: 'security',
        examples: ['none', 'atRisk', 'confirmedCompromised', 'remediated', 'dismissed', 'confirmedSafe']
    },
    flaggedForReview: {
        description: 'Whether this sign-in has been flagged for admin review',
        category: 'security',
        examples: ['true', 'false']
    },

    // ===== Cross-Tenant & External Identity =====
    crossTenantAccessType: {
        description: 'Type of cross-tenant access used for the sign-in (B2B, B2B Direct Connect, Microsoft Support, etc.)',
        category: 'default',
        examples: ['none', 'b2bCollaboration', 'b2bDirectConnect', 'microsoftSupport', 'serviceProvider', 'unknownFutureValue']
    },
    isTenantRestricted: {
        description: 'Whether tenant restrictions were applied during the sign-in',
        category: 'policy',
        examples: ['true', 'false']
    },
    federatedCredentialId: {
        description: 'Identifier of the federated credential used for workload identity federation scenarios',
        category: 'default',
        examples: ['b3c5a820-1234-5678-abcd-ef1234567890']
    },

    // ===== Service Principal / Managed Identity =====
    servicePrincipalId: {
        description: 'ID of the service principal (enterprise app) performing the sign-in (for non-interactive sign-ins)',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    servicePrincipalName: {
        description: 'Display name of the service principal performing the sign-in',
        category: 'source',
        examples: ['MyBackendAPI', 'GraphConnector']
    },
    managedIdentityType: {
        description: 'Type of managed identity used — systemAssigned or userAssigned',
        category: 'source',
        examples: ['systemAssigned', 'userAssigned', 'none']
    },

    // ===== Tenant & Directory Info =====
    tenantId: {
        description: 'Tenant (directory) ID where the sign-in event was recorded',
        category: 'default',
        examples: ['72f988bf-86f1-41af-91ab-2d7cd011db47']
    },

    // ============================================================
    //  AUDIT LOG FIELDS
    // ============================================================

    activityDisplayName: {
        description: 'Human-readable name of the audited operation (e.g., "Add user", "Update group", "Delete application")',
        category: 'action',
        examples: ['Add user', 'Update group', 'Add member to group', 'Delete application', 'Consent to application', 'Update policy']
    },
    activityDateTime: {
        description: 'ISO 8601 timestamp of when the audit activity was performed (UTC)',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00Z', '2026-01-15T09:22:11Z']
    },
    category: {
        description: 'Resource category targeted by the audit activity (e.g., UserManagement, GroupManagement, ApplicationManagement)',
        category: 'default',
        examples: ['UserManagement', 'GroupManagement', 'ApplicationManagement', 'RoleManagement', 'PolicyManagement', 'DirectoryManagement', 'DeviceManagement']
    },
    operationType: {
        description: 'Type of operation that was performed — Add, Update, Delete, Assign, Unassign, or Other',
        category: 'action',
        examples: ['Add', 'Update', 'Delete', 'Assign', 'Unassign', 'Other']
    },
    result: {
        description: 'Outcome of the audit activity — success, failure, or timeout',
        category: 'action',
        examples: ['success', 'failure', 'timeout']
    },
    resultReason: {
        description: 'Describes the cause of a failure or timeout result in audit operations',
        category: 'action',
        examples: ['', 'Microsoft.Online.Administration.Automation.InvalidActionException', 'Permission denied']
    },
    loggedByService: {
        description: 'Service that initiated the audited activity (e.g., Core Directory, PIM, B2C, Access Reviews)',
        category: 'default',
        examples: ['Core Directory', 'PIM', 'B2C', 'Access Reviews', 'Invited Users', 'Self-service Group Management', 'Microsoft Identity Manager']
    },
    'initiatedBy.user.displayName': {
        description: 'Display name of the user who initiated the audit action',
        category: 'source',
        examples: ['Admin User', 'Jane Smith']
    },
    'initiatedBy.user.userPrincipalName': {
        description: 'UPN of the user who initiated the audit action',
        category: 'source',
        examples: ['admin@contoso.com', 'jsmith@fabrikam.com']
    },
    'initiatedBy.user.id': {
        description: 'Object ID of the user who initiated the audit action',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'initiatedBy.user.ipAddress': {
        description: 'IP address of the user who initiated the audit action',
        category: 'source',
        examples: ['203.0.113.42', '10.0.0.1']
    },
    'initiatedBy.app.displayName': {
        description: 'Display name of the application that initiated the audit action (for app-driven changes)',
        category: 'source',
        examples: ['Microsoft Azure AD Sync', 'Graph Explorer', 'Azure Portal']
    },
    'initiatedBy.app.appId': {
        description: 'Application (client) ID of the app that initiated the audit action',
        category: 'source',
        examples: ['1fec8e78-bce4-4aaf-ab1b-5451cc387264']
    },
    'initiatedBy.app.servicePrincipalId': {
        description: 'Service principal ID of the app that initiated the audit action',
        category: 'source',
        examples: ['b5c2e5a0-1234-5678-abcd-ef1234567890']
    },
    targetResources: {
        description: 'Array of resources that were modified by the audit action — includes resource type, display name, UPN, and modified properties',
        category: 'destination',
        examples: ['[{"displayName":"New User","type":"User","userPrincipalName":"newuser@contoso.com","modifiedProperties":[...]}]']
    },
    'targetResources.displayName': {
        description: 'Display name of the target resource that was modified',
        category: 'destination',
        examples: ['John Doe', 'Marketing Group', 'My Custom App']
    },
    'targetResources.id': {
        description: 'Object ID of the target resource that was modified',
        category: 'destination',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'targetResources.type': {
        description: 'Type of the target resource — User, Group, Device, Application, Role, Policy, ServicePrincipal, or Other',
        category: 'destination',
        examples: ['User', 'Group', 'Application', 'ServicePrincipal', 'Role', 'Policy', 'Device', 'Other']
    },
    'targetResources.userPrincipalName': {
        description: 'UPN of the target user resource (if applicable)',
        category: 'destination',
        examples: ['newuser@contoso.com', 'jdoe@fabrikam.com']
    },
    'targetResources.modifiedProperties': {
        description: 'Array of properties that were changed, with old and new values',
        category: 'default',
        examples: ['[{"displayName":"DisplayName","oldValue":"Old Name","newValue":"New Name"}]']
    },
    additionalDetails: {
        description: 'Key-value pairs providing additional context about the audit activity',
        category: 'default',
        examples: ['[{"key":"UserAgent","value":"Mozilla/5.0..."}]']
    },

    // ============================================================
    //  PROVISIONING LOG FIELDS
    // ============================================================

    provisioningAction: {
        description: 'Provisioning action performed — Create, Update, Delete, Disable, StagedDelete, or Other',
        category: 'action',
        examples: ['Create', 'Update', 'Delete', 'Disable', 'StagedDelete', 'Other']
    },
    'provisioningStatusInfo.status': {
        description: 'Status of the provisioning operation — success, failure, skipped, or warning',
        category: 'action',
        examples: ['success', 'failure', 'skipped', 'warning']
    },
    'provisioningStatusInfo.errorInformation.errorCode': {
        description: 'Error code if the provisioning operation failed',
        category: 'action',
        examples: ['AzureDirectoryB2BManagementPolicyCheckFailure', 'EntryExportError']
    },
    'provisioningStatusInfo.errorInformation.reason': {
        description: 'Reason for the provisioning failure',
        category: 'action',
        examples: ['User not found in target system', 'Attribute mapping error']
    },
    cycleId: {
        description: 'Unique identifier for the provisioning sync cycle',
        category: 'default',
        examples: ['b3c5a820-1234-5678-abcd-ef1234567890']
    },
    changeId: {
        description: 'Unique identifier for the specific provisioning change within a cycle',
        category: 'default',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    jobId: {
        description: 'ID of the provisioning job that triggered this operation',
        category: 'default',
        examples: ['SalesforceProvisioning.abc123def456']
    },
    'sourceSystem.displayName': {
        description: 'Display name of the source system in the provisioning flow (e.g., "Azure Active Directory")',
        category: 'source',
        examples: ['Azure Active Directory', 'Workday', 'SuccessFactors']
    },
    'sourceSystem.id': {
        description: 'Unique ID of the source system in the provisioning configuration',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'targetSystem.displayName': {
        description: 'Display name of the target system in the provisioning flow (e.g., "Salesforce", "ServiceNow")',
        category: 'destination',
        examples: ['Salesforce', 'ServiceNow', 'Azure Active Directory', 'AWS IAM Identity Center']
    },
    'targetSystem.id': {
        description: 'Unique ID of the target system in the provisioning configuration',
        category: 'destination',
        examples: ['b5c2e5a0-1234-5678-abcd-ef1234567890']
    },
    'sourceIdentity.displayName': {
        description: 'Display name of the identity being provisioned from the source system',
        category: 'source',
        examples: ['Jane Smith', 'john.doe@contoso.com']
    },
    'sourceIdentity.id': {
        description: 'Unique ID of the source identity',
        category: 'source',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    'sourceIdentity.type': {
        description: 'Type of the source identity (User, Group)',
        category: 'source',
        examples: ['User', 'Group']
    },
    'targetIdentity.displayName': {
        description: 'Display name of the identity in the target system after provisioning',
        category: 'destination',
        examples: ['Jane Smith', 'jsmith']
    },
    'targetIdentity.id': {
        description: 'Unique ID of the provisioned identity in the target system',
        category: 'destination',
        examples: ['00u1a2b3c4d5e6f7g8h9']
    },
    'targetIdentity.type': {
        description: 'Type of the target identity (User, Group)',
        category: 'destination',
        examples: ['User', 'Group']
    },
    'servicePrincipal.displayName': {
        description: 'Display name of the service principal (enterprise app) associated with the provisioning job',
        category: 'default',
        examples: ['Salesforce Provisioning', 'ServiceNow Integration']
    },
    'servicePrincipal.id': {
        description: 'Object ID of the service principal associated with the provisioning job',
        category: 'default',
        examples: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890']
    },
    provisioningSteps: {
        description: 'Array of provisioning steps executed, each with name, type, status, description, and details',
        category: 'default',
        examples: ['[{"name":"EntryImport","provisioningStepType":"import","status":"success","description":"Retrieved user from Azure AD"}]']
    },
    modifiedProperties: {
        description: 'Array of properties that were modified during provisioning, with old and new values',
        category: 'default',
        examples: ['[{"displayName":"email","oldValue":"old@contoso.com","newValue":"new@contoso.com"}]']
    },
    durationInMilliseconds: {
        description: 'Duration of the provisioning operation in milliseconds',
        category: 'traffic',
        examples: ['1234', '567', '89']
    },
    statusInfo: {
        description: 'Summary status information for the provisioning event',
        category: 'action',
        examples: ['success', 'failure']
    },
    provisioningActionType: {
        description: 'High-level type of provisioning action — export (outbound) or import (inbound)',
        category: 'action',
        examples: ['export', 'import']
    },

    // ============================================================
    //  IDENTITY PROTECTION / RISK DETECTION FIELDS
    // ============================================================

    riskEventType: {
        description: 'Type of risk event detected by Identity Protection (e.g., unfamiliarFeatures, impossibleTravel, maliciousIPAddress)',
        category: 'security',
        examples: ['unfamiliarFeatures', 'anonymizedIPAddress', 'maliciousIPAddress', 'impossibleTravel', 'leakedCredentials', 'suspiciousBrowser', 'passwordSpray', 'mcasSuspiciousInboxManipulationRules', 'investigationsThreatIntelligence']
    },
    riskLevel: {
        description: 'Severity level of the detected risk — low, medium, high, or hidden',
        category: 'security',
        examples: ['low', 'medium', 'high', 'hidden', 'none']
    },
    detectedDateTime: {
        description: 'ISO 8601 timestamp of when the risk was first detected',
        category: 'timestamp',
        examples: ['2026-03-07T14:30:00Z']
    },
    lastUpdatedDateTime: {
        description: 'ISO 8601 timestamp of when the risk detection was last updated',
        category: 'timestamp',
        examples: ['2026-03-07T15:00:00Z']
    },
    detectionTimingType: {
        description: 'Whether the risk was detected in real-time during sign-in or offline in background processing',
        category: 'security',
        examples: ['realtime', 'offline', 'nearRealtime']
    },
    source: {
        description: 'Source that detected the risk (e.g., Identity Protection, MCAS, MDI)',
        category: 'security',
        examples: ['Identity Protection', 'Microsoft Cloud App Security', 'Microsoft Defender for Identity']
    },
    activity: {
        description: 'Type of activity associated with the risk detection — signin or user',
        category: 'security',
        examples: ['signin', 'user']
    },
    additionalInfo: {
        description: 'Additional information associated with the risk detection in JSON format',
        category: 'security',
        examples: ['[{"Key":"userAgent","Value":"Mozilla/5.0..."}]']
    },
    riskReasonDetail: {
        description: 'Detailed reason or explanation for the risk detection',
        category: 'security',
        examples: ['This sign-in was from an anonymous IP address (e.g., Tor browser, anonymizer VPN).']
    }
};

# cobalt.js
Cobalt frontend SDK.

## Install

#### npm
```bash
npm install @cobaltio/cobalt-js
```

#### yarn
```bash
yarn add @cobaltio/cobalt-js
```

## Usage

<!-- Check the SDK [documentation](docs.md) for detailed information. -->

### Include

#### Browser
```js
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@1"></script>
```

#### Node
```js
// CommonJS
const Cobalt = require("@cobaltio/cobalt-js");
// ESM
import Cobalt from "@cobaltio/cobalt-js";
```

### Initialize
```js
// initialize with token
const cobalt = new Cobalt({
    // the token you generate for linked accounts using the cobalt backend SDK
    token: "COBALT_SESSION_TOKEN",
});

// initialize without token
const cobalt = new Cobalt();
// the token you generate for linked accounts using the cobalt backend SDK
cobalt.token = "COBALT_SESSION_TOKEN";
```

### SDK

## Classes

<dl>
<dt><a href="#Cobalt">Cobalt</a></dt>
<dd><p>Cobalt Frontend SDK</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AppConfig">AppConfig</a> : <code>object</code></dt>
<dd><p>The configuration data for an application.</p>
</dd>
<dt><a href="#AppInstance">AppInstance</a> : <code>Object</code></dt>
<dd><p>An installed application.</p>
</dd>
<dt><a href="#WorkflowTemplate">WorkflowTemplate</a> : <code>Object</code></dt>
<dd><p>The workflow template.</p>
</dd>
</dl>

<a name="Cobalt"></a>

## Cobalt
Cobalt Frontend SDK

**Kind**: global class
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The session token. |


* [Cobalt](#Cobalt)
    * [new Cobalt(options)](#new_Cobalt_new)
    * [.baseUrl](#Cobalt+baseUrl) ⇒ <code>string</code>
    * [.oauth(application)](#Cobalt+oauth) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.setAppAuthData(application, payload, applicationId)](#Cobalt+setAppAuthData) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getAuthStatus(application)](#Cobalt+getAuthStatus) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.removeAppAuth(application, applicationId)](#Cobalt+removeAppAuth) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getAppConfig(application)](#Cobalt+getAppConfig) ⇒ [<code>Promise.&lt;AppConfig&gt;</code>](#AppConfig)
    * [.installApp(applicationId, payload)](#Cobalt+installApp) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
    * [.getAppInstallation(applicationId, installationId)](#Cobalt+getAppInstallation) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
    * [.updateAppInstallation(applicationId, installationId, payload)](#Cobalt+updateAppInstallation) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
    * [.deleteAppInstallation(applicationId, installationId)](#Cobalt+deleteAppInstallation) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Cobalt_new"></a>

### new Cobalt(options)
Cobalt Frontend SDK


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options to configure the Cobalt SDK. |
| [options.token] | <code>string</code> |  | The session token. |
| [options.baseUrl] | <code>string</code> | <code>&quot;https://api.gocobalt.io&quot;</code> | The base URL of your Cobalt API. |

<a name="Cobalt+baseUrl"></a>

### cobalt.baseUrl ⇒ <code>string</code>
**Kind**: instance property of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>string</code> - The base URL of cobalt API.
<a name="Cobalt+oauth"></a>

### cobalt.oauth(application) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Handle OAuth for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the user authenticated.

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |

<a name="Cobalt+setAppAuthData"></a>

### cobalt.setAppAuthData(application, payload, applicationId) ⇒ <code>Promise.&lt;unknown&gt;</code>
Save the auth data that user provides to authenticate themselves to the
specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |
| payload | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | The key value pairs of auth data. |
| applicationId | <code>String</code> | The application ID in case of custom applications. |

<a name="Cobalt+getAuthStatus"></a>

### cobalt.getAuthStatus(application) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Returns the auth status of the user for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - The auth status of the user.

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |

<a name="Cobalt+removeAppAuth"></a>

### cobalt.removeAppAuth(application, applicationId) ⇒ <code>Promise.&lt;void&gt;</code>
Unauthorize the specified application and remove any associated data from Cobalt.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |
| applicationId | <code>String</code> | The application ID in case of custom applications. |

<a name="Cobalt+getAppConfig"></a>

### cobalt.getAppConfig(application) ⇒ [<code>Promise.&lt;AppConfig&gt;</code>](#AppConfig)
Returns the configuration data for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;AppConfig&gt;</code>](#AppConfig) - The specified application's configuration data.

| Param | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application ID. |

<a name="Cobalt+installApp"></a>

### cobalt.installApp(applicationId, payload) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
Install the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance) - The specified application installation.

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| payload | [<code>AppInstance</code>](#AppInstance) | The install payload. |

<a name="Cobalt+getAppInstallation"></a>

### cobalt.getAppInstallation(applicationId, installationId) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
Returns the specified application installation.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance) - The specified application installation.

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| installationId | <code>String</code> | The installation ID of the application instance. |

<a name="Cobalt+updateAppInstallation"></a>

### cobalt.updateAppInstallation(applicationId, installationId, payload) ⇒ [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance)
Update the specified application installation.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;AppInstance&gt;</code>](#AppInstance) - The specified application installation.

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| installationId | <code>String</code> | The installation ID of the application instance. |
| payload | [<code>AppInstance</code>](#AppInstance) | The update payload. |

<a name="Cobalt+deleteAppInstallation"></a>

### cobalt.deleteAppInstallation(applicationId, installationId) ⇒ <code>Promise.&lt;unknown&gt;</code>
Delete the specified installation.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| installationId | <code>String</code> | The installation ID of the application instance. |

<a name="AppConfig"></a>

## AppConfig : <code>object</code>
The configuration data for an application.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application_data_slots | <code>Array.&lt;DataSlot&gt;</code> | Array of application data slots. |
| templates | <code>Array.&lt;Template&gt;</code> | Array of workflow templates. |

<a name="AppInstance"></a>

## AppInstance : <code>Object</code>
An installed application.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [intallation_id] | <code>String</code> | Unique ID for the installation. |
| application_data_slots | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of application data slots and their values. |
| templates | [<code>Array.&lt;WorkflowTemplate&gt;</code>](#WorkflowTemplate) | Whether the workflow template is enabled. |

<a name="WorkflowTemplate"></a>

## WorkflowTemplate : <code>Object</code>
The workflow template.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the workflow template. |
| enabled | <code>Boolean</code> | Whether the workflow template is enabled. |
| data_slots | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of workflow template's data slots and their values. |

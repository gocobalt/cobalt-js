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
```html
<!-- use a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@3.0.1"></script>
<!-- use a version range instead of a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@3"></script>
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@3.0"></script>
<!-- omit the version completely to use the latest one -->
<!-- you should NOT use this in production -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js"></script>
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
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Application">Application</a> : <code>Object</code></dt>
<dd><p>An application in Cobalt.</p>
</dd>
<dt><a href="#InputField">InputField</a> : <code>Object</code></dt>
<dd><p>An Input field to take input from the user.</p>
</dd>
<dt><a href="#ConfigPayload">ConfigPayload</a> : <code>Object</code></dt>
<dd><p>The payload object for config.</p>
</dd>
<dt><a href="#Label">Label</a> : <code>Object</code></dt>
<dd><p>Label Mapping</p>
</dd>
<dt><a href="#UpdateConfigPayload">UpdateConfigPayload</a> : <code>Object</code></dt>
<dd><p>The configuration data for an application.</p>
</dd>
<dt><a href="#WorkflowPayload">WorkflowPayload</a> : <code>Object</code></dt>
<dd><p>The workflow.</p>
</dd>
</dl>

<a name="Cobalt"></a>

## Cobalt
**Kind**: global class

* [Cobalt](#Cobalt)
    * [new Cobalt(options)](#new_Cobalt_new)
    * [.getApp([slug])](#Cobalt+getApp) ⇒ [<code>Promise.&lt;Application&gt;</code>](#Application)
    * [.connect(slug, [payload])](#Cobalt+connect) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.disconnect(slug)](#Cobalt+disconnect) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.config([payload])](#Cobalt+config) ⇒ <code>Promise.&lt;Config&gt;</code>
    * [.updateConfig(slug, payload)](#Cobalt+updateConfig) ⇒ <code>Promise.&lt;Config&gt;</code>
    * [.deleteConfig(slug, [configId])](#Cobalt+deleteConfig) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Cobalt_new"></a>

### new Cobalt(options)
Cobalt Frontend SDK


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options to configure the Cobalt SDK. |
| [options.token] | <code>String</code> |  | The session token. |
| [options.baseUrl] | <code>String</code> | <code>https://api.gocobalt.io</code> | The base URL of the Cobalt API. |

<a name="Cobalt+getApp"></a>

### cobalt.getApp([slug]) ⇒ [<code>Promise.&lt;Application&gt;</code>](#Application)
Returns the application details for the specified application, provided
the application is enabled in Cobalt. If no application is specified,
it returns all the enabled applications.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;Application&gt;</code>](#Application) - The application details.

| Param | Type | Description |
| --- | --- | --- |
| [slug] | <code>String</code> | The application slug. |

<a name="Cobalt+connect"></a>

### cobalt.connect(slug, [payload]) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Connect the specified application, optionally with the auth data that user provides.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the connection was successful.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slug | <code>String</code> |  | The application slug. |
| [payload] | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | <code>{}</code> | The key value pairs of auth data. |

<a name="Cobalt+disconnect"></a>

### cobalt.disconnect(slug) ⇒ <code>Promise.&lt;void&gt;</code>
Disconnect the specified application and remove any associated data from Cobalt.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |

<a name="Cobalt+config"></a>

### cobalt.config([payload]) ⇒ <code>Promise.&lt;Config&gt;</code>
Returns the specified config, or creates one if it doesn't exist.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Config&gt;</code> - The specified config.

| Param | Type | Description |
| --- | --- | --- |
| [payload] | [<code>ConfigPayload</code>](#ConfigPayload) | The payload object for config. |

<a name="Cobalt+updateConfig"></a>

### cobalt.updateConfig(slug, payload) ⇒ <code>Promise.&lt;Config&gt;</code>
Update the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Config&gt;</code> - The specified config.

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| payload | [<code>UpdateConfigPayload</code>](#UpdateConfigPayload) | The update payload. |

<a name="Cobalt+deleteConfig"></a>

### cobalt.deleteConfig(slug, [configId]) ⇒ <code>Promise.&lt;unknown&gt;</code>
Delete the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| [configId] | <code>String</code> | The unique ID of the config. |

<a name="Application"></a>

## Application : <code>Object</code>
An application in Cobalt.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The application name. |
| description | <code>String</code> | The application description. |
| icon | <code>String</code> | The application icon. |
| type | <code>String</code> | The application slug for native apps. |
| [slug] | <code>String</code> | The application slug for custom apps. |
| auth_type | <code>&quot;oauth2&quot;</code> \| <code>&quot;keybased&quot;</code> | The type of auth used by application. |
| [connected] | <code>Boolean</code> | Whether the user has connected the application. |
| [auth_input_map] | [<code>Array.&lt;InputField&gt;</code>](#InputField) | The fields required from the user to connect the application (for `keybased` auth type). |

<a name="InputField"></a>

## InputField : <code>Object</code>
An Input field to take input from the user.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Key name of the field. |
| type | <code>String</code> | Input type of the field. |
| required | <code>String</code> | Whether the field is required. |
| placeholder | <code>String</code> | The placeholder of the field. |
| label | <code>String</code> | The label of the field. |

<a name="ConfigPayload"></a>

## ConfigPayload : <code>Object</code>
The payload object for config.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| [config_id] | <code>String</code> | Unique ID for the config. |
| labels | <code>Object.&lt;string, Array.&lt;Label&gt;&gt;</code> | The dynamic label mappings. |

<a name="Label"></a>

## Label : <code>Object</code>
Label Mapping

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The label name. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The label value. |

<a name="UpdateConfigPayload"></a>

## UpdateConfigPayload : <code>Object</code>
The configuration data for an application.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| [config_id] | <code>String</code> | Unique ID for the config. |
| fields | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of application fields and their values. |
| workflows | [<code>Array.&lt;WorkflowPayload&gt;</code>](#WorkflowPayload) | Whether the workflow is enabled. |

<a name="WorkflowPayload"></a>

## WorkflowPayload : <code>Object</code>
The workflow.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the workflow. |
| enabled | <code>Boolean</code> | Whether the workflow is enabled. |
| fields | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of workflow fields and their values. |

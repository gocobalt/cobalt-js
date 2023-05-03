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
<!-- import the latest version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js"></script>
<!-- import a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@2"></script>
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
<dt><a href="#Label">Label</a> : <code>Object</code></dt>
<dd><p>Field Mapping Label</p>
</dd>
<dt><a href="#DynamicField">DynamicField</a> : <code>Object</code></dt>
<dd><p>Field Mapping Label</p>
</dd>
<dt><a href="#DynamicFields">DynamicFields</a> : <code>Object</code></dt>
<dd><p>The dynamic fields payload.</p>
</dd>
<dt><a href="#Config">Config</a> : <code>Object</code></dt>
<dd><p>The configuration data for an application.</p>
</dd>
<dt><a href="#Workflow">Workflow</a> : <code>Object</code></dt>
<dd><p>The workflow.</p>
</dd>
</dl>

<a name="Cobalt"></a>

## Cobalt
Cobalt Frontend SDK

**Kind**: global class

* [Cobalt](#Cobalt)
    * [new Cobalt(options)](#new_Cobalt_new)
    * [.connect(slug, [payload])](#Cobalt+connect) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.disconnect(slug)](#Cobalt+disconnect) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.config(slug, configId, [fields])](#Cobalt+config) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
    * [.updateConfig(slug, configId, payload)](#Cobalt+updateConfig) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
    * [.deleteConfig(slug, configId)](#Cobalt+deleteConfig) ⇒ <code>Promise.&lt;unknown&gt;</code>
* Additional Methods:
    * [.getApp(slug)](#Cobalt+getApp) ⇒ <code>Promise.&lt;Application&gt;</code>
    * [.getConfig(slug, configId)](#Cobalt+getConfig) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)

<a name="new_Cobalt_new"></a>

### new Cobalt(options)
Cobalt Frontend SDK


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options to configure the Cobalt SDK. |
| [options.token] | <code>String</code> |  | The session token. |
| [options.baseUrl] | <code>String</code> | <code>https://api.gocobalt.io</code> | The base URL of the Cobalt API. |

<a name="Cobalt+getApp"></a>

### cobalt.getApp(slug) ⇒ <code>Promise.&lt;Application&gt;</code>
Returns the application details for the specified application, provided
the application is enabled in Cobalt.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: <code>Promise.&lt;Application&gt;</code> - The application details.

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |

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

### cobalt.config(slug, configId, [fields]) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
Returns the specified config, or creates one if it doesn't exist.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;Config&gt;</code>](#Config) - The specified config.

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| configId | <code>String</code> | A unique ID for the config. |
| [fields] | [<code>DynamicFields</code>](#DynamicFields) | The dynamic fields payload. |

<a name="Cobalt+getConfig"></a>

### cobalt.getConfig(slug, configId) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
Returns the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;Config&gt;</code>](#Config) - The specified config.

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| configId | <code>String</code> | The unique ID of the config. |

<a name="Cobalt+updateConfig"></a>

### cobalt.updateConfig(slug, configId, payload) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
Update the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)
**Returns**: [<code>Promise.&lt;Config&gt;</code>](#Config) - The specified config.

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| configId | <code>String</code> | The unique ID of the config. |
| payload | [<code>Config</code>](#Config) | The update payload. |

<a name="Cobalt+deleteConfig"></a>

### cobalt.deleteConfig(slug, configId) ⇒ <code>Promise.&lt;unknown&gt;</code>
Delete the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>String</code> | The application slug. |
| configId | <code>String</code> | The unique ID of the config. |

<a name="Label"></a>

## Label : <code>Object</code>
Field Mapping Label

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The Label name. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The Label value. |

<a name="DynamicField"></a>

## DynamicField : <code>Object</code>
Field Mapping Label

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fields | [<code>Array.&lt;Label&gt;</code>](#Label) | The Label name. |

<a name="DynamicFields"></a>

## DynamicFields : <code>Object</code>
The dynamic fields payload.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| map_fields_object | <code>Object.&lt;string, DynamicField&gt;</code> | desc. |

<a name="Config"></a>

## Config : <code>Object</code>
The configuration data for an application.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [config_id] | <code>String</code> | Unique ID for the config. |
| application_data_slots | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of application data slots and their values. |
| workflows | [<code>Array.&lt;Workflow&gt;</code>](#Workflow) | Whether the workflow is enabled. |

<a name="Workflow"></a>

## Workflow : <code>Object</code>
The workflow.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the workflow. |
| enabled | <code>Boolean</code> | Whether the workflow is enabled. |
| data_slots | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | A map of workflow's data slots and their values. |

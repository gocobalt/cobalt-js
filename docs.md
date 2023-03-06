## Classes

<dl>
<dt><a href="#Cobalt">Cobalt</a></dt>
<dd><p>Cobalt Frontend SDK</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Config">Config</a> : <code>object</code></dt>
<dd><p>The configuration data for an application.</p>
</dd>
<dt><a href="#Label">Label</a> : <code>Object</code></dt>
<dd><p>Field Mapping Label</p>
</dd>
<dt><a href="#DynamicField">DynamicField</a> : <code>Object</code></dt>
<dd><p>Field Mapping Label</p>
</dd>
<dt><a href="#DynamicFields">DynamicFields</a> : <code>Object</code></dt>
<dd><p>The dynamic fields payload.</p>
</dd>
<dt><a href="#SavedConfig">SavedConfig</a> : <code>Object</code></dt>
<dd><p>An saved config.</p>
</dd>
<dt><a href="#Workflow">Workflow</a> : <code>Object</code></dt>
<dd><p>The workflow.</p>
</dd>
</dl>

<a name="Cobalt"></a>

## Cobalt
Cobalt Frontend SDK

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The session token. |


* [Cobalt](#Cobalt)
    * [new Cobalt(options)](#new_Cobalt_new)
    * [.oauth(application)](#Cobalt+oauth) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.auth(application, payload)](#Cobalt+auth) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.authCustom(applicationId, payload)](#Cobalt+authCustom) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.checkAuth(application)](#Cobalt+checkAuth) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.removeAuth(application, [applicationId])](#Cobalt+removeAuth) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.config(applicationId, configId, fields)](#Cobalt+config) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
    * [.getConfig(application)](#Cobalt+getConfig) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
    * [.saveConfig(applicationId, payload)](#Cobalt+saveConfig) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
    * [.getSavedConfig(applicationId, configId)](#Cobalt+getSavedConfig) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
    * [.updateSavedConfig(applicationId, configId, payload)](#Cobalt+updateSavedConfig) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
    * [.deleteSavedConfig(applicationId, configId)](#Cobalt+deleteSavedConfig) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Cobalt_new"></a>

### new Cobalt(options)
Cobalt Frontend SDK


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options to configure the Cobalt SDK. |
| [options.token] | <code>String</code> |  | The session token. |
| [options.baseUrl] | <code>String</code> | <code>https://api.gocobalt.io</code> | The base URL of the Cobalt API. |

<a name="Cobalt+oauth"></a>

### cobalt.oauth(application) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Handle OAuth for the specified native application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Whether the user authenticated.  

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |

<a name="Cobalt+auth"></a>

### cobalt.auth(application, payload) ⇒ <code>Promise.&lt;unknown&gt;</code>
Save the auth data that user provides to authenticate themselves to the
specified native application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |
| payload | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | The key value pairs of auth data. |

<a name="Cobalt+authCustom"></a>

### cobalt.authCustom(applicationId, payload) ⇒ <code>Promise.&lt;unknown&gt;</code>
Save the auth data that user provides to authenticate themselves to the
specified custom application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID of the custom application. |
| payload | <code>Object.&lt;string, (string\|number\|boolean)&gt;</code> | The key value pairs of auth data. |

<a name="Cobalt+checkAuth"></a>

### cobalt.checkAuth(application) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Returns the auth status of the user for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - The auth status of the user.  

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |

<a name="Cobalt+removeAuth"></a>

### cobalt.removeAuth(application, [applicationId]) ⇒ <code>Promise.&lt;void&gt;</code>
Unauthorize the specified application and remove any associated data from Cobalt.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application type. |
| [applicationId] | <code>String</code> | The application ID in case of custom applications. |

<a name="Cobalt+config"></a>

### cobalt.config(applicationId, configId, fields) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
Returns the specified saved config, or creates one if it doesn't exist.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig) - The specified saved config.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| configId | <code>String</code> | The config ID of the saved config. |
| fields | [<code>DynamicFields</code>](#DynamicFields) | The dynamic fields payload. |

<a name="Cobalt+getConfig"></a>

### cobalt.getConfig(application) ⇒ [<code>Promise.&lt;Config&gt;</code>](#Config)
Returns the configuration data for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: [<code>Promise.&lt;Config&gt;</code>](#Config) - The specified application's configuration data.  

| Param | Type | Description |
| --- | --- | --- |
| application | <code>String</code> | The application ID. |

<a name="Cobalt+saveConfig"></a>

### cobalt.saveConfig(applicationId, payload) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
Save the specified config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig) - The specified saved config.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| payload | [<code>SavedConfig</code>](#SavedConfig) | The config payload. |

<a name="Cobalt+getSavedConfig"></a>

### cobalt.getSavedConfig(applicationId, configId) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
Returns the specified saved config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig) - The specified saved config.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| configId | <code>String</code> | The config ID of the saved config. |

<a name="Cobalt+updateSavedConfig"></a>

### cobalt.updateSavedConfig(applicationId, configId, payload) ⇒ [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig)
Update the specified saved config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: [<code>Promise.&lt;SavedConfig&gt;</code>](#SavedConfig) - The specified saved config.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| configId | <code>String</code> | The config ID of the saved config. |
| payload | [<code>SavedConfig</code>](#SavedConfig) | The update payload. |

<a name="Cobalt+deleteSavedConfig"></a>

### cobalt.deleteSavedConfig(applicationId, configId) ⇒ <code>Promise.&lt;unknown&gt;</code>
Delete the specified saved config.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The application ID. |
| configId | <code>String</code> | The config ID of the saved config. |

<a name="Config"></a>

## Config : <code>object</code>
The configuration data for an application.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application_data_slots | <code>Array.&lt;DataSlot&gt;</code> | Array of application data slots. |
| workflows | [<code>Array.&lt;Workflow&gt;</code>](#Workflow) | Array of workflows. |

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

<a name="SavedConfig"></a>

## SavedConfig : <code>Object</code>
An saved config.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [config_id] | <code>String</code> | Unique ID for the saved config. |
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


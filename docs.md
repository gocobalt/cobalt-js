## Classes

<dl>
<dt><a href="#Cobalt">Cobalt</a></dt>
<dd><p>Cobalt Frontend SDK</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Field">Field</a> : <code>object</code></dt>
<dd><p>The Node Field object available for configuration.</p>
</dd>
<dt><a href="#Node">Node</a> : <code>object</code></dt>
<dd><p>The Node object available for configuration.</p>
</dd>
<dt><a href="#Workflow">Workflow</a> : <code>object</code></dt>
<dd><p>The installed workflow.</p>
</dd>
<dt><a href="#AppAuthStatus">AppAuthStatus</a> : <code>object</code></dt>
<dd><p>The auth status of the user for an application.</p>
</dd>
</dl>

<a name="Cobalt"></a>

## Cobalt
Cobalt Frontend SDK

**Kind**: global class  

* [Cobalt](#Cobalt)
    * [new Cobalt(options)](#new_Cobalt_new)
    * [.token](#Cobalt+token) ⇒ <code>string</code>
    * [.token](#Cobalt+token) ⇒ <code>string</code>
    * [.baseUrl](#Cobalt+baseUrl) ⇒ <code>string</code>
    * [.installTemplate()](#Cobalt+installTemplate) ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
    * [.getAppAuthStatus()](#Cobalt+getAppAuthStatus) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getAppAuthUrl()](#Cobalt+getAppAuthUrl) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.oauth()](#Cobalt+oauth) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setAppAuthData()](#Cobalt+setAppAuthData) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeAppAuth()](#Cobalt+removeAppAuth) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getNodeConfiguration()](#Cobalt+getNodeConfiguration) ⇒ <code>Promise.&lt;Array.&lt;Field&gt;&gt;</code>
    * [.saveNode()](#Cobalt+saveNode) ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
    * [.getWorkflowConfiguration()](#Cobalt+getWorkflowConfiguration) ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
    * [.activateWorkflow()](#Cobalt+activateWorkflow) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.activateWorkflows()](#Cobalt+activateWorkflows) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.toggleWorkflowStatus()](#Cobalt+toggleWorkflowStatus) ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
    * [.deleteWorkflow()](#Cobalt+deleteWorkflow) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Cobalt_new"></a>

### new Cobalt(options)
Cobalt Frontend SDK


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options to configure the Cobalt SDK. |
| [options.token] | <code>string</code> |  | The session token. |
| [options.baseUrl] | <code>string</code> | <code>&quot;https://api.gocobalt.io&quot;</code> | The base URL of your Cobalt API. |

<a name="Cobalt+token"></a>

### cobalt.token ⇒ <code>string</code>
**Kind**: instance property of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>string</code> - The session token.  
<a name="Cobalt+token"></a>

### cobalt.token ⇒ <code>string</code>
**Kind**: instance property of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>string</code> - The session token.  
<a name="Cobalt+baseUrl"></a>

### cobalt.baseUrl ⇒ <code>string</code>
**Kind**: instance property of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>string</code> - The base URL of cobalt API.  
<a name="Cobalt+installTemplate"></a>

### cobalt.installTemplate() ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
Install the given template.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| templateId | <code>string</code> | The ID of the template you want to install. |
| udf | <code>object</code> | Custom key value pairs you want to store with the installed worklfow. |

<a name="Cobalt+getAppAuthStatus"></a>

### cobalt.getAppAuthStatus() ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns the auth status of the user for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The auth status of the user.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application type. |

<a name="Cobalt+getAppAuthUrl"></a>

### cobalt.getAppAuthUrl() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the auth URL that users can use to authenticate themselves to the
specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The auth URL where users can authenticate themselves.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application type. |

<a name="Cobalt+oauth"></a>

### cobalt.oauth() ⇒ <code>Promise.&lt;boolean&gt;</code>
Handle OAuth for the specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Whether the user authenticated.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application type. |

<a name="Cobalt+setAppAuthData"></a>

### cobalt.setAppAuthData() ⇒ <code>Promise.&lt;void&gt;</code>
Save the auth data that user provides to authenticate themselves to the
specified application.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application type. |
| payload | <code>object</code> | The key value pairs of auth data. |
| appId | <code>object</code> | The application ID in case of custom applications. |

<a name="Cobalt+removeAppAuth"></a>

### cobalt.removeAppAuth() ⇒ <code>Promise.&lt;void&gt;</code>
Unauthorize the specified application and remove any associated data from Cobalt.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| application | <code>string</code> | The application type. |
| appId | <code>string</code> | The application ID in case of custom applications. |

<a name="Cobalt+getNodeConfiguration"></a>

### cobalt.getNodeConfiguration() ⇒ <code>Promise.&lt;Array.&lt;Field&gt;&gt;</code>
Returns the node configuration data for dynamic fields.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow. |
| nodeId | <code>string</code> | The ID of the node. |
| fieldName | <code>string</code> | The field name for which config data is required. |
| selectedValues | <code>object</code> | The input data already selected for the node. |

<a name="Cobalt+saveNode"></a>

### cobalt.saveNode() ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
Save the input data for the specified node.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow. |
| nodeId | <code>string</code> | The ID of the node. |
| inputData | <code>object</code> | The input data for the node. |

<a name="Cobalt+getWorkflowConfiguration"></a>

### cobalt.getWorkflowConfiguration() ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
Returns the workflow configuration data.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow. |

<a name="Cobalt+activateWorkflow"></a>

### cobalt.activateWorkflow() ⇒ <code>Promise.&lt;void&gt;</code>
Activate the given installed workflow.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow you want to activate. |

<a name="Cobalt+activateWorkflows"></a>

### cobalt.activateWorkflows() ⇒ <code>Promise.&lt;void&gt;</code>
Activate the given installed workflows.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowIds | <code>string</code> | The list of IDs of the workflows you want to activate. |

<a name="Cobalt+toggleWorkflowStatus"></a>

### cobalt.toggleWorkflowStatus() ⇒ [<code>Promise.&lt;Workflow&gt;</code>](#Workflow)
Toggle the status of the specified workflow.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow. |

<a name="Cobalt+deleteWorkflow"></a>

### cobalt.deleteWorkflow() ⇒ <code>Promise.&lt;unknown&gt;</code>
Delete the specified workflow.

**Kind**: instance method of [<code>Cobalt</code>](#Cobalt)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | The ID of the workflow. |

<a name="Field"></a>

## Field : <code>object</code>
The Node Field object available for configuration.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name. |
| type | <code>string</code> | The input type of the field. |
| placeholder | <code>string</code> | The placeholder text for the field. |
| required | <code>boolean</code> | Whether the field is required. |

<a name="Node"></a>

## Node : <code>object</code>
The Node object available for configuration.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| node_id | <code>string</code> | The ID of the installed workflow. |
| node_name | <code>string</code> | The Name of the installed workflow. |
| fields | [<code>Array.&lt;Field&gt;</code>](#Field) | The applications integrated in the workflow. |

<a name="Workflow"></a>

## Workflow : <code>object</code>
The installed workflow.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| workflow_id | <code>string</code> | The ID of the installed workflow. |
| applications | <code>Array.&lt;unknown&gt;</code> | The applications integrated in the workflow. |
| configure | [<code>Array.&lt;Node&gt;</code>](#Node) | The configuration data for the workflow. |

<a name="AppAuthStatus"></a>

## AppAuthStatus : <code>object</code>
The auth status of the user for an application.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>boolean</code> | Whether the user has authenticated with this application. |


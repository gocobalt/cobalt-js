/**
 * Cobalt Frontend SDK
 */
/** An application in Cobalt. */
export interface Application {
    /**The application name. */
    name: string;
    /**The application description. */
    description: string;
    /**The application icon. */
    icon: string;
    /**The application slug for native apps. */
    type: string;
    /** The application slug for custom apps. */
    slug?: string;
    /**The type of auth used by application. */
    auth_type: "oauth2" | "keybased";
    /** Whether the user has connected the application. */
    connected?: boolean;
    /** Whether the connection has expired and re-auth is required. */
    reauth_required?: boolean;
    /** The fields required from the user to connect the application (for `keybased` auth type). */
    auth_input_map?: InputField[];
}
/** An Input field to take input from the user. */
export interface InputField {
    /** Key name of the field. */
    name: string;
    /** Input type of the field. */
    type: string;
    /** Whether the field is required. */
    required: string;
    /** The placeholder of the field. */
    placeholder: string;
    /** The label of the field. */
    label: string;
}
/** The payload object for config. */
export interface ConfigPayload {
    /** The application slug. */
    slug: string;
    /**  Unique ID for the config. */
    config_id?: string;
    /** The dynamic label mappings. */
    labels: Label[];
}
/** Label Mapping */
export interface Label {
    /** The label name. */
    name: string;
    /** The label value. */
    value: string | number | boolean;
}
/** The configuration data for an application. */
export interface UpdateConfigPayload {
    /** The application slug */
    slug: string;
    /** Unique ID for the config. */
    config_id?: string;
    /** A map of application fields and their values. */
    fields: Record<string, string | number | boolean>;
    /** The config workflows data. */
    workflows: WorkflowPayload[];
}
/** The workflow. */
export interface WorkflowPayload {
    /** The ID of the workflow. */
    id: string;
    /** Whether the workflow is enabled. */
    enabled: boolean;
    /** A map of workflow field names and their values. */
    fields: Record<string, string | number | boolean>;
}
export interface CobaltOptions {
    /** The base URL of the Cobalt API. You don't need to set this. */
    baseUrl?: string;
    /** The session token. */
    token?: string;
}
export interface EcosystemLead {
    _id: string;
    name?: string;
    email: string;
    description?: string;
    created_at: string;
}
export interface EcosystemLeadPayload {
    slug: string;
    name?: string;
    email: string;
    description?: string;
}
type Config = any;
type RuleOptions = {
    rule_column: {
        rhs: {
            name: string;
            type: string;
            options: any;
        };
        operator: {
            name: string;
            type: string;
            options: any;
        };
    };
    conditional_code_stdout?: string[];
    error?: {
        message?: string;
        stack?: string;
    };
};
declare class Cobalt {
    private baseUrl;
    token: string;
    /**
     * Cobalt Frontend SDK
     * @param {Object} options The options to configure the Cobalt SDK.
     * @param {String} [options.token] The session token.
     * @param {String} [options.baseUrl=https://api.gocobalt.io] The base URL of the Cobalt API.
     */
    constructor(options?: CobaltOptions);
    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    getAccountDetails(): Promise<unknown>;
    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    updateAccount(payload: Record<string, unknown>): Promise<unknown>;
    /**
     * Returns the list of enabled applications and their details.
     * @returns {Promise<Application[]>} The list of applications.
     */
    getApp(): Promise<Application[]>;
    /**
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<Application>} The application details.
     */
    getApp(slug: string): Promise<Application>;
    /**
     * Returns all the enabled and ecosystem apps.
     * @returns {Promise<Application[]>} The list of applications.
     */
    getApps(): Promise<Application[]>;
    /**
     * Returns the auth URL that users can use to authenticate themselves to the
     * specified application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<String>} The auth URL where users can authenticate themselves.
     */
    private getOAuthUrl;
    /**
     * Handle OAuth for the specified native application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the user authenticated.
     */
    private oauth;
    /**
     * Connect the specified application, optionally with the auth data that user provides.
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [payload] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the connection was successful.
     */
    connect(slug: string, payload?: Record<string, string>): Promise<boolean>;
    /**
     * Disconnect the specified application and remove any associated data from Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<void>}
     */
    disconnect(slug: string): Promise<void>;
    /**
     * Returns the specified config, or creates one if it doesn't exist.
     * @param {ConfigPayload} payload The payload object for config.
     * @returns {Promise<Config>} The specified config.
     */
    config(payload: ConfigPayload): Promise<Config>;
    /**
     * Returns the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<Config>} The specified config.
     */
    getConfig(slug: string, configId: string): Promise<Config>;
    /**
     * Update the specified config.
     * @param {UpdateConfigPayload} payload The update payload.
     * @returns {Promise<Config>} The specified config.
     */
    updateConfig(payload: UpdateConfigPayload): Promise<Config>;
    /**
     * Delete the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<unknown>}
     */
    deleteConfig(slug: string, configId: string): Promise<unknown>;
    /**
     * Create a lead for an ecosystem app.
     * @param {EcosystemLeadPayload} payload The payload object for the lead.
     * @returns {Promise<EcosystemLead>}
     */
    createEcosystemLead(payload: EcosystemLeadPayload): Promise<EcosystemLead>;
    /**
     * Returns the specified field of the config.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The specified config field.
     */
    getConfigField(slug: string, fieldId: string, workflowId?: string): Promise<Config>;
    /**
     * Update the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String | Number | Boolean | null} value The new value for the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The updated config field.
     */
    updateConfigField(slug: string, fieldId: string, value: string | number | boolean | null, workflowId?: string): Promise<Config>;
    /**
     * Delete the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<unknown>}
     */
    deleteConfigField(slug: string, fieldId: string, workflowId?: string): Promise<unknown>;
    /**
     * Returns the options for the specified field.
     * @param {String} label The selected value of the label field.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow, if this is a workflow field.
     * @returns {Promise<RuleOptions>} The specified rule field's options.
     */
    getFieldOptions(label: string, slug: string, fieldId: string, workflowId?: string): Promise<RuleOptions>;
}
export { Cobalt };

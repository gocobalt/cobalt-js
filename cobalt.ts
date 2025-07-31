/**
 * Cobalt Frontend SDK
 */

export enum AuthType {
    OAuth2 = "oauth2",
    KeyBased = "keybased",
}

export enum AuthStatus {
    Active = "active",
    Expired = "expired",
}

/** An application in Cobalt. */
export interface Application {
    /** Application ID */
    app_id: string;
    /**The application name. */
    name: string;
    /**The application description. */
    description: string;
    /**The application icon. */
    icon: string;
    /**
     * @deprecated Use `slug` instead.
     * The application slug for native apps and `custom` for custom apps.
     */
    type: string | "custom";
    /** The application slug. */
    slug: string;
    /** The categories/tags for the application. */
    tags?: string[];
    /** The supported auth types for the application, and the fields required from the user to connect the application. */
    auth_type_options?: {
        /** The fields required from the user to connect the application. */
        [key in AuthType]: InputField[];
    };
    /** The list of connected accounts for this application */
    connected_accounts?: {
        /** The identifier (username, email, etc.) of the connected account. */
        identifier: unknown;
        /** The auth type used to connect the account. */
        auth_type: AuthType;
        /** The timestamp at which the account was connected. */
        connectedAt: string;
        /** The current status of the connection. */
        status?: AuthStatus;
    }[];
    /**
     * The type of auth used by application.
     * @deprecated Check `auth_type_options` and `connected_accounts` for multiple auth types support.
     */
    auth_type: "oauth2" | "keybased";
    /**
     * Whether the user has connected the application.
     * @deprecated Check `connected_accounts` for multiple auth types support.
     */
    connected?: boolean;
    /**
     * Whether the connection has expired and re-auth is required.
     * @deprecated Check `connected_accounts` for multiple auth types support.
     */
    reauth_required?: boolean;
    /**
     * The fields required from the user to connect the application (for `keybased` auth type).
     * @deprecated Check `auth_type_options` for multiple auth types support.
     */
    auth_input_map?: InputField[];
}

/** An Input field to take input from the user. */
export interface InputField  {
    /** Key name of the field. */
    name: string;
    /** Input type of the field. */
    type: string;
    /** Whether the field is required. */
    required: boolean;
    /** Whether the field accepts multiple values. */
    multiple?: boolean;
    /** The placeholder of the field. */
    placeholder: string;
    /** The label of the field. */
    label: string;
    /** The help text for the field. */
    help_text?: string;
    /** The options for the field. */
    options?: {
        name?: string;
        value: string;
    }[];
}

/** The payload object for config. */
export interface ConfigPayload {
    /** The application slug. */
    slug: string;
    /**  Unique ID for the config. */
    config_id?: string;
    /** The dynamic label mappings. */
    labels?: Label[];
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
export interface WorkflowPayload  {
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

/**
 * @deprecated
 */
export interface EcosystemLead {
    _id: string;
    name?: string;
    email: string;
    description?: string;
    created_at: string;
}

/**
 * @deprecated
 */
export interface EcosystemLeadPayload {
    slug: string;
    name?: string;
    email: string;
    description?: string;
}

export interface RuleOptions {
    rule_column: {
        rhs: {
            name: string,
            type: "text" | "select",
            options?: Label[],
        },
        operator: {
            name: string,
            type: "select",
            options: Label[],
        },
    },
    conditional_code_stdout?: string[],
    error?: {
        message?: string,
        stack?: string
    }
}

/** A public workflow in Cobalt. */
export interface PublicWorkflow {
    /**The workflow ID. */
    _id: string;
    /**The workflow name. */
    name: string;
    /**The workflow description. */
    description?: string;
    /**The application's slug in which this workflow exists. */
    slug?: string;
    /**The workflow created at. */
    createdAt: string;
    /**The workflow updated at. */
    updatedAt: string;
    /**Whether the workflow is published. */
    published: boolean;
}

/** The payload for creating a public workflow for the linked account. */
export interface PublicWorkflowPayload {
    /**The workflow name. */
    name: string;
    /**The workflow description. */
    description?: string;
    /** The application slug in which this workflow should be created. */
    slug?: string;
}

export interface PublicWorkflowsPayload extends PaginationProps {
    slug?: string;
}

interface PaginationProps {
    page?: number;
    limit?: number;
}

interface PaginatedResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
}

export interface Config {
    slug: string;
    config_id?: string;
    fields?: ConfigField[];
    workflows?: ConfigWorkflow[];
    field_errors?: {
        id: string;
        name: string;
        error: {
            message: string;
            error?: unknown;
        };
    }[];
}

export interface ConfigField {
    id: string;
    name: string;
    field_type: "text" | "date" | "number" | "url" | "email" | "textarea" | "select" | "json" | "map" | "map_v2" | "rule_engine" | string;
    options?: {
        name?: string;
        value: string;
    }[];
    parent?: string;
    labels?: {
        name?: string;
        value: string;
    }[];
    multiple?: boolean;
    required?: boolean;
    hidden?: boolean;
    value?: any;
    /** The placeholder for the field. */
    placeholder?: string;
    /** The help text for the field. */
    help_text?: string;
    /** The page this field is associated with. */
    associated_page?: string;
}

export interface ConfigWorkflow {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
    fields?: ConfigField[];
}

export interface Execution {
    _id: string;
    id?: string;
    name: string;
    org_id: string;
    associated_application: {
        _id: string;
        name: string;
        icon?: string;
    };
    status: "COMPLETED" | "RUNNING" | "ERRORED" | "STOPPED" | "STOPPING" | "TIMED_OUT";
    associated_workflow: {
        _id: string;
        name: string;
    };
    associated_trigger_application: {
        _id: string;
        name: string;
        icon?: string;
        app_type?: "custom" | string;
        origin_trigger: {
            _id: string;
            name: string;
        }
    };
    trigger_application_event?: string;
    linked_account_id: string;
    environment: "test" | "production";
    config_id: string;
    associated_event_id: string;
    custom_trigger_id?: string;
    custom_application_id?: string;
    completion_percentage?: number;
    nodes?: {
        node_id: string;
        node_name: string;
        node_type: string;
        node_status: "Success" | "Ready" | "Errored" | "Waiting" | "Stopped" | "Rejected"| "Errored_and_Skipped" | "Timed_Out";
        is_batch?: boolean;
        attempts_made: number;
        maximum_attempts: number;
        input_data: unknown;
        latest_output: unknown;
    }[];
    createdAt: string;
}

type Field = any;

class Cobalt {
    private baseUrl: string;
    public token: string;

    /**
     * Cobalt Frontend SDK
     * @param {Object} options The options to configure the Cobalt SDK.
     * @param {String} [options.token] The session token.
     * @param {String} [options.baseUrl=https://api.gocobalt.io] The base URL of the Cobalt API.
     */
    constructor(options: CobaltOptions = {}) {
        this.baseUrl = options.baseUrl
            ?   /^https?:\/\//.test(options.baseUrl)
                ?   options.baseUrl
                :   "https://" + options.baseUrl
            :   "https://api.gocobalt.io";
        this.token = options.token || "";
    }

    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    public async getAccountDetails(): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v3/org/basics`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data;
    }

    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    public async updateAccount(payload: Record<string, unknown>): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/linked-account`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                ...payload,
            }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data;
    }

    /**
     * Returns the list of enabled applications and their details.
     * @returns {Promise<Application[]>} The list of applications.
     */
    public async getApp(): Promise<Application[]>;
    /**
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<Application>} The application details.
     */
    public async getApp(slug: string): Promise<Application>;
    /**
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt. If no application is specified,
     * it returns all the enabled applications.
     * @param {String} [slug] The application slug.
     * @returns {Promise<Application | Application[]>} The application details.
     */
    public async getApp(slug?: string): Promise<Application | Application[]> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/application${slug ? `/${slug}` : ""}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data;
    }

    /**
     * Returns all the enabled apps.
     * @returns {Promise<Application[]>} The list of applications.
     */
    public async getApps(): Promise<Application[]> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/application`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data;
    }

    /**
     * Returns the auth URL that users can use to authenticate themselves to the
     * specified application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<String>} The auth URL where users can authenticate themselves.
     */
    private async getOAuthUrl(slug: string, params?: Record<string, string>): Promise<string> {
        const res = await fetch(`${this.baseUrl}/api/v1/${slug}/integrate?${new URLSearchParams(params).toString()}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data.auth_url;
    }

    /**
     * Handle OAuth for the specified application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the user authenticated.
     */
    private async oauth(slug: string, params?: Record<string, string>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getOAuthUrl(slug, params)
            .then(oauthUrl => {
                const connectWindow = window.open(oauthUrl);

                // keep checking connection status
                const interval = setInterval(() => {
                    this.getApp(slug)
                    .then(app => {
                        if (app && app.connected_accounts?.filter(a => a.auth_type === AuthType.OAuth2).some(a => a.status === AuthStatus.Active)) {
                            // close auth window
                            connectWindow && connectWindow.close();
                            // clear interval
                            clearInterval(interval);
                            // resovle status
                            resolve(true);
                        } else {
                            // user closed oauth window without authenticating
                            if (connectWindow && connectWindow.closed) {
                                // clear interval
                                clearInterval(interval);
                                // resolve status
                                resolve(false);
                            }
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        // connectWindow?.close();
                        clearInterval(interval);
                        reject(e);
                    });
                }, 3e3);
            })
            .catch(reject);
        });
    }

    /**
     * Save auth data for the specified keybased application.
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [payload] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the auth data was saved successfully.
     */
    private async keybased(slug: string, payload?: Record<string, string>): Promise<boolean> {
        const res = await fetch(`${this.baseUrl}/api/v2/app/${slug}/save`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                ...payload,
            }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data.success;
    }

    /**
     * Connect the specified application, optionally with the auth data that user provides.
     * @param {String} slug The application slug.
     * @param {AuthType} authType The auth type to use.
     * @param {Object.<string, string>} [payload] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the connection was successful.
     */
    public async connect(slug: string, authType: AuthType, payload?: Record<string, string>): Promise<boolean> {
        switch (authType) {
            case AuthType.OAuth2:
                return this.oauth(slug, payload);
            case AuthType.KeyBased:
                return this.keybased(slug, payload);
            default:
                throw new Error(`Invalid auth type: ${authType}`);
        }
    }

    /**
     * Disconnect the specified application and remove any associated data from Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<unknown>}
     */
    public async disconnect(slug: string): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/integration/${slug}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the specified config, or creates one if it doesn't exist.
     * @param {ConfigPayload} payload The payload object for config.
     * @returns {Promise<Config>} The specified config.
     */
    public async config(payload: ConfigPayload): Promise<Config> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/config`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                ...payload,
                labels: payload.labels || [],
            }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the configs created for the specified application.
     * @param {String} slug The application slug.
     * @returns {Promise<{ config_id: string; }[]>} The configs created for the specified application.
     */
    async getConfigs(slug: string): Promise<{ config_id: string; }[]> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/slug/${slug}/configs`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<Config>} The specified config.
     */
    async getConfig(slug: string, configId: string): Promise<Config> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/slug/${slug}/config${configId ? `/${configId}` : ""}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Update the specified config.
     * @param {UpdateConfigPayload} payload The update payload.
     * @returns {Promise<Config>} The specified config.
     */
    async updateConfig(payload: UpdateConfigPayload): Promise<Config> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/config`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Delete the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<unknown>}
     */
    async deleteConfig(slug: string, configId?: string): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/slug/${slug}/config${configId ? `/${configId}` : ""}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * @deprecated
     * Create a lead for an ecosystem app.
     * @param {EcosystemLeadPayload} payload The payload object for the lead.
     * @returns {Promise<EcosystemLead>}
     */
    public async createEcosystemLead(payload: EcosystemLeadPayload): Promise<EcosystemLead> {
        const res = await fetch(`${this.baseUrl}/api/v1/ecosystem/leads`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the specified field of the config.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The specified config field.
     */
    async getConfigField(slug: string, fieldId: string, workflowId?: string): Promise<Config> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
                slug,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Update the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String | Number | Boolean | null} value The new value for the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The updated config field.
     */
    async updateConfigField(slug: string, fieldId: string, value: string | number | boolean | null, workflowId?: string): Promise<Config> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
                slug,
            },
            body: JSON.stringify({ value }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Delete the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<unknown>}
     */
    async deleteConfigField(slug: string, fieldId: string, workflowId?: string): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
                slug,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the options for the specified field.
     * @param {String} lhs The selected value of the lhs field.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow, if this is a workflow field.
     * @returns {Promise<RuleOptions>} The specified rule field's options.
     */
    async getFieldOptions(lhs: string, slug: string, fieldId: string, workflowId?: string): Promise<RuleOptions> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/config/rule-engine/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
                slug,
            },
            body: JSON.stringify({
                rule_column: { lhs },
            }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the private workflows for the specified application.
     * @param {Object} params
     * @param {String} [params.slug]
     * @param {Number} [params.page]
     * @param {Number} [params.limit]
     * @returns
     */
    async getWorkflows(params?: PublicWorkflowsPayload): Promise<PaginatedResponse<PublicWorkflow>> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/workflow?page=${params?.page || 1}&limit=${params?.limit || 100}${params?.slug ? `&slug=${params.slug}` : ""}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Create a public workflow for the linked account.
     * @param {Object} params
     * @param {String} params.name The workflow name.
     * @param {String} [params.description] The workflow description.
     * @param {String} [params.slug] The application slug in which this workflow should be created.
     * If slug isn't set, the workflow will be created in the organization's default application.
     * @returns {Promise<PublicWorkflow>} The created public workflow.
     */
    async createWorkflow(params: PublicWorkflowPayload): Promise<PublicWorkflow> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/workflow`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: params.name,
                description: params.description,
                slug: params.slug,
            }),
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data?.workflow ?? data;
    }

    /**
     * Delete the specified public workflow.
     * @param {String} workflowId The workflow ID.
     * @returns {Promise<unknown>}
     */
    async deleteWorkflow(workflowId: string): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/workflow/${workflowId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the workflow execution logs for the linked account.
     * @param {Object} [params]
     * @param {Number} [params.page]
     * @param {Number} [params.limit]
     * @returns {Promise<PaginatedResponse<Execution>>} The paginated workflow execution logs.
     */
    async getExecutions({ page = 1, limit = 10 }: PaginationProps = {}): Promise<PaginatedResponse<Execution>> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/execution?page=${page}&limit=${limit}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }

    /**
     * Returns the specified workflow execution log.
     * @param {String} executionId The execution ID.
     * @returns {Promise<Execution>} The specified execution log.
     */
    async getExecution(executionId: string): Promise<Execution> {
        const res = await fetch(`${this.baseUrl}/api/v2/public/execution/${executionId}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            const error = await res.json();
            throw error;
        }

        return await res.json();
    }
}

export { Cobalt };

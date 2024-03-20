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
export interface InputField  {
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
        this.baseUrl = options.baseUrl || "https://api.gocobalt.io";
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
            throw new Error(res.statusText);
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
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data;
    }

    /**
     * Returns all the enabled and ecosystem apps.
     * @returns {Promise<Application[]>} The list of applications.
     */
    public async getApps(): Promise<Application[]> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/application?ecosystem=true`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
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
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data.auth_url;
    }

    /**
     * Handle OAuth for the specified native application.
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
                        if (app && app.connected === true && !app.reauth_required) {
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
                        clearInterval(interval);
                        reject(e);
                    });
                }, 3e3);
            })
            .catch(reject);
        });
    }

    /**
     * Connect the specified application, optionally with the auth data that user provides.
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [payload] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the connection was successful.
     */
    public async connect(slug: string, payload?: Record<string, string>): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const app = await this.getApp(slug);

                // oauth
                if (app && app.auth_type === "oauth2") {
                    const connected = await this.oauth(slug, payload);
                    resolve(connected);
                // key based
                } else {
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
                        reject(new Error(res.statusText));
                    }

                    const data = await res.json();
                    resolve(data.success);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Disconnect the specified application and remove any associated data from Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<void>}
     */
    public async disconnect(slug: string): Promise<void> {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/integration/${slug}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
        }
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
            body: JSON.stringify(payload),
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
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
            throw new Error(res.statusText);
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
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    /**
     * Delete the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<unknown>}
     */
    async deleteConfig(slug: string, configId: string): Promise<unknown> {
        const res = await fetch(`${this.baseUrl}/api/v2/f-sdk/slug/${slug}/config${configId ? `/${configId}` : ""}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    /**
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
            throw new Error(res.statusText);
        }

        return await res.json();
    }
}

export { Cobalt };

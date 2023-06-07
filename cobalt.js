/**
 * Cobalt Frontend SDK
 */

/**
 * @typedef {Object} Application An application in Cobalt.
 * @property {String} name The application name.
 * @property {String} description The application description.
 * @property {String} icon The application icon.
 * @property {String} type The application slug for native apps.
 * @property {String} [slug] The application slug for custom apps.
 * @property {"oauth2"|"keybased"} auth_type The type of auth used by application.
 * @property {Boolean} [connected] Whether the user has connected the application.
 * @property {InputField[]} [auth_input_map] The fields required from the user to connect the application (for `keybased` auth type).
 */

/**
 * @typedef {Object} InputField An Input field to take input from the user.
 * @property {String} name Key name of the field.
 * @property {String} type Input type of the field.
 * @property {String} required Whether the field is required.
 * @property {String} placeholder The placeholder of the field.
 * @property {String} label The label of the field.
 */

/**
 * @typedef {Object} Config The configuration data for an application.
 * @property {String} [config_id] Unique ID for the config.
 * @property {Object.<string, string | number | boolean>} application_data_slots A map of application data slots and their values.
 * @property {Workflow[]} workflows Whether the workflow is enabled.
 */

/**
 * @typedef {Object} Workflow The workflow.
 * @property {String} id The ID of the workflow.
 * @property {Boolean} enabled Whether the workflow is enabled.
 * @property {Object.<string, string | number | boolean>} data_slots A map of workflow's data slots and their values.
 */

/**
 * @typedef {Object} ConfigPayload The payload object for config.
 * @property {String} [config_id] Unique ID for the config.
 * @property {Object.<string, DynamicField>} map_fields_object Map fields object.
 */

/**
 * @typedef {Object} DynamicField Field Mapping Label
 * @property {Label[]} fields The Label name.
 */

/**
 * @typedef {Object} Label Field Mapping Label
 * @property {string} name The Label name.
 * @property {string | number | boolean} value The Label value.
 */

class Cobalt {
    /**
     * Cobalt Frontend SDK
     * @param {Object} options The options to configure the Cobalt SDK.
     * @param {String} [options.token] The session token.
     * @param {String} [options.baseUrl=https://api.gocobalt.io] The base URL of the Cobalt API.
     */
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || "https://api.gocobalt.io";
        this.token = options.token;
    }

    get token() {
        return this.sessionToken;
    };

    set token(token) {
        return this.sessionToken = typeof token === "string" ? token : "";
    };

    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    async getAccountDetails() {
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
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt. If no application is specified,
     * it returns all the enabled applications.
     * @param {String} [slug="*"] The application slug.
     * @returns {Promise<Application>} The application details.
     */
    async getApp(slug = "*") {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/application` + (slug ? `/${slug}` : ""), {
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
     * @returns {Promise<String>} The auth URL where users can authenticate themselves.
     */
    async getOAuthUrl(slug) {
        const res = await fetch(`${this.baseUrl}/api/v1/${slug}/integrate`, {
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
     * @returns {Promise<Boolean>} Whether the user authenticated.
     */
    async oauth(slug) {
        return new Promise((resolve, reject) => {
            this.getOAuthUrl(slug)
            .then(oauthUrl => {
                const connectWindow = window.open(oauthUrl);

                // keep checking connection status
                const interval = setInterval(() => {
                    this.getApp(slug)
                    .then(app => {
                        if (app && app.connected === true) {
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
     * @param {Object.<string, string | number | boolean>} [payload={}] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the connection was successful.
     */
    async connect(slug, payload) {
        if (payload) {
            // save auth
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
                throw new Error(res.statusText);
            }

            const data = await res.json();
            return data.success;
        } else {
            // oauth
            return this.oauth(slug);
        }
    }

    /**
     * Disconnect the specified application and remove any associated data from Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<void>}
     */
    async disconnect(slug) {
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
     * @param {String} slug The application slug.
     * @param {ConfigPayload} [payload] The payload object for config.
     * @returns {Promise<Config>} The specified config.
     */
    async config(slug, payload) {
        const res = await fetch(`${this.baseUrl}/api/v2/application/${slug}/installation`, {
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
    async getConfig(slug, configId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${slug}/installation/${configId ? configId : ""}`, {
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
     * @param {String} slug The application slug.
     * @param {Config} payload The update payload.
     * @returns {Promise<Config>} The specified config.
     */
    async updateConfig(slug, payload = {}) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${slug}/installation`, {
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
    async deleteConfig(slug, configId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${slug}/installation/${configId ? configId : ""}`, {
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
}

module.exports = Cobalt;

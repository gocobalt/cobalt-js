/**
 * Cobalt Frontend SDK
 * @property {String} token The session token.
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
     * Returns the auth URL that users can use to authenticate themselves to the
     * specified application.
     * @private
     * @param {String} application The application type.
     * @returns {Promise<String>} The auth URL where users can authenticate themselves.
     */
    async getOAuthUrl(application) {
        const res = await fetch(`${this.baseUrl}/api/v1/${application}/integrate`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data?.auth_url;
    }

    /**
     * Handle OAuth for the specified native application.
     * @param {String} application The application type.
     * @returns {Promise<Boolean>} Whether the user authenticated.
     */
    async oauth(application) {
        return new Promise((resolve, reject) => {
            this.getOAuthUrl(application)
            .then(oauthUrl => {
                const connectWindow = window.open(oauthUrl);

                // keep checking connection status
                const interval = setInterval(() => {
                    this.checkAuth(application)
                    .then(connected => {
                        if (connected === true) {
                            // close auth window
                            connectWindow?.close();
                            // clear interval
                            clearInterval(interval);
                            // resovle status
                            resolve(true);
                        } else {
                            // user closed oauth window without authenticating
                            if (connectWindow?.closed) {
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
     * Save the auth data that user provides to authenticate themselves to the
     * specified native application.
     * @param {String} application The application type.
     * @param {Object.<string, string | number | boolean>} payload The key value pairs of auth data.
     * @returns {Promise<unknown>}
     */
    async auth(application, payload) {
        const res = await fetch(`${this.baseUrl}/api/v1/${application}/save`, {
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
        return data;
    }

    /**
     * Save the auth data that user provides to authenticate themselves to the
     * specified custom application.
     * @param {String} applicationId The application ID of the custom application.
     * @param {Object.<string, string | number | boolean>} payload The key value pairs of auth data.
     * @returns {Promise<unknown>}
     */
    async authCustom(applicationId, payload) {
        const res = await fetch(`${this.baseUrl}/api/v1/custom/${applicationId}/save`, {
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
        return data;
    }

    /**
     * Returns the auth status of the user for the specified application.
     * @param {String} application The application type.
     * @returns {Promise<Boolean>} The auth status of the user.
     */
    async checkAuth(application) {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/integration/auth?integration_type=${application}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return !!data?.status;
    }

    /**
     * Unauthorize the specified application and remove any associated data from Cobalt.
     * @param {String} application The application type.
     * @param {String} [applicationId] The application ID in case of custom applications.
     * @returns {Promise<void>}
     */
    async removeAuth(application, applicationId) {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/integration/${application}?app_id=${applicationId}`, {
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
     * @typedef {object} Config The configuration data for an application.
     * @property {DataSlot[]} application_data_slots Array of application data slots.
     * @property {Workflow[]} workflows Array of workflows.
     */

    /**
     * @typedef {Object} Label Field Mapping Label
     * @property {string} name The Label name.
     * @property {string | number | boolean} value The Label value.
     */

    /**
     * @typedef {Object} DynamicFields The dynamic fields payload.
     * @property {Object.<string, Label[]>} map_field_object desc.
     */

    /**
     * Returns the specified saved config, or creates one if it doesn't exist.
     * @param {String} applicationId The application ID.
     * @param {String} configId The config ID of the saved config.
     * @param {DynamicFields} fields The dynamic fields payload.
     * @returns {Promise<SavedConfig>} The specified saved config.
     */
    async config(applicationId, configId, fields = {}) {
        const res = await fetch(`${this.baseUrl}/api/v2/application/${applicationId}/installation/${configId}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(fields),
        });

        if (res.status >= 400 && res.status < 600) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    /**
     * Returns the configuration data for the specified application.
     * @param {String} application The application ID.
     * @returns {Promise<Config>} The specified application's configuration data.
     */
    async getConfig(application) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${application}/config`, {
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
     * @typedef {Object} SavedConfig An saved config.
     * @property {String} [config_id] Unique ID for the saved config.
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
     * Save the specified config.
     * @param {String} applicationId The application ID.
     * @param {SavedConfig} payload The config payload.
     * @returns {Promise<SavedConfig>} The specified saved config.
     */
    async saveConfig(applicationId, payload = {}) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/install`, {
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
     * Returns the specified saved config.
     * @param {String} applicationId The application ID.
     * @param {String} configId The config ID of the saved config.
     * @returns {Promise<SavedConfig>} The specified saved config.
     */
    async getSavedConfig(applicationId, configId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${configId}`, {
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
     * Update the specified saved config.
     * @param {String} applicationId The application ID.
     * @param {String} configId The config ID of the saved config.
     * @param {SavedConfig} payload The update payload.
     * @returns {Promise<SavedConfig>} The specified saved config.
     */
    async updateSavedConfig(applicationId, configId, payload = {}) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${configId}`, {
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
     * Delete the specified saved config.
     * @param {String} applicationId The application ID.
     * @param {String} configId The config ID of the saved config.
     * @returns {Promise<unknown>}
     */
    async deleteSavedConfig(applicationId, configId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${configId}`, {
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

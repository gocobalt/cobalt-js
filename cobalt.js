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
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<Application>} The application details.
     */
    async getApp(slug) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${slug}/enabled`, {
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
                    this.checkAuth(slug)
                    .then(connected => {
                        if (connected === true) {
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
     * Save the auth data that user provides to authenticate themselves to the
     * specified application.
     * @param {String} slug The application slug.
     * @param {Object.<string, string | number | boolean>} [payload={}] The key value pairs of auth data.
     * @returns {Promise<unknown>}
     */
    async auth(slug, payload) {
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
            return data;
        } else {
            // oauth
            return this.oauth(slug);
        }
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
     * @typedef {Object} DynamicField Field Mapping Label
     * @property {Label[]} fields The Label name.
     */

    /**
     * @typedef {Object} DynamicFields The dynamic fields payload.
     * @property {Object.<string, DynamicField>} map_fields_object desc.
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
                "content-type": "application/json",
            },
            body: JSON.stringify(fields),
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

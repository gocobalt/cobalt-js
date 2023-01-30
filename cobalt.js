/**
 * Cobalt Frontend SDK
 * @property {string} token The session token.
 */
class Cobalt {
    /**
     * Cobalt Frontend SDK
     * @param {object} options The options to configure the Cobalt SDK.
     * @param {string} [options.token] The session token.
     * @param {string} [options.baseUrl=https://api.gocobalt.io] The base URL of your Cobalt API.
     */
    constructor(options) {
        this.apiBaseUrl = options?.baseUrl || "https://api.gocobalt.io";
        this.token = options?.token;
    }

    get token() {
        return this.sessionToken;
    };

    set token(token) {
        return this.sessionToken = typeof token === "string" ? token : "";
    };

    /**
     * @returns {string} The base URL of cobalt API.
     */
    get baseUrl() {
        return this.apiBaseUrl;
    };

    /**
     * @typedef {object} AppConfig The configuration data for an application.
     * @property {DataSlot[]} application_data_slots Array of application data slots.
     * @property {Template[]} templates Array of workflow templates.
     */

    /**
     * Returns the configuration data for the specified application.
     * @param {string} application The application ID.
     * @returns {Promise<AppConfig>} The specified application's configuration data.
     */
    async getAppConfig(application) {
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
     * @typedef {Object} AppInstance An installed application.
     * @property {String} [intallation_id] Unique ID for the installation.
     * @property {Object.<string, string | number | boolean>} application_data_slots A map of application data slots and their values.
     * @property {WorkflowTemplate[]} templates Whether the workflow template is enabled.
     */

    /**
     * @typedef {Object} WorkflowTemplate The workflow template.
     * @property {String} id The ID of the workflow template.
     * @property {Boolean} enabled Whether the workflow template is enabled.
     * @property {Object.<string, string | number | boolean>} data_slots A map of workflow template's data slots and their values.
     */

    /**
     * Install the specified application.
     * @param {String} applicationId The application ID.
     * @param {AppInstance} payload The install payload.
     * @returns {Promise<AppInstance>} The specified application installation.
     */
    async installApp(applicationId, payload = {}) {
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
     * Returns the specified application installation.
     * @param {String} applicationId The application ID.
     * @param {String} installationId The installation ID of the application instance.
     * @returns {Promise<AppInstance>} The specified application installation.
     */
    async getAppInstallation(applicationId, installationId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${installationId}`, {
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
     * Update the specified application installation.
     * @param {String} applicationId The application ID.
     * @param {String} installationId The installation ID of the application instance.
     * @param {AppInstance} payload The update payload.
     * @returns {Promise<AppInstance>} The specified application installation.
     */
    async updateAppInstallation(applicationId, installationId, payload = {}) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${installationId}`, {
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
     * Delete the specified installation.
     * @param {String} applicationId The application ID.
     * @param {String} installationId The installation ID of the application instance.
     * @returns {Promise<unknown>}
     */
    async deleteAppInstallation(applicationId, installationId) {
        const res = await fetch(`${this.baseUrl}/api/v1/application/${applicationId}/installation/${installationId}`, {
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
     * Returns the auth status of the user for the specified application.
     * @param {String} application The application type.
     * @returns {Promise<Boolean>} The auth status of the user.
     */
    async getAppAuthStatus(application) {
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
     * Handle OAuth for the specified application.
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
                    this.getAppAuthStatus(application)
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
     * specified application.
     * @param {String} application The application type.
     * @param {Object.<string, string | number | boolean>} payload The key value pairs of auth data.
     * @param {String} applicationId The application ID in case of custom applications.
     * @returns {Promise<unknown>}
     */
    async setAppAuthData(application, payload, applicationId) {
        const res = await fetch(applicationId ? `${this.baseUrl}/api/v1/${application}/${applicationId}/save` : `${this.baseUrl}/api/v1/${application}/save`, {
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
     * Unauthorize the specified application and remove any associated data from Cobalt.
     * @param {String} application The application type.
     * @param {String} applicationId The application ID in case of custom applications.
     * @returns {Promise<void>}
     */
    async removeAppAuth(application, applicationId) {
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
}

module.exports = Cobalt;

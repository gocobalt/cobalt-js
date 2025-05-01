"use strict";
/**
 * Cobalt Frontend SDK
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cobalt = void 0;
class Cobalt {
    /**
     * Cobalt Frontend SDK
     * @param {Object} options The options to configure the Cobalt SDK.
     * @param {String} [options.token] The session token.
     * @param {String} [options.baseUrl=https://api.gocobalt.io] The base URL of the Cobalt API.
     */
    constructor(options = {}) {
        this.baseUrl = options.baseUrl
            ? /^https?:\/\//.test(options.baseUrl)
                ? options.baseUrl
                : "https://" + options.baseUrl
            : "https://api.gocobalt.io";
        this.token = options.token || "";
    }
    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    getAccountDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v3/org/basics`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            const data = yield res.json();
            return data;
        });
    }
    /**
     * Returns the org & customer details for the associated token.
     * @private
     * @returns {Promise<unknown>}
     */
    updateAccount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/linked-account`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(Object.assign({}, payload)),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            const data = yield res.json();
            return data;
        });
    }
    /**
     * Returns the application details for the specified application, provided
     * the application is enabled in Cobalt. If no application is specified,
     * it returns all the enabled applications.
     * @param {String} [slug] The application slug.
     * @returns {Promise<Application | Application[]>} The application details.
     */
    getApp(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/application${slug ? `/${slug}` : ""}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            const data = yield res.json();
            return data;
        });
    }
    /**
     * Returns all the enabled and ecosystem apps.
     * @returns {Promise<Application[]>} The list of applications.
     */
    getApps() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/application?ecosystem=true`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            const data = yield res.json();
            return data;
        });
    }
    /**
     * Returns the auth URL that users can use to authenticate themselves to the
     * specified application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<String>} The auth URL where users can authenticate themselves.
     */
    getOAuthUrl(slug, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v1/${slug}/integrate?${new URLSearchParams(params).toString()}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            const data = yield res.json();
            return data.auth_url;
        });
    }
    /**
     * Handle OAuth for the specified native application.
     * @private
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [params] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the user authenticated.
     */
    oauth(slug, params) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            }
                            else {
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
        });
    }
    /**
     * Connect the specified application, optionally with the auth data that user provides.
     * @param {String} slug The application slug.
     * @param {Object.<string, string>} [payload] The key value pairs of auth data.
     * @returns {Promise<Boolean>} Whether the connection was successful.
     */
    connect(slug, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const app = yield this.getApp(slug);
                    // oauth
                    if (app && app.auth_type === "oauth2") {
                        const connected = yield this.oauth(slug, payload);
                        resolve(connected);
                        // key based
                    }
                    else {
                        const res = yield fetch(`${this.baseUrl}/api/v2/app/${slug}/save`, {
                            method: "POST",
                            headers: {
                                authorization: `Bearer ${this.token}`,
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(Object.assign({}, payload)),
                        });
                        if (res.status >= 400 && res.status < 600) {
                            const error = yield res.json();
                            reject(error);
                        }
                        const data = yield res.json();
                        resolve(data.success);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    /**
     * Disconnect the specified application and remove any associated data from Cobalt.
     * @param {String} slug The application slug.
     * @returns {Promise<void>}
     */
    disconnect(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v1/linked-acc/integration/${slug}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
        });
    }
    /**
     * Returns the specified config, or creates one if it doesn't exist.
     * @param {ConfigPayload} payload The payload object for config.
     * @returns {Promise<Config>} The specified config.
     */
    config(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/config`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(Object.assign(Object.assign({}, payload), { labels: payload.labels || [] })),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Returns the configs created for the specified application.
     * @param {String} slug The application slug.
     * @returns {Promise<{ config_id: string; }[]>} The configs created for the specified application.
     */
    getConfigs(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/slug/${slug}/configs`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Returns the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<Config>} The specified config.
     */
    getConfig(slug, configId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/slug/${slug}/config${configId ? `/${configId}` : ""}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Update the specified config.
     * @param {UpdateConfigPayload} payload The update payload.
     * @returns {Promise<Config>} The specified config.
     */
    updateConfig(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/config`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Delete the specified config.
     * @param {String} slug The application slug.
     * @param {String} [configId] The unique ID of the config.
     * @returns {Promise<unknown>}
     */
    deleteConfig(slug, configId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/f-sdk/slug/${slug}/config${configId ? `/${configId}` : ""}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Create a lead for an ecosystem app.
     * @param {EcosystemLeadPayload} payload The payload object for the lead.
     * @returns {Promise<EcosystemLead>}
     */
    createEcosystemLead(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v1/ecosystem/leads`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Returns the specified field of the config.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The specified config field.
     */
    getConfigField(slug, fieldId, workflowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                    slug,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Update the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String | Number | Boolean | null} value The new value for the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<Field>} The updated config field.
     */
    updateConfigField(slug, fieldId, value, workflowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    "content-type": "application/json",
                    slug,
                },
                body: JSON.stringify({ value }),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Delete the specified config field value.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow.
     * @returns {Promise<unknown>}
     */
    deleteConfigField(slug, fieldId, workflowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/config/field/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${this.token}`,
                    slug,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     * Returns the options for the specified field.
     * @param {String} lhs The selected value of the lhs field.
     * @param {String} slug The application slug.
     * @param {String} fieldId The unique ID of the field.
     * @param {String} [workflowId] The unique ID of the workflow, if this is a workflow field.
     * @returns {Promise<RuleOptions>} The specified rule field's options.
     */
    getFieldOptions(lhs, slug, fieldId, workflowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/config/rule-engine/${fieldId}${workflowId ? `?workflow_id=${workflowId}` : ""}`, {
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
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
    /**
     *
     * @param {Object} params
     * @param {String} [params.slug]
     * @param {Number} [params.page]
     * @param {Number} [params.limit]
     * @returns
     */
    getWorkflows(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/workflow?page=${(params === null || params === void 0 ? void 0 : params.page) || 1}&limit=${(params === null || params === void 0 ? void 0 : params.limit) || 100}${(params === null || params === void 0 ? void 0 : params.slug) ? `&slug=${params.slug}` : ""}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
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
    createWorkflow(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/api/v2/public/workflow`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({
                    name: params.name,
                    description: params.description,
                    slug: params.slug,
                }),
            });
            if (res.status >= 400 && res.status < 600) {
                const error = yield res.json();
                throw error;
            }
            return yield res.json();
        });
    }
}
exports.Cobalt = Cobalt;

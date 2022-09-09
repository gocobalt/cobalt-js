/**
 * Cobalt Frontend SDK
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

    /**
     * @returns {string} The session token.
     */
    get token() {
        return this.sessionToken;
    };

    /**
     * @returns {string} The session token.
     */
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
     * @typedef {object} Field The Node Field object available for configuration.
     * @property {string} name The field name.
     * @property {string} type The input type of the field.
     * @property {string} placeholder The placeholder text for the field.
     * @property {boolean} required Whether the field is required.
     */

    /**
     * @typedef {object} Node The Node object available for configuration.
     * @property {string} node_id The ID of the installed workflow.
     * @property {string} node_name The Name of the installed workflow.
     * @property {Field[]} fields The applications integrated in the workflow.
     */

    /**
     * @typedef {object} Workflow The installed workflow.
     * @property {string} workflow_id The ID of the installed workflow.
     * @property {unknown[]} applications The applications integrated in the workflow.
     * @property {Node[]} configure The configuration data for the workflow.
     */

    /**
     * @typedef {object} AppAuthStatus The auth status of the user for an application.
     * @property {boolean} status Whether the user has authenticated with this application.
     */

    /**
     * Install the given template.
     * @property {string} templateId The ID of the template you want to install.
     * @returns {Promise<Workflow>}
     */
    async installTemplate(templateId) {
        const res = await fetch(`${this.baseUrl}/api/v1/template/install/${templateId}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });
        return await res.json();
    }

    /**
     * Returns the auth status of the user for the specified application.
     * @property {string} application The application type.
     * @returns {Promise<boolean>} The auth status of the user.
     */
    async getAppAuthStatus(application) {
        const res = await fetch(`${this.baseUrl}/api/v1/linked-acc/integration/auth?integration_type=${application}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });
        const data = await res.json();
        return !!data?.status;
    }

    /**
     * Returns the auth URL that users can use to authenticate themselves to the
     * specified application.
     * @property {string} application The application type.
     * @returns {Promise<string>} The auth URL where users can authenticate themselves.
     */
    async getAppAuthUrl(application) {
        const res = await fetch(`${this.baseUrl}/api/v1/google/integrate?type=${application}`, {
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });
        const data = await res.json();
        return data?.auth_url;
    }

    /**
     * Save the input data for the specified node.
     * @property {string} workflowId The ID of the workflow.
     * @property {string} nodeId The ID of the node.
     * @property {object} inputData The input data for the node.
     * @returns {Promise<Workflow>}
     */
    async saveNode(workflowId, nodeId, inputData = {}) {
        const res = await fetch(`${this.baseUrl}/api/v2/workflow/${workflowId}/node/${nodeId}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                input_data: inputData,
            }),
        });
        return await res.json();
    }

    /**
     * Toggle the status of the specified workflow.
     * @property {string} workflowId The ID of the workflow.
     * @returns {Promise<Workflow>}
     */
    async toggleWorkflowStatus(workflowId) {
        const res = await fetch(`${this.baseUrl}/api/v2/workflow/${workflowId}/toggle-status`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
        });
        return await res.json();
    }
}

module.exports = Cobalt;

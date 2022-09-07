/**
 * Cobalt Frontend SDK
 */
class Cobalt {
    /**
     * Cobalt Frontend SDK
     * @param {object} options The options to configure the Cobalt SDK.
     * @param {string} [options.baseUrl=https://api.gocobalt.io] The base URL of your Cobalt API.
     */
    constructor(options) {
        this.apiBaseUrl = options?.baseUrl || "https://api.gocobalt.io";
        this.template = {};
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
        this.template = await res.json();
        return this.template;
    }

    /**
     * Install the given template.
     * @returns {Promise<Workflow>}
     */
    async saveNode(nodeId, inputData = {}) {
        const res = await fetch(`${this.baseUrl}/api/v2/workflow/${this.template?.workflow_id}/node/${nodeId}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                input_data: inputData,
            }),
        });
        return await res.json();
    }
}

module.exports = Cobalt;

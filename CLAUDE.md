# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build      # Compile cobalt.ts → cobalt.js + cobalt.d.ts
npm run docs       # Generate HTML docs (docs/) from cobalt.ts via TypeDoc
npm run docs:llms  # Generate docs/llms.txt in LLM-friendly markdown format
```

There is no test suite (`npm test` only prints a warning).

## Architecture

This is a single-file TypeScript SDK (`cobalt.ts`) that compiles to `cobalt.js` + `cobalt.d.ts`. All source changes belong in `cobalt.ts`; the `.js` and `.d.ts` files are auto-generated and committed alongside (consumers use the compiled output directly).

**Single class:** The entire SDK is one `Cobalt` class exported from `cobalt.ts`. It wraps REST API calls to `https://api.gocobalt.io` (configurable via `baseUrl`). Authentication uses a session token (`Bearer` header) that callers set via the constructor or `cobalt.token`.

**API patterns:**
- All HTTP calls use native `fetch()`
- Throws on HTTP 400+ responses
- Endpoints are primarily `/api/v2/`, with some `/api/v3/` (e.g. `getAccountDetails`)

**Key functional areas in `cobalt.ts`:**
- Account: `getAccountDetails`, `updateAccount`
- Apps/Auth configs: `getApp`, `getApps`, `getAuthConfigs`, `connect`, `disconnect`
- Config (integration settings): `config`, `getConfigs`, `getConfig`, `updateConfig`, `deleteConfig`, and field-level CRUD
- Workflows: `getWorkflows`, `createWorkflow`, `deleteWorkflow`, `getWorkflowPayload`, `executeWorkflow`
- Executions: `getExecutions`, `getExecution`

**Auth types:** `oauth2` (opens popup window) and `keybased` (submits credential fields). The `connect()` method dispatches to `private oauth()` or `private keybased()` based on `AuthType`.

## Distribution

Published as `@cobaltio/cobalt-js` on npm. The CI workflow (`.github/workflows/npm-publish.yml`) publishes on GitHub release creation. The package targets CommonJS (`module: CommonJS`, `target: ES2020`) and is usable in both Node and browsers (via CDN).

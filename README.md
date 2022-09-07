# cobalt.js
Cobalt frontend SDK.

## Install

#### npm
```bash
npm install @cobaltio/cobalt-js
```

#### yarn
```bash
yarn add @cobaltio/cobalt-js
```

## Usage

### Include

#### Browser
```js
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@0"></script>
```

#### Node
```js
// CommonJS
const Cobalt = require("@cobaltio/cobalt-js");
// ESM
import Cobalt from "@cobaltio/cobalt-js";
```

### Initialize
```js
// initialize with token
const cobalt = new Cobalt({
    // the token you generate for linked accounts using the cobalt backend SDK
    token: "COBALT_SESSION_TOKEN",
});

// initialize without token
const cobalt = new Cobalt();
// the token you generate for linked accounts using the cobalt backend SDK
cobalt.token("COBALT_SESSION_TOKEN");
```

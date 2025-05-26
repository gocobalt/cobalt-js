# Cobalt Javascript SDK
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
```html
<!-- use this if you get an error saying `exports` is not defined. -->
<script>var exports = {};</script>
<!-- use a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@8.0.0"></script>
<!-- use a version range instead of a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@8"></script>
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js@8.0"></script>
<!-- omit the version completely to use the latest one -->
<!-- you should NOT use this in production -->
<script src="https://cdn.jsdelivr.net/npm/@cobaltio/cobalt-js"></script>
```

#### Node
```js
import { Cobalt } from "@cobaltio/cobalt-js";
// or, if you're using CommonJS
const { Cobalt } = require("@cobaltio/cobalt-js");
```

### Initialize
```js
// initialize with token
const cobalt = new Cobalt({
    // the token you generate for linked accounts using the cobalt backend SDK
    token: "COBALT_SESSION_TOKEN",
    // OPTIONAL: set custom base url for all API requests. only useful if you are hosting Cobalt on premise.
    baseUrl: "https://cobalt.example.com/backend",
});

// Or, initialize without token
const cobalt = new Cobalt();
// and you can set the token later.
cobalt.token = "COBALT_SESSION_TOKEN";
```

# Documentation

- You can read the [SDK documentation here](https://gocobalt.github.io/cobalt-js).

- [`llms.txt`](https://gocobalt.github.io/cobalt-js/llms.txt)

  This documentation is also available in [llms.txt](https://llmstxt.org) format, which is a simple markdown standard that LLMs can consume easily.

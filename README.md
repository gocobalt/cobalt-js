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

<!-- Check the SDK [documentation](docs.md) for detailed information. -->

### Include

#### Browser
```html
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
```

### Initialize
```js
// initialize with token
const cobalt = new Cobalt({
    // the token you generate for linked accounts using the cobalt backend SDK
    token: "COBALT_SESSION_TOKEN",
});

// Or, initialize without token
const cobalt = new Cobalt();
// and you can set the token later.
cobalt.token = "COBALT_SESSION_TOKEN";
```

# Documentation

Read the [SDK documentation here](https://gocobalt.github.io/cobalt-js).

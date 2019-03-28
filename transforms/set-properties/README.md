# set-properties

Transform `this.setsetProperties({'someProp': value})` to `setsetProperties(this, {'someProp': value})` and ensure import of
```js
import { setProperties } from "@ember/object";
```

## Usage

```
npx lil-codemods set-properties path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods set-properties path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/set-properties/__testfixtures__/basic.input.js)</small>):
```js
function hello() {
  this.setProperties({"whyNot": 1});
  this.setProperties({"okay": 2});
}

```

**Output** (<small>[basic.output.js](transforms/set-properties/__testfixtures__/basic.output.js)</small>):
```js
import { setProperties } from "@ember/object";
function hello() {
  setProperties(this, {"whyNot": 1});
  setProperties(this, {"okay": 2});
}

```
<!--FIXTURES_CONTENT_END-->
# get-properties

Transform `this.getProperties('someProp')` to `getProperties(this, 'someProp')` and ensure import of 
```js 
import { getProperties } from "@ember/object/computed";
```

## Usage

```
npx lil-codemods run get-properties path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods run get-properties path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/get-properties/__testfixtures__/basic.input.js)</small>):
```js
function hello() {
  const { whyNot } = this.getProperties("whyNot");
  const { okay: ok } = this.getProperties("okay");
}

```

**Output** (<small>[basic.output.js](transforms/get-properties/__testfixtures__/basic.output.js)</small>):
```js
import { getProperties } from "@ember/object/computed";
function hello() {
  const { whyNot } = getProperties(this, "whyNot");
  const { okay: ok } = getProperties(this, "okay");
}

```
<!--FIXTURES_CONTENT_END-->
# get

Transform `this.get('someProp')` to `get(this, 'someProp')` and ensure import of
```js
import { get } from "@ember/object";
```

## Usage

```
npx lil-codemods run get path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods run get path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/get/__testfixtures__/basic.input.js)</small>):
```js
function hello() {
  this.get("whyNot");
  const okay = this.get("okay");
}

```

**Output** (<small>[basic.output.js](transforms/get/__testfixtures__/basic.output.js)</small>):
```js
import { get } from "@ember/object";
function hello() {
  get(this, "whyNot");
  const okay = get(this, "okay");
}

```
<!--FIXTURES_CONTENT_END-->
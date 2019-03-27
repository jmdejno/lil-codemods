# set

Transform `this.set('someProp', value)` to `set(this, 'someProp', value)` and ensure import of 
```js 
import { set } from "@ember/object/computed";
```

## Usage

```
npx lil-codemods set path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods set path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/set/__testfixtures__/basic.input.js)</small>):
```js
import { get } from "@ember/object/computed";
function hello() {
  this.set("whyNot", "1");
  const okay = 1;
  this.set("okay", okay);
}

```

**Output** (<small>[basic.output.js](transforms/set/__testfixtures__/basic.output.js)</small>):
```js
import { get, set } from "@ember/object/computed";
function hello() {
  set(this, "whyNot", "1");
  const okay = 1;
  set(this, "okay", okay);
}

```
<!--FIXTURES_CONTENT_END-->
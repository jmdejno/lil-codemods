# component-property-ordering


## Usage

```
npx lil-codemods component-property-ordering path/of/files/ or/some**/*glob.js

# or

yarn global add lil-codemods
lil-codemods component-property-ordering path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/component-property-ordering/__testfixtures__/basic.input.js)</small>):
```js
import Component from "@ember/component";
import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";

export default Component.extend({
  willDestroy() {},

  _privateSingle: equal("bool").readOnly(),
  publicSingle: equal("bool").readOnly(),

  /**
   * Return
   * @param {string} param1
   */
  _private(param1) {
    return param1;
  },

  actions: {
    action1() {},
    action2() {}
  },

  init() {
    this._super(...arguments);
  },

  _privateMulti: computed("single", function multi() {}).readOnly(),
  publicMulti: computed("single", function multi() {}).readOnly(),


  service: service()
});

```

**Output** (<small>[basic.output.js](transforms/component-property-ordering/__testfixtures__/basic.output.js)</small>):
```js
import Component from "@ember/component";
import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";

export default Component.extend({
  service: service(),
  publicSingle: equal("bool").readOnly(),
  _privateSingle: equal("bool").readOnly(),
  publicMulti: computed("single", function multi() {}).readOnly(),
  _privateMulti: computed("single", function multi() {}).readOnly(),

  init() {
    this._super(...arguments);
  },

  willDestroy() {},

  actions: {
    action1() {},
    action2() {}
  },

  /**
   * Return
   * @param {string} param1
   */
  _private(param1) {
    return param1;
  }
});

```
<!--FIXTURES_CONTENT_END-->
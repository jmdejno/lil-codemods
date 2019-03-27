# component-property-ordering

Transform `component` property ordering to follow `eslint` rules for [order-in-components](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/order-in-components.md). 

### Example:

```js
const { Component, computed, inject: { service } } = Ember;
const { alias } = computed;

export default Component.extend({
  // 1. Services
  i18n: service(),

  // 2. Properties
  role: 'sloth',

  // 3. Empty methods
  onRoleChange() {},

  // 4. Single line Computed Property
  vehicle: alias('car'),

  // 5. Multiline Computed Property
  levelOfHappiness: computed('attitude', 'health', function() {
    const result = this.get('attitude') * this.get('health') * Math.random();
    return result;
  }),

  // 6. Observers
  onVehicleChange: observer('vehicle', function() {
    // observer logic
  }),

  // 7. Lifecycle Hooks
  init() {
    // custom init logic
  },

  didInsertElement() {
    // custom didInsertElement logic
  },

  willDestroyElement() {
    // custom willDestroyElement logic
  },

  // 8. All actions
  actions: {
    sneakyAction() {
      return this._secretMethod();
    }
  },

  // 9. Custom / private methods
  _secretMethod() {
    // custom secret method logic
  }
});
```

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
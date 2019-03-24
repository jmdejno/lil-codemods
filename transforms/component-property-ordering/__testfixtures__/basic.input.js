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

  publicMulti: computed("single", function multi() {}).readOnly(),

  _privateMulti: computed("single", function multi() {}).readOnly(),

  service: service()
});

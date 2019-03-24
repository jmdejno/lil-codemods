import Component from "@ember/component";
import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";

export default Component.extend({
  service: service(),
  _privateSingle: equal("bool").readOnly(),
  publicSingle: equal("bool").readOnly(),
  publicMulti: computed("single", function multi() {}).readOnly(),
  _privateMulti: computed("single", function multi() {}).readOnly(),
  willDestroy() {},

  init() {
    this._super(...arguments);
  },

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

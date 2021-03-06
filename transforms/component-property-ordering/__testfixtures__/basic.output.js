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

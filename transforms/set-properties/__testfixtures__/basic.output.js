import { setProperties } from "@ember/object";
function hello() {
  setProperties(this, "whyNot", 1);
  setProperties(this, "okay", 2);
}

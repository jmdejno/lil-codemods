import { getProperties } from "@ember/object";
function hello() {
  const { whyNot } = getProperties(this, "whyNot");
  const { okay: ok } = getProperties(this, "okay");
}

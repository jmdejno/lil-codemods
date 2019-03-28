import { getProperties } from "@ember/object/computed";
function hello() {
  const { whyNot } = getProperties(this, "whyNot");
  const { okay: ok } = getProperties(this, "okay");
}

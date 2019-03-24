import { get } from "@ember/object/computed";
function hello() {
  get(this, "whyNot");
  const okay = get(this, "okay");
}

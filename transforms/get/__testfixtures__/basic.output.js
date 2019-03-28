import { get } from "@ember/object";
function hello() {
  get(this, "whyNot");
  const okay = get(this, "okay");
}

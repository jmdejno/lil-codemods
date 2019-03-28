import { get, set } from "@ember/object/computed";
function hello() {
  set(this, "whyNot", "1");
  const okay = 1;
  set(this, "okay", okay);
}

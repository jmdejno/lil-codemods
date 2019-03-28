import { get } from "@ember/object/computed";
function hello() {
  this.set("whyNot", "1");
  const okay = 1;
  this.set("okay", okay);
}

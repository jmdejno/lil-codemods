const { getParser } = require("codemod-cli").jscodeshift;
// const { getOptions } = require("codemod-cli");
const Component = require("../../build/transformers/component");

module.exports = function transformer(file, api) {
  const j = getParser(api);
  // const options = getOptions();
  const root = j(file.source);
  const component = Component.build(j, root);
  component.reorder();
  return root.toSource();
};

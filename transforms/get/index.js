const { getParser } = require("codemod-cli").jscodeshift;
const MethodTransformer = require("../../dist/transformers/method");

module.exports = function transformer(file, api) {
  const j = getParser(api);

  const root = j(file.source);

  MethodTransformer.transform(j, root, "get", "@ember/object/computed");
  return root.toSource({ quotes: "single" });
};

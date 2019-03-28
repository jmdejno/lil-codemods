const { getParser } = require("codemod-cli").jscodeshift;
const JqueryTransformer = require("../../dist/transformers/jquery");

module.exports = function transformer(file, api) {
  const j = getParser(api);

  const root = j(file.source);

  JqueryTransformer.transform(j, root);
  return root.toSource({ quotes: "single" });
};

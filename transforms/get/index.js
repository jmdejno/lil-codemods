const { getParser } = require("codemod-cli").jscodeshift;
const GetTransformer = require("../../build/transformers/get");

module.exports = function transformer(file, api) {
  const j = getParser(api);

  const root = j(file.source);

  GetTransformer.transform(j, root);
  return root.toSource({ quotes: "single" });
};

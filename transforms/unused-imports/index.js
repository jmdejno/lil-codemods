const { getParser } = require("codemod-cli").jscodeshift;
const ImportTransformer = require("../../dist/transformers/imports");

module.exports = function transformer(file, api) {
  const j = getParser(api);

  const root = j(file.source);

  const transformer = ImportTransformer.build(j, root);
  transformer.removeUnused();
  return root.toSource({ quotes: "single" });
};

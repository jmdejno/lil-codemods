const { getParser } = require("codemod-cli").jscodeshift;
const { getOptions } = require("codemod-cli");
const JqueryTransformer = require("../../dist/transformers/jquery");

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions() || {};
  console.log(options);

  const root = j(file.source);

  JqueryTransformer.transform(j, root, options.include);
  return root.toSource({ quotes: "single" });
};

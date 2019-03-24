import yargs = require("yargs");
import * as path from "path";
import { ensureCodemod } from "../utils/codemods";
import { promptForPaths } from "../utils/paths";

interface IArguments {
  codemod: string;
  paths: string[];
}

const command = "run [codemod] [paths..]";
const aliases = ["r"];
const desc = "Run a codemod";
export const builder = (yargs: yargs.Argv<IArguments>) => {
  yargs.positional("codemod", {
    desc: "Codemod to run"
  });
  yargs.positional("paths", {
    desc: "Paths or globs to run codemod on"
  });
};
export const handler = async (argv: yargs.Arguments<IArguments>) => {
  let { codemod, paths = [] } = argv;
  const root = path.resolve(__dirname, "../../");
  const transformDir = path.join(root, "../transforms");

  codemod = await ensureCodemod(codemod, transformDir);
  paths = await promptForPaths();
  require("codemod-cli").runTransform(root, codemod, paths);
};

module.exports = {
  command,
  aliases,
  desc,
  builder,
  handler
};

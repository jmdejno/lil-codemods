import yargs = require("yargs");
import * as path from "path";
import { ensureCodemod } from "../utils/codemods";
import { promptForPaths } from "../utils/paths";

interface IArguments {
  codemod: string;
  paths: string[];
  dryrun: boolean;
  print: boolean;
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
  yargs.option("dryrun", {
    alias: "d",
    desc: "Run without modifying the file.",
    type: "boolean"
  });
  yargs.option("print", {
    alias: "p",
    desc: "Print output of codemod run.",
    type: "boolean"
  });
};
export const handler = async (argv: yargs.Arguments<IArguments>) => {
  let { codemod, paths = [], dryrun, print } = argv;
  const root = path.resolve(__dirname, "../../");
  const transformDir = path.join(root, "../transforms");

  codemod = await ensureCodemod(codemod, transformDir);
  paths = await promptForPaths();
  const options = [];
  if (dryrun) {
    options.push("--dry");
  }
  if (print) {
    options.push("--print");
  }
  console.log(options);
  require("codemod-cli").runTransform(root, codemod, options.concat(paths));
};

module.exports = {
  command,
  aliases,
  desc,
  builder,
  handler
};

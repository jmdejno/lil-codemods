import yargs = require("yargs");
import * as path from "path";
import { findCodemods } from "../utils/codemods";
import chalk from "chalk";

const command = "list";
const aliases = ["l"];
const desc = "List available codemods to run.";
const handler = async (argv: yargs.Arguments) => {
  const root = path.resolve(__dirname, "../../../")
  const transformDir = path.join(root, 'transforms');
  const codemods = await findCodemods(transformDir);
  console.log(chalk.yellow("Available codemods:"));
  codemods.forEach(mod => console.log(chalk.green(` - ${mod}`)));

};

module.exports = {
  command,
  aliases,
  desc,
  handler
}

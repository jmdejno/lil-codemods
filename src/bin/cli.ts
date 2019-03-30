#!/usr/bin/env node
import * as yargs from "yargs";

export const cli = yargs
  .locale("en")
  .commandDir("./commands")
  .demandCommand()
  .help();

#!/usr/bin/env node
import * as yargs from 'yargs';

yargs
  .locale("en")
  .commandDir("./commands")
  .demandCommand()
  .help()
  .parse();


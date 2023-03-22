#!/usr/bin/env node

import { join } from 'path'
import { crossSpawn, log, chalk } from '@etfm/shared'
import assert from 'assert'
import { existsSync } from 'fs'

const argv = process.argv.slice(2)
const [name, ...throughArgs] = argv
const scriptsPath = join(__dirname, '../', `src/${name}.ts`)

log.verbose('etfm:scriptsPath', scriptsPath)
log.verbose('etfm:cwd', process.cwd())
log.verbose('etfm:dirname', __dirname)

assert(
  existsSync(scriptsPath) && !name.startsWith('.'),
  `Executed script '${chalk.red(name)}' does not exist`
)

const scriptPathAsStr = JSON.stringify(scriptsPath)
const spawn = crossSpawn.sync('tsx', [scriptPathAsStr, ...throughArgs], {
  env: process.env,
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
})
if (spawn.status !== 0) {
  console.log(chalk.red(`umi-scripts: ${name} execute fail`))
  process.exit(1)
}
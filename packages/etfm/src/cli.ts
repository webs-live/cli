import { yParser, log } from '@etfm/shared'
import { Service } from './service'

export async function run() {
  // 检查node版本
  checkVersion(14)

  //接受参数
  const args = yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
  })

  console.log(args, '========')

  const commandName = args._[0]
  if (commandName == 'dev') {
    process.env.DEBUG = 'debug'
  } else {
    process.env.DEBUG = ''
  }

  try {
    await new Service().start(commandName, args)
  } catch (e: any) {
    log.verbose('etfm:run', e.toString())
    process.exit(1)
  }
}

function checkVersion(version: number) {
  const v = parseInt(process.version.slice(1))
  if (v < version) {
    log.error(
      'version',
      `Your node version ${v} is not supported, please upgrade to ${version} .`
    )
    process.exit(1)
  }
}

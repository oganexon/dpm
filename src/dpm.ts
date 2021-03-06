/*
 * Copyright (c) 2020 · Marton Lederer
 * This file was created / generated by Marton Lederer
 * See the LICENSE on the github repo
 * https://github.com/MartonDev
 * https://marton.lederer.hu
 */

import { Command } from '../deps.ts'
import Config from './Config.ts'
import { Color, Style } from './types.ts'
import { InstallCommand } from './commands/InstallCommand.ts'
import { InitCommand } from './commands/InitCommand.ts'
import { UninstallCommand } from './commands/UninstallCommand.ts'

export class DpmCommand extends Command {

  constructor () {

    super()

    this.name('dpm')
      .version(Config.version)
      .description('Deno Package Manager. A 3rd party package manager for Deno.')
      .action(() => {

        console.log(`
          =========== dpm ===========
          Deno Package Manager ${ Color.Purple }v${ Config.version }${ Style.Reset }
          A 3rd party package manager for ${ Color.Yellow }Deno${ Style.Reset }.
          developed by ${ Color.Cyan }Marton Lederer${ Style.Reset }
          https://marton.lederer.hu
          Packages source: https://deno.land/x/
          Help: dpm help
          ===========================
        `)

      })
      .command('install', new InstallCommand())
      .command('i', new InstallCommand())
      .command('init', new InitCommand())
      .command('r', new UninstallCommand())
      .reset()

  }

}
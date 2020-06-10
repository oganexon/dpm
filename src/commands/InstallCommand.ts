/*
 * Copyright (c) 2020 · Marton Lederer
 * This file was created / generated by Marton Lederer
 * See the LICENSE on the github repo
 * https://github.com/MartonDev
 * https://marton.lederer.hu
 */

import { BaseCommand } from '../../deps.ts'
import { Installer } from '../utils/Installer.ts'
import { Color, Style } from '../types.ts'
import Config from '../Config.ts'

export class InstallCommand extends BaseCommand {

  constructor () {

    super()

    this.description('Install a module from deno.land/x or the given url')
      .arguments('<module:Module>')
      .useRawArgs()
      .action(async (options, module: string) => {

        await this.runCommand(module)

      })

  }

  async runCommand (module: string | undefined) {

    console.log(`======== ${ Color.Cyan }dpm${ Style.Reset } v${ Config.version } ========`)

    switch (typeof module) {

      case 'string':
        const installer = new Installer(module, `${ Deno.cwd() }/deno_modules/`)

        await installer.install()

        break

      case 'undefined':
        console.log('Installing via package file')
        break

      default:
        console.log('Something went wrong')

    }

  }

}
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
      .arguments('[module...:string]')
      .action(async (options, args) => {

        await this.runCommand(args)

      })

  }

  async runCommand (modules: Array<string>) {

    console.log(`======== ${ Color.Cyan }dpm${ Style.Reset } v${ Config.version } ========`)

    switch (typeof modules) {

      case 'object':

        for(const module in modules) {

          const installer = new Installer(modules[module], `${ Deno.cwd() }/deno_modules/`, true)

          await installer.install()

        }

        break

      case 'undefined':

        const
          depsJSONFile = await Deno.open(`${ Deno.cwd() }/deps.json`, { read: true }),
          depsJSON = JSON.parse(new TextDecoder().decode(await Deno.readAll(depsJSONFile))),
          modulesToInstall = depsJSON.modules

        for(const module in modulesToInstall) {

          const installer = new Installer(modulesToInstall[module].module, `${ Deno.cwd() }/deno_modules/`, false)

          await installer.install()

        }

        break

      default:
        console.log('Something went wrong')

    }

  }

}
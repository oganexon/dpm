/*
 * Copyright (c) 2020 · Marton Lederer
 * This file was created / generated by Marton Lederer
 * See the LICENSE on the github repo
 * https://github.com/MartonDev
 * https://marton.lederer.hu
 */

import { Color, Style } from '../types.ts'

export class Installer {

  private readonly moduleName: string
  private readonly depsDir: string

  constructor (moduleName: string, depsDir: string) {

    this.moduleName = moduleName
    this.depsDir = depsDir

  }

  async moduleURL (): Promise<string | null> {

    return new Promise<string | null>(async resolve => {

      if(this.moduleName.includes('http')) {

        const moduleCheck = (await fetch(this.moduleName)).status

        if(moduleCheck !== 200)
          resolve(null)

        resolve(this.moduleName)

      }

      const modules = await (await fetch('https://raw.githubusercontent.com/denoland/deno_website2/master/database.json')).json()

      if(this.moduleName in modules)
        resolve(`https://deno.land/x/${ this.moduleName }`)
      else
        resolve(null)

    })

  }

  async install () {

    console.log(`Installing ${ this.moduleName }...`)

    const downloadFrom = await this.moduleURL()

    if(downloadFrom === null) {

      console.log(`${ Color.Red }Error while installing: Module not found${ Style.Reset }`)
      return

    }

    console.log(`Fetching from ${ downloadFrom }...`)

    const module = await fetch(`${ downloadFrom }/mod.ts`, {

      method: 'GET',
      headers: {

        'Accept': 'text/typescript'

      }

    })

    if(module.status === 404) {

      console.log(`${ Color.Red }No mod.ts found at ${ downloadFrom }/mod.ts\nmod.ts files are required, without a mod.ts the module is not supported by dpm${ Style.Reset }`)
      return

    }else if(module.status !== 200) {

      console.log(`${ Color.Red }Something went wrong while requesting the module. Status code: ${ module.status }${ Style.Reset }`)
      return

    }

    const moduleDir = `${ this.depsDir }${ this.moduleName }/`

    console.log(`Installing to: ${ moduleDir }`)

    //console.log(await module.text())

  }

}
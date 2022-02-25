import { ApplicationCommand } from 'discord.js'
import folder from '../constants/folder'
import path from 'path'
import fs from 'fs'

const getCommands = async () => {
  // TODO: Add a prod env to decide path, I called it ENV in Heroku
  const interactions = path.resolve('./') + folder + '/interactions'
  const folders = fs
    .readdirSync(interactions, { withFileTypes: true })
    .filter((file) => file.isDirectory())

  const collection: ApplicationCommand[] = []

  for (let { name } of folders) {
    const isCommands = name === '@commands'
    const folder = interactions + '/' + name

    const [commands] = fs
      .readdirSync(folder, { withFileTypes: true })
      .filter((file) => isCommands || (file.isDirectory() && file.name === '@slash'))

    if (commands) {
      const path = folder.concat(isCommands ? '' : '/@slash')
      const files = fs.readdirSync(path, { withFileTypes: true })

      for (let file of files) {
        const nested = !isCommands ? '@slash/' : ''
        const end = nested.concat(file.name)

        const command = (await import(`../interactions/${name}/${end}`))['default']
        collection.push(command.toJSON())
      }
    }
  }

  return collection
}

export default getCommands

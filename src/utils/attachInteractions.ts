import type Interaction from '../types/Interaction'
import path from 'path'
import fs from 'fs'

const attachInteractions = async (folderName: string, interaction: Interaction) => {
  const server = path.resolve('./') + '/build/interactions/'
  const interactions = fs.readdirSync(server, { withFileTypes: true })
  const [hasFolder] = interactions.filter((file) => file.name === folderName && file.isDirectory())

  if (hasFolder) {
    const folder = fs.readdirSync(server + folderName)
    const hasButtons = folder.some((file) => file === 'buttons')
    const hasCommands = folder.some((file) => file === 'commands')

    if (hasCommands) {
      interaction.commands = new Map()

      const commands = server + folderName + '/commands'
      const commandFiles = fs.readdirSync(commands, { withFileTypes: true })

      for (let command of commandFiles) {
        const [name] = command.name.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).split('.')
        const execute = (await import(`../interactions/${folderName}/commands/${command.name}`))[
          'default'
        ]

        interaction.commands?.set(name, execute)
      }
    }

    if (hasButtons) {
      interaction.buttons = new Map()

      const buttons = server + folderName + '/buttons'
      const buttonFiles = fs.readdirSync(buttons, { withFileTypes: true })

      for (let button of buttonFiles) {
        const [name] = button.name.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).split('.')
        const execute = (await import(`../interactions/${folderName}/buttons/${button.name}`))[
          'default'
        ]

        interaction.buttons?.set(name, execute)
      }
    }
  }
}

export default attachInteractions

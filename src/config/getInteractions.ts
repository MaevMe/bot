import fs from 'fs'
import path from 'path'

import attachInteractions from '../utils/attachInteractions'

const getInteractions = async () => {
  const classes = new Map()
  let commands = new Map()
  let buttons = new Map()

  const interactions = path.resolve('./') + '/src/interactions'
  const files = fs
    .readdirSync(interactions, { withFileTypes: true })
    .filter((file) => !file.isDirectory())

  for (let file of files) {
    const { name, interaction } = (await import(`${interactions}/${file.name}`))['default']

    await attachInteractions(name, interaction)
    classes.set(name, interaction)

    if (interaction.buttons) buttons = new Map([...buttons, ...interaction.buttons])
    if (interaction.commands) commands = new Map([...commands, ...interaction.commands])
  }

  return { classes, buttons, commands }
}

export default getInteractions

import type { ClientEvents } from 'discord.js'
import { Client } from 'discord.js'

import registerCommands from './utils/registerCommands'
import getInteractions from './config/getInteractions'
import connectDB from './config/connectDB'

import dotenv from 'dotenv'
dotenv.config()

type Events = keyof ClientEvents
const events: Events[] = ['messageCreate', 'voiceStateUpdate']

const launch = async () => {
  await connectDB()
  await registerCommands()

  const { classes, buttons, commands } = await getInteractions()

  const client = new Client({
    intents: 32767,
    partials: ['CHANNEL'],
  })

  client.once('ready', (client) => console.log('🚀 Launched'))

  client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
      const [command] = interaction.commandName.split('/')
      commands.get(command)(client, interaction)
    }

    if (interaction.isButton()) {
      const [button] = interaction.customId.split('/')
      buttons.get(button)(client, interaction)
    }
  })

  for (let event of events) {
    client.on(event, (...props) => {
      for (let prop of classes.values()) {
        if (prop[event]) prop[event](client, ...props)
      }
    })
  }

  client.login(process.env.TOKEN)
}

launch()

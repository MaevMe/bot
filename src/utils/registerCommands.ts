import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import getCommands from '../config/getCommands'

const registerCommands = async () => {
  const commands = await getCommands()
  if (!process.env.TOKEN || !process.env.CLIENT_ID) return

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

  await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, '939289877449678888'), {
    body: commands,
  })

  console.log('👍 Slash Registered')
}

export default registerCommands

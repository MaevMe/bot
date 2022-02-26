import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import getCommands from '../config/getCommands'

const registerCommands = async (guildId: string) => {
  const commands = await getCommands()
  if (!process.env.TOKEN || !process.env.CLIENT_ID) return

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

  await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
    body: commands,
  })

  console.log('👍 Slash Registered')
}

export default registerCommands

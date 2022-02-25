import { Guild, VoiceChannel } from 'discord.js'

const createChannels = async (guild: Guild, username: string, spectate: boolean) => {
  const category = await guild.channels.create(`🎮 Custom ┃ ${username}`, {
    type: 'GUILD_CATEGORY',
  })

  let spectator: VoiceChannel | undefined

  if (spectate) {
    spectator = await category.createChannel('Spectate', { type: 'GUILD_VOICE' })
  }

  await category.createChannel('ROUNDUP', { type: 'GUILD_VOICE' })
  const blue = await category.createChannel('🐬 Blue', { type: 'GUILD_VOICE' })
  const red = await category.createChannel('💞 Red', { type: 'GUILD_VOICE' })

  if (spectator) return { category, red, blue, spectator }
  return { category, red, blue }
}

export default createChannels

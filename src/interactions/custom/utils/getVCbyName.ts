import { CategoryChannel, VoiceChannel } from 'discord.js'

const getVCbyName = (names: string[], category: CategoryChannel) => {
  let lowerCaseNames = names.map((name) => name.toLowerCase())
  const channels: VoiceChannel[] = []

  for (let lowerCaseName of lowerCaseNames) {
    const channel = category.children
      .filter(({ name, type }) => name.toLowerCase().includes(lowerCaseName))
      .first()

    if (channel?.type === 'GUILD_VOICE') channels.push(channel)
  }

  return channels.sort((next, prev) => next.name.normalize().localeCompare(prev.name.normalize()))
}

export default getVCbyName

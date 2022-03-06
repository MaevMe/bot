import { VoiceState, CategoryChannel, GuildMember } from 'discord.js'

// TODO: Get naming format

const createChannels = async (
  newState: VoiceState,
  category: CategoryChannel,
  member: GuildMember,
  channelsCount: number,
  namingFormat: string,
  includeTextChannel: boolean
) => {
  const channelName = namingFormat
    .replace('{index}', channelsCount.toString())
    .replace('{username}', member.user.username)

  const newVoiceChannel = await category.createChannel(channelName, {
    type: 'GUILD_VOICE',
  })

  if (includeTextChannel) {
    await category.createChannel(channelName, {
      type: 'GUILD_TEXT',
    })
  }

  newState.setChannel(newVoiceChannel)
}

export default createChannels

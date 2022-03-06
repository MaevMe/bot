import { VoiceState, CategoryChannel, GuildMember } from 'discord.js'

// TODO: Get naming format

const createChannels = async (
  newState: VoiceState,
  category: CategoryChannel,
  member: GuildMember,
  channelsCount: number
) => {
  const nameFormat = '{count}┃{creator}'

  // Find the channelscount from the correct category
  const channelName = nameFormat
    .replace('{count}', channelsCount.toString())
    .replace('{creator}', member.user.username)

  // Find the category to create channels in

  const newVoiceChannel = await category.createChannel(channelName, {
    type: 'GUILD_VOICE',
  })

  await category.createChannel(channelName, {
    type: 'GUILD_TEXT',
  })

  newState.setChannel(newVoiceChannel)
}

export default createChannels

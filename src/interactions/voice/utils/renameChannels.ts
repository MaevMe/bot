import { VoiceState, CategoryChannel, GuildMember } from 'discord.js'

// Get categoryId

const renameChannels = async (
  oldState: VoiceState,
  category: CategoryChannel,
  member: GuildMember
) => {
  if (!oldState.channel) return
  const { channel } = oldState

  // TODO: Find the category, and then the channels to rename in it

  const firstMember = channel.members.filter((user) => user.id !== member.id).first()
  if (!firstMember) return

  const textChannel = category.children.find((channel) => {
    return channel.type === 'GUILD_TEXT' && channel.name.includes(member.displayName.toLowerCase())
  })

  const newName = firstMember.displayName
  // TODO: Fix count iteration for channel name
  const channelsCount = category.children.size / 2

  await channel.setName(`${channelsCount}┃${newName}`)
  if (textChannel) await textChannel.setName(`${channelsCount}┃${newName}`)
}

export default renameChannels

import { VoiceState, CategoryChannel, GuildMember, User } from 'discord.js'

// TODO: Keep track of deleting unknown channel error
// Get categoryId

const deleteChannels = async (oldState: VoiceState, category: CategoryChannel, member: GuildMember) => {
  const { channel } = oldState

  // Find the category, and then the channels to delete inside of it

  const textChannel = category.children.find((channel) => {
    return channel.type === 'GUILD_TEXT' && channel.name.includes(member.displayName.toLowerCase())
  })

  if (channel && channel.deletable) await channel.delete()
  if (textChannel && textChannel.deletable) await textChannel.delete()
}

export default deleteChannels

import Interaction from '../types/Interaction'

import getAction from './voice/utils/getAction'
import deleteChannels from './voice/utils/deleteChannels'
import createChannels from './voice/utils/createChannels'
import renameChannels from './voice/utils/renameChannels'

import Server from '../models/Server'

const interaction: Interaction = {
  voiceStateUpdate: async (client, oldState, newState) => {
    const { guild, member } = newState
    const { channelId: newChannelId } = newState
    const { channelId: oldChannelId, channel: oldChannel } = oldState

    const {
      tempVoiceChannels: { createChannelID, categoryID, namingFormat, includeTextChannel, active },
    } = await Server.findOne({ id: guild.id })

    if (!active) return

    const category = guild.channels.cache.get(categoryID)
    const action = getAction(createChannelID, categoryID, newChannelId, oldChannelId, oldChannel)

    if (!member) return
    if (!category) return
    if (category.type !== 'GUILD_CATEGORY') return

    const channelsCount = category.children.filter(child => child.type === 'GUILD_VOICE').size

    switch (action) {
      case 'create':
        return await createChannels(
          newState,
          category,
          member,
          channelsCount,
          namingFormat,
          includeTextChannel
        )

      case 'delete':
        return await deleteChannels(oldState, category, member)

      case 'rename':
        return await renameChannels(oldState, category, member, namingFormat)

      default:
        return
    }
  },
}

export default { name: 'voice', interaction }

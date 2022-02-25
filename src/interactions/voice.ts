import Interaction from '../types/Interaction'

import getAction from './voice/utils/getAction'
import deleteChannels from './voice/utils/deleteChannels'
import createChannels from './voice/utils/createChannels'
import renameChannels from './voice/utils/renameChannels'

const interaction: Interaction = {
  voiceStateUpdate: async (client, oldState, newState) => {
    const { guild, member } = newState
    const { channelId: newChannelId } = newState
    const { channelId: oldChannelId, channel: oldChannel } = oldState

    // TODO: Get ID's from database depending on server
    const createChannelId = '940608847695982602'
    const categoryID = '939289877449678890'
    const category = guild.channels.cache.get(categoryID)
    const action = getAction(createChannelId, categoryID, newChannelId, oldChannelId, oldChannel)

    if (!member) return
    if (!category) return
    if (category.type !== 'GUILD_CATEGORY') return

    const channelsCount = category.children.filter((child) => child.type === 'GUILD_VOICE').size

    switch (action) {
      case 'create':
        return await createChannels(newState, category, member, channelsCount)

      case 'delete':
        return await deleteChannels(oldState, category, member)

      case 'rename':
        return await renameChannels(oldState, category, member)

      default:
        return
    }
  },
}

export default { name: 'voice', interaction }
